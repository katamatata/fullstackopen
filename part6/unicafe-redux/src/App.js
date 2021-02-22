import React from 'react';

import Header from './components/Header';
import Buttons from './components/Buttons';
import Statistic from './components/Statistic';

const App = () => {
  return (
    <div>
      <Header text='Please leave your feedback' />
      <Buttons />
      <Statistic />
    </div>
  );
};

export default App;
