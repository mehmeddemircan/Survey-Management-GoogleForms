import { Button, Form, Input ,Upload} from 'antd'
import React from 'react'
import ImgCrop from "antd-img-crop";
import { CameraFilled } from "@ant-design/icons";
import { useDispatch } from 'react-redux';
import { UpdateProfile } from '../../redux/actions/UserActions';
const UpdateProfileForm = ({firstname,setFirstname,lastname,setLastname,email,setEmail}) => {

    const dispatch = useDispatch()

    const handleUpdateProfile = () => {
        dispatch(UpdateProfile({firstname,lastname,email}))
    }

  return (
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
          // rules={[
          //   {
          //     type: "name",
          //     message: "The input is not valid E-mail!",
          //   },
          //   {
          //     required: true,
          //     message: "Please input your E-mail!",
          //   },
          // ]}
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
          // rules={[
          //   {
          //     type: "name",
          //     message: "The input is not valid E-mail!",
          //   },
          //   {
          //     required: true,
          //     message: "Please input your E-mail!",
          //   },
          // ]}
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
          // rules={[
          //   {
          //     type: "name",
          //     message: "The input is not valid E-mail!",
          //   },
          //   {
          //     required: true,
          //     message: "Please input your E-mail!",
          //   },
          // ]}
        >
          <Input
            type="text"
            placeholder="Email giriniz"
            defaultValue={email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
      label="Şifre"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item
      label="Şifre Tekrar"
      name="confirmPassword"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item name="images" label="Profil Fotoğrafı">
          <ImgCrop rotationSlider>
            <Upload
            //   {...uploadProps}
            //   defaultFileList={image ? [{ url: image, name: "image" }] : []}
            //   onPreview={onPreview}
            //   onRemove={() => {
            //     setImage("");
            //     setImageLength(0);
            //   }}
              listType="picture-card"
            >
              {/* {imageLength === 0 && <CameraFilled style={{ fontSize: 30 }} />} */}
              <CameraFilled style={{ fontSize: 30 }} />
            </Upload>
          </ImgCrop>
        </Form.Item>
        <Button type="primary" onClick={handleUpdateProfile} >Onayla</Button>
        </Form>
  )
}

export default UpdateProfileForm