import React, { useEffect, useState } from "react";
import LanguageModal from "../modal/language/LanguageModal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoggedInSegment from "./LoggedInSegment";
import NotLoggedInSegment from "./NotLoggedInSegment";
import InfoBadge from "../badge/InfoBadge";
import { useTranslation } from 'react-i18next';

const MainHeader = () => {
  const auth = useSelector((state) => state.auth);

  const [showLanguageModal, setShowLanguageModal] = useState(false);
  // dil modal aç 
  const handleShowLanguageModal = () => {
    setShowLanguageModal(true);
  };
  // dil modal kapat
  const handleCloseLanguageModal = () => {
    setShowLanguageModal(false);
  };



  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

//  çoklu dil erişim
  const {t} = useTranslation()

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light`}
      style={{
        border: "1px solid rgb(221,221,221)",
      }}
    >
      <div class="container py-3">
        <a class="navbar-brand" href="/">
          <img
            src="https://www.akinsoft.com.tr/logo/images/akinsoft_logo.png?3"
            width="30"
            height="30"
            alt=""
          />
          <a
            className="ms-2"
            style={{ color: "#222", textDecorationLine: "none" }}
          >
            AkınSoft
          </a>
        </a>

      

        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${showMenu ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/kullanicilar">
                {t('header.users')}
              </a>
            </li>
          </ul>

          <div>
            {/* globe */}

            {auth.authenticate ? <LoggedInSegment /> : <NotLoggedInSegment />}
            <button
              className="btn btn-light rounded-pill"
              onClick={handleShowLanguageModal}
            >
              <i class="fa-solid fa-globe"></i>
            </button>

            <LanguageModal
              showLanguageModal={showLanguageModal}
              handleCloseLanguageModal={handleCloseLanguageModal}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainHeader;
