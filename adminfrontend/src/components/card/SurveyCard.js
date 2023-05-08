import { Card, Image, message } from "antd";
import React, { Fragment, useState } from "react";
import InfoTooltip from "../tooltip/InfoTooltip";
import { useDispatch, useSelector } from "react-redux";
import { DeleteSurvey } from "../../redux/actions/SurveyActions";
import {
  AddSurveyToFavorite,
  RemoveSurveyFromFavorite,
} from "../../redux/actions/UserActions";
import EditSurveyModal from "../modal/survey/EditSurveyModal";
import { useNavigate, useParams } from "react-router-dom";
import SurveyDescriptions from "../descriptions/SurveyDescriptions";
import InfoPopconfirm from "../popconfirm/InfoPopconfirm";

const SurveyCard = ({ survey, isDetailsCard ,isPreviewCard}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // anketi silme işlemi 
  const handleDeleteSurvey = (surveyId) => {
   
      dispatch(DeleteSurvey(surveyId));
      if (survey._id === id) {
        navigate("/", { replace: true });
      }
   
  };
  const auth = useSelector((state) => state.auth);
  const getUserFavorites = useSelector((state) => state.user.getUserFavorites);

  // toggle şeklinde anketi favorilere koyma ve çıkarma işlemi 
  const handleToggleFavorite = (surveyId) => {
    const isSurveyInFavorites = getUserFavorites.data.favorites.some(
      (survey) => survey._id === surveyId
    );

    if (isSurveyInFavorites) {
      dispatch(RemoveSurveyFromFavorite(auth.user._id, surveyId));
    } else {
      dispatch(AddSurveyToFavorite(auth.user._id, surveyId));
    }
  };

  const isSurveyInFavorites = getUserFavorites.data.favorites.some(
    (favorite) => favorite._id === survey._id
  );

  const [showEditSurveyModal, setShowEditSurveyModal] = useState(false);
    // anketi güncelle modalı aç 
  const handleShowEditSurveyModal = () => {
    setShowEditSurveyModal(true);
  };
  // anketi güncelle modal kapat
  const handleCloseEditSurveyModal = () => {
    setShowEditSurveyModal(false);
  };

  return (
    <Fragment>
      <Card
        className="my-4"
        type="inner"
        title={survey.title}
        extra={[
          isPreviewCard ? null : <div className="d-inline-flex align-items-center">
          {isDetailsCard ? null : (
            <a href={`/anketler/${survey._id}`}>Daha Fazlası</a>
          )}
          <InfoTooltip text="Favorilere Ekle">
            <button
              className="btn btn-light btn-sm ms-2"
              href="#"
              onClick={() => handleToggleFavorite(survey._id)}
            >
              {isSurveyInFavorites ? (
                <i class="fa-solid fa-heart fs-6"></i>
              ) : (
                <i class="fa-regular fa-heart fs-6"></i>
              )}
            </button>
          </InfoTooltip>
          <InfoTooltip text="Anketi Düzenle">
            <button
              className="btn btn-light btn-sm ms-2"
              href="#"
              onClick={handleShowEditSurveyModal}
            >
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
          </InfoTooltip>

          <EditSurveyModal
            survey={survey}
            showEditSurveyModal={showEditSurveyModal}
            handleCloseEditSurveyModal={handleCloseEditSurveyModal}
          />

          <InfoTooltip text="Anketi Sil">
              {/* anketi silmek için onaylama kısmı  */}
            <InfoPopconfirm
              title="Anketi Silmek"
              description={`${survey.title} silmek istediğiniz den emin misiniz ? `}
              confirm={() => handleDeleteSurvey(survey._id)}
   
            >
              <button
                className="btn btn-light btn-sm ms-2"
                href="#"
             
              >
                <i class="fa-solid fa-x"></i>
              </button>
            </InfoPopconfirm>
          </InfoTooltip>
        </div>,
        ]}
      >
   <div class="row">
  <div class="col-md-8">
    <div class="d-flex flex-row justify-content-between">
      {/* anket detay bilgileri */}
      <SurveyDescriptions isPreviewCard={isPreviewCard} survey={survey} />
    </div>
  </div>
  <div class="col-md-4">
    <div class="d-flex justify-content-center">
      {/* anket resim  */}
      {survey.image ? (
        <Image
          class="img-fluid"
          width={300}
          height={200}
          src={survey.image}
        />
      ) : null}
    </div>
  </div>
</div>
      </Card>
    </Fragment>
  );
};

export default SurveyCard;
