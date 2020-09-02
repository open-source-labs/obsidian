import { React } from '../deps.ts';

const Sidebar = (props) => {
  const { title, author, description, coverPrice, publicationDate, publisher } = props.info;

  return (
    <div className='sidebar-wrapper' style={{ border: '4px solid gray', borderRadius: '4px', padding: '10px', margin: '5px' }}> 
      <h2 style={{ textAlign: 'center' }}>{title}</h2>
      <h4 style={{ textAlign: 'center' }}>{author}</h4>

      <div className='priceDiv' style={{ border: '2px solid black', borderRadius: '4px', width: 'auto', display: 'flex', justifyContent: 'center' }}>
        <p className='price' style={{ alignText: 'center' }}>${coverPrice}</p>
      </div>

      <div className='infoDiv' style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <p style={{ justifyContent: 'center' }}>{description}</p>
        <p style={{ marginBottom: '0px' }}>{publisher}</p>
        <p>{publicationDate}</p>
      </div>
    </div>
  );
}

export default Sidebar;