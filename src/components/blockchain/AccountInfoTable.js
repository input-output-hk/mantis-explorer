import React from 'react';
import { Input } from 'antd';
import { bigNumber } from '../../utils/format-utils';

const AccountInfoTable = ({ account }) => {
  return (
    <table className="pure-table pure-table-horizontal">
      <thead>
          <tr>
            <th colSpan="2">Address: {account.address}</th>
          </tr>
      </thead>
      <tbody>
        <tr>
            <td>balance</td>
            <td><span>{ bigNumber(account.balance) }</span></td>
        </tr>
        {account.code !== '0x' &&
          <tr>
              <td>Code</td>
              <td><Input.TextArea value={account.code} rows={4} /></td>
          </tr>
        }
      </tbody>
    </table>
  )

}

export default AccountInfoTable;
