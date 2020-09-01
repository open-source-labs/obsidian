import { React } from '../../deps.ts';
const { useState, useEffect } = React;

function useObsidian(query) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return async () => {
      const respJSON = await fetch(`https://swapi.dev/api/people/1`);
      respJSON
        .then((res) => res.json())
        .then((res) => {
          this.cache[res.name] = res.url;
        })
        .then((data) => {
          console.log('we did it!');
          console.log(data.name);
          setLoading(true);
        });
    };
  }, []);
  return loading;
}

const TestComponent = () => {
  useObsidian('123');
  return <div></div>;
};

class Cache extends React.Component {
  constructor(props) {
    super(props);
    this.cache = {};
  }

  render() {
    return <TestComponent />;
  }
}

const cache = new Cache();
console.log(cache);
