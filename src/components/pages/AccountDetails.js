import React, { Component } from 'react';
import promisify from 'es6-promisify';

import AccountInfoTable from '../blockchain/AccountInfoTable';
import Entity from '../layout/Entity';

class AccountDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  async loadData(web3, address) {
    Promise.all([
      promisify(web3.eth.getBalance)(address),
      promisify(web3.eth.getCode)(address)
    ])
      .then(
        accountResult => this.setState({
          account: {
            address: address,
            balance: accountResult[0],
            code: accountResult[1]
          }
        })
      )
      .catch(
        error => this.setState({ error: error })
      );
  }

  componentWillReceiveProps({web3, match}) {
    this.setState({
      account: undefined,
      error: undefined
    })
    this.loadData(web3, match.params.address);
  }

  componentWillMount() {
    this.componentWillReceiveProps(this.props)
  }

  renderContents() {
    return (
      <div className="content container">
        <h2 className="title">Account details</h2>
        <AccountInfoTable account={this.state.account}/>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Entity
          entity={this.state.account}
          error={this.state.error}
          errorMessage={`Account ${this.props.match.params.id} was not found`}
          render={this.renderContents.bind(this)}/>
      </div>
    );
  }
}

export default AccountDetails;
