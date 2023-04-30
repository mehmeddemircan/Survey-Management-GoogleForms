import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/AuthReducer";
import userReducer from "./reducers/UserReducer";
import surveyReducer from "./reducers/SurveyReducer";
import questionReducer from "./reducers/QuestionReducer";

const rootReducer = combineReducers({
    auth : authReducer,
    user : userReducer,
    survey : surveyReducer,
    question : questionReducer
})

const initialState = {}

const middleware = [thunk];



const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;