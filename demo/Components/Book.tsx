import React from 'https://dev.jspm.io/react@16.13.1';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      a: any;
    }
  }
}

const Book = (props: any) => {
  return (
    <div
      className='book-list'
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        width: '150px',
        height: '150px',
        padding: '10px',
        border: '1px solid gray',
        margin: '0',
      }}
    >
      {/* <img src={props.image}></img> */}
      Title: {props.name}
      Author: {props.id}
    </div>
  );
};

export default Book;
