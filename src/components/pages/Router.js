import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { withWeb3 } from '../../web3-provider';
import Header from '../layout/Header';
import { 
  getStringType,
  TRANSACTION,
  ADDRESS,
  BLOCK
} from '../../utils/search-utils';
import Main from './Main';
import BlockDetails from './BlockDetails';
import AccountDetails from './AccountDetails';
import TransactionDetails from './TransactionDetails';
import { Layout } from 'antd';

export const Router = withWeb3(({ web3 }) => {
  
  const onSearch = (searchStr) => {
    // FIXME Handle this with the router
    switch(getStringType(searchStr)) {
      case TRANSACTION:
        window.location = `${process.env.PUBLIC_URL}/transaction/${searchStr}`;
        break;
      case BLOCK:
        window.location = `${process.env.PUBLIC_URL}/block/${searchStr}`;
        break;
      case ADDRESS:
        window.location = `${process.env.PUBLIC_URL}/account/${searchStr}`;
        break;
      default:
        break;
    }
  }

  // TODO: Refactor to avoid passing web3 to other components
  return (
    <BrowserRouter>
      <Layout>
      <div className="app">
        <Header key="header" onSearch={onSearch} />
        <main key="body">
          <div className="content-wrapper">
            <div className="content">
              { web3 &&
                <Switch>
                  <Route exact path={`${process.env.PUBLIC_URL}/`} render={(_) => <Main web3={web3}/>}/>
                  <Route path={`${process.env.PUBLIC_URL}/block/:id`} render={(props) => <BlockDetails {...props} web3={web3}/>}/>
                  <Route path={`${process.env.PUBLIC_URL}/account/:address`} render={(props) => <AccountDetails {...props} web3={web3}/>}/>
                  <Route path={`${process.env.PUBLIC_URL}/transaction/:id`} render={(props) => <TransactionDetails {...props} web3={web3}/>}/>
                </Switch>
              }
            </div>
          </div>
        </main>
      </div>
      </Layout>

    </BrowserRouter>
  )
});
