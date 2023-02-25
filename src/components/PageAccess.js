import { FormView, FormViewHide } from 'grommet-icons';
import React, { useState } from 'react';

import Modal from '../shared/react/Modal';

function PageAccess({ page }) {
  const [modalMessage, setModalMessage] = useState('');

  if (!page) {
    return null;
  }

  return (
    <>
      {page.isPublic ? (
        <FormView onClick={() => setModalMessage('This page is encrypted and public.')} color="status-warning" size="24px" />
      ) : (
        <FormViewHide onClick={() => setModalMessage('This page is encrypted and private.')} color="status-ok" size="24px" />
      )}

      <Modal show={!!modalMessage} onClose={() => setModalMessage('')}>
        {modalMessage}
      </Modal>
    </>
  );
}

export default PageAccess;
