import { React } from '../../deps.ts';
const { useState, useEffect } = React;

export default function useObsidian(query) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // return async () => {
    fetch(`https://swapi.dev/api/people/1`)
      .then((res) => res.json())
      // .then((res) => {
      //   this.cache[res.name] = res.url;
      // })
      .then((data) => {
        console.log('we did it!');
        console.log(data.name);
        setLoading(false);
      });
    // };
  });

  return <div>{JSON.stringify(loading)}</div>;
}

console.log('hiiii');
