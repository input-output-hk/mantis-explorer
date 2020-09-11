import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import { bigNumber, decToHex } from '../../utils/format-utils';

const translateReceiptStatusCode = statusCode => {
  switch(parseInt(statusCode, 16)) {
    case 0: return "Execution failure";
    case 1: return "Execution success";
    default: return "???";
  }
};

const TransactionInfoTable = (tx, receipt) => {
  return (
    <table className="pure-table pure-table-horizontal">
      <thead>
        <tr>
          <th colSpan="2">Hash: {tx.hash}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Block #</td>
          { tx.blockNumber ?
            (<td><Link to={`${process.env.PUBLIC_URL}/block/${tx.blockNumber}`}>{tx.blockNumber} ({decToHex(tx.blockNumber)})</Link></td>)
            : <td>Pending</td>
          }
        </tr>
        <tr>
          <td>Sender nonce</td>
          <td>{ bigNumber(tx.nonce) }</td>
        </tr>
        {tx.to && 
          <tr>
            <td>To</td>
            <td><Link to={`${process.env.PUBLIC_URL}/account/${tx.to}`}>{ tx.to }</Link></td>
        </tr>}
        {receipt && receipt.contractAddress &&
          <tr>
            <td>Contract address</td>
            <td><Link to={`${process.env.PUBLIC_URL}/account/${receipt.contractAddress}`}>{ receipt.contractAddress }</Link></td>
          </tr>
        }
        {receipt &&
          <tr>
            <td>Status code</td>
            <td>
              <span> { receipt.statusCode } : { translateReceiptStatusCode(receipt.statusCode) } </span>
            </td>
          </tr>
        }
        <tr>
          <td>value</td>
          <td>{tx.transparentValue}</td>
        </tr>
        {receipt && 
          <tr>
            <td>Gas used</td>
            <td> { receipt.gasUsed }</td>
          </tr>
        }
        <tr>
          <td>Gas price</td>
          <td>{ bigNumber(tx.gasPrice) } </td>
        </tr>
        <tr>
          <td>Gas provided</td>
          <td>{ tx.gas }</td>
        </tr>
        <tr>
          <td>Payload</td>
          <td><Input.TextArea value={tx.payload} rows={4} /></td>
        </tr>
      </tbody>
    </table>
  );
}

export default TransactionInfoTable;
