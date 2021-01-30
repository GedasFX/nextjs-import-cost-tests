import { useMemo } from 'react';

import type { GetStaticProps } from 'next';

type Props = {
  jobs: typeof import('data/jobs.json')['data']['jobs'];
};

export default function Home({ jobs }: Props) {
  const dataString = useMemo(() => {
    return JSON.stringify(jobs);
  }, [jobs]);

  return dataString;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { ApolloClient, createHttpLink, InMemoryCache, gql } = await import('@apollo/client');
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
