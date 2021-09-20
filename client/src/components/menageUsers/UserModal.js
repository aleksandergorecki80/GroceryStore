import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Form, Select } from 'semantic-ui-react';
import { deleteUser, blockUser } from '../../actions/usersActions';

const UserModal = ({
  modalProcess,
  dispatch,
  _id,
  name,
  deleteUser,
  blockUser,
  isBlocked
}) => {
  const options = [
    { key: 'u', text: 'User', value: 'user' },
    { key: 'm', text: 'Moderator', value: 'moderator' },
  ];

  const onDeleteBlockUser = (user_id) => {
    if (modalProcess === 'Block') {
      blockUser({user_id, isBlocked});
    }
    if (modalProcess === 'Delete') {
      deleteUser(user_id);
    }
    dispatch({ type: 'close' });
  };

  const deleteOrBlock = (
    <>
      {/* <Modal.Header>{modalProcess} account</Modal.Header> */}
      <Modal.Header>{ isBlocked ? `Un${modalProcess.toLowerCase()}` : modalProcess} account</Modal.Header>
      <Modal.Content>
        <p>
          Are you sure you want to {isBlocked ? `un${modalProcess.toLowerCase()}` : modalProcess.toLowerCase()} <b>{name}</b>{' '}
          account
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
            <Form.Field
              control={Select}
              label="Status"
              options={options}
              placeholder="Status"
            />
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => dispatch({ type: 'close' })}>
          No
        </Button>
        <Button positive onClick={() => dispatch({ type: 'close' })}>
          Yes
        </Button>
      </Modal.Actions>
    </>
  );

  return (
    <>{modalProcess && modalProcess !== 'Edit' ? deleteOrBlock : editUser}</>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (user_id) => {
      dispatch(deleteUser(user_id));
    },
    blockUser: ({user_id, isBlocked}) => {
      dispatch(blockUser({user_id, isBlocked}));
    },
  };
};

export default connect(null, mapDispatchToProps)(UserModal);
