import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Update from './pages/Update'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/update" element={<Update />} />
        <Route path="/" element={<Navigate to="/signin" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App