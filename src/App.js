import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes/index';
import GlobalStyle from './styles/global';

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <ToastContainer
        autoClose={3000}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
      <Routes />
    </Router>
  );
};

export default App;
