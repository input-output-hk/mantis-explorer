import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon =
  <LoadingOutlined style={{ fontSize: 56, color: "#22543D" }} spin />;

const Loading = () => {
  return (
    <div className="container loading-container">
      <Spin indicator={antIcon} />
    </div>
  )
}

export default Loading;