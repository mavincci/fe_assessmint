import { useDispatch } from "react-redux";
import { load_my_assesment } from "../action/Auth";
import { useEffect } from "react";

export const useLoadAssessment = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const isExaminer = user.roles.some((role) => role === "EXAMINER");
  useEffect(() => {
    if (isExaminer) {
    dispatch(load_my_assesment());
  
}

  }, [dispatch]);
};


