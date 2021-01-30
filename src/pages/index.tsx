import { GetStaticProps } from 'next';
import { useMemo } from 'react';
// import * as fs from 'fs';

type Props = { data: typeof import('data/i.json') };

export default function Home({ data }: Props) {
  const dataString = useMemo(() => {
    return JSON.stringify(data);
  }, [data]);

  return (
    <>
      <span>Hello World!</span>
      {dataString}
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const fs = await import('fs');
  const df = JSON.parse(fs.readFileSync('data/i.json', 'utf-8'));

  return { props: { data: df } };
};
