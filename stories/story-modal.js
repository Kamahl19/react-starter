import React from 'react';
import { storiesOf } from '@storybook/react';
import { connect } from 'react-redux';
import { show, connectModal } from 'redux-modal';

import { Modal, Button } from '../src/common/components';
import { ReduxDecorator, Row } from './addons';

const MODAL_ID = 'SIMPLE_MODAL';

const ModalWindow = connectModal({ name: MODAL_ID })(({ show, handleHide }) => (
  <Modal title="Simple Modal" visible={show} onOk={handleHide} onCancel={handleHide}>
    <p>This is a simple modal.</p>
  </Modal>
));

const Demo = ({ show }) => (
  <Row>
    <Button type="primary" onClick={() => show(MODAL_ID)}>
      Open modal
    </Button>
    <ModalWindow />
  </Row>
);

const DemoContainer = connect(
  undefined,
  { show }
)(Demo);

storiesOf('Modal', module)
  .addDecorator(ReduxDecorator)
  .add('Simple', () => <DemoContainer />);
