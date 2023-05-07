import { Avatar, Card, Descriptions, Image } from "antd";
import React, { Fragment , useEffect } from "react";
import {  useSelector } from "react-redux";


const ProfileCard = ({handleDeleteProfile}) => {

    const getProfile = useSelector((state) => state.user.getProfile)

   

  return (
    <Fragment>
      <Card className="col-md-5">
  
        <Image
          className="rounded-pill"
          height={200}
          width={200}
          src={getProfile && getProfile.user && getProfile.user.avatar && getProfile.user.avatar.url ? getProfile.user.avatar.url : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"}
        />

        <Descriptions  className="" title="User Info">
          <Descriptions.Item style={{ display: "inline-block" }} label="İsim">
            {getProfile.user.firstname}
          </Descriptions.Item>
          <Descriptions.Item
            style={{ display: "inline-block" }}
            label="Soyisim"
          >
               {getProfile.user.lastname}
          </Descriptions.Item>
          <Descriptions.Item style={{ display: "inline-block" }} label="Email">
        {getProfile.user.email}
          </Descriptions.Item>

          <Descriptions.Item></Descriptions.Item>
        </Descriptions>
        <div>
          <button className="btn btn-danger" onClick={handleDeleteProfile}>Hesabımı Sil</button>
        </div>
      </Card>
    </Fragment>
  );
};

export default ProfileCard;
