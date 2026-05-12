import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./assets/pages/LandingPage";
import { FormPage } from "./assets/pages/FormPage";
import { SemesterSetup } from "./assets/pages/SemesterSetup";
import { Attendance } from "./assets/pages/Attendance";
import { CourseDetails } from "./assets/pages/CourseDetails";
import { PageNotFound } from "./assets/pages/PageNotFound";
import { Dashboard } from "./assets/pages/Dashboard";
import { Summary } from "./assets/pages/Summary";
import { TablePage } from "./assets/pages/TablePage";
import { Notifications } from "./assets/pages/Notifications";

function App () {
  return (
    <Routes>
      <Route path={"/"} element={<LandingPage />} />
      <Route path="/form" element={<FormPage />} />
      <Route path="/semesterSetup" element={<SemesterSetup />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/course" element={<CourseDetails />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/summary" element={<Summary />} />
      <Route path="/table" element={<TablePage />} />
      <Route path="/notifications" element={<Notifications />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
    
  );
}

export default App;