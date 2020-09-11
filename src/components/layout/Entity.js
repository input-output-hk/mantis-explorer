import React from 'react';
import Loading from './Loading';

const Entity = ({entity, error, errorMessage, render}) => {
  if(error !== undefined || entity === null) {
    return (
      <div className="pure-alert pure-alert-error">
        {errorMessage}
      </div>
    )
  }

  if(entity === undefined) {
    return <Loading />
  }

  return render();
}

export default Entity;