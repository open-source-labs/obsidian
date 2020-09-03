// App Styling
export const mainContainerStyle = {
  height: '100vh',
  width: '100vw',
  backgroundColor: 'AliceBlue',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontFamily: 'Playfair Display',
};

export const headerStyle = { textAlign: 'center', padding: '8px' };

export const appContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  backgroundColor: 'Bisque',
  padding: '8px',
  height: '75vh',
  width: '90vw',
};

// Carousel Styling
export const carouselAndSidebarStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '80%',
  border: '4px solid gray',
  borderRadius: '4px',
  padding: '4px',
};
export const carouselStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridTemplateRows: 'repeat(2, 1fr)',
  backgroundColor: 'Cornsilk',

  width: '75%',
  height: '100%',
};

// Book Card Styling
export const cardStyle = {
  backgroundColor: 'rgb(48,61,67)',
  color: '#fff',
  margin: '10%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  border: '4px solid gray',
  borderRadius: '4px',
  padding: '4px',
};

export const sideBarStyle = {
  display: 'flex',
  minWidth: '200px',
  width: '25%',
  height: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: '#fff',
};

export const navContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};
