import { useMemo } from 'react';
import { ApolloClient, createHttpLink, InMemoryCache, gql } from '@apollo/client';
import type { GetServerSideProps } from 'next';

type Props = {
  jobs: typeof import('data/jobs.json')['data']['jobs'];
};

export default function Home({ jobs }: Props) {
  const dataString = useMemo(() => {
    return JSON.stringify(jobs);
  }, [jobs]);

  return dataString;
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: 'https://api.graphql.jobs/',
    }),
    cache: new InMemoryCache(),
  });
  const data = await client.query<typeof import('data/jobs.json')['data']>({
    query: gql`
      {
        jobs {
          title
          description
          commitment {
            title
          }
          cities {
            name
            country {
              isoCode
              name
            }
          }
        }
      }
    `,
  });

  return { props: { jobs: data.data.jobs } };
};
