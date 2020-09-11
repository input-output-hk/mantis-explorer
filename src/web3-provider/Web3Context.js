import React, { useContext } from 'react';

const Web3Context = React.createContext({ web3: {}});

const withWeb3 = (ComponentToWrap) => (props) => {
  const context = useContext(Web3Context);
  const { web3 } = context;
  return <ComponentToWrap web3={web3} {...props} />;
}

export { Web3Context, withWeb3 };
