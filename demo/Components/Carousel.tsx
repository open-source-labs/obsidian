import React from 'https://dev.jspm.io/react@16.13.1';
import Book from './Book.tsx';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      a: any;
    }
  }
}

const Carousel = (props: any) => {
  const books = props.books.map(
    (book: { id: string; name: string; image: string }) => {
      return (
        <Book key={book.id} id={book.id} name={book.name} image={book.image} />
      );
    }
  );

  return <div style={props.style}>{books}</div>;
};

export default Carousel;
