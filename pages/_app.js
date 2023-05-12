import { UserProvider } from "../src/context/userContext";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
export default MyApp;
