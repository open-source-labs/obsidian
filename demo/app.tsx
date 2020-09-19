import React from 'https://dev.jspm.io/react@16.13.1';
import Sidebar from './Components/Sidebar.tsx';
import BookNavBar from './Components/BookNavBar.tsx';
import Carousel from './Components/Carousel.tsx';
import CartBtn from './Components/CartBtn.tsx';
import { useObsidian } from '../ObsidianWrapper/ObsidianWrapper.jsx';

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
      h1: any;
      div: any;
    }
  }
}

const App = () => {
  const [info, setInfo] = (React as any).useState({});
  const [books, setBooks] = (React as any).useState([]);
  const [page, setPage] = (React as any).useState(1);
  const { fetcher } = useObsidian();


  (React as any).useEffect(() => {
    fetcher(`{ getEightBooks(id: 1) { id title author } }`).then((resp: any) =>
      setBooks([...resp.data.getEightBooks])
    );
  }, []);

  const pageTurn = (id: any) => {
    fetcher(` query{ getEightBooks(id: ${id}) { id title  author } } `).then(
      (resp: any) => {
        setBooks([...resp.data.getEightBooks]);
        let curPage = id;
        if (curPage !== 1) curPage = (id - 1) / 8 + 1;
        setPage(curPage);
      }
    );
  };

  return (
    <div style={mainContainerStyle}>
      <h1 style={headerStyle}>Burak's Book Bonanza</h1>
      <div style={appContainerStyle}>
        <div style={carouselAndSidebarStyle}>
          <Carousel style={carouselStyle} books={books} setInfo={setInfo} />
          <Sidebar style={sideBarStyle} info={info} />
        </div>

        <div style={navContainerStyle}>
          <BookNavBar pageTurn={pageTurn} page={page} />
          <CartBtn />
        </div>
      </div>
    </div>
  );
};

export default App;
