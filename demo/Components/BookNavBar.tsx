import React from "https://dev.jspm.io/react@16.13.1";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      a: any;
    }
  }
}

const BookNavBar = (props: any) => {

  const { pageTurn, page } = props;

  
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '75%' }}>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link" href="#" tabIndex="-1" onClick={() => {
              console.log('show me ', page)
              if (page > 1) {
                pageTurn((page * 8) - 15 )
              }
              }}>Previous</a>
          </li>
          <li className="page-item"><a className="page-link" href="#" onClick={() => {pageTurn(1)}}>1</a></li>
          <li className="page-item"><a className="page-link" href="#" onClick={() => {pageTurn(9)}}>2</a></li>
          <li className="page-item"><a className="page-link" href="#" onClick={() => {pageTurn(17)}}>3</a></li>
          <li className="page-item">
            <a className="page-link" href="#" onClick={() => {
              console.log('show me ', page)
              pageTurn((page * 8) + 1)}}>Next</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default BookNavBar;

{/* <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '75%' }}>
<a href="#" style={{ textDecoration: 'none', display: 'inline-block', padding: '8px 16px' }}>&laquo; Previous</a>
      <button type="button" class="btn btn-outline-dark">
        <a href="#" style={{ border: '1px solid black', padding: '2px 7px', borderRadius: '50%', textDecoration: 'none' }}>1</a>
      </button>
      <a href="#" style={{ border: '1px solid black', padding: '2px 7px', borderRadius: '50%', textDecoration: 'none' }}>2</a>
      <a href="#" style={{ border: '1px solid black', padding: '2px 7px', borderRadius: '50%', textDecoration: 'none' }}>3</a>
      <a href="#" style={{ border: '1px solid black', padding: '2px 7px', borderRadius: '50%', textDecoration: 'none' }}>4</a>
      <a href="#" style={{ border: '1px solid black', padding: '2px 7px', borderRadius: '50%', textDecoration: 'none' }}>5</a>
      <a href="#" style={{ textDecoration: 'none', display: 'inline-block', padding: '8px 16px' }}>Next &raquo;</a>
    </div> */}