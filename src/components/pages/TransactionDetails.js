import React, { Component } from 'react';
import promisify from 'es6-promisify';

import TransactionInfoTable from '../blockchain/TransactionInfoTable';
import Entity from '../layout/Entity';

class TransactionDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  async loadData(web3, id) {
    Promise.all([
      promisify(web3.eth.getTransaction)(id),
      promisify(web3.eth.getTransactionReceipt)(id)
    ])
      .then(
        result => {
          const [tx, receipt ] = result;
          this.setState({
            tx: tx,
            receipt: receipt
          });
        }
      )
      .catch(
        error => this.setState({ error: error })
      );
  }

  componentWillReceiveProps({web3, match}) {
    this.setState({
      tx: undefined,
      receipt: undefined,
      error: undefined
    })
    this.loadData(web3, match.params.id);
  }

  componentWillMount() {
    this.componentWillReceiveProps(this.props)
  }

  renderContents = () => {
    return (
      <div className="content container">
        <h2 className="title">Transaction details</h2>
        <TransactionInfoTable tx={this.state.tx} receipt={this.state.receipt} />
      </div>
    )
  }

  render() {
    return (
      <div>
        <Entity
          entity={this.state.tx}
          error={this.state.error}
          errorMessage={`Transaction ${this.props.match.params.id} was not found`}
          render={this.renderContents}/>
      </div>
    );
  }
}

export default TransactionDetails;
