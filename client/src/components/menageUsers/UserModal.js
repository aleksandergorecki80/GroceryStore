import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Form, Select } from 'semantic-ui-react';
import { deleteUser } from '../../actions/usersActions';

const UserModal = ({ modalProcess, dispatch, deleteUser, _id, name }) => {
  const options = [
    { key: 'u', text: 'User', value: 'user' },
    { key: 'm', text: 'Moderator', value: 'moderator' },
  ]


  const onDeleteUser = (user_id) => {
    deleteUser(user_id);
    dispatch({ type: 'close' });
  }

  const deleteOrBlock = (
    <>
      <Modal.Header>{modalProcess} account</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to {modalProcess.toLowerCase()} <b>{name}</b> account</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => dispatch({ type: 'close' })}>
          No
        </Button>
        <Button positive onClick={() => onDeleteUser(_id)}>
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
        <Form.Group widths='equal'>
          <Form.Field
            control={Select}
            label='Status'
            options={options}
            placeholder='Status'
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
    }
  }
}

export default connect(null, mapDispatchToProps)(UserModal);
