import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './features/auth/AuthLayout';
import LoginForm from './features/auth/LoginForm';
import SignupForm from './features/auth/SignupForm';
import Dashboard from './layouts/Dashboard';
import CreateAssessment from './features/assesments/CreateAssessment';

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm/>} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          </Route>
          <Route  element={<Dashboard />}>
            <Route path="/create-assignment" element={<CreateAssessment />} />
          <Route path="/dashboard" element={<Navigate to="/dashboard" replace />} />

            
          </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
