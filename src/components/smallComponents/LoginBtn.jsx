"use client";

import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { authSliceAction } from "@/store/slices/auth-slice";
import Script from "next/script";
import s from '@/styles/navbar.module.css'

const LogInBtn = ({dpClicked, setDpClicked}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authSlice.user);
  const logInStatusTemp = useSelector((state) => state.authSlice.isLoggedIn);
  const logInStatus = (logInStatusTemp === 'true' ? true : false)
  
  useEffect(() => {
    document.getElementById("logInBtn").hidden = logInStatus;
  }, [logInStatus]);

  function handleSignOut() {
    setDpClicked(false)
    dispatch(authSliceAction.setUser({}));
    typeof window !== 'undefined' && window.localStorage.removeItem("userObject")
    dispatch(authSliceAction.setLogInStatus('false'));
    typeof window !== 'undefined' && window.localStorage.setItem('logInStatus', 'false')
  }

  async function handleCallbackResponse(response) {
    const userObject = await jwt_decode(response.credential);
    dispatch(authSliceAction.setUser(userObject));
    typeof window !== 'undefined' && window.localStorage.setItem('userObject', JSON.stringify(userObject))
    dispatch(authSliceAction.setLogInStatus('true'));
    typeof window !== 'undefined' && window.localStorage.setItem('logInStatus', 'true')
  }

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // document.addEventListener("DOMContentLoaded", function () {
    // The 'accounts' object is now accessible
    isReady &&
      typeof window !== "undefined" &&
      window.google.accounts.id.initialize({
        client_id: process.env.AUTH_CLIENT_ID,
        callback: handleCallbackResponse,
      });

    typeof window !== "undefined" &&
      isReady &&
      !logInStatus &&
      location.pathname === "/" &&
      window.google.accounts.id.prompt();

    isReady && !logInStatus &&
      typeof window !== "undefined" &&
      window.google.accounts.id.renderButton(
        document.getElementById("logInBtn"),
        {
          type: "standard",
          theme: "filled_black",
          size: "medium",
          text: "signin",
          shape: "circle",
          logo_alignment: "left",
        }
      );
    // });
  }, [isReady]);

  return (
    <div className={s.logInBtnDiv}>
      <Script
        src="https://accounts.google.com/gsi/client"
        onError={() => setIsReady(false)}
        onReady={() => {
          setIsReady(true);
        }}
      />
      <div id="logInBtn"></div>
      {dpClicked && Object.keys(user).length !== 0 && (
        <button
          onClick={() => {
            handleSignOut();
          }}
        >
          Sign Out
        </button>
      )}
    </div>
  );
};

export default LogInBtn;
