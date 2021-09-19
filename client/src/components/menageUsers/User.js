import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import UserModal from './UserModal';
import { Button, Modal } from 'semantic-ui-react';

function modalReducer(state, action) {
  switch (action.type) {
    case 'close':
      return { open: false };
    case 'open':
      return { open: true, size: action.size };
    default:
      throw new Error('Unsupported action...');
  }
}

const User = ({ user: { _id, name, email, status, date } }) => {
  const [state, dispatch] = React.useReducer(modalReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;

  const [ modalProcess, setModalProcess ] = useState('');

  const modalContents = {
    EDIT: 'Edit',
    BLOCK: 'Block',
    DELETE: 'Delete',
  }

  const runOnClick = (process) =>{
    dispatch({ type: 'open', size: 'small' });
    setModalProcess(process);
  }

  return (
    <Fragment>
      <div className="ui card">
        <div className="content">
          <div className="header">{name}</div>
        </div>
        <div className="content">
          <div className="ui small feed">
            <div className="event">
              <div className="content">
                <div className="summary">{email}</div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="summary">Status: {status}</div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="summary">
                  Registered on: {date.substring(0, 10)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="extra content">
          <Button 
            className="ui blue button"
            onClick={() => runOnClick(modalContents.EDIT)}
          >Edit</Button>
          <Button 
            className="ui yellow button"
            onClick={() => runOnClick(modalContents.BLOCK)}
          >Block</Button>
          <Button 
            className="ui red button"
            onClick={() => runOnClick(modalContents.DELETE)}
            >Delete</Button>
        </div>
      </div>
      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: 'close' })}
      >
        <UserModal dispatch={dispatch} modalProcess={modalProcess} _id={_id} name={name} />
      </Modal>
    </Fragment>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
};

export default User;
