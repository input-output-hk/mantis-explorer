import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import promisify from 'es6-promisify';
import BlockInfoTable from '../blockchain/BlockInfoTable';
import { TransactionsTable } from '../blockchain/TransactionsTable';
import Entity from '../layout/Entity';
import Loading from '../layout/Loading';
import { loadBlockWithTransactions } from '../../utils/blockchain-utils'

const BlockDetails = ({web3, match}) => {
  
  const [state, setState] = useState({
    loading: true,
    block: undefined,
    transactions: undefined,
    latestBlockNumber: undefined,
    error: undefined
  });

  useEffect(() => {
    setState({ loading: true });
    Promise.all([loadBlockWithTransactions(web3.eth, match.params.id), promisify(web3.eth.getBlockNumber)()])
      .then(
        result => {
          const [blockWithTransactions, latestBlockNumber] = result;
          setState({
            block: blockWithTransactions.block,
            transactions: blockWithTransactions.transactions,
            latestBlockNumber: latestBlockNumber
          });
        }
      )
      .catch(error => setState({ error: error, loading: false }));
  }, [web3, match.params.id])

  const renderButtons = (blockNumber, latestBlockNumber) => {
    const prevEnabled = blockNumber !== 0 ? "" : "pure-button-disabled"
    const nextEnabled = blockNumber !== latestBlockNumber ? "" : "pure-button-disabled"

    return (
      <div>
        <Link className={`pure-button pure-button-primary ${prevEnabled}`} to={`${process.env.PUBLIC_URL}/block/${blockNumber - 1}`}>prev</Link>
        <Link className={`pure-button pure-button-primary ${nextEnabled}`} to={`${process.env.PUBLIC_URL}/block/${blockNumber + 1}`}>next</Link>
      </div>
    )
  }

  const renderTxs = (transactions) => {
    if (transactions && (transactions.length === 0 || transactions.length === 1))
      return null
    return (
      <div className="pure-u-1-1 container">
        <h2 className="title">Transactions</h2>
        <TransactionsTable transactions={transactions} />
      </div>
    )
  } 

  const renderContent = () => {
    return (
      <div className="content container">
        {renderButtons(state.block.number, state.latestBlockNumber)}
        <div className="pure-g main-container">
          <div className="pure-u-1-1 container">
            <h2 className="title">Block details</h2>
            <BlockInfoTable block={state.block} latestBlockNumber={state.latestBlockNumber} />
          </div>
          {renderTxs(state.transactions)}
        </div>
      </div>
    )
  }

  return (
    <div>
      {state.loading ? 
        (<Loading />) : 
        (<Entity
          entity={state.block}
          error={state.error}
          errorMessage={`Block ${match.params.id} was not found`}
          render={renderContent}/>)
      }
    </div>
  );
}

export default BlockDetails;
