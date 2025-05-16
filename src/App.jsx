import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthLayout from "./features/auth/AuthLayout";
import LoginForm from "./features/auth/LoginForm";
import SignupForm from "./features/auth/SignupForm";

import Dashboard from "./layouts/Dashboard";
import CreateAssessment from "./features/assesments/CreateAssessment";
import TakeAssessment from "./features/assesments/TakeAssessment";
import Resultpage from "./layouts/ResultPage";
import NoInternetPage from "./layouts/NoInternet";
import Notifications from "./components/Notification";
import UserManagement from "./layouts/User-Management";
import AssessmentManagement from "./features/assesments/AssessmentManagement";
import Full from "./features/assesments/FullScreen";
import ExamUI from "./features/assesments/EXamUI";
import ExaminerDashboard from "./layouts/DefaultDashboard";

import store from "./Store";
import useAuthCheck from "./hooks/useAuthCheck";
import MyAssessment from "./features/assesments/MyAssessment";
import Questions from "./features/questionBank/QuestionBank";
import QuestionCategories from "./features/questionBank/QuestionCategories";
// import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  // useAuthCheck(); 

  return (
    <Provider store={store}>
      <Routes>
        {/* Public Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Route>

        {/* Protected Routes */}
        {/* <Route element={<ProtectedRoute />}> */}
          <Route element={<Dashboard />}>
            <Route path="/create-assignment" element={<CreateAssessment />} />
            <Route path="/take-assessment" element={<TakeAssessment />} />
            <Route path="/take-assessment/:assessmentId" element={<TakeAssessment />} />
            <Route path="/assessment-results" element={<Resultpage />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/home-dashboard" element={<ExaminerDashboard />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/manage-assessment" element={<AssessmentManagement />} />
            <Route path="/assessment/:assessmentId" element={<Full />} />
          <Route path="/another" element={<ExamUI />} />
          <Route path="/assessment" element={<MyAssessment/>}/>
          <Route path="/question-bank" element={<Questions/>}/>
          <Route path="/categories" element={<QuestionCategories/>}/>
          </Route>
        {/* </Route> */}

        {/* Fallback route for 404 / no internet */}
        <Route path="*" element={<NoInternetPage />} />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Flip}
      />
    </Provider>
  );
}

export default App;
