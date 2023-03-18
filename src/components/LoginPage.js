import firebase from "firebase/app";
import { getApps } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import Image from "next/image";
import { useState } from "react";
import ShowToast from "./ShowToast";
import { useRouter } from "next/router";

const LoginPage = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBE3hGqOSI5j1D40aTreuEb5W6h3kngcXs",
    authDomain: "gonrecycle-4e916.firebaseapp.com",
    projectId: "gonrecycle-4e916",
    storageBucket: "gonrecycle-4e916.appspot.com",
    messagingSenderId: "714182303175",
    appId: "1:714182303175:web:500a4c93eb46d0d6ce4de2",
    measurementId: "G-KMLHS5T9WD",
  };

  // Initialize Firebase

  const app = initializeApp(firebaseConfig);
  const [userInputEP, setUserInputEP] = useState({
    email: "",
    password: "",
  });

  const [visible, setVisible] = useState({
    visible: false,
    message: "",
  });

  const firebaseAuth = getAuth();

  const Router = useRouter();

  const handleSignInGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(firebaseAuth, provider);
    } catch (error) {
      setVisible({
        visible: true,
        message: error.message,
      });
    }

    Router.push("/");
    // console.log(result);
  };
  const handleSignInEmailPass = async () => {
    // const provider = new GoogleAuthProvider();
    try {
      let result = await createUserWithEmailAndPassword(
        firebaseAuth,
        userInputEP.email,
        userInputEP.password
      );
      console.log(result);
    } catch (error) {
      try {
        let result = await signInWithEmailAndPassword(
          firebaseAuth,
          userInputEP.email,
          userInputEP.password
        );
      } catch (error) {
        setVisible({
          visible: true,
          message: error.message.includes("wrong-password")
            ? "Wrong Password"
            : "User Not Found",
        });
      }

      //   setVisible({
      //     visible: true,
      //     message: error.message,
      //   });
    }
    // console.log(result);
  };

  return (
    <div>
      <ShowToast visible={visible} setVisible={setVisible} />

      <div class="hero min-h-screen bg-gray-100">
        <div class="hero-content flex-col lg:flex-row-reverse">
          <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-white">
            <div class="card-body">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  onChange={(e) => {
                    setUserInputEP({
                      ...userInputEP,
                      email: e.target.value,
                    });
                  }}
                  class="input input-bordered bg-white text-black"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Password</span>
                </label>
                <input
                  type="text"
                  placeholder="password"
                  onChange={(e) => {
                    setUserInputEP({
                      ...userInputEP,
                      password: e.target.value,
                    });
                  }}
                  class="input input-bordered bg-white text-black"
                />
              </div>
              <div className="flex flex-row justify-center gap-5">
                <div class="form-control mt-6">
                  <button
                    onClick={handleSignInEmailPass}
                    class="btn btn-primary bg-white text-black border-black hover:bg-gray-100"
                  >
                    Login
                  </button>
                </div>

                {/* sign in with google */}
                <div class="form-control mt-6 ">
                  <button
                    onClick={handleSignInGoogle}
                    class="btn btn-primary bg-white border-black m-auto hover:bg-gray-100"
                  >
                    <Image
                      src={"/img/svgs/google.svg"}
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
