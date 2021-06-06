import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import './index.css';
import App from './App';
import { AppStyle } from './styles';
import reportWebVitals from './reportWebVitals';
import { Provider } from './store';
import mainTheme from './theme/main';

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <ThemeProvider theme={mainTheme}>
        <AppStyle />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
