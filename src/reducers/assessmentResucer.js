import {
  USER_ASSESSMENT_SUCCESS,
  USER_ASSESSMENT_FAIL,
  ADD_ASSESSMENT_SUCCESS,
  ADD_ASSESSMENT_FAIL,
  ADD_SECTION_SUCCESS,
  ADD_SECTION_FAIL,
  QUESTION_TYPE_SUCCESS,
  LOAD_SECTION_SUCCESS,
  QUESTION_TYPE_FAIL,
  LOAD_SECTION_FAIL,
  LOAD_QUESTION_SUCCESS,
  LOAD_QUESTION_FAIL,
  LOAD_ASSESSMENT_BY_ID_SUCCESS,
  LOAD_ASSESSMENT_BY_ID_FAIL,
  LOAD_ASSESSMENT_SETTING_SUCCESS,
  LOAD_ASSESSMENT_SETTING_FAIL,
} from "../action/Types";

const initialState = {
  Assessments: [],
  AssessmnetByID: [],
  AssessmentSetting:[],
  AssessmentSection: [],
  QuestionType: [],
  SectionsQuestions: [],
    
  loading: true,
  message: "",
};

export default function assessment(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_ASSESSMENT_SUCCESS:
      return {
        ...state,
          Assessments: payload,
        AssessmentSection:[],
        loading: false,
      };
    
    
    case LOAD_ASSESSMENT_BY_ID_SUCCESS:
      return {
        ...state,
        AssessmnetByID: payload,
        loading: false,
      };
     case LOAD_ASSESSMENT_BY_ID_FAIL:
      return {
        ...state,
        AssessmnetByID: [],
        loading: false,
      };
    
    
    case LOAD_ASSESSMENT_SETTING_SUCCESS:
      return {
        ...state,
        AssessmentSetting: payload,
        loading: false,
      };
    case LOAD_ASSESSMENT_SETTING_FAIL:
      return {
        ...state,
        AssessmentSetting: [],
        loading: false,
      };
    
    
    
    case QUESTION_TYPE_SUCCESS:
      return {
        ...state,
        QuestionType: payload,
        loading:false
      }
    case QUESTION_TYPE_FAIL:
      return {
        ...state,
        QuestionType:[],
        loading: false,
      };
    
    
    case LOAD_SECTION_SUCCESS:
      return {
        ...state,
   
        AssessmentSection: payload,
        loading: false
      }
    case LOAD_SECTION_FAIL:
      return {
        ...state,
        AssessmentSection: [],
        loading: false
      }
    case LOAD_QUESTION_SUCCESS:
      return {
        ...state,
        SectionsQuestions:payload,
        loading: false
      }
    case LOAD_QUESTION_FAIL:
      return {
        ...state,
        SectionsQuestions:[],
        loading: false
      }
        


    case USER_ASSESSMENT_FAIL:
      return {
        ...state,
        Assessments: [],
        loading: false,
      };
    case LOAD_SECTION_SUCCESS:
      return {
        ...state,
        AssessmentSection: payload,
        loading: false,
        };
    case ADD_ASSESSMENT_SUCCESS:
    case ADD_SECTION_SUCCESS:
      return {
        ...state,
        message: "Added successfully",
      };

    case ADD_ASSESSMENT_FAIL:
    case ADD_SECTION_FAIL:
      return {
        ...state,
        message: "Failed to add",
      };

    default:
      return state;
  }
}
