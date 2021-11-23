import { AppProps } from 'next/app';
import Head from 'next/head';
import '@/styles/FontAwesome/css/fontawesome.css';
import '@/styles/components/index.scss';
import 'suneditor/dist/css/suneditor.min.css';
import 'react-notifications/lib/notifications.css';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>CMS - Conexão DNIT</title>
        {/* Fonte Rawline */}
        <link
          rel="stylesheet"
          href="https://cdn.dsgovserprodesign.estaleiro.serpro.gov.br/design-system/fonts/rawline/css/rawline.css"
        />
        {/* Fonte Raleway */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,600,700,800,900&amp;display=swap"
        />
        {/* Fontawesome */}
        {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" /> */}
      </Head>
      <Component {...pageProps} />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme={'colored'}
        newestOnTop
        closeOnClick
        rtl={false}
        draggable={false}
        pauseOnHover
      />
    </>
  );
}

export default appWithTranslation(MyApp);
