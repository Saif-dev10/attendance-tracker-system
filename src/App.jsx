import { Routes, Route } from "react-router-dom";
import { SemesterSetup } from "./assets/pages/SemesterSetup";
import { Attendance } from "./assets/pages/Attendance";
import { CourseDetails } from "./assets/pages/CourseDetails";
import { PageNotFound } from "./assets/pages/PageNotFound";
import { Dashboard } from "./assets/pages/DashBoard";
import { Summary } from "./assets/pages/Summary";
import { TablePage } from "./assets/pages/TablePage";

function App () {
  return (
    <Routes>
      <Route path="/" element={<SemesterSetup />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/course" element={<CourseDetails />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/summary" element={<Summary />} />
      <Route path="/table" element={<TablePage />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
    
  );
}

export default App;