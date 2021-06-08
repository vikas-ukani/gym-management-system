import "antd/dist/antd.css";
import "../styles/globals.css";
import DefaultLayout from "Layouts/DefaultLayout";
import store from "store";
import { Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
// import { ThemeProvider } from 'styled-components'
// import { defaultTheme, primaryTheme } from "constants/ThemeColors";
function MyApp({ Component, pageProps }) {
  // const theme = {
  //   ...defaultTheme,
  //   ...primaryTheme
  // }

  return (
    // <ThemeProvider theme={theme}>
    <Provider store={store}>
      <ToastProvider>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </ToastProvider>
    </Provider>
    // </ThemeProvider>
  );
}

export default MyApp;
