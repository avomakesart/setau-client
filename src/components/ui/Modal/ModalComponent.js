import React from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '50%',
    maxWidth: '100%',
    transform: 'translate(-50%, -50%)',
  },
}

export const ModalComponent = ({ children, buttonText, style, to }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }
  return (
    <>
      <button onClick={openModal} style={style} to={to}>
        {buttonText}
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {children}
      </Modal>
    </>
  )
}
