import { Modal ,message} from 'antd'
import React, { useState } from 'react'
import AddEditSurveyForm from '../../form/AddEditSurveyForm'
import { useDispatch } from 'react-redux';
import Resizer from "react-image-file-resizer";
import axios from 'axios';
import { UpdateSurvey } from '../../../redux/actions/SurveyActions';
const EditSurveyModal = ({showEditSurveyModal,handleCloseEditSurveyModal, survey}) => {

    const [title, setTitle] = useState(survey.title);
    const [description, setDescription] = useState(survey.description);
    const [image, setImage] = useState(survey.image ? survey.image : "");
    const [imageLength, setImageLength] = useState(survey.image ? 1 : 0);
  
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
                .post("http://localhost:5000/api/uploadimages", {
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
    // const navigate = useNavigate();
    // // const createSurvey = useSelector((state) => state.survey.createSurvey);
    // // const handleCreateSurvey = () => {
    // //   dispatch(CreateSurvey({ title, description, image }));
    // // };

    const handleUpdateSurvey = () => {
        dispatch(UpdateSurvey(survey._id,{title,description,image}))
        handleCloseEditSurveyModal()
    }

  return (
    <Modal
    centered={true}
    title="Anketi Düzenle"
    open={showEditSurveyModal}
    onOk={handleUpdateSurvey}
    onCancel={handleCloseEditSurveyModal}
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
  )
}

export default EditSurveyModal