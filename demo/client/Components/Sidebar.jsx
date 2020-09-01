import { React } from '../../deps.ts';

const Sidebar = (props) => {
  const { title, author, description, coverPrice, publicationDate, publisher } = props.info;

  return (
    <div className='sidebar-wrapper' style={{ minWidth: '200px', width: '25%' }}> 
      <h2>{title}</h2>
      <h4>{author}</h4>

      <div className='priceDiv' style={{ border: '2px solid black', borderRadius: '4px', width: '100px', display: 'flex', justifyContent: 'center' }}>
        <p className='price' style={{ alignText: 'center' }}>${coverPrice}</p>
      </div>

      <div className='infoDiv' style={{ display: 'flex', flexDirection: 'column' }}>
        <p style={{ justifyContent: 'center' }}>{description}</p>
        <p style={{ marginBottom: '0px' }}>{publisher}</p>
        <p>{publicationDate}</p>
      </div>
    </div>
  );
}

export default Sidebar;