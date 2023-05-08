import { Button, Card, Form, Input, Upload } from "antd";
import React from "react";
import ImgCrop from "antd-img-crop";
import { CameraFilled } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { UpdateProfile } from "../../redux/actions/UserActions";
const UpdateProfileForm = ({
  firstname,
  setFirstname,
  lastname,
  setLastname,
  email,
  setEmail,
  avatar,
  setAvatar,
  imageLength,
  setImageLength,
  uploadProps,
  onPreview,
}) => {
  const dispatch = useDispatch();

  // kullanici profili güncelleme işlemi 
  const handleUpdateProfile = () => {
    dispatch(UpdateProfile({ firstname, lastname, email, avatar }));
  };

  return (
    <Card>
      <Form
        className="mx-auto"
        style={{
          maxWidth: 600,
        }}
        layout="vertical"
      >
        <Form.Item
          name="firstname"
          label="İsim"
          className="mt-3"
       
        >
          <Input
            type="text"
            placeholder="İsminizi giriniz "
            defaultValue={firstname}
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="lastname"
          label="Soyisim"
          className="mt-3"
       
        >
          <Input
            type="text"
            placeholder="Soyisminizi giriniz "
            defaultValue={lastname}
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          className="mt-3"
        
        >
          <Input
            type="text"
            placeholder="Email giriniz"
            defaultValue={email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>

        <Form.Item name="images" label="Profil Fotoğrafı">
          <ImgCrop rotationSlider>
            <Upload
              {...uploadProps}
              defaultFileList={avatar ? [{ url: avatar, name: "image" }] : []}
              onPreview={onPreview}
              onRemove={() => {
                setAvatar("");
                setImageLength(0);
              }}
              listType="picture-card"
            >
              {imageLength === 0 && <CameraFilled style={{ fontSize: 30 }} />}
            </Upload>
          </ImgCrop>
        </Form.Item>
        <Button type="primary" onClick={handleUpdateProfile}>
          Onayla
        </Button>
      </Form>
    </Card>
  );
};

export default UpdateProfileForm;
