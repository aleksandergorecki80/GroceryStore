import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Form } from 'semantic-ui-react';
import { deleteUser, blockUser, updateUser } from '../../actions/usersActions';
import PropTypes from 'prop-types';

const UserModal = ({
  modalProcess,
  dispatch,
  _id,
  name,
  status,
  deleteUser,
  blockUser,
  updateUser,
  isBlocked,
}) => {
  const options = [
    { key: ' ', text: '--- Select status ---', value: '' },
    { key: 'u', text: 'User', value: 'user' },
    { key: 'm', text: 'Moderator', value: 'moderator' },
  ];

  const [updatedStatus, setUpdatedStatus] = useState('');
  const formData = {
    user_id: _id,
    user: {
      status: updatedStatus
    }
  }

  const onDeleteBlockUser = (user_id) => {
    if (modalProcess === 'Block') {
      blockUser({ user_id, isBlocked });
    }
    if (modalProcess === 'Delete') {
      deleteUser(user_id);
    }
    dispatch({ type: 'close' });
  };

  const onChange = (e) => {
    setUpdatedStatus(e.target.value);
  };

  const onConfirmSelected = () => {
    if(modalProcess === 'Edit'){
      updateUser(formData);
    }
    
    dispatch({ type: 'close' });
  }

  const deleteOrBlock = (
    <>
      <Modal.Header>
        {isBlocked ? `Un${modalProcess.toLowerCase()}` : modalProcess} account
      </Modal.Header>
      <Modal.Content>
        <p>
          Are you sure you want to{' '}
          {isBlocked
            ? `un${modalProcess.toLowerCase()}`
            : modalProcess.toLowerCase()}{' '}
          <b>{name}</b> account
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => dispatch({ type: 'close' })}>
          No
        </Button>
        <Button positive onClick={() => onDeleteBlockUser(_id)}>
          Yes
        </Button>
      </Modal.Actions>
    </>
  );
  const editUser = (
    <>
      <Modal.Header>{modalProcess} account</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Group widths="equal">
              <Form.Field label="Status" control="select" onChange={onChange}>
                {options.map((element) => {
                  if(element[0]) return <option value={element.value} key={element.key} disabled={true} selected hidden>{element.text}</option>
                  return <option value={element.value} key={element.key}>{element.text}</option>
                })}

              </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => dispatch({ type: 'close' })}>
          No
        </Button>
        <Button positive onClick={() => onConfirmSelected()}>
          Yes
        </Button>
      </Modal.Actions>
    </>
  );
  return (
    <>{modalProcess && modalProcess !== 'Edit' ? deleteOrBlock : editUser}</>
  );
};

UserModal.propTypes = {
  deleteUser: PropTypes.func.isRequired,
  blockUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (user_id) => {
      dispatch(deleteUser(user_id));
    },
    blockUser: ({ user_id, isBlocked }) => {
      dispatch(blockUser({ user_id, isBlocked }));
    },
    updateUser: (formData) => {
      dispatch(updateUser(formData));
    }
  };
};

export default connect(null, mapDispatchToProps)(UserModal);
