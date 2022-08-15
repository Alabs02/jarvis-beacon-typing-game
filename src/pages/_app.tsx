import type { AppProps } from 'next/app';

// GLOBALS STYLES
import '@/styles/globals.scss';
import 'animate.css/animate.min.css';
import 'material-react-toastify/dist/ReactToastify.css';

// STORE
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store';

// COMPONENTS
import { SafeHydrate, MaterialToastConfig } from '@/components/core';
import { ErrorBoundary } from '@/components/errors';

const JarvisBeaconApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div />} persistor={persistor}>
        <MaterialToastConfig />
        
        <SafeHydrate>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </SafeHydrate>
      </PersistGate>
    </Provider>
  );
}

export { JarvisBeaconApp as default };
