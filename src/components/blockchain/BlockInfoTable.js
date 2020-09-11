import React from 'react';
import { Link } from 'react-router-dom';
import {
    bigNumber,
    decToHex,
    formatTimestamp,
    isCheckpointBlock,
    hexToAscii
} from '../../utils/format-utils';

const BlockInfoTable = ({ block, latestBlockNumber }) => {
  return (
    <table className="container pure-table pure-table-horizontal">
      <tbody>
        <tr>
            <td>Number</td>
            <td>{block.number} ({decToHex(block.number)}) </td>
        </tr>
        <tr>
            <td>Hash</td>
            <td><Link to={`${process.env.PUBLIC_URL}/block/${block.hash}`}>{block.hash}</Link></td>
        </tr>
        <tr>
            <td>Received time</td>
            <td>
                { formatTimestamp(block.timestamp) }
            </td>
        </tr>
        <tr>
          <td>Confirmations</td>
          <td><span>{ latestBlockNumber - block.number }</span></td>
        </tr>
        <tr>
            <td>Checkpointed?</td>
            <td>{ isCheckpointBlock(block) ? 'Yes' : 'No' }</td>
        </tr>
        <tr>
            <td>Difficulty</td>
            <td>
                { bigNumber(block.difficulty) }
            </td>
        </tr>
        <tr>
            <td>Transactions</td>
            <td>{ block.transactions.length > 0 ? block.transactions.length - 1: block.transactions.length }</td>
        </tr>
        <tr>
            <td>Size</td>
            <td>{ block.size} bytes</td>
        </tr>
        <tr>
            <td>Gas limit</td>
            <td>{ bigNumber(block.gasLimit) }</td>
        </tr>
        <tr>
            <td>Gas used</td>
            <td>{ bigNumber(block.gasUsed) }</td>
        </tr>
        <tr>
            <td>Data</td>
            <td>{ hexToAscii(block.extraData) }</td>
        </tr>
        <tr>
            <td>Transactions root hash</td>
            <td>{ block.transactionsRoot }</td>
        </tr>
        <tr>
            <td>State root hash</td>
            <td>{ block.stateRoot  }</td>
        </tr>
        <tr>
            <td>Parent hash</td>
            <td><Link to={`${process.env.PUBLIC_URL}/block/${block.parentHash}`}>{block.parentHash}</Link></td>
        </tr>
      </tbody>
  </table>
  )

}

export default BlockInfoTable;
