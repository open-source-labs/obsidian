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

const App = () => {
  // const [count, setCount] = (React as any).useState(0);

  // return (
  //   <div>
  //     <h1>Hello DenoLand!</h1>
  //     <button onClick={() => setCount(count + 1)}>Click the 🦕</button>
  //     <p>You clicked the 🦕 {count} times</p>
  //   </div>
  // );

  const info = {
    title: 'Home on the Strange',
    author: 'George R.R. Martin',
    description: 'A cow freak show gets zapped into another dimension. Horror, mayhem, ozone. You never know what will happen next!',
    coverPrice: 26.99,
    publicationDate: 'June 15, 2025',
    publisher: 'Liz Lotto Publishing'
  }

  return(
  <div>
  <h1 style={{ textAlign: 'center' }}>Burak's Book Bonanza</h1>
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ height: '500px', width: '75%' }}>
        Book Carousel...
      </div>

      <div style={{ display: 'flex', minWidth: '200px', width: '25%', flexDirection: 'column', justifyContent: 'center' }}>
        <Sidebar info={info}/>
      </div>
    </div>

    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <BookNavBar />
      <div style={{ marginRight: '5%' }}>Shopping Cart</div>
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
