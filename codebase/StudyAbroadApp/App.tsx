import React from 'react';
import Routes from './src/routes/Routes';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true);

function App(): React.JSX.Element {
  return (
    <Routes />
  );
}

export default App;
