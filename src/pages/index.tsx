import { useMemo } from 'react';
import data from 'data/jobs.json';

export default function Home() {
  const dataString = useMemo(() => {
    return JSON.stringify(data.data.jobs);
  }, []);

  return dataString;
}
