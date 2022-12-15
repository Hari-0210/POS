import React from 'react';
import { useRoutes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import routes from './routes';

import { ConfirmProvider } from 'material-ui-confirm';
import GlobalStyles from './components/views/common/GlobalStyle';

function App() {
  const routing = useRoutes(routes);
  return (
    <React.StrictMode>
      <SnackbarProvider >
    <ConfirmProvider 
    defaultOptions={{
      confirmationText: 'Yes',
      cancellationText:'No',
      title:'Are you sure ?'
    }}>
      <GlobalStyles/>
          {routing}
    </ConfirmProvider>
    </SnackbarProvider>
    </React.StrictMode>
  );
}

export default App;
