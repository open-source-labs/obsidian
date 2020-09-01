import { React } from '../../deps.ts';


const BookNavBar = (props) => {


  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '75%' }}>
      <a href="#" style={{ textDecoration: 'none', display: 'inline-block', padding: '8px 16px' }}>&laquo; Previous</a>
      <a href="#" style={{ border: '1px solid black', padding: '2px 7px', borderRadius: '50%', textDecoration: 'none' }}>1</a>
      <a href="#" style={{ border: '1px solid black', padding: '2px 7px', borderRadius: '50%', textDecoration: 'none' }}>2</a>
      <a href="#" style={{ border: '1px solid black', padding: '2px 7px', borderRadius: '50%', textDecoration: 'none' }}>3</a>
      <a href="#" style={{ border: '1px solid black', padding: '2px 7px', borderRadius: '50%', textDecoration: 'none' }}>4</a>
      <a href="#" style={{ border: '1px solid black', padding: '2px 7px', borderRadius: '50%', textDecoration: 'none' }}>5</a>
      <a href="#" style={{ textDecoration: 'none', display: 'inline-block', padding: '8px 16px' }}>Next &raquo;</a>
    </div>
  );
}

export default BookNavBar;