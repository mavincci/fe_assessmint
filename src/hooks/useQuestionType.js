import { useDispatch } from "react-redux";
import { load_question_type } from "../action/Auth";
import { useEffect } from "react";

  

export const useLoadQuestionType = () => {
    const dispatch = useDispatch();
     useEffect(() => {
        dispatch(load_question_type());
      }, [dispatch]);
    
}
