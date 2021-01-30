// import { GetServerSideProps } from 'next';
import { useMemo } from 'react';
import df from 'data/i.json';

// type Props = { data: typeof import('data/i.json') };

export default function Home() {
  const dataString = useMemo(() => {
    return JSON.stringify(df);
  }, []);

  return (
    <>
      <span>Hello World!</span>
      {dataString}
    </>
  );
}

// export const getServerSideProps: GetServerSideProps<Props> = async () => {
//   return { props: { data: df } };
// };
