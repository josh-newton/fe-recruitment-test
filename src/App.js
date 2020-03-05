import { h, render } from 'preact';

import Hero from './components/Hero/';
import Grid from './components/Grid/';

const App = () => {

  return (
    <div className="App">
      <Hero />
      <Grid />
    </div>
  );
};

export default App;
