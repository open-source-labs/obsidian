import React from 'https://dev.jspm.io/react@16.13.1';
import Sidebar from './Components/Sidebar.tsx';
import BookNavBar from './Components/BookNavBar.tsx';
import Carousel from './Components/Carousel.tsx';
import CartBtn from './Components/CartBtn.tsx';
import {
  mainContainerStyle,
  headerStyle,
  sideBarStyle,
  appContainerStyle,
  carouselAndSidebarStyle,
  navContainerStyle,
  carouselStyle,
} from './style.ts';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [key: string]: any;
      button: any;
      div: any;
      h1: any;
      p: any;
    }
  }
}

const book1 = {
  title: 'Home on the Strange',
  author: 'George R.R. Martin',
  description:
    'A cow freak show gets zapped into another dimension. Horror, mayhem, ozone. You never know what will happen next!',
  coverPrice: 26.99,
  publicationDate: 'June 15, 2025',
  publisher: 'Liz Lotto Publishing',
};

const book2 = {
  title: "Let's Go!",
  author: 'Jeho',
  description: 'There has never been a motivator like this motivator.',
  coverPrice: 4.99,
  publicationDate: 'December 4, 1990',
  publisher: 'Liz Lotto Publishing',
};

const App = () => {
  const [info, setInfo] = (React as any).useState(book1);
  const [books, setBooks] = (React as any).useState([]);

  (React as any).useEffect(() => {
    fetch('https://rickandmortyapi.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `{ characters { results { id name species image } }}`,
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setBooks([...resp.data.characters.results]);
      });
  }, []);

  return (
    <div style={mainContainerStyle}>
      <h1 style={headerStyle}>Burak's Book Bonanza</h1>
      <div style={appContainerStyle}>
        <div style={carouselAndSidebarStyle}>
          <Carousel style={carouselStyle} books={books} setInfo={setInfo}/>
          <Sidebar style={sideBarStyle} info={info} />
        </div>

        <div style={navContainerStyle}>
          <BookNavBar />
          <CartBtn />
        </div>
      </div>
    </div>
  );
};

export default App;
