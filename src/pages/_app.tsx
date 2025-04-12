import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { Provider, useDispatch } from "react-redux";
import "../styles/app.css";
import { defaultSEO } from "../../next-seo.config";
import { WishlistProvider } from "../context/wishlist";
import Layout from "../components/Layout";
import Head from "next/head";
import store from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </Head>
      <Provider store={store}>
        <WishlistProvider>
          <Layout>
            <DefaultSeo {...defaultSEO} />
            <Component {...pageProps} />
          </Layout>
        </WishlistProvider>
      </Provider>
    </>
  );
}

export default MyApp;
