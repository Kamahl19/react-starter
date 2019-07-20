import { createBrowserHistory } from 'history';
import { wrapHistory } from 'oaf-react-router';

const history = createBrowserHistory();

wrapHistory(history);

export default history;
