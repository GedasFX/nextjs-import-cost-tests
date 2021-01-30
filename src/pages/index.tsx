import { useMemo } from 'react';

export default function Home() {
  const dataString = useMemo(() => {
    return JSON.stringify({});
  }, []);

  return dataString;
}
