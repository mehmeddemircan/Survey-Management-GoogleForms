import { Card, Descriptions, Image } from "antd";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const ProfileCard = () => {

    const getProfile = useSelector((state) => state.user.getProfile)

  return (
    <Fragment>
      <Card className="col-md-5">
        <Image
          className="rounded-pill"
          height={200}
          width={200}
          src="https://images.pexels.com/photos/16511744/pexels-photo-16511744.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
        />

        <Descriptions className="" title="User Info">
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
      </Card>
    </Fragment>
  );
};

export default ProfileCard;
