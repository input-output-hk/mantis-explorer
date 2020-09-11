import React, { Component } from 'react';
import Loading from '../layout/Loading';
import promisify from 'es6-promisify';
import { Link } from 'react-router-dom';

const StatusTable = ({latestBlockNumber, latestCheckpointBlockNumber, node, network, host, isConnected}) => {
  return (
    <table className="pure-table pure-table-horizontal">
      <tbody>
        <tr>
            <td>Latest Block Number</td>
            <td><Link to={`${process.env.PUBLIC_URL}/block/${latestBlockNumber}`}>{latestBlockNumber || '???'}</Link></td>
        </tr>
        <tr>
            <td>Latest Checkpoint Block Number</td>
            <td><Link to={`${process.env.PUBLIC_URL}/block/${latestCheckpointBlockNumber}`}>{latestCheckpointBlockNumber || '???'}</Link></td>
        </tr>
        <tr>
            <td>Node</td>
            <td>mantis</td>
        </tr>
        <tr>
            <td>Network</td>
            <td>{network}</td>
        </tr>
        <tr>
            <td>Host</td>
            <td>{host}</td>
        </tr>
      </tbody>
    </table>
  )
}

class Status extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  async loadStatus(web3) {
    const [latestBlock, latestCheckpoint, node, network, host] = await Promise.all([
      promisify(web3.eth.getBlock)('latest'),
      promisify(web3.eth.getBlock)('latestCheckpoint'),
      promisify(web3.version.getNode)(),
      promisify(web3.version.getNetwork)(),
      Promise.resolve(web3.currentProvider.host)
    ]);
    this.setState({
      status: {
        latestBlockNumber: latestBlock && latestBlock.number,
        latestCheckpointBlockNumber: latestCheckpoint && latestCheckpoint.number,
        node,
        network,
        host
      }
    })
  }

  componentWillMount() {
    this.loadStatus(this.props.web3);
  }

  render() {
    if(!this.state.status) return <Loading />; //FIXME Loading Here needed
    return (
      <div className="content container">
        <h2>Status</h2>
        <StatusTable {...this.state.status}/>
      </div>
    )
  }
}

export default Status;
