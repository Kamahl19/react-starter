import React from 'react';
import PropTypes from 'prop-types';
import BodyClassName from 'react-body-classname';

import { Row, Col } from '../../../../common/components';

import ReferralArticle from './ReferralArticle';
import Form from './Form';

const SignUp = ({ hasReferral, ...props }) => (
  <BodyClassName className="sign-up-page">
    <div className="sign-up">
      {hasReferral ? (
        <Row gutter={{ lg: 50, xl: 120 }}>
          <Col md={12}>
            <ReferralArticle />
          </Col>
          <Col md={12}>
            <Form {...props} socialButtonProps={{ span: 24 }} />
          </Col>
        </Row>
      ) : (
        <Form {...props} />
      )}
    </div>
  </BodyClassName>
);

SignUp.propTypes = {
  hasReferral: PropTypes.bool.isRequired,
};

export default SignUp;
