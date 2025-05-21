import { LOAD_BANK_CATEGORIES_FAIL, LOAD_BANK_CATEGORIES_SUCCESS, LOAD_BANK_REPOSITORY_BY_CATEGORY_ID_FAIL, LOAD_BANK_REPOSITORY_BY_CATEGORY_ID_SUCCESS, LOAD_BANK_REPOSITORY_FAIL, LOAD_BANK_REPOSITORY_SUCCESS, LOAD_REPOSITORY_QUESTIONS_FAIL, LOAD_REPOSITORY_QUESTIONS_SUCCESS } from "../action/Types";

const initialState = {
    BankCategory: [],
    BankRepository: [],
    RepositoryQuestions: [],
    BankRepositoryByID:[],
    loading:true
}

export default function bankreducer(state = initialState, action) {
  const { type, payload } = action;
    
    switch (type) {
        case LOAD_BANK_CATEGORIES_SUCCESS:
            return {
                ...state,
                BankCategory: payload,
                loading:false
            }
        case LOAD_BANK_CATEGORIES_FAIL:
            return {
                ...state,
                BankCategory: [],
                loading:false
            }
        
        case LOAD_BANK_REPOSITORY_SUCCESS:
               return {
                ...state,
                BankRepository: payload,
                loading:false

            }
        case LOAD_BANK_REPOSITORY_FAIL:
               return {
                ...state,
                BankRepository: [],
                loading:false

            }
        case LOAD_BANK_REPOSITORY_BY_CATEGORY_ID_FAIL:
               return {
                ...state,
                BankRepositoryByID: [],
                loading:false

            }
        case LOAD_BANK_REPOSITORY_BY_CATEGORY_ID_SUCCESS:
            return {
                ...state,
                BankRepositoryByID: payload,
                loading:false

            }
        case LOAD_REPOSITORY_QUESTIONS_SUCCESS:
            return {
                ...state,
                RepositoryQuestions: payload,
                loading: false
            }
        case LOAD_REPOSITORY_QUESTIONS_FAIL:
            return {
                ...state,
                RepositoryQuestions: [],
                loading: false
                }
        
         default:
      return state;
    }
    
}