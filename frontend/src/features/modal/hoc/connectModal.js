import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showModal, hideModal, selectIsVisible } from '../ducks';
import { selectIsInProgress } from '../../../features/spinner/ducks';

export default id => ModalComponent =>
  connect(
    state => ({
      isVisible: selectIsVisible(state, id),
      isLoading: selectIsInProgress(state, id),
    }),
    dispatch => ({
      modalActions: bindActionCreators(
        {
          show: () => showModal({ id }),
          hide: () => hideModal(id),
        },
        dispatch
      ),
    })
  )(props => <ModalComponent {...props} />);
