// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
// import 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
// import 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';

import GetMap from './pages/Maps.js';

function App() {
  return (
    <>
      <GetMap />
    </>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
