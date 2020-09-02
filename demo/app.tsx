import React from "https://dev.jspm.io/react@16.13.1";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [key: string]: any;
    }
  }
}

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
