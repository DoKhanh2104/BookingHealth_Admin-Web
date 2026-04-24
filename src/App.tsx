import { CssBaseline, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { theme } from './theme';
import { router } from './app/router/router';
import { I18nProvider } from './libs/i18n.hooks';

import { ja } from './assets/locales/ja';

const messages = {
  ja,
};

const App = () => {
  return (
    <>
      <I18nProvider messages={messages}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </I18nProvider>
    </>
  );
};

export default App;
