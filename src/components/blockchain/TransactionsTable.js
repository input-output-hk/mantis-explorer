import React, { useState } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Pagination } from 'antd';
import { maxLength } from '../../utils/format-utils';
import Loading from '../layout/Loading';

const TransactionRow = ({tx}) => {

  return (
    <tr>
      <td>
        <Link to={`${process.env.PUBLIC_URL}/transaction/${tx.hash}`}>{maxLength(42, tx.hash)}</Link>
      </td>
    </tr>
  )
}

const TransactionsTable = ({transactions, defaultPage = 1,  sizePerPage =  50}) => {

  const [ currentPage, setCurrentPage ] = useState(defaultPage)

  const updatePage = newPage => {
    setCurrentPage(newPage);
  }

  const getPageElements = (elements, page, elementsPerPage) => {
    const fromIndexByPage = page * elementsPerPage - elementsPerPage;
    const toIndexByPage = page * elementsPerPage;
    return _.slice(elements, fromIndexByPage, toIndexByPage)
  }

  if (transactions && transactions.length === 0) {
    return (<div> No Transactions </div>);
  }

  return (
    <div className="content">
      <table className="pure-table pure-table-horizontal">
        <tbody>
          {
            getPageElements(transactions, currentPage, sizePerPage)
              .map(tx => <TransactionRow key={tx.hash} tx={tx} />)
          }
        </tbody>
      </table>
      <Pagination 
        simple
        defaultCurrent={defaultPage} 
        defaultPageSize={sizePerPage} 
        total={transactions.length} 
        onChange={updatePage}
      />
    </div>
  )
}

const AsyncTransactionsTable = ({transactions, loading, error}) => {
  if (error) {
    return (<div> Error occurred </div>);
  } else if (loading) {
    return (<Loading />);
  } else {
    return <TransactionsTable transactions={transactions} />
  }
}

export {
  TransactionsTable,
  AsyncTransactionsTable,
};
