import { Avatar, Card, Descriptions, Image } from "antd";
import React, { Fragment , useEffect } from "react";
import {  useSelector } from "react-redux";
import UserProfileDescriptions from "../descriptions/UserProfileDescriptions";


const ProfileCard = ({handleDeleteProfile}) => {

  // kullanici profildeki statelere erişme 
    const getProfile = useSelector((state) => state.user.getProfile)

   

  return (
    <Fragment>
      <Card className="col-md-5">
        {/* resim kısmı  */}
        <Image
          className="rounded-pill"
          height={200}
          width={200}
          src={getProfile && getProfile.user && getProfile.user.avatar && getProfile.user.avatar.url ? getProfile.user.avatar.url : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"}
        />
        {/* bilgiler */}
        <UserProfileDescriptions  />
        <div>
          <button className="btn btn-danger" onClick={handleDeleteProfile}>Hesabımı Sil</button>
        </div>
      </Card>
    </Fragment>
  );
};

export default ProfileCard;
