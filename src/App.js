import React from 'react';
import { useRoutes } from 'react-router-dom';

import routes from './routes';

import { ConfirmProvider } from 'material-ui-confirm';

function App() {
  const routing = useRoutes(routes);
  return (
    <React.StrictMode>
    <ConfirmProvider 
    defaultOptions={{
      confirmationText: 'Yes',
      cancellationText:'No',
      title:'Are you sure ?'
    }}>
          {routing}
    </ConfirmProvider>
    </React.StrictMode>
  );
}

export default App;
