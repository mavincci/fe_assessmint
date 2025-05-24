import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../features/auth/AuthLayout";
import LoginForm from "../features/auth/LoginForm";
import SignupForm from "../features/auth/SignupForm";
import ProtectedRoutes from "./ProtectedRoute";
import Dashboard from "../layouts/Dashboard";
import ExaminerDashboard from "../layouts/DefaultDashboard";
import CreateAssessment from "../features/assesments/CreateAssessment";
import TakeAssessment from "../features/assesments/TakeAssessment";
import Resultpage from "../layouts/ResultPage";
import Notifications from "../components/Notification";
import UserManagement from "../layouts/User-Management";
import AssessmentManagement from "../features/assesments/AssessmentManagement";
import { Fullscreen } from "lucide-react";
import EXamUI from "../features/assesments/EXamUI";
import MyAssessment from "../features/assesments/MyAssessment";
import ManageRepository from "../features/questionBank/ManageRepository";
import QuestionCategories from "../features/questionBank/QuestionCategories";
import InvitePeople from "../features/assesments/Invitation";
import ScreenReaderComponent from "../features/assesments/CheckVoice";

const getAccessToken = () => {
   return  localStorage.getItem('token');
}

const isAuthenticated = () => {
  return !!getAccessToken();
}


const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <LoginForm />,
            },
            {
                path: "/login",
                element:<LoginForm/>
            },
            {
                path: "/signup",
                element:<SignupForm/>
            }
        ],
    },
    {
        element: <ProtectedRoutes isAuthenticated={isAuthenticated()} />,
        children:[
            {
                element: <Dashboard />,
                children: [
                    { path: "/dashboard", element: <ExaminerDashboard /> },
          { path: "/create-assessment", element: <CreateAssessment /> },
          { path: "/take-assessment", element: <TakeAssessment /> },
          { path: "/take-assessment/:assessmentId", element: <TakeAssessment /> },
          { path: "/assessment-results", element: <Resultpage /> },
          { path: "/notifications", element: <Notifications /> },
          { path: "/user-management", element: <UserManagement /> },
          { path: "/manage-assessment", element: <AssessmentManagement /> },
          { path: "/invitation/:assessmentId", element: <AssessmentManagement /> },
          { path: "/assessment/:assessmentId", element: <Fullscreen /> },
          { path: "/another", element: <EXamUI /> },
          { path: "/assessment", element: <MyAssessment /> },
          { path: "/question-bank", element: <ManageRepository /> },
          { path: "/categories", element: <QuestionCategories /> },
          { path: "/invitiation/:assessmentId/:name", element: <InvitePeople /> },
          { path: "/checkvoice", element: <ScreenReaderComponent /> },
          { path: "/my-question-repository/:categoryName/:categoryId", element: <ManageRepository /> },
                ],
            }
        ]
    }
]);
    
export default router