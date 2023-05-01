import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";

import UpdateProfileForm from "../components/form/UpdateProfileForm";
import ProfileCard from "../components/card/ProfileCard";
import { useDispatch, useSelector } from "react-redux";
import { GetProfile } from "../redux/actions/UserActions";
import LoadingSpinner from "../components/spinner/LoadingSpinner";
import { message } from "antd";
import { UPDATE_PROFILE_RESET } from "../redux/constants/UserConstants";
const ProfilePage = () => {
  const getProfile = useSelector((state) => state.user.getProfile);
  const updateProfile = useSelector((state) => state.user.updateProfile);
    const auth = useSelector((state) => state.auth)
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
   
        dispatch(GetProfile());
        if (updateProfile.success) {
            message.success("Profiliniz başariyla güncellendi")
            dispatch({type : UPDATE_PROFILE_RESET})
        }
  }, [dispatch,updateProfile.success]);

  useEffect(() => {
    setFirstname(auth.user.firstname)
    setLastname(auth.user.lastname)
    setEmail(auth.user.email)
  }, [auth])


  return (
    <MainLayout>

<h2>Profili Güncelle</h2>
{getProfile.loading ?  <LoadingSpinner /> :  (
 <div className="d-flex justify-content-between flex-1">
 <div className="col-md-6">
  

 
     <UpdateProfileForm
     firstname={firstname}
     setFirstname={setFirstname}
     lastname={lastname}
     setLastname={setLastname}
     email={email}
     setEmail={setEmail}
   />
 </div>
 <ProfileCard />
</div>
)
     
      }
    </MainLayout>
  );
};

export default ProfilePage;
