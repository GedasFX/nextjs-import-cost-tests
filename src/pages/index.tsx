import { GetStaticProps } from 'next';
import { useMemo } from 'react';

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
  const df = JSON.parse(JSON.stringify(await import('data/i.json')));
  return { props: { data: df } };
};
