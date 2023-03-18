import appFirebase from "@/firebase";
import "@/styles/globals.css";
import UserContext from "@/utils/UserContext";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const Router = useRouter();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    // console.log("tes dari appjs");
    const provider = new GoogleAuthProvider();
    const auth = getAuth(appFirebase);
    auth.onAuthStateChanged((user) => {
      // console.log(user, "user");
      if (user) {
        // setIsLoggedin(true);
        setUserData(user);
        // Router.push("/");
      } else {
        // setIsLoggedin(false);
        setUserData({});
        let currentPath = Router.pathname;
        if (!currentPath.includes("login") || !currentPath.includes("signup")) {
          Router.push("/login");
        }
      }
    });
  }, []);

  return (
    <UserContext.Provider value={userData || user}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
