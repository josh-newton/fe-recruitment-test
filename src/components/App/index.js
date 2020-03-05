import { h, render } from 'preact';

import Hero from '../Hero/';
import Grid from '../Grid/';

const App = () => {

  return (
    <div className="App">
      <Hero />
      <Grid />
    </div>
  );
  
};

export default App;
