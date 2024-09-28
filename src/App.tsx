import "./App.css";
import { AuthProvider } from "./services/useAuth";
import { LoginPage } from "./Login/login-form";
import Root from "./routes/root";
import { ProtectedRoute } from "./services/ProtectedRoute";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Root />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
