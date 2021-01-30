import { GetStaticProps } from 'next';
import { useMemo } from 'react';
import df from 'data/i.json';

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
  return { props: { data: df } };
};
