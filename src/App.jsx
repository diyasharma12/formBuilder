import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homPage.jsx";
import EditorPage from "./pages/editorPage.jsx";
import QuizListPage from "./pages/previewPage.jsx";
import PreviewPage from "./components/PreviewPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/editor" element={<EditorPage />} />
      <Route path="/preview" element={<QuizListPage />} />
      <Route path="/preview/:id" element={<PreviewPage />} />
    </Routes>
  );
}
