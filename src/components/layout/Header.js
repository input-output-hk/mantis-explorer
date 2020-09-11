import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchStr: ""
    }
  }

  updateSearchStr = (event) => {
    this.setState({
      searchStr: event.target.value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSearch(this.state.searchStr);
  }

  render() {
    return (
      <div className="header">

        <div className="home-menu pure-g pure-menu-fixed pure-menu-horizontal" id="menu">
          <div className="pure-u-1 pure-u-md-1-2">
            <div className="pure-menu">
              <ul className="pure-menu-list">
                <li className="pure-menu-item">
                  <a href={`${process.env.PUBLIC_URL}/`} className="pure-menu-link title"> Mantis Explorer </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pure-u-1 pure-u-md-1-2">
              <div className="pure-menu header-align-right">
                  <ul className="pure-menu-list header-nav-search">
                      <li className="pure-menu-item"><Link className="pure-menu-link" to={`${process.env.PUBLIC_URL}/`}>Home</Link></li>
                      <li className="pure-menu-item"><Link className="pure-menu-link" to={`${process.env.PUBLIC_URL}/status`}>Status</Link></li>
                      <li className="pure-menu-item">
                        <form onSubmit={event => this.onSubmit(event)}>
                          <input id="search-box" name="q" size="40" type="text" placeholder="Tx Hash, Address, or Block #" onChange={event => this.updateSearchStr(event)}/>
                          <input id="search-btn" value="Search" type="submit"/>
                        </form>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
      </div>
    )
  }
}

export default Header;