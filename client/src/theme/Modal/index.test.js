import React, { useState } from 'react';
import {
  AppStructure,
  render,
  screen,
  userEvent,
  fireEvent,
  waitFor,
  within,
} from 'testHelpers';
import {
  Form,
  Modal,
  ModalStyles,
} from '../';

describe('Modal', () => {

  const Component = (props) => {
    const [isOpen, openModal] = useState(false);
    const { onModalClose, ...restOfProps} = props;
    const toggleModal = () => {
      openModal(!isOpen);
    };
    return (
      <>
        <Modal isOpen={isOpen} {...restOfProps} onModalClose={()=>{
          toggleModal();
          onModalClose();
        }}>
          <h1>modal header text</h1>
          <button>Hello there world</button>
        </Modal>
        <button onClick={toggleModal}>toggle modal</button>
      </>
    )
  }

  Component.defaultProps = {
    onModalClose: () => null,
  }

  it('can render', async () => {
    render(<Component />)
    const button = screen.getByRole('button', {
      name: /toggle modal/i
    })
    userEvent.click(button);
    const modal = await screen.findByRole('dialog');
    const modalHeader = within(modal).getByRole('heading', {
      name: /modal header text/i
    });

    expect(modal).toBeInTheDocument();
    expect(modalHeader).toBeInTheDocument();
  });

  it('can close', async () => {
    render(<Component />)
    const button = screen.getByRole('button', {
      name: /toggle modal/i
    })
    userEvent.click(button);
    const modal = await screen.findByRole('dialog');
    const closeBt = screen.getByRole('button', {
      name: /close/i
    });
    userEvent.click(closeBt);
    return waitFor(() => expect(modal).not.toBeInTheDocument());
  });

  it('tab only in context of the modal', async () => {
    render(<Component />)
    const button = screen.getByRole('button', {
      name: /toggle modal/i
    })
    userEvent.click(button);
    const closeBt = screen.getByRole('button', {
      name: /close/i
    });
    const modal = await screen.findByRole('dialog');
    expect(document.activeElement.innerHTML).toBe('Hello there world');
    userEvent.tab();
    expect(document.activeElement).toBe(closeBt);
    userEvent.tab({shift: true});
    expect(document.activeElement.innerHTML).toBe('Hello there world');
  });

  it('can close by typing the esc key', async () => {
    const closeFn = jest.fn();
    render(<Component onModalClose={closeFn} />)
    const button = screen.getByRole('button', {
      name: /toggle modal/i
    })
    userEvent.click(button);
    const modal = await screen.findByRole('dialog');
    //userEvent.type(modal, '{esc}') works, but doesnt add coverage
    fireEvent.keyDown(modal, { key: Form.KEYCODES.ESC.key });
    expect(closeFn).toHaveBeenCalledTimes(1);
    return waitFor(() => expect(modal).not.toBeInTheDocument());
  });

  it('will not close by typing esc if !escToClose', async () => {
    const closeFn = jest.fn();
    render(<Component onModalClose={closeFn} escToClose={false} />)
    const button = screen.getByRole('button', {
      name: /toggle modal/i
    })
    userEvent.click(button);
    const modal = await screen.findByRole('dialog');
    //userEvent.type(modal, '{esc}') works, but doesnt add coverage
    fireEvent.keyDown(modal, { key: Form.KEYCODES.ESC.key });
    expect(closeFn).not.toHaveBeenCalled();
  });

  it('can close by clicking the background', async () => {
    render(<Component />)
    const button = screen.getByRole('button', {
      name: /toggle modal/i
    })
    userEvent.click(button);
    const modal = await screen.findByRole('dialog');
    userEvent.click(modal);
    return waitFor(() => expect(modal).not.toBeInTheDocument());
  });

  it('will not close by clicking bg if !bgClickToClose', async () => {
    render(<Component bgClickToClose={false}/>)
    const button = screen.getByRole('button', {
      name: /toggle modal/i
    })
    userEvent.click(button);
    const modal = await screen.findByRole('dialog');
    userEvent.click(modal);
    return waitFor(() => expect(modal).toBeInTheDocument());
  });
})