import React from 'react';
import { storiesOf } from '@storybook/react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { show, connectModal } from 'redux-modal';
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';

import ReduxProvider from './ReduxProvider';

const MODAL_ID = 'SIMPLE_MODAL';

const ModalWindow = connectModal({ name: MODAL_ID })(({ show, handleHide }) => (
  <Modal title="Simple Modal" visible={show} onOk={handleHide} onCancel={handleHide}>
    <p>This is a simple modal.</p>
  </Modal>
));

storiesOf('Modal', module)
  .addDecorator(story => <ReduxProvider story={story()} />)
  .add('Simple', () =>
    connect(undefined, dispatch => bindActionCreators({ show }, dispatch))(({ show }) => (
      <div>
        <Button type="primary" onClick={() => show(MODAL_ID)}>
          Open modal
        </Button>
        <ModalWindow />
      </div>
    ))
  );
