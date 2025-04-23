import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './features/auth/AuthLayout';
import LoginForm from './features/auth/LoginForm';
import SignupForm from './features/auth/SignupForm';
import Dashboard from './components/Dashboard';

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
          <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
