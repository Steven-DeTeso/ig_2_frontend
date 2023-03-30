import "../styles.css";
import AuthContext from "../src/components/AuthContext";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default MyApp;
