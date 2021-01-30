import { useEffect, useMemo } from 'react';
import { ApolloClient, createHttpLink, InMemoryCache, gql, ApolloProvider } from '@apollo/client';
import type { GetStaticProps } from 'next';

type Props = {
  jobs: typeof import('data/jobs.json')['data']['jobs'];
};

const client1 = new ApolloClient({
  link: createHttpLink({
    uri: 'https://api.graphql.jobs/',
  }),
  cache: new InMemoryCache(),
});

export default function Home({ jobs }: Props) {
  const dataString = useMemo(() => {
    return JSON.stringify(jobs);
  }, [jobs]);

  useEffect(() => {
    client1
      .query<typeof import('data/jobs.json')['data']>({
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
      })
      .then(data => {
        console.log(data);
      });
  }, []);

  return <ApolloProvider client={client1}>{dataString}</ApolloProvider>;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
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
