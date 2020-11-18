import React from 'react';
import { Link } from 'react-router-dom';
import { 
  maxLength,
  isCheckpointBlock,
  formatTimestamp
} from '../../utils/format-utils';
import { bigNumber } from '../../utils/format-utils';
import Loading from '../layout/Loading';

const BlockRow = ({block}) => {
  return (
    <tr>
        <td>
          <Link to={`${process.env.PUBLIC_URL}/block/${block.number}`}>{block.number}</Link>
        </td>
        <td>
          <Link to={`${process.env.PUBLIC_URL}/block/${block.hash}`}>{maxLength(10, block.hash)}</Link>
        </td>
        <td>{isCheckpointBlock(block) ? 'Yes' : 'No'}</td>
        <td>{bigNumber(block.difficulty)}</td>
        <td>{block.gasUsed}</td>
        <td>{block.transactions.length}</td>
        <td>{block.uncles.length}</td>
        <td>{formatTimestamp(block.timestamp)}</td>
    </tr>
  )
}

const BlocksTable = ({blocks}) => {
  if (blocks && blocks.length === 0) {
    return (<div> No blocks </div>);
  }
  return (
    <table className="pure-table pure-table-horizontal">
      <thead>
        <tr>
          <th><strong>#</strong></th>
          <th>Hash</th>
          <th>Checkpointed?</th>
          <th>Difficulty</th>
          <th>Gas used</th>
          <th>Txs</th>
          <th>Uncles</th>
          <th>Received time</th>
        </tr>
      </thead>
      <tbody>
        {blocks.map(block => <BlockRow key={block.hash} block={block} />)}
      </tbody>
    </table>
  );
}

const AsyncBlocksTable = ({blocks, loading, error}) => {
  if (error) {
    return (<div> Error occurred </div>);
  } else if (loading) {
    return (<Loading />);
  } else {
    return <BlocksTable blocks={blocks} />
  }
}

export {
  BlocksTable,
  AsyncBlocksTable,
}