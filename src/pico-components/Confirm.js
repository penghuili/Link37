import React from 'react';
import { Button } from './Button';
import { Modal } from './Modal';

function Confirm({ message, show, onClose, onConfirm }) {
  return (
    <Modal show={show} onClose={onClose}>
      <p>{message}</p>

      <footer>
        <Button onClick={onClose} label="Close" color="brand" margin="0 1rem 0 0" />
        <Button
          label="Confirm"
          onClick={() => {
            onConfirm();
            onClose();
          }}
          primary
          color="brand"
        />
      </footer>
    </Modal>
  );
}

export default Confirm;
