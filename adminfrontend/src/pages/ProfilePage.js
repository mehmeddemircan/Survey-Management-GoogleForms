import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";

import UpdateProfileForm from "../components/form/UpdateProfileForm";
import ProfileCard from "../components/card/ProfileCard";
import { useDispatch, useSelector } from "react-redux";
import { DeleteUser, GetProfile, GetSurveyFavorites } from "../redux/actions/UserActions";
import LoadingSpinner from "../components/spinner/LoadingSpinner";
import { message } from "antd";
import { UPDATE_PROFILE_RESET } from "../redux/constants/UserConstants";
import MetaTitle from "../meta/MetaTitle";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/AuthActions";
const ProfilePage = () => {
  const getProfile = useSelector((state) => state.user.getProfile);
  const updateProfile = useSelector((state) => state.user.updateProfile);
    const auth = useSelector((state) => state.auth)
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  const [imageLength, setImageLength] = useState(0)

  const [avatar, setAvatar] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
   
        dispatch(GetProfile());
        if (updateProfile.success) {
            message.success("Profiliniz başariyla güncellendi")
            dispatch({type : UPDATE_PROFILE_RESET})
        }
  }, [dispatch,updateProfile.success]);

  

  const navigate = useNavigate()

  const deleteUpdateUser = useSelector((state) => state.user.deleteUpdateUser)

  const handleDeleteProfile = () => {

    dispatch(DeleteUser(auth.user._id))
  }

  useEffect(() => {
      if (deleteUpdateUser.isDeleted) {
          dispatch(logout())
          message.success('Hesabınız başarıyla silinmiştir !')
          navigate('/login',{replace : true })
      }
  }, [dispatch,deleteUpdateUser.isDeleted,navigate])

  useEffect(() => {
    setFirstname(auth.user.firstname)
    setLastname(auth.user.lastname)
    setEmail(auth.user.email)

  }, [auth])


  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const uploadProps = {
    beforeUpload: (file) => {
      return new Promise((resolve, reject) => {
        // Resize the image
        Resizer.imageFileResizer(
          file,
          300,
          300,
          "JPEG",
          100,
          0,
          (uri) => {
            // Send the resized image to the server
            axios
              .post("https://akinsoftanketapi.onrender.com/api/uploadimages", {
                image: uri,
              })
              .then((response) => {
                // Call the onFinish callback with the uploaded image URL
                // onFinish(response.data.url);
                setAvatar(response.data.url);
                setImageLength(1);
                resolve(false); // prevent default antd upload behavior
              })
              .catch((error) => {
                reject(error);
              });
          },
          "base64"
        );
      });
    },
    onChange: (info) => {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <MainLayout>
          <MetaTitle title="Akınsoft Profilim" name="profilim" content="profilim" />
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
     avatar={avatar}
     setAvatar={setAvatar}
     uploadProps={uploadProps}
     onPreview={onPreview}
     imageLength={imageLength}
     setImageLength={setImageLength}
   />
 </div>
 <ProfileCard handleDeleteProfile={handleDeleteProfile}/>
</div>
)
     
      }
    </MainLayout>
  );
};

export default ProfilePage;
