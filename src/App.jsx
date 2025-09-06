import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homPage.jsx";
import EditorPage from "./pages/editorPage.jsx";
import QuizListPage from "./pages/previewPage.jsx";
import PreviewPage from "./components/PreviewPage.jsx";
import NotionIntegration from "./components/NotionIntegration.jsx";
import GoogleSheetsIntegration from "./components/GoogleSheetsIntegration.jsx";
import AirtableIntegration from "./components/AirtableIntegration.jsx"; 


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/editor" element={<EditorPage />} />
      <Route path="/preview" element={<QuizListPage />} />
      <Route path="/preview/:id" element={<PreviewPage />} />
      <Route path="/notion-integration" element={<NotionIntegration />} />
      <Route path="/google-sheets-integration" element={<GoogleSheetsIntegration />} />
      <Route path="/airtable-integration" element={<AirtableIntegration />} /> */
    </Routes>
  );
}

