import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { show, connectModal } from 'redux-modal';
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';

const MODAL_ID = 'WELCOME_MODAL';

const WelcomeScreen = ({ show }) => (
  <div>
    <h1>Welcome</h1>
    <Button type="primary" onClick={() => show(MODAL_ID)}>
      Open modal
    </Button>
    <WelcomeModal />
  </div>
);

WelcomeScreen.propTypes = {
  show: PropTypes.func.isRequired,
};

export default connect(null, dispatch => bindActionCreators({ show }, dispatch))(WelcomeScreen);

const WelcomeModal = connectModal({ name: MODAL_ID })(({ show, handleHide }) => (
  <Modal title="Welcome Modal" visible={show} onOk={handleHide} onCancel={handleHide}>
    <p>This is a simple modal.</p>
  </Modal>
));
