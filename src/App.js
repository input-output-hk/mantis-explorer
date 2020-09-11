import React, { useState, useEffect } from 'react';

import 'purecss/build/pure-min.css';
import 'purecss/build/grids-responsive-min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

import { Web3Context, asyncWeb3 } from './web3-provider';
import { Router } from './components/pages/Router';

const App = () => {

  const [ state, setState ] = useState(null);

  useEffect(() => { 
    async function loadWeb3Effect() {
      try {
        console.info("[App::useEffect::loadWeb3Effect] Loading web3");
        const web3 = await asyncWeb3;
        setState({
          web3
        });
      } catch (error) {
        console.error("[App::useEffect::loadWeb3Effect]", error);
        setState(null);
      }
    }
    loadWeb3Effect();
  }, [])

  return (
    <Web3Context.Provider value={{ web3: state && state.web3 }}>
      <Router />
    </Web3Context.Provider>
  );
}

export default App;
