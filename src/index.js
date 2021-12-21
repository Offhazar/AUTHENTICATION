import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { AuthContextProvaider } from './store/auth-context';

ReactDOM.render(
  <AuthContextProvaider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvaider>,
  document.getElementById('root')
);
