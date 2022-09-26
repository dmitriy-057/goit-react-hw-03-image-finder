// const Modal = () => {};
// const modalRoot = document.querySelector('#')
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalStyled } from './Modal.styled';
const modalRoot = document.querySelector('#modal-root');
export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <Overlay>
        <ModalStyled>{this.props.children}</ModalStyled>
      </Overlay>,
      modalRoot
    );
  }
}
