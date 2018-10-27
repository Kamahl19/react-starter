import React from 'react';

import { Row } from '../../src/common/components';

const styles = {
  margin: 20,
};

const EnhancedRow = props => <Row style={styles} {...props} />;

EnhancedRow.Decorator = story => <EnhancedRow>{story()}</EnhancedRow>;

export default EnhancedRow;
