import { React } from '../deps.ts';
import Sidebar from './Components/Sidebar.jsx';
import BookNavBar from './Components/BookNavBar.jsx';
// import Cache from './Cache/cache.jsx';

export class App extends React.Component {
  render() {
    const info = {
      title: 'Home on the Strange',
      author: 'George R.R. Martin',
      description:
        'A cow freak show gets zapped into another dimension. Horror, mayhem, ozone. You never know what will happen next!',
      coverPrice: 26.99,
      publicationDate: 'June 15, 2025',
      publisher: 'Liz Lotto Publishing',
    };

    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Burak's Book Bonanza</h1>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ height: '500px', width: '75%' }}>
              {/* <Cache /> */}
              hello
            </div>

            <div
              style={{
                display: 'flex',
                minWidth: '200px',
                width: '25%',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Sidebar info={info} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <BookNavBar />
            <div style={{ marginRight: '5%' }}>Shopping Cart</div>
          </div>
        </div>
      </div>
    );
  }
}
