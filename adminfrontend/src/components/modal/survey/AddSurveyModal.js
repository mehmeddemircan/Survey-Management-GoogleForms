import { Modal, message } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import Resizer from "react-image-file-resizer";
import { useDispatch, useSelector } from "react-redux";
import AddEditSurveyForm from "../../form/AddEditSurveyForm";
import axios from "axios";
import { CreateSurvey } from "../../../redux/actions/SurveyActions";
import { useNavigate } from "react-router-dom";

const AddSurveyModal = ({ showAddSurveyModal, handleCloseAddSurveyModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageLength, setImageLength] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const [createdBy, setCreatedBy] = useState(user._id)


  const dispatch = useDispatch();
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
                setImage(response.data.url);
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
  const navigate = useNavigate();
  const createSurvey = useSelector((state) => state.survey.createSurvey);
  const handleCreateSurvey = () => {
    dispatch(CreateSurvey({ title, description, image , createdBy }));
  };

  useEffect(() => {
    //bu kısım düzenlenecek başarıyla olursa kapanacak
    if (createSurvey.success) {
      setTitle("");
      setDescription("");
      setImage("");
      handleCloseAddSurveyModal();
      navigate(`/anketler/${createSurvey.survey._id}`, { replace: true });
    }
  }, [createSurvey.success]);

  return (
    <Fragment>
      <Modal
        centered={true}
        title="Anket Oluştur"
        open={showAddSurveyModal}
        onOk={handleCreateSurvey}
        onCancel={handleCloseAddSurveyModal}
      >
        
        <AddEditSurveyForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          image={image}
          setImage={setImage}
          uploadProps={uploadProps}
          onPreview={onPreview}
          imageLength={imageLength}
          setImageLength={setImageLength}
        />
      </Modal>
    </Fragment>
  );
};

export default AddSurveyModal;
