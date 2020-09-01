import { React } from '../deps.ts';
import Sidebar from './Components/Sidebar.jsx';

export class App extends React.Component {


  render() {

    const info = {
      title: 'Home on the Range',
      author: 'George R.R. Martin',
      description: 'A cow freak show gets zapped into another dimension. Horror, mayhem, ozone. You never know what will happen next!',
      coverPrice: 26.99,
      publicationDate: 'June 15, 2025',
      publisher: 'Liz Lotto Publishing'
    }

    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Hello World</h1>
        <div></div>
        <Sidebar info={info}/>
      </div>
    )
  }
}