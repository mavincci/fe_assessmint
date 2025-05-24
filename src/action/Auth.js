import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ADD_ASSESSMENT_FAIL, ADD_ASSESSMENT_SUCCESS, ADD_CATEGORY_FOR_BANK_FAIL, ADD_CATEGORY_FOR_BANK_SUCCESS, LOAD_ASSESSMENT_BY_ID_FAIL, LOAD_ASSESSMENT_BY_ID_SUCCESS, LOAD_ASSESSMENT_SETTING_FAIL, LOAD_ASSESSMENT_SETTING_SUCCESS, LOAD_BANK_CATEGORIES_FAIL, LOAD_BANK_CATEGORIES_SUCCESS, LOAD_BANK_REPOSITORY_BY_CATEGORY_ID_FAIL, LOAD_BANK_REPOSITORY_BY_CATEGORY_ID_SUCCESS, LOAD_BANK_REPOSITORY_SUCCESS, LOAD_QUESTION_FAIL, LOAD_QUESTION_SUCCESS, LOAD_REPOSITORY_QUESTIONS_FAIL, LOAD_REPOSITORY_QUESTIONS_SUCCESS, LOAD_SECTION_FAIL, LOAD_SECTION_SUCCESS, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, QUESTION_TYPE_FAIL, QUESTION_TYPE_SUCCESS, SIGNUP_FAIL, SIGNUP_SUCCESS, USER_ASSESSMENT_FAIL, USER_ASSESSMENT_SUCCESS } from "./Types";
import { Flip, toast, ToastContainer } from "react-toastify";
import NoInternetPage from "../layouts/NoInternet";
export const API_BASE_URL = import.meta.env.VITE_API_URL;
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


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
      console.log(err)
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
  console.log("trying.....")
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(`${API_BASE_URL}/assessments/get_by_id/${assessmentId}`, config);
      dispatch({
        type: LOAD_ASSESSMENT_BY_ID_SUCCESS,
        payload: res.data,
      });
      // console.log(res.data)
      return res.data; // Return response instead of JSX
    } catch (err) {
      console.log(err)
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
      const res = await axios.get(`${API_BASE_URL}/assessments/basic_info/${assessmentId}`, config);
      dispatch({
        type: LOAD_ASSESSMENT_SETTING_SUCCESS,
        payload: res.data,
      });
      return res.data; // Return response instead of JSX
    } catch (err) {
      console.log(err)
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
      const res = await axios.get(`${API_BASE_URL}/assessments/get_sections/${assessmentId}`, config);
      dispatch({
        type: LOAD_SECTION_SUCCESS,
        payload: res.data,
      });
      console.log(res.data)
      return res.data; 
    } catch (err) {
      console.log(err)
      dispatch({ type: LOAD_SECTION_FAIL });
      return null;
    }
  } else {
    dispatch({ type: LOAD_SECTION_FAIL });
    return null;
  }
};

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
      const res = await axios.get(`${API_BASE_URL}/assessments/get_by_id/${assessmentId}`, config);
      dispatch({
        type: LOAD_SECTION_SUCCESS,
        payload: res.data,
      });
      console.log(res.data)
      return res.data; 
    } catch (err) {
      console.log(err)
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
    console.log("token access",localStorage.getItem("access") )
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(`${API_BASE_URL}/assessments/get_questions/${sectionID}`, config);
      dispatch({
        type: LOAD_QUESTION_SUCCESS,
        payload: res.data,
      });
      console.log(res.data)
      return res.data; 
    } catch (err) {
      console.log(err)
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
      const res = await axios.get(`${API_BASE_URL}/assessments/config/question_types`, config);
      dispatch({
        type: QUESTION_TYPE_SUCCESS,
        payload: res.data,
      });
      return res.data; 
    } catch (err) {
      console.log(err)
      dispatch({ type: QUESTION_TYPE_FAIL });
      return null;
    }
  } else {
    dispatch({ type: QUESTION_TYPE_FAIL });
    return null;
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
  // Login or sign in
  export const login = (email, password) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const body = JSON.stringify({ email, password });
  
    try {
      const res = await axios.post(
        `${API_BASE_URL}/auth/signin`,
        body,
        config
      );

      // console.log("this res.data.body ", res.data.body.token)
  
      const { refreshToken, token, user } = res.data.body;
 console.log("body",res.data.body)
      // role = user.roles[1]
      
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { token, refreshToken, user },
      }); 

      // console.log(res.data)
     
         toast.success('👋 Welcome Back!  you\'re Succesfully Logged in!', {
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
      // console.error(err.response.status);
    console.log("err", err)
      {err.response.status === 401 ? toast.error( "You're unauthorized! Please check your credentials and try again.", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
        style: {width:"400px"}
        }) : err.response.status == 500 ?toast.error( "You're  not connected To localhost", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Flip,
          style: {width:"400px"}
          }) : ""}
      
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
  export const signup =( firstName, lastName, email, role, password, ) =>
    async (dispatch) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  console.log("API", import.meta.env.VITE_API_URL)
      const body = JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      });
  // console.log("reference" + process.env.REACT_APP_API_URL)
      try {
        const res = await axios.post(
          `${API_BASE_URL}/auth${role == "EXAMINER" ? "/signup_as_examiner" : "/signup_as_examinee" }`,
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
          // console.log("registered");
          //  <Navigate to="/login"/>
          // <Navigate to="/login"/>
        }
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: res.data,
        });
      } catch (err) {
        console.log(err);
        {err.response && err.response.status === 409 ? toast.error( "This user already Exist in this platform.", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Flip,
          style: {width:"400px"}
          }) : ""}
        dispatch({
          type: SIGNUP_FAIL,
        });
      }
  };
    



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
    description
  });
  console.log("Auth body", body)
  try {
    const res = await axios.post(
      `${API_BASE_URL}/assessments/create`,
      body,
      config
    );
    if (res.status === 201) {
      toast.success("✅ Successfully created your Assessment! Your item is now live.", {
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
      // console.log("registered");
      //  <Navigate to="/login"/>
      // <Navigate to="/login"/>
    }
    dispatch({
      type: ADD_ASSESSMENT_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    {err.response && err.response.status === 409 ? toast.error( "This user already Exist in this platform.", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
      style: {width:"400px"}
      }) : toast.error( "somthing Error please try Again", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
        style: {width:"400px"}
        })}
    dispatch({
      type: ADD_ASSESSMENT_FAIL,
    });
  }

}
// Ai
export const Sendrequest = (topic, numberOfQuestions=10) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };
  const body = JSON.stringify({
    topic,
    numberOfQuestions
  });
  console.log("Auth body", body)
  try {
    const res = await axios.post(
      `${API_BASE_URL}/assessments/create`,
      body,
      config
    );
    if (res.status === 201) {
      toast.success("✅ Successfully created your Assessment! Your item is now live.", {
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
      // console.log("registered");
      //  <Navigate to="/login"/>
      // <Navigate to="/login"/>
    }
    dispatch({
      type: ADD_ASSESSMENT_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    {err.response && err.response.status === 409 ? toast.error( "This user already Exist in this platform.", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
      style: {width:"400px"}
      }) : toast.error( "somthing Error please try Again", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
        style: {width:"400px"}
        })}
    dispatch({
      type: ADD_ASSESSMENT_FAIL,
    });
  }

}
    
// Create New Section
export const createSection = (assessmentId, title, description, questionType) => async (dispatch) => {
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
    questionType
  });
  
  try {
    console.log("section body", body)
    const res = await axios.post(
      `${API_BASE_URL}/assessments/add_section`,
      body,
      config
    );
    console.log("Message", res.data.message )
    if (res.status === 201 || res.status === 200 || res.data.message == "ASSESSMENT_SECTION_ADD_SUCCESS") {
      toast.success( `✅ Successfully created your Section ! Your item is now live.`, {
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
    console.log(res.data)
  } catch (err) {
    console.log(err);
    {err.response && err.response.status === 409 ? toast.error( "Confilicting INPUT", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
      style: {width:"400px"}
      }) : toast.error( "somthing Error please try Again", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
        style: {width:"400px"}
        })}
    dispatch({
      type: ADD_ASSESSMENT_FAIL,
    });
  }

}

// create Question 
export const createquestion = (questionType, sectionId, questionText,options, answers) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };
console.log("options",options)
console.log("answers",answers)
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
  console.log("here inauth", bodyData , body)
  try {
    console.log("section body", body)
    const res = await axios.post(
      `${API_BASE_URL}/assessments/add_question`,
      body,
      config
    );
    console.log("Message", res.data.message )
    if (res.status === 201 || res.status === 200 || res.data.message == "ASSESSMENT_QUESTION_ADD_SUCCESS") {
      toast.success( `✅ Successfully created your your question !`, {
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
    console.log(res.data)
  } catch (err) {
    console.log(err);
    {err.response || err.response.status === 409  ? toast.error( "Error with Adding Question", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
      style: {width:"400px"}
      }) : toast.error( "somthing Error please try Again", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
        style: {width:"400px"}
        })}
    dispatch({
      type: ADD_ASSESSMENT_FAIL,
    });
  }

}
// create settings for assessment
export const CreateSetting_for_assessment = (assessmentId, startDateTime, endDateTIme, duration,maxAttempts,isPublic) => async (dispatch) => {
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
    isPublic: typeof isPublic === "boolean" ? isPublic : isPublic === "true"
  });

  try {
    console.log("setting body in Auth", body)
    const res = await axios.post(
      `${API_BASE_URL}/assessments/update_settings`,
      body,
      config
    );
    console.log("Message", res.data.message )
    if (res.status === 201 || res.status === 200 || res.data.message == "ASSESSMENT_SETTINGS_UPDATE_SUCCESS") {
      toast.success( `✅ Successfully set your your setting for your assessment !`, {
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
    console.log(res.data)
  } catch (err) {
    console.log(err);
    {err.response && err.response.status === 409 || err.response.data.message== "VALIDATION_ERROR" ? toast.error( "Check Your Inputs and try again", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
      style: {width:"400px"}
      }) : err.response.status ==- 500 ? toast.error( "somthing Error please try Again", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
        style: {width:"400px"}
        }) : ""}
    dispatch({
      type: ADD_ASSESSMENT_FAIL,
    });
  }

}
// create settings for assessment
export const Create_do_answer = (assessmentId, sectionId, questionId, questionType,answer) => async (dispatch) => {
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
  }
if (questionType === "TRUE_OR_FALSE") {
    bodyData.answer = answer;
  } else {
    bodyData.answers = answer ;
  }

  const body = JSON.stringify(bodyData);

  try {
    console.log("setting body in Auth", body)
    const res = await axios.post(
      `${API_BASE_URL}/assessments/attempts/do_answer`,
      body,
      config
    );
    console.log("Message", res.data.message )
    if (res.status === 201 || res.status === 200 || res.data.message == "ASSESSMENT_ANSWER_SUCCESS") {
      toast.success( `✅ your answer Updated successfully !`, {
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
    console.log(res.data)
  } catch (err) {
    console.log(err);
    {err.response && err.response.status === 409 || err.response.data.message== "VALIDATION_ERROR" ? toast.error( "Re try please", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
      style: {width:"400px"}
      }) : err.response.status ==- 500 ? toast.error( "SERVER ERROR", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
        style: {width:"400px"}
        }) : ""}
    dispatch({
      type: ADD_ASSESSMENT_FAIL,
    });
  }

}
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
 assessmentId:assessmentID.assessmentId
  });
  // Log to check the ID and the Authorization token
  console.log("Assessment ID:", assessmentID.assessmentId);
  console.log("Authorization Token:", localStorage.getItem("access"));

  try {
    // Ensure assessmentId is correctly passed and used
    const res = await axios.post(
      `${API_BASE_URL}/assessments/start_assessment`,body,
      config
    );

    console.log("Message", res);

    if (res.status === 201 || res.status === 200 || res.data.message === "ASSESSMENT_START_SUCCESS") {
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
return res
  } catch (err) {
    console.log("ERROR", err);

    const errorMessage =
      err.response?.data.statusCode === 409
        ? "Retry, please"
        : err.response?.status === 500
        ? "SERVER ERROR"
        : "Something went wrong";

    toast.error(errorMessage, {
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

    dispatch({
      type: ADD_ASSESSMENT_FAIL,
    });
    return err
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
 assessmentId:assessmentID
  });

  try {
    console.log("setting body in Auth create finish attempt", body)
    const res = await axios.post(
      `${API_BASE_URL}/assessments/attempts/finish`,body,
      config
    );
    console.log("Message", res )
    if (res.status === 201 || res.status === 200 || res.data.message == "ASSESSMENT_FINISHED_SUCCESS") {
      toast.success( `✅ you sumbitted you assessment Successfully . Wait you response in Result page soon`, {
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
    console.log("res, res", res)
    return res.data
  } catch (err) {
    console.log("ERROR",err);
    {err.response && err.response?.statusCode === 409 || err.data?.message == "NOT_AUTHORIZED"  ? toast.error( "Re try please", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
      style: {width:"400px"}
      }) : err.response.status ==- 500 ? toast.error( "SERVER ERROR", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
        style: {width:"400px"}
        }) : ""}
    dispatch({
      type: ADD_ASSESSMENT_FAIL,
    });
  }

}


// create Question Bank , categories , fetch
// create categories
export const create_question_bank_category = (name, description) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };
  const body = JSON.stringify({
    name,
    description
  });
  console.log("Auth body", body)
  try {
    const res = await axios.post(
      `${API_BASE_URL}/assessments/bank/categories/create`,
      body,
      config
    );
    if (res.status === 201) {
      toast.success("✅ Successfully created your Category! Your item is now live.", {
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
      // console.log("registered");
      //  <Navigate to="/login"/>
      // <Navigate to="/login"/>
    }
    dispatch({
      type: ADD_ASSESSMENT_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    {err.response && err.response.status === 409 ? toast.error( "This user already Exist in this platform.", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
      style: {width:"400px"}
      }) : toast.error( "somthing Error please try Again", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
        style: {width:"400px"}
        })}
    dispatch({
      type: ADD_ASSESSMENT_FAIL,
    });
  }

}

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
      const res = await axios.get(`${API_BASE_URL}/assessments/bank/categories/get_all`, config);
      dispatch({
        type: LOAD_BANK_CATEGORIES_SUCCESS,
        payload: res.data,
      });
      return res.data; 
    } catch (err) {
      console.log(err)
      dispatch({ type: LOAD_BANK_CATEGORIES_FAIL });
      return null;
    }
  } else {
    dispatch({ type: LOAD_BANK_CATEGORIES_FAIL });
    return null;
  }
};
// create question bank under a category
export const create_question_bank = (name, description,questionType,categoryId,difficultyLevel) => async (dispatch) => {
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
    difficultyLevel
  });
  console.log("Auth body", body)
  try {
    const res = await axios.post(
      `${API_BASE_URL}/assessments/bank/create`,
      body,
      config
    );
    if (res.status === 201) {
      toast.success("✅ Successfully created your Bank! Your Bank  is now live.", {
        position: "top-center",
        autoClose: 1500,
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
    console.log(err);
    {err.response && err.response.status === 409 ? toast.error( "This user already Exist in this platform.", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
      style: {width:"400px"}
      }) : toast.error( "somthing Error please try Again", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
        style: {width:"400px"}
        })}
    dispatch({
      type: ADD_ASSESSMENT_FAIL,
    });
  }

}
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
      const res = await axios.get(`${API_BASE_URL}/assessments/bank/mine`, config);
      dispatch({
        type: LOAD_BANK_REPOSITORY_SUCCESS,
        payload: res.data,
      });
      return res.data; 
    } catch (err) {
      console.log(err)
      dispatch({ type: LOAD_BANK_REPOSITORY_FAIL });
      return null;
    }
  } else {
    dispatch({ type: LOAD_BANK_REPOSITORY_FAIL });
    return null;
  }
};
// load current user   question bank
  export const load_my_question_Bank_by_CategoryId = (categoryId) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(`${API_BASE_URL}/assessments/bank/categories/get_banks/${categoryId}`, config);
      dispatch({
        type: LOAD_BANK_REPOSITORY_BY_CATEGORY_ID_SUCCESS,
        payload: res.data,
      });
      // return res.data; 
    } catch (err) {
      console.log(err)
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
      const res = await axios.get(`${API_BASE_URL}/assessments/bank/get_by_id/${bankId}`, config);
      dispatch({
        type: LOAD_REPOSITORY_QUESTIONS_SUCCESS,
        payload: res.data,
      });
      // return res.data; 
      
    } catch (err) {
      console.log(err)
      dispatch({ type: LOAD_REPOSITORY_QUESTIONS_FAIL });
      return null;
    }
  } else {
    dispatch({ type: LOAD_REPOSITORY_QUESTIONS_FAIL });
    return null;
  }
};


// create Question Bank Question
export const createquestion_for_question_bank = (bankId, questionType, questionText,options, answers) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };
console.log("options",options)
console.log("answers",answers)
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
  console.log("here inauth bank", bodyData )
  try {
    console.log("section body", body)
    const res = await axios.post(
      `${API_BASE_URL}/assessments/bank/add_question`,
      body,
      config
    );
    console.log("Message", res.data.message )
    if (res.status === 201 || res.status === 200 || res.data.message == "QUESTION_BANK_ADD_QUESTION_SUCCESS") {
      toast.success( `✅ Successfully created your your question !`, {
        position: "top-center",
        autoClose: 500,
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
      type: ADD_CATEGORY_FOR_BANK_SUCCESS,
      payload: res.data,
    });
    console.log(res.data)
  } catch (err) {
    console.log(err);
    {err.response || err.response.status === 409  ? toast.error( "Error with Adding Question", {
      position: "bottom-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
      style: {width:"400px"}
      }) : toast.error( "somthing Error please try Again", {
        position: "bottom-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
        style: {width:"400px"}
        })}
    dispatch({
      type: ADD_CATEGORY_FOR_BANK_FAIL,
    });
  }

}


// Invitation
export const create_send_invitation = (assessmentId, emails) => async (dispatch) => {
   const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };
    const body = JSON.stringify({
    assessmentId,
    emails
    });

try {
    console.log("section body", body)
    const res = await axios.post(
      `${API_BASE_URL}/assessments/invitations/invite`,
      body,
      config
    );
    console.log("Message", res.data.message )
    if (res.status === 201 || res.status === 200 || res.data.message == "SEND_INVITATION_SUCCESS") {
      toast.success( `✅ you Successfully Sent an invitation to your candidates !`, {
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
    console.log(res.data)
  } catch (err) {
    console.log(err);
    {err.response || err.response.status === 409  ? toast.error( "Error with Adding Question", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
      style: {width:"400px"}
      }) : toast.error( "somthing Error please try Again", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
        style: {width:"400px"}
        })}
    dispatch({
      type: ADD_ASSESSMENT_FAIL,
    });
  }

}

export const load_invited_candidates_by_assessment_ID= (assessmentId) => async (dispatch) => {
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
    console.log("Message", res.data.message )
    // if (res.status === 201 || res.status === 200 || res.data.message == "GET_INVITED_SUCCESS") {
    //   toast.success( `✅ Invited Candidates are Fetched Successfully !`, {
    //     position: "bottom-center",
    //     autoClose: 500,
    //     hideProgressBar: false,
    //     closeOnClick: false,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "colored",
    //     transition: Flip,
    //   });
     
    // }
    dispatch({
      type: LOAD_INVITED_CANDIDATES_SUCCESS,
      payload: res.data,
    });
  return res.data
  } catch (err) {
    console.log(err);
    // {err.response || err.response.status === 409  ? toast.error( "INVITATION_NOT_FOUND", {
    //   position: "bottom-left",
    //   autoClose: 3000,
    //   hideProgressBar: false,
    //   closeOnClick: false,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "colored",
    //   transition: Flip,
    //   style: {width:"400px"}
    //   }) : toast.error( "somthing Error please try Again", {
    //     position: "bottom-left",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: false,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "colored",
    //     transition: Flip,
    //     style: {width:"400px"}
    //     })}
    dispatch({
      type: LOAD_INVITED_CANDIDATES_FAIL,
    });
  }

}