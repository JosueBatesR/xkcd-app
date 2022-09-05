// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
import { I18NProvider, useI18N } from "context/i18n";
import Head from "next/head";
import "../styles/globals.css";
const DefaultHeadApp = () => {
  const { t } = useI18N();
  return (
    <Head>
      <title>{t("SEO_TITLE_DEFAULT")}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
function MyApp({ Component, pageProps }) {
  return (
    // 2. Use at the root of your app
    <NextUIProvider>
      <I18NProvider>
        <DefaultHeadApp />
        <Component {...pageProps} />
      </I18NProvider>
    </NextUIProvider>
  );
}

export default MyApp;
