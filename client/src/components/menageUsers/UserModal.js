import React from 'react';
import { Button, Modal, Form, Select } from 'semantic-ui-react';

const UserModal = ({ modalProcess, dispatch }) => {
  const options = [
    { key: 'u', text: 'User', value: 'user' },
    { key: 'm', text: 'Moderator', value: 'moderator' },
  ]

  const deleteOrBlock = (
    <>
      <Modal.Header>{modalProcess} account</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to {modalProcess.toLowerCase()} account</p>
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

export default UserModal;
