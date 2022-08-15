import { Head, Html, Main, NextScript } from 'next/document';
// import NextProgress from 'next-progress';

const AppDocument = () => {
  const progressConfig = {
    showSpinner: true,
    easing: 'ease',
    speed: 500,
    minimum: 0.1,
  };

  return (
    <Html data-theme={'light'} lang={'en'}>
      <Head></Head>

      <body>
        {/* <NextProgress
          delay={300}
          height={'3px'}
          color={'#ef9b1d'}
          options={progressConfig}
        /> */}
        <Main />
        <div id="app-root" />
        <NextScript />
      </body>
    </Html>
  );
};

export { AppDocument as default };