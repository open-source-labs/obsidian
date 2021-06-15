import React from 'https://dev.jspm.io/react';
import { useObsidian } from 'https://deno.land/x/obsidian/clientMod.ts';

const MainContainer = () => {
  const { query } = useObsidian();
  const [movie, setMovie] = (React as any).useState({});

  return (
    <div>
      <h1>Obsidian Film Showcase</h1>
      <p>Check out our favorite movie by clicking the button below</p>
      <button
        onClick={() => {
          query(`query { getMovie { id title releaseYear } }`).then(
            (resp: { data: { getMovie: any } }) => setMovie(resp.data.getMovie),
          );
        }}
      >
        Get Movie
      </button>
      <p>Title: {movie.title}</p>
      <p>Release Year: {movie.releaseYear}</p>
    </div>
  );
};

export default MainContainer;
