'use strict';
import React from 'react';

import LoginModal from './login-modal';

class AuthControls extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      loginRevealed: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal () {
    this.setState({ loginRevealed: true });
  }

  closeModal () {
    this.setState({ loginRevealed: false });
  }

  render () {
    return (
      <div>
        <button title='Login' className='button button--base-plain' onClick={this.openModal}><span>Login</span></button>
        <LoginModal
          revealed={this.state.loginRevealed}
          onCloseClick={this.closeModal} />
      </div>
    );
  }
}

export default AuthControls;
