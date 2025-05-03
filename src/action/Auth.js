import axios from "axios";
import { Navigate } from "react-router-dom";
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, SIGNUP_FAIL, SIGNUP_SUCCESS } from "./Types";
export const API_BASE_URL = import.meta.env.VITE_API_URL;


// export const load_user = () => async (dispatch) => {
//     if (localStorage.getItem("access")) {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `JWT ${localStorage.getItem("access")}`,
//           Accept: "application/json",
//         },
//       };
  
//       try {
//         const res = await axios.get(
//           `${process.env.REACT_APP_API_URL}/apexx/users/me/`,
//           config
//         );
//         dispatch({
//           type: USER_LOADED_SUCCESS,
//           payload: res.data,
//         });
//         if (res.data.role == 1) {
//           return rol;
//         } else {
//           return "";
//         }
//       } catch (err) {
//         dispatch({
//           type: USER_LOADED_FAIL,
//         });
//       }
//     } else {
//       dispatch({
//         type: USER_LOADED_FAIL,
//       });
//     }
// };
  
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
  
      const { refreshToken,token,  user } = res.data.body;
 
      // role = user.roles[1]
      
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { token, refreshToken, user },
      }); 

  console.log(res.data)
      // dispatch(load_user()); // Optional, if you want to validate token later
    } catch (err) {
      console.error(err);
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };
  

  
// signup API
  export const signup =
    (
      firstName,
      lastName,
      email,
      role,
      password,
    ) =>
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
          // Swal.fire({
          //   icon: "success",
          //   title: "Registered Succesfully!",
          //   text: "Visit your Email",
          //   confirmButtonText: "OK",
          // });
          console.log("registered")
        }
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: res.data,
        });
      } catch (err) {
        console.log(err);
        dispatch({
          type: SIGNUP_FAIL,
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