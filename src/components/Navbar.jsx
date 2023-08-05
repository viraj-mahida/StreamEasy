import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { remountSliceAction } from "../store/slices/remount-slice";
import { searchQuerySliceAction } from "../store/slices/searchQuery-slice";
import LogInBtn from "@/components/smallComponents/LoginBtn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import s from "@/styles/navbar.module.css";
import Image from "next/image";

function Navbar() {
  const router = useRouter();
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authSlice.user);

  const [buttonClicked, setButtonClicked] = useState(false);
  const [dpClicked, setDpClicked] = useState(false);
  const [gapiLoaded, setGapiLoaded] = useState(false);

  const start = () => {
    if (typeof window !== "undefined" && window.gapi) {
      window.gapi.auth2.init({
        client_id: process.env.AUTH_CLIENT_ID,
        scope: "",
      });
      setGapiLoaded(true);
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";

    script.onload = () => {
      typeof window !== "undefined" && window.gapi.load("client:auth2", start);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const searchQuery = useSelector(
    (state) => state.searchQuerySlice.searchQueryState
  );

  const isDisAvail =
    typeof window !== "undefined"
      ? window.localStorage.getItem("display")
      : null;
  const [display, setDisplay] = useState(
    isDisAvail === null ? "dontDis" : isDisAvail
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) {
      typeof window !== "undefined" &&
        window.localStorage.setItem("searchQuery", searchQuery);
      dispatch(searchQuerySliceAction.storeSearchQuery(searchQuery));
      dispatch(remountSliceAction.updateRemountNumber());
      router.push(`searchResultsContainer`);
    }
  };

  const displaySearch = () => {
    setDisplay("dis");
    setButtonClicked(true);
    setTimeout(() => {
      inputRef.current.focus();
    }, 100);
  };

  const handleBackBtn = () => {
    setDisplay("dontDis");
    router.push(`/`);
  };

  // Update localStorage whenever the display state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("display", display);
    }
  }, [display]);

  return (
    <nav className={s.nav}>
      <div className={`${display === "dis" ? s.displayNone : s.startNav}`}>
        <Link href="/" className={s.logoLink}>
          <Image
            src="/logo.svg"
            className={s.logo}
            alt="StreamEasy"
            width={50}
            height={50}
          />
          <h1 className={s.logoName}>StreamEasy</h1>
        </Link>
      </div>

      <form className={s.midNavbarDesk} onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) =>
            dispatch(searchQuerySliceAction.storeSearchQuery(e.target.value))
          }
        />
        {searchQuery && (
          <i
            className={`fa-solid fa-xmark ${s.clearSearchTextIconDesk}`}
            onClick={() => {
              dispatch(searchQuerySliceAction.storeSearchQuery(""));
              window.localStorage.setItem("searchQuery", "");
            }}
          ></i>
        )}
        <i
          className={`fa-solid fa-magnifying-glass ${s.searchIconDesk}`}
          onClick={handleSearchSubmit}
        ></i>
      </form>

      <div className={`${display === "dis" ? s.midNavbar : s.displayNone}`}>
        <i
          className={`fa-solid fa-arrow-left ${s.backBtn}`}
          onClick={handleBackBtn}
        ></i>
        <form className={s.mobileSearchForm} onSubmit={handleSearchSubmit}>
          <input
            style={searchQuery ? { borderRadius: "20px 0 0 20px" } : {}}
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => {
              dispatch(searchQuerySliceAction.storeSearchQuery(e.target.value));
            }}
            ref={inputRef}
            autoFocus={buttonClicked}
          />
          {searchQuery && (
            <i
              className={`fa-solid fa-xmark ${s.clearSearchTextIcon}`}
              onClick={() => {
                dispatch(searchQuerySliceAction.storeSearchQuery(""));
                typeof window !== "undefined" &&
                  window.localStorage.setItem("searchQuery", "");
              }}
            ></i>
          )}
        </form>
      </div>

      <div className={`${display === "dis" ? s.displayNone : s.endNavbar}`}>
        <i
          className={`fa-solid fa-magnifying-glass ${s.searchIcon}`}
          onClick={displaySearch}
        ></i>
        {gapiLoaded && Object.keys(user).length !== 0 && (
          <Image
            className={s.userDp}
            src={user.picture}
            alt={user.given_name}
            width={40}
            height={40}
            onClick={()=>{setDpClicked(!dpClicked)}}
          />
        )}
        <LogInBtn dpClicked={dpClicked} setDpClicked={setDpClicked} />
      </div>
    </nav>
  );
}

export default Navbar;
