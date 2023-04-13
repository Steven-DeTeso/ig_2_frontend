import { useState, useEffect } from "react";
import { AuthContext } from "../src/components/AuthContext";
import "../styles.module.css";
import { getAuthData } from "../src/utils/auth";

function MyApp({ Component, pageProps }) {
  const [authData, setAuthData] = useState(null);

  useEffect(() => {
    const data = getAuthData();
    console.log(`_app.js getAuthData: ${JSON.stringify(data)}`);
    setAuthData(data);
  }, []);

  console.log(`_app.js ${authData}`);

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default MyApp;
