import './bootstrap';
import { render } from 'react-dom';

import 'app/styles/main.css';
import Root from 'app/Root';

import reportWebVitals from './reportWebVitals';

render(
  <Root />, // TODO replace with <React.StrictMode><Root /></React.StrictMode> once Antd supports it
  document.getElementById('root')
);

// Learn more https://bit.ly/CRA-vitals
reportWebVitals(console.log);
