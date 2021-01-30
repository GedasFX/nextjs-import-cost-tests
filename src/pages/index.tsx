import { useMemo } from 'react';
import data from 'data/jobs.json';
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
  return { props: { jobs: data.data.jobs } };
};
