import { Card, Image } from "antd";
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

const SurveyCard = ({ survey, isDetailsCard }) => {

  const {id} = useParams()
  const navigate = useNavigate()

  const dispatch = useDispatch();
  const handleDeleteSurvey = (surveyId) => {
    if (
      window.confirm(`${survey.title} silmek istedğinizden emin misiniz ? `)
    ) {
      dispatch(DeleteSurvey(surveyId));
      if (survey._id === id) {
        navigate('/',{replace: true})
      }
    }
  };
  const auth = useSelector((state) => state.auth);
  const getUserFavorites = useSelector((state) => state.user.getUserFavorites);

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

  const [showEditSurveyModal, setShowEditSurveyModal] = useState(false)

  const handleShowEditSurveyModal = () => {
    setShowEditSurveyModal(true)
  }

  const handleCloseEditSurveyModal = () => {
    setShowEditSurveyModal(false)
  }

  return (
    <Fragment>
      <Card
        className="my-4"
        type="inner"
        title={survey.title}
        extra={[
          <div className="d-inline-flex align-items-center">
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
              <button
                className="btn btn-light btn-sm ms-2"
                href="#"
                onClick={() => handleDeleteSurvey(survey._id)}
              >
                <i class="fa-solid fa-x"></i>
              </button>
            </InfoTooltip>
          </div>,
        ]}
      >
        <div className="d-flex justify-content-between">
          <div>{survey.description}</div>
          <div>
            {survey.image  ?  <Image
              className="img-fluid"
              width={300}
              height={200}
              src={
                survey.image
              }
            /> : null}
          </div>
        </div>
      </Card>
    </Fragment>
  );
};

export default SurveyCard;
