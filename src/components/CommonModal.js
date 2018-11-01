import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const CommonModal = ({ children, isOpen, toggle, togglePrimary, toggleSecondary, className, centered, message, modalTitle, primaryTitle, secondaryTitle, ...props }) => (
  <Modal {...props} isOpen={isOpen } toggle={toggle || null} className={className || null} centered={centered || null}>
    {modalTitle ? <ModalHeader toggle={toggle || null}>{modalTitle}</ModalHeader> : null}
    <ModalBody>
      {message || children || null }
    </ModalBody>
    <ModalFooter>
      {primaryTitle ? <Button color="primary" onClick={togglePrimary || toggle || null}>{primaryTitle}</Button> : null}
      {secondaryTitle ? <Button color="secondary" onClick={toggleSecondary || null}>{secondaryTitle}</Button> : null}
    </ModalFooter>
  </Modal>
)

export default CommonModal