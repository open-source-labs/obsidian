import React from 'https://dev.jspm.io/react@16.13.1';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      a: any;
      h5: any;
      button: any;
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
      <h5>Title: {props.title}</h5>
      <h5>Author: {props.author}</h5>
      <button
        onClick={() => {
          fetch('/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              query: `{
                getBook(id: ${props.id}) {
                  id
                  title
                  author
                  description
                  publicationDate
                  publisher
                  coverPrice
                }
              }`,
            }),
          })
            .then((resp) => resp.json())
            .then((resp) => {
              props.setInfo(resp.data.getBook);
            });
        }}
      >Get more info</button>
    </div>
  );
};

export default Book;
