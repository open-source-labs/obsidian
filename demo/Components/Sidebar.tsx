import React from 'https://dev.jspm.io/react@16.13.1';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      button: any;
      div: any;
      h2: any;
      h5: any;
      p: any;
    }
  }
}

const Sidebar = (props: any) => {
  if (!Object.values(props.info).length)
    return (
      <div
        className='sidebar-wrapper'
        style={{
          border: '4px solid gray',
          borderRadius: '4px',
          padding: '10px',
          margin: '5px',
          height: '300px',
        }}
      >
        Choose a book!
      </div>
    );

  const {
    title,
    author,
    description,
    coverPrice,
    publicationDate,
    publisher,
  } = props.info;

  return (
    <div
      className='sidebar-wrapper'
      style={{
        border: '4px solid gray',
        borderRadius: '4px',
        padding: '10px',
        margin: '5px',
      }}
    >
      <h2 style={{ textAlign: 'center' }}>{title}</h2>
      <h5 style={{ textAlign: 'center' }}>- {author} -</h5>

      <div
        className='priceDiv'
        style={{
          border: '2px solid black',
          borderRadius: '4px',
          width: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '15px',
        }}
      >
        <p
          className='price'
          style={{ padding: '5px 0px', textAlign: 'center', margin: '0' }}
        >
          ${coverPrice}
        </p>
      </div>

      <div
        className='infoDiv'
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <p style={{ justifyContent: 'center', textAlign: 'center' }}>
          {description}
        </p>
        <p style={{ marginBottom: '0px' }}>{publisher}</p>
        <p>{publicationDate}</p>
      </div>
    </div>
  );
};

export default Sidebar;
