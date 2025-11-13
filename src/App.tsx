import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/AppLayout/AppLayout";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.appContainer}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<AppLayout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
