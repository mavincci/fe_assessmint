import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./features/auth/AuthLayout";
import LoginForm from "./features/auth/LoginForm";
import SignupForm from "./features/auth/SignupForm";
import Dashboard from "./layouts/Dashboard";
import CreateAssessment from "./features/assesments/CreateAssessment";
import TakeAssessment from "./features/assesments/TakeAssessment";
import { Provider } from "react-redux";
import store from "./Store";
import { LOGOUT } from "./action/Types";
import { Flip, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Resultpage from "./layouts/ResultPage";
import NoInternetPage from "./layouts/NoInternet";
import Notifications from "./components/Notification";
import DefaultDashboard from "./layouts/DefaultDashboard";
import UserManagement from "./layouts/User-Management";
import AssessmentManagement from "./features/assesments/AssessmentManagement";
import Full from "./features/assesments/FullScreen";
import ExamUI from "./features/assesments/EXamUI";
function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Route>
        <Route element={<Dashboard />}>
          <Route path="/create-assignment" element={<CreateAssessment />} />
          <Route path="/take-assessment" element={<TakeAssessment />} />
          <Route path="/take-assessment/:assessmentId" element={<TakeAssessment />} />
          <Route path="/assessment-results" element={<Resultpage />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/dashboard-d" element={<DefaultDashboard />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/manage-assessment" element={<AssessmentManagement />} />
          <Route path="/assessment/:assessmentId" element={<Full />} />
          <Route path="/another" element={<ExamUI />} />



          {/* <Route path="/logout" element={<logout />} /> */}

          <Route
            path="/dashboard"
            element={<Navigate to="/dashboard" replace />}
          />
          <Route path="/server-error" Component={<NoInternetPage/>}/>
          
        </Route>
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
