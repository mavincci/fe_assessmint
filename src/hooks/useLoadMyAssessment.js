import { useDispatch } from "react-redux";
import { load_my_assesment } from "../action/Auth";
import { useEffect } from "react";

export const useLoadAssessment = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(load_my_assesment());
  }, [dispatch]);
};


