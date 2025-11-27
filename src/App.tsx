import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Boards from "./pages/Boards";
import BoardDetails from "./pages/BoardDetails";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <div>
      <Navigation />

      <main style={{ padding: "0 24px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/boards" element={
            <ProtectedRoute>
              <Boards />
            </ProtectedRoute>
          } />
          <Route path="/boards/:id" element={
            <ProtectedRoute>
              <BoardDetails />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;