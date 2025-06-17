import axios from "axios";
import {
  ADD_ASSESSMENT_FAIL,
  ADD_ASSESSMENT_SUCCESS,
  ADD_CATEGORY_FOR_BANK_FAIL,
  ADD_CATEGORY_FOR_BANK_SUCCESS,
  LOAD_ASSESSMENT_BY_ID_FAIL,
  LOAD_ASSESSMENT_BY_ID_SUCCESS,
  LOAD_ASSESSMENT_SETTING_FAIL,
  LOAD_ASSESSMENT_SETTING_SUCCESS,
  LOAD_BANK_CATEGORIES_FAIL,
  LOAD_BANK_CATEGORIES_SUCCESS,
  LOAD_BANK_REPOSITORY_BY_CATEGORY_ID_FAIL,
  LOAD_BANK_REPOSITORY_BY_CATEGORY_ID_SUCCESS,
  LOAD_BANK_REPOSITORY_SUCCESS,
  LOAD_INVITED_BY_ASSESSMENT_ID_FAIL,
  LOAD_INVITED_CANDIDATES_FAIL,
  LOAD_INVITED_CANDIDATES_SUCCESS,
  LOAD_QUESTION_FAIL,
  LOAD_QUESTION_SUCCESS,
  LOAD_REPOSITORY_QUESTIONS_FAIL,
  LOAD_REPOSITORY_QUESTIONS_SUCCESS,
  LOAD_SECTION_FAIL,
  LOAD_SECTION_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  PUBLISH_ASSESSMENT_FAIL,
  PUBLISH_ASSESSMENT_SUCCESS,
  QUESTION_TYPE_FAIL,
  QUESTION_TYPE_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  USER_ASSESSMENT_FAIL,
  USER_ASSESSMENT_SUCCESS,
} from "./Types";
import { Flip, toast } from "react-toastify";
export const API_BASE_URL = import.meta.env.VITE_API_URL;


// Authentication start here


// Login or sign in
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(`${API_BASE_URL}/auth/signin`, body, config);


    const { refreshToken, token, user } = res.data.body;
    // role = user.roles[1]

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token, refreshToken, user },
    });


    toast.success("👋 Welcome Back!  you're Succesfully Logged in!", {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
    });


    // dispatch(load_user()); // Optional, if you want to validate token later
  } catch (err) {
    {
      err.response?.status === 401 || (axios.isAxiosError(err) && err?.code =="Network Error")
        ? toast.error(err.response.data.message || 
            "You're unauthorized! Please check your credentials and try again.",
            {
              position: "bottom-left",
              autoClose: 500,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Flip,
              style: { width: "400px" },
            }
          )
        : err.response?.status == 500
          ? toast.error("You're  not connected To server", {
              position: "bottom-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Flip,
              style: { width: "400px" },
            })
          :  err.response?.data?.message == "USER_IS_DISABLED"? toast.error("your acount is disabled", {
              position: "bottom-left",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Flip,
              style: { width: "400px" },
            }): "";
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
// logout
export const logout = () => (dispatch) => {
  localStorage.clear();

  dispatch({
    type: LOGOUT,
  });
};
// signup API
export const signup =
  (firstName, lastName, email, role, password) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    });
    try {
      const res = await axios.post(
        `${API_BASE_URL}/auth${role == "EXAMINER" ? "/signup_as_examiner" : "/signup_as_examinee"}`,
        body,
        config
      );
      if (res.status === 201) {
        toast.success("✅ Successfully created! Your item is now live.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Flip,
        });
      
      }
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      {
        err.response && err.response.status === 409
          ? toast.error("This user already Exist in this platform.", {
              position: "bottom-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Flip,
              style: { width: "400px" },
            })
          : "";
      }
      dispatch({
        type: SIGNUP_FAIL,
      });
    }
  };

  // check is Authenticated
export const checkAuthenticated = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const body = JSON.stringify({ token: localStorage.getItem("access") });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/apexx/jwt/verify/`,
        body,
        config
      );

      if (res.data.code !== "token_not_valid") {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};
// Auth end Here
  


// loading assessment related start here

// load assesment
export const load_my_assesment = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(`${API_BASE_URL}/assessments/mine`, config);
      dispatch({
        type: USER_ASSESSMENT_SUCCESS,
        payload: res.data,
      });
      return res.data; // Return response instead of JSX
    } catch (err) {
      dispatch({ type: USER_ASSESSMENT_FAIL });
      return null;
    }
  } else {
    dispatch({ type: USER_ASSESSMENT_FAIL });
    return null;
  }
};
// load assessment by ID
export const load_my_assesment_by_Id = (assessmentId) => async (dispatch) => {
  console.log("trying.....");
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${API_BASE_URL}/assessments/get_by_id/${assessmentId}`,
        config
      );
      dispatch({
        type: LOAD_ASSESSMENT_BY_ID_SUCCESS,
        payload: res.data,
      });
      return res.data; // Return response instead of JSX
    } catch (err) {
      dispatch({ type: LOAD_ASSESSMENT_BY_ID_FAIL });
      return null;
    }
  } else {
    dispatch({ type: LOAD_ASSESSMENT_BY_ID_FAIL });
    return null;
  }
};
// load assessment setting
export const load_my_assesment_setting = (assessmentId) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${API_BASE_URL}/assessments/basic_info/${assessmentId}`,
        config
      );
      dispatch({
        type: LOAD_ASSESSMENT_SETTING_SUCCESS,
        payload: res.data,
      });
      return res.data; // Return response instead of JSX
    } catch (err) {
      dispatch({ type: LOAD_ASSESSMENT_SETTING_FAIL });
      return null;
    }
  } else {
    dispatch({ type: LOAD_ASSESSMENT_SETTING_FAIL });
    return null;
  }
};
// load section by assessment ID
export const load_my_section = (assessmentId) => async (dispatch) => {
  if (localStorage.getItem("access") && assessmentId) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${API_BASE_URL}/assessments/get_sections/${assessmentId}`,
        config
      );
      dispatch({
        type: LOAD_SECTION_SUCCESS,
        payload: res.data,
      });
      return res.data;
    } catch (err) {
      dispatch({ type: LOAD_SECTION_FAIL });
      return null;
    }
  } else {
    dispatch({ type: LOAD_SECTION_FAIL });
    return null;
  }
};
// load all assessment for current user
export const load_all_assessment = (assessmentId) => async (dispatch) => {
  if (localStorage.getItem("access") && assessmentId) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${API_BASE_URL}/assessments/get_by_id/${assessmentId}`,
        config
      );
      dispatch({
        type: LOAD_SECTION_SUCCESS,
        payload: res.data,
      });
      return res.data;
    } catch (err) {
      dispatch({ type: LOAD_SECTION_FAIL });
      return null;
    }
  } else {
    dispatch({ type: LOAD_SECTION_FAIL });
    return null;
  }
};
//  load questions
export const load_my_questions = (sectionID) => async (dispatch) => {
  if (localStorage.getItem("access") && sectionID) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${API_BASE_URL}/assessments/get_questions/${sectionID}`,
        config
      );
      dispatch({
        type: LOAD_QUESTION_SUCCESS,
        payload: res.data,
      });
      return res.data;
    } catch (err) {
      dispatch({ type: LOAD_QUESTION_FAIL });
      return null;
    }
  } else {
    dispatch({ type: LOAD_QUESTION_FAIL });
    return null;
  }
};
// load  Question Type
export const load_question_type = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${API_BASE_URL}/assessments/config/question_types`,
        config
      );
      dispatch({
        type: QUESTION_TYPE_SUCCESS,
        payload: res.data,
      });
      return res.data;
    } catch (err) {
      dispatch({ type: QUESTION_TYPE_FAIL });
      return null;
    }
  } else {
    dispatch({ type: QUESTION_TYPE_FAIL });
    return null;
  }
};


//  Assessment  related 


// Create Assessment
export const createAssessment = (title, description) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };
  const body = JSON.stringify({
    title,
    description,
  });
  try {
    const res = await axios.post(
      `${API_BASE_URL}/assessments/create`,
      body,
      config
    );
    if (res.status === 201) {
      toast.success(
        "✅ Successfully created your Assessment! Your item is now live.",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Flip,
        }
      );
    
    }
    dispatch({
      type: ADD_ASSESSMENT_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    {
      err.response && err.response.status === 409
        ? toast.error("This user already Exist in this platform.", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
            style: { width: "400px" },
          })
        : toast.error("somthing Error please try Again", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
            style: { width: "400px" },
          });
    }
    dispatch({
      type: ADD_ASSESSMENT_FAIL,
    });
  }
};
// publish assessment
export const PublishAssessment = (assessmentID) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };

  try {
    const res = await axios.post(
      `${API_BASE_URL}/assessments/publish/${assessmentID}`, {},
      config
    );
    if (res.status === 201 || res.status === 200 ) {
      toast.success(
       "PUBLISHED SUCCESSFULLY",
        {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Flip,
        }
      );
   
    }
    dispatch({
      type: PUBLISH_ASSESSMENT_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
   
    {
      err.response && err.response.status === 409
        ? toast.error("Already Published", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
            style: { width: "400px" },
          })
        : toast.error("somthing Error please try Again", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
            style: { width: "400px" },
          });
    }
    dispatch({
      type: PUBLISH_ASSESSMENT_FAIL,
      payload:err
    });
  }
};
// Ai
export const Sendrequest =
  (topic, numberOfQuestions = 10) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const body = JSON.stringify({
      topic,
      numberOfQuestions,
    });
    try {
      const res = await axios.post(
        `${API_BASE_URL}/assessments/create`,
        body,
        config
      );
      if (res.status === 201) {
        toast.success(
          "✅ Successfully created your Assessment! Your item is now live.",
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
          }
        );
      
      }
      dispatch({
        type: ADD_ASSESSMENT_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      {
        err.response && err.response.status === 409
          ? toast.error("This user already Exist in this platform.", {
              position: "bottom-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Flip,
              style: { width: "400px" },
            })
          : toast.error("somthing Error please try Again", {
              position: "bottom-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Flip,
              style: { width: "400px" },
            });
      }
      dispatch({
        type: ADD_ASSESSMENT_FAIL,
      });
    }
  };

// Create New Section
export const createSection =
  (assessmentId, title, description, questionType) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const body = JSON.stringify({
      assessmentId,
      title,
      description,
      questionType,
    });

    try {
      const res = await axios.post(
        `${API_BASE_URL}/assessments/add_section`,
        body,
        config
      );
      if (
        res.status === 201 ||
        res.status === 200 ||
        res.data.message == "ASSESSMENT_SECTION_ADD_SUCCESS"
      ) {
        toast.success(
          `✅ Successfully created your Section ! Your item is now live.`,
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
          }
        );
      }
      dispatch({
        type: ADD_ASSESSMENT_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      {
        err.response && (err.response.status === 409 || err.response.data.message === "ASSESSMENT_ALREADY_PUBLISHED")
          ? toast.error( err.response.data.message.replaceAll("_", " ").toLowerCase(), {
              position: "bottom-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Flip,
              style: { width: "400px" },
            })
          : toast.error("somthing Error please try Again", {
              position: "bottom-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Flip,
              style: { width: "400px" },
            });
      }
      dispatch({
        type: ADD_ASSESSMENT_FAIL,
      });
    }
  };
// create settings for assessment
export const CreateSetting_for_assessment =
  (assessmentId, startDateTime, endDateTIme, duration, maxAttempts,passingScore, isPublic) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const body = JSON.stringify({
      assessmentId,
      startDateTime,
      endDateTIme,
      duration,
      maxAttempts,
      passingScore,
      isPublic: typeof isPublic === "boolean" ? isPublic : isPublic === "true",
    });

    try {
      const res = await axios.post(
        `${API_BASE_URL}/assessments/update_settings`,
        body,
        config
      );
      if (
        res.status === 201 ||
        res.status === 200 ||
        res.data.message == "ASSESSMENT_SETTINGS_UPDATE_SUCCESS"
      ) {
        toast.success(
          `✅ Successfully set your your setting for your assessment !`,
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
          }
        );
      }
      dispatch({
        type: ADD_ASSESSMENT_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      {
        (err.response && err.response.status === 409) ||
        err.response.data.message == "VALIDATION_ERROR"
          ? toast.error(err.response.message.replaceAll("_", " "), {
              position: "bottom-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Flip,
              style: { width: "400px" },
            })
          : err.response.status == -500
            ? toast.error("somthing Error please try Again", {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Flip,
                style: { width: "400px" },
              })
            : "";
      }
      dispatch({
        type: ADD_ASSESSMENT_FAIL,
      });
    }
  };


  // results related apis start here 
// fetch results for examiner
export const fetch_results_by_assessment_Id = (assessmentId) => async (dispatch) => {
  
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
  };
   try {
      const res = await axios.get(
        `${API_BASE_URL}/assessments/attempts/result/fetch_results/${assessmentId}`,
        config
      );
      if (
        res.status === 201 ||
        res.status === 200 ||
        res.data.message == "RESULT_FETCH_SUCCESS"
      ) {
       if (res.data.body?.length === 0) {
         toast.info("No one taken the assessment yet", {
           position: "bottom-left",
           autoClose: 300,
           hideProgressBar: false,
           closeOnClick: false,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "colored",
           transition: Flip,
         });
       } else {
         toast.success("✅ Successfully fetched your assessments!", {
           position: "bottom-left",
           autoClose: 300,
           hideProgressBar: false,
           closeOnClick: false,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "colored",
           transition: Flip,
         });
       }
     
     }
    
      dispatch({
        type: ADD_ASSESSMENT_SUCCESS,
        payload: res.data,
      });
     return res.data
    } catch (err) {
      {
        err.response && (err.response.status === 409 || err.response.data.message === "ASSESSMENT_ALREADY_PUBLISHED")
          ? toast.error( err.response.data.message.replaceAll("_", " ").toLowerCase(), {
              position: "bottom-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Flip,
              style: { width: "400px" },
            })
          :
        err.response.data.message === "An error occurred while processing your requestjava.util.NoSuchElementException" ? toast.info(
          `No results submitted yet`,
          {
            position: "bottom-left",
            autoClose: 0,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
          }
        ):
         toast.error("somthing Error please try Again", {
              position: "bottom-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Flip,
              style: { width: "400px" },
            });
      }
      dispatch({
        type: ADD_ASSESSMENT_FAIL,
      });
    }

}

// fetch results for examinee

export const fetch_results_by_assessment_Id_for_examinee = (assessmentId) => async (dispatch) => {
  
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
  };
   try {
      const res = await axios.get(
        `${API_BASE_URL}/assessments/attempts/result/fetch_my_results/${assessmentId}`,
        config
      );
     if (
       res.status === 201 ||
       res.status === 200 ||
       res.data.message == "RESULT_FETCH_SUCCESS"
     ) {
        
       if (res.data.body?.length === 0) {
         toast.info("You haven't taken the assessment yet", {
           position: "bottom-left",
           autoClose: 300,
           hideProgressBar: false,
           closeOnClick: false,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "colored",
           transition: Flip,
         });
       } else {
         toast.success("✅ Successfully fetched your assessments!", {
           position: "bottom-left",
           autoClose: 300,
           hideProgressBar: false,
           closeOnClick: false,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "colored",
           transition: Flip,
         });
       }
     }
     return res.data
    } catch (err) {
      {
        err.response && (err.response.status === 409 || err.response.data.message === "ASSESSMENT_ALREADY_PUBLISHED")
          ? toast.error( err.response.data.message.replaceAll("_", " ").toLowerCase(), {
              position: "bottom-left",
              autoClose: 300,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Flip,
              style: { width: "400px" },
            })
          : toast.error("somthing Error please try Again", {
              position: "bottom-left",
              autoClose: 300,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Flip,
              style: { width: "400px" },
            });
      }
      dispatch({
        type: ADD_ASSESSMENT_FAIL,
      });
    }

}

  // results related apis end here

  // admin inputs
export const fetch_results_for_admin = async () => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

  try {
    const res = await axios.get(`${API_BASE_URL}/dashboard/admin`, config);
    
    return res.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error; // rethrow so SWR can detect the error
    }
  }
}


// Bank related Apis start here 

 // create Question
export const createquestion =
  (questionType, sectionId, questionText, options, answers) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    const bodyData = {
      questionType,
      sectionId,
      questionText,
    };

    if (questionType === "TRUE_OR_FALSE") {
      bodyData.answer = answers;
    } else {
      bodyData.answers = answers;
    }

    if (options) {
      bodyData.options = options;
    }

    const body = JSON.stringify(bodyData);
    try {
      const res = await axios.post(
        `${API_BASE_URL}/assessments/add_question`,
        body,
        config
      );
      if (
        res.status === 201 ||
        res.status === 200 ||
        res.data.message == "ASSESSMENT_QUESTION_ADD_SUCCESS"
      ) {
        toast.success(`✅ Successfully created your your question !`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Flip,
        });
      }
      dispatch({
        type: ADD_ASSESSMENT_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      {
        err.response || err.response.status === 409
          ? toast.error("Error with Adding Question", {
              position: "bottom-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Flip,
              style: { width: "400px" },
            })
          : toast.error("somthing Error please try Again", {
              position: "bottom-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Flip,
              style: { width: "400px" },
            });
      }
      dispatch({
        type: ADD_ASSESSMENT_FAIL,
      });
    }
    };
// Add_Quesitions from bank
export const add_Questions_from_bank = (bankId,questionId,sectionId ) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
 
    const bodyData = {
      bankId,
      questionId,
      sectionId,
    };
    try {
      const res = await axios.post( `${API_BASE_URL}/assessments/add_from_bank`, bodyData, config);
     
    }
    catch (err) {
   {
        err.response || err.response.status === 409
          ? toast.error("Error with Adding Question", {
              position: "bottom-left",
              autoClose: 500,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Flip,
              style: { width: "400px" },
            })
          : toast.error("somthing Error please try Again", {
              position: "bottom-left",
              autoClose: 500,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Flip,
              style: { width: "400px" },
            });
      }
      
    }
  
  }
      
// Add question From Bank
export const Add_question_from_bank =
  (questionType, sectionId, questionText, options, answers) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    const bodyData = {
      questionType,
      sectionId,
      questionText,
    };

    if (questionType === "TRUE_OR_FALSE") {
      bodyData.answer = answers;
    } else {
      bodyData.answers = answers;
    }

    if (options) {
      bodyData.options = options;
    }

    const body = JSON.stringify(bodyData);
    try {
      const res = await axios.post(
        `${API_BASE_URL}/assessments/add_question`,
        body,
        config
      );
      if (
        res.status === 201 ||
        res.status === 200 ||
        res.data.message == "ASSESSMENT_QUESTION_ADD_SUCCESS"
      ) {
        toast.success(`✅ Successfully created your your question !`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Flip,
        });
      }
      dispatch({
        type: ADD_ASSESSMENT_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      {
        err.response || err.response.status === 409
          ? toast.error("Error with Adding Question", {
              position: "bottom-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Flip,
              style: { width: "400px" },
            })
          : toast.error("somthing Error please try Again", {
              position: "bottom-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Flip,
              style: { width: "400px" },
            });
      }
      dispatch({
        type: ADD_ASSESSMENT_FAIL,
      });
    }
  };    


  // Take Assessment related Apis

// create settings for assessment
export const Create_do_answer =
  (assessmentId, sectionId, questionId, questionType, answer) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const bodyData = {
      assessmentId,
      sectionId,
      questionId,
      questionType,
    };
    if (questionType === "TRUE_OR_FALSE") {
      bodyData.answer = answer;
    } else {
      bodyData.answers = answer;
    }

    const body = JSON.stringify(bodyData);

    try {
      const res = await axios.post(
        `${API_BASE_URL}/assessments/attempts/do_answer`,
        body,
        config
      );
      if (
        res.status === 201 ||
        res.status === 200 ||
        res.data.message == "ASSESSMENT_ANSWER_SUCCESS"
      ) {
        toast.success(`✅ your answer Updated successfully !`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Flip,
        });
      }
      dispatch({
        type: ADD_ASSESSMENT_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      {
        (err.response && err.response.status === 409) ||
        err.response.data.message == "VALIDATION_ERROR"
          ? toast.error("Re try please", {
              position: "bottom-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Flip,
              style: { width: "400px" },
            })
          : err.response.status == -500
            ? toast.error("SERVER ERROR", {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Flip,
                style: { width: "400px" },
              })
            : "";
      }
      dispatch({
        type: ADD_ASSESSMENT_FAIL,
      });
    }
  };
// STart Assessment
export const Create_start_assessment = (assessmentID) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };
  const body = JSON.stringify({
    assessmentId: assessmentID.assessmentId,
  });


  try {
    // Ensure assessmentId is correctly passed and used
    const res = await axios.post(
      `${API_BASE_URL}/assessments/start_assessment`,
      body,
      config
    );


    if (
      res.status === 201 ||
      res.status === 200 ||
      res.data.message === "ASSESSMENT_START_SUCCESS"
    ) {
      toast.success("✅ Your answer updated successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
    }

    dispatch({
      type: ADD_ASSESSMENT_SUCCESS,
      payload: res.data,
    });
    return res;
  } catch (err) {



    dispatch({
      type: ADD_ASSESSMENT_FAIL,
    });
    return err;
  }
};

// finish Attemt
export const Create_finish_attempt = (assessmentID) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };
  const body = JSON.stringify({
    assessmentId: assessmentID,
  });

  try {
    const res = await axios.post(
      `${API_BASE_URL}/assessments/attempts/finish`,
      body,
      config
    );
    if (
      res.status === 201 ||
      res.status === 200 ||
      res.data.message == "ASSESSMENT_FINISHED_SUCCESS"
    ) {
      toast.success(
        `✅ you sumbitted you assessment Successfully . Wait you response in Result page soon`,
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Flip,
        }
      );
    }
    dispatch({
      type: ADD_ASSESSMENT_SUCCESS,
      payload: res.data,
    });
    return res.data;
  } catch (err) {
    {
      (err.response && err.response?.statusCode === 409) ||
      err.data?.message == "NOT_AUTHORIZED"
        ? toast.error("Re try please", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
            style: { width: "400px" },
          })
        : err.response.status == -500
          ? toast.error("SERVER ERROR", {
              position: "bottom-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Flip,
              style: { width: "400px" },
            })
          : "";
    }
    dispatch({
      type: ADD_ASSESSMENT_FAIL,
    });
  }
};




// admin 
// fetch all users
export const fetchAllUsers = async () => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

  try {
    const res = await axios.get(`${API_BASE_URL}/auth/get_all_users`, config);
    
    return res.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error; // rethrow so SWR can detect the error
    }
  }
    
};
// activate user
export const Toggle_Activate_user = async (userId) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
  const body = JSON.stringify({
      userId,
      
    });
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/toggle_active`,body,config);
    
    return res.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error; // rethrow so SWR can detect the error
    }
  }
    
};

// fetch all roles 
export const fetchAllRoles = async () => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

  try {
    const res = await axios.get(`${API_BASE_URL}/auth/get_roles`, config);
    
    return res.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error; // rethrow so SWR can detect the error
    }
  }
    
};
// create Question Bank , categories , fetch
// create categories
export const create_question_bank_category =
  (name, description) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const body = JSON.stringify({
      name,
      description,
    });
    try {
      const res = await axios.post(
        `${API_BASE_URL}/assessments/bank/categories/create`,
        body,
        config
      );
      if (res.status === 201) {
        toast.success(
          "✅ Successfully created your Category! Your item is now live.",
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
          }
        );
       
      }
      dispatch({
        type: ADD_ASSESSMENT_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      {
        err.response && err.response.status === 409
          ? toast.error("This user already Exist in this platform.", {
              position: "bottom-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Flip,
              style: { width: "400px" },
            })
          : toast.error("somthing Error please try Again", {
              position: "bottom-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Flip,
              style: { width: "400px" },
            });
      }
      dispatch({
        type: ADD_ASSESSMENT_FAIL,
      });
    }
  };

// get all current user categories
export const load_my_categories = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${API_BASE_URL}/assessments/bank/categories/get_all`,
        config
      );
      dispatch({
        type: LOAD_BANK_CATEGORIES_SUCCESS,
        payload: res.data,
      });
      return res.data;
    } catch (err) {
      dispatch({ type: LOAD_BANK_CATEGORIES_FAIL });
      return null;
    }
  } else {
    dispatch({ type: LOAD_BANK_CATEGORIES_FAIL });
    return null;
  }
};
// create question bank under a category
export const create_question_bank =
  (name, description, questionType, categoryId, difficultyLevel) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const body = JSON.stringify({
      name,
      description,
      questionType,
      categoryId,
      difficultyLevel,
    });
    try {
      const res = await axios.post(
        `${API_BASE_URL}/assessments/bank/create`,
        body,
        config
      );
      if (res.status === 201) {
        toast.success(
          "✅ Successfully created your Bank! Your Bank  is now live.",
          {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
          }
        );
      }
      dispatch({
        type: ADD_ASSESSMENT_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      {
        err.response && err.response.status === 409
          ? toast.error("This user already Exist in this platform.", {
              position: "bottom-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Flip,
              style: { width: "400px" },
            })
          : toast.error("somthing Error please try Again", {
              position: "bottom-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Flip,
              style: { width: "400px" },
            });
      }
      dispatch({
        type: ADD_ASSESSMENT_FAIL,
      });
    }
  };
// load current user   question bank
export const load_my_question_Bank = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${API_BASE_URL}/assessments/bank/mine`,
        config
      );
      dispatch({
        type: LOAD_BANK_REPOSITORY_SUCCESS,
        payload: res.data,
      });
      return res.data;
    } catch (err) {
      dispatch({ type: LOAD_BANK_REPOSITORY_FAIL });
      return null;
    }
  } else {
    dispatch({ type: LOAD_BANK_REPOSITORY_FAIL });
    return null;
  }
};
// load current user   question bank
export const load_my_question_Bank_by_CategoryId =
  (categoryId) => async (dispatch) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };

      try {
        const res = await axios.get(
          `${API_BASE_URL}/assessments/bank/categories/get_banks/${categoryId}`,
          config
        );
        dispatch({
          type: LOAD_BANK_REPOSITORY_BY_CATEGORY_ID_SUCCESS,
          payload: res.data,
        });
        // return res.data;
      } catch (err) {
        dispatch({ type: LOAD_BANK_REPOSITORY_BY_CATEGORY_ID_FAIL });
        return null;
      }
    } else {
      dispatch({ type: LOAD_BANK_REPOSITORY_BY_CATEGORY_ID_FAIL });
      return null;
    }
  };

export const load_my_question_Bank_by_BankId = (bankId) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${API_BASE_URL}/assessments/bank/get_by_id/${bankId}`,
        config
      );
      dispatch({
        type: LOAD_REPOSITORY_QUESTIONS_SUCCESS,
        payload: res.data,
      });
      // return res.data;
    } catch (err) {
      dispatch({ type: LOAD_REPOSITORY_QUESTIONS_FAIL });
      return null;
    }
  } else {
    dispatch({ type: LOAD_REPOSITORY_QUESTIONS_FAIL });
    return null;
  }
};

// create Question Bank Question
export const createquestion_for_question_bank =
  (bankId, questionType, questionText, options, answers) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
   
    const bodyData = {
      bankId,
      questionType,
      questionText,
    };

    if (questionType === "TRUE_OR_FALSE") {
      bodyData.answer = answers;
    } else {
      bodyData.answers = answers;
    }

    if (options) {
      bodyData.options = options;
    }

    const body = JSON.stringify(bodyData);
    try {
      const res = await axios.post(
        `${API_BASE_URL}/assessments/bank/add_question`,
        body,
        config
      );
   
      dispatch({
        type: ADD_CATEGORY_FOR_BANK_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
    
      dispatch({
        type: ADD_CATEGORY_FOR_BANK_FAIL,
      });
    }
  };

// Invitation
export const create_send_invitation =
  (assessmentId, emails) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const body = JSON.stringify({
      assessmentId,
      emails,
    });

    try {
      const res = await axios.post(
        `${API_BASE_URL}/assessments/invitations/invite`,
        body,
        config
      );
      if (
        res.status === 201 ||
        res.status === 200 ||
        res.data.message == "SEND_INVITATION_SUCCESS"
      ) {
        toast.success(
          `✅ you Successfully Sent an invitation to your candidates !`,
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
          }
        );
      }
      dispatch({
        type: ADD_ASSESSMENT_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      {
        err.response || err.response.status === 409
          ? toast.error("Error with sending Invitation", {
              position: "bottom-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Flip,
              style: { width: "400px" },
            })
          : toast.error("somthing Error please try Again", {
              position: "bottom-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Flip,
              style: { width: "400px" },
            });
      }
      dispatch({
        type: ADD_ASSESSMENT_FAIL,
      });
    }
  };
// Get invited by assessment Id

export const load_my_inivitation =
  (categoryId) => async (dispatch) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };

      try {
        const res = await axios.get(
          `${API_BASE_URL}/assessments/invitations/mine`,
          config
        );
        return res.data;
      } catch (err) {
        dispatch({ type: LOAD_INVITED_BY_ASSESSMENT_ID_FAIL });
        return null;
      }
    } else {
      dispatch({ type: LOAD_INVITED_BY_ASSESSMENT_ID_FAIL });
      return null;
    }
  };
export const load_invited_candidates_by_assessment_ID =
  (assessmentId) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${API_BASE_URL}/assessments/invitations/get_invited/${assessmentId}`,
        config
      );

      dispatch({
        type: LOAD_INVITED_CANDIDATES_SUCCESS,
        payload: res.data,
      });
      return res.data;
    } catch (err) {
     
      dispatch({
        type: LOAD_INVITED_CANDIDATES_FAIL,
      });
    }
  };
