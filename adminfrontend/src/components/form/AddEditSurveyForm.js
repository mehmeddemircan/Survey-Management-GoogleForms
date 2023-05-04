import { Form, Input, Upload } from "antd";
import React, { Fragment } from "react";

import ImgCrop from "antd-img-crop";
import { CameraFilled } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
const AddEditSurveyForm = ({
  title,
  setTitle,
  description,
  setDescription,
  image,
  setImage,
  imageLength,
  setImageLength,
  uploadProps,
  onPreview,
  onRemove,
}) => {
  return (
    <Fragment>
  
      <Form
        className="mx-auto"
        style={{
          maxWidth: 600,
        }}
        layout="vertical"
      >
        <Form.Item
          name="title"
          label="Başlık"
          className="mt-3"
          rules={[
            {
              required: true,
              message: "Anket başlığı giriniz lütfen !",
            },
          ]}
        >
          <Input
            type="text"
            placeholder="Anket başlığı yazıbız "
            defaultValue={title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Açıklama"
          className="mt-3"
         
        >
         <TextArea
            showCount 
            rows={5}
            placeholder="Açıklama yaz.."
            value={description}
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={250}
          />
        </Form.Item>
        <Form.Item name="images" label="Anket Fotoğraf">
          <ImgCrop rotationSlider>
            <Upload
              {...uploadProps}
              defaultFileList={image ? [{ url: image, name: "image" }] : []}
              onPreview={onPreview}
              onRemove={() => {
                setImage("");
                setImageLength(0);
              }}
              listType="picture-card"
            >
              {imageLength === 0 && <CameraFilled style={{ fontSize: 30 }} />}
            </Upload>
          </ImgCrop>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default AddEditSurveyForm;
