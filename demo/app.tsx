import React from "https://dev.jspm.io/react@16.13.1";
import Sidebar from './Components/Sidebar.tsx';
import BookNavBar from './Components/BookNavBar.tsx';

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
  description: 'A cow freak show gets zapped into another dimension. Horror, mayhem, ozone. You never know what will happen next!',
  coverPrice: 26.99,
  publicationDate: 'June 15, 2025',
  publisher: 'Liz Lotto Publishing'
}

const book2 = {
  title: 'Let\'s Go!',
  author: 'Jeho',
  description: 'There has never been a motivator like this motivator.',
  coverPrice: 4.99,
  publicationDate: 'December 4, 1990',
  publisher: 'Liz Lotto Publishing'
}

const App = () => {
  const [info, setInfo] = (React as any).useState({});
  const [books, setBooks] = (React as any).useState([book1, book2]);

  // (React as any).useEffect(() => {
  //   setInfo(book2);
  // })

  // return (
  //   <div>
  //     <h1>Hello DenoLand!</h1>
  //     <button onClick={() => setCount(count + 1)}>Click the 🦕</button>
  //     <p>You clicked the 🦕 {count} times</p>
  //   </div>
  // );

  return(
  <div>
  <h1 style={{ textAlign: 'center' }}>Burak's Book Bonanza</h1>
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ height: '500px', width: '75%' }}>
        Book Carousel...
        <button onClick={() => setInfo(books[0])}>Book 1</button>
        <button onClick={() => setInfo(books[1])}>Book 2</button>
      </div>

      <div style={{ display: 'flex', minWidth: '200px', width: '25%', flexDirection: 'column', justifyContent: 'center' }}>
        <Sidebar info={info}/>
      </div>
    </div>

    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <BookNavBar />
      <div style={{ marginRight: '10%' }}>
        <button type="button" className="btn btn-outline-primary">
          <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-cart3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>
  );
};
/*

// the clock's state has one field: The current time, based upon the
// JavaScript class Date
type ClockState = {
  time: Date
}

// Clock has no properties, but the current state is of type ClockState
// The generic parameters in the Component typing allow to pass props
// and state. Since we don't have props, we pass an empty object.
export class App extends (React as any).Component<{}, ClockState> {

  // The tick function sets the current state. TypeScript will let us know
  // which ones we are allowed to set.
  tick() {
    this.setState({
      time: new Date()
    });
  }

  // Before the component mounts, we initialise our state
  componentWillMount() {
    this.tick();
  }

  // After the component did mount, we set the state each second.
  componentDidMount() {
    setInterval(() => this.tick(), 1000);
  }

  // render will know everything!
  render() {
    return <p>The current time is {this.state.time.toLocaleTimeString()}</p>
  }
}
*/
/*

type AppState = {
  counter: integer
}

class App extends React.Component<{}, AppState> {

  componentDidMount() {

  }

  incrementCounter() {
    this.setState(state => {
      const newState = Object.assign({}, state);
      newState.counter++;
      return newState;
    });
  }

  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <p>{this.state.counter}</p>
        <button onClick={this.incrementCounter} >Increase the number!</button>
      </div>
    );
  }
}

*/

export default App;
