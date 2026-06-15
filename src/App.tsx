import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { PeoplePage } from "./components/PeoplePage/PeoplePage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/people" replace />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="*" element={<Navigate to="/people" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;