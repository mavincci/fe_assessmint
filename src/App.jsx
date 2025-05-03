import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './features/auth/AuthLayout';
import LoginForm from './features/auth/LoginForm';
import SignupForm from './features/auth/SignupForm';
import Dashboard from './layouts/Dashboard';
import CreateAssessment from './features/assesments/CreateAssessment';
import TakeAssessment from './features/assesments/TakeAssessment';
import { Provider } from 'react-redux';
import store from './Store';
import { LOGOUT } from './action/Types';

function App() {

  return (
    <Provider store={store}  >
  
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm/>} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          </Route>
          <Route  element={<Dashboard />}>
            <Route path="/create-assignment" element={<CreateAssessment />} />
            <Route path="/take-assessment" element={<TakeAssessment />} />
            {/* <Route path="/logout" element={<logout />} /> */}

          <Route path="/dashboard" element={<Navigate to="/dashboard" replace />} />
          
            
          </Route>
      </Routes>
    </Provider>
  )
}

export default App
