import React from 'https://dev.jspm.io/react@16.13.1';
import { cardStyle } from '../style.ts';
import { useObsidian } from '../../ObsidianWrapper/ObsidianWrapper.jsx';

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
  const { gather } = useObsidian();

  return (
    <div className='book-list' style={cardStyle}>
      <div>
        <h5>Title: {props.title}</h5>
        <h5>Author: {props.author}</h5>
      </div>

      <button
        onClick={() => {
          gather(
            ` query { getBook(id: ${props.id}) { id  title  author  description  publicationDate  publisher  coverPrice whereToBuy {
              id
              name
              address
            }}}`
          ).then((resp: any) => props.setInfo(resp.data.getBook));
        }}
      >
        Get more info
      </button>
    </div>
  );
};

export default Book;
