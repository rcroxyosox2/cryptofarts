import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import './index.css';
import App from './App';
import { AppStyle } from './styles';
import reportWebVitals from './reportWebVitals';
import { ErrorBoundry } from 'lib/bugsnag';
import ErrorScreen from 'components/ErrorScreen';
import mainTheme from './theme/main';
import store from 'redux/store';
import { Provider as RProvider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundry FallbackComponent={ErrorScreen}>
      <ThemeProvider theme={mainTheme}>
        <AppStyle />
        <RProvider store={store}>
          <App />
        </RProvider>
      </ThemeProvider>
    </ErrorBoundry>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
