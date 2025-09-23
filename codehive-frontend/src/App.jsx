import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/HomePage";
import EditorPage from "./pages/EditorPage";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <div>
      {/* <Toaster 
        position="top-right" 
        toastOptions={{ 
          success: { style: { background: '#28a745', color: '#fff' } },
          error: { style: { background: '#dc3545', color: '#fff' } },
        }} 
      /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor/:roomId" element={<EditorPage />} />

        <Route path="*"  element={<PageNotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
