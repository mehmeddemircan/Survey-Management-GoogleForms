import React, { Fragment } from "react";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/AuthActions";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Popover } from "antd";
import InfoBadge from "../badge/InfoBadge";
import { useTranslation } from "react-i18next";
const LoggedInSegment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // çıkış yapma işlemi 
  const LogoutHandler = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };
  const auth = useSelector((state) => state.auth);

  const getUserFavorites = useSelector((state) => state.user.getUserFavorites);
  // çoklu dil 
  const {t} = useTranslation()
  return (
    <Fragment>
      <InfoBadge count={getUserFavorites.data.favorites.length}>
        <button
          className="btn btn-sm btn-light rounded-pill"
          onClick={() => navigate("/favorilerim", { replace: true })}
        >
          <i class="fa-solid fa-heart me-2"></i>
          <a>{t('header.favorites')}</a>
        </button>
      </InfoBadge>
      <Popover
        content={
          <ul class="list-group">
            <li class="list-group-item  border-0">
              <div className="d-inline-flex align-items-center">
                <i class="fa-solid fa-user me-2"></i>
                <a style={{textDecorationLine:'none',color:'#222'}} href="/profilim">Profil</a>{" "}
              </div>
            </li>
            <li
              class="list-group-item border-0"
              onClick={() => navigate("/favorilerim", { replace: true })}
            >
              <div className="d-inline-flex align-items-center">
                <i class="fa-solid fa-heart me-2"></i>
                <a>Favori Anketler</a>{" "}
              </div>
            </li>
            <hr />
            <li class="list-group-item border-0" onClick={LogoutHandler}>
              <div className="d-inline-flex align-items-center">
                <i class="fa-solid fa-right-from-bracket me-2"></i>
                <a>Çıkış Yap</a>{" "}
              </div>
            </li>
          </ul>
        }
        title={
          <a>
            {auth.user.firstname} {auth.user.lastname}
          </a>
        }
      >
        <button
          className="btn btn-light rounded-pill d-inline-flex align-items-center "
          style={{ border: "1px solid #fff" }}
        >
          <i class="fa-solid fa-bars mx-2 mt-1"></i>
          <Avatar
              src={auth.user && auth.user.avatar ? auth.user.avatar.url  : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"}
              size={"small"}
            />
        </button>
      </Popover>
    </Fragment>
  );
};

export default LoggedInSegment;
