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
  const fs = await import('fs');
  const data: typeof import('data/jobs.json') = JSON.parse(
    fs.readFileSync('data/jobs.json', 'utf-8')
  );
  return { props: { jobs: data.data.jobs } };
};
