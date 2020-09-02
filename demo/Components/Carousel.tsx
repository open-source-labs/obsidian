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
    (book: { id: string; title: string; author: string }) => {
      return (
        <Book key={book.id} id={book.id} title={book.title} author={book.author} />
      );
    }
  );

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {books}
    </div>
  );
};

export default Carousel;
