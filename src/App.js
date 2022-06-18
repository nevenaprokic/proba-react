import "./App.css";
import { Route, Routes } from "react-router-dom";
import Registration from "./components/forms/user/Registration";
import LogIn from "./components/forms/user/Login";
import RegistrationOwner from "./components/forms/user/RegistrationOwner";
import OwnerProfile from "./components/profilePages/userProfile/OwnerProfile";
import InstructorHomePage from "./components/homePages/InstructorHomePage";
import AddAdventurePage from "./components/forms/adventure/AddAdventurePage";
import RegistrationClient from "./components/forms/user/RegistrationClient";
import ChangeOwnerData from "./components/forms/user/ChangeOwnerData";
import ClientProfile from "./components/profilePages/userProfile/ClientProfile";
import CottageOwnerHomePage from "./components/homePages/CottageOwnerHomePage";
import CottageProfilePage from "./components/profilePages/cottageProfile/CottageProfilePage";
import AdventureProfilePage from "./components/profilePages/adventureProfile/AdvetureProfilePage";
import ClientHomePage from "./components/homePages/ClientHomePage";
import ChangePassword from "./components/forms/user/ChangePassword";
import ShipOwnerHomePage from "./components/homePages/ShipOwnerHomePage";
import AdminHomePage from "./components/homePages/AdminHomePage";
import AdminProfile from "./components/profilePages/userProfile/AdminProfile";
import UnauthenticatedUserHomePage from "./components/homePages/UnauthenticatedUserHomePage";
import InstructorsAdventures from "./components/collections/InstructorsAdventures";
import RegistrationRequestsList from "./components/collections/RegistrationRequestsList";
import WorkingCalendar from "./components/calendar/WorkingCalendar";
import LoyalyProgeramPage from "./components/loyalty/LoyaltyProgramPage";
import ChangeLoyaltyCategory from "./components/forms/loyaltyCategory/ChangeLoyaltyCategory";
import AddLoyaltyCategory from "./components/forms/loyaltyCategory/AddLoyaltyCategory";
import DeleteCategory from "./components/forms/loyaltyCategory/DeleteCategory";
import NotApprovedMarks from "./components/graphs/marks/NotApprovedMarks";
import AddAdmin from "./components/forms/user/AddAdmin";
import ReservationReportsList from "./components/forms/reservations/ReservationReporstList";
import ComplaintList from "./components/forms/review/ComplaintsList";
import DeleteAccountRequests from "./components/forms/user/DeleteAccountRequests";
import IncomeStatementAdmin from "./components/graphs/incomeStatement/IncomeStatementAdmin";
import OffersOverview from "./components/forms/OffersOverview";
import AuthetificationFailed from "./components/errorPages/AuthetificationFailed";
import AuthorizationFailed from "./components/errorPages/AuthorizationFailed";

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function App() {
  return (
    <div>
      <Routes>
        <Route path="/authorization-failed" element={<AuthorizationFailed />} />
        <Route
          path="/autentification-failed"
          element={<AuthetificationFailed />}
        />
        <Route path="/" element={<UnauthenticatedUserHomePage />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/registration" element={<Registration />} exact />
        <Route
          path="/registration/registration-owner"
          element={<RegistrationOwner />}
        />
        <Route
          path="/user-home-page/instructor"
          element={<InstructorHomePage />}
        />
        <Route path="/user-profile/instructor" element={<OwnerProfile />} />
        <Route path="/user-profile/client" element={<ClientProfile />} />
        <Route
          path="/user-profile/cottage-owner"
          element={<CottageOwnerHomePage />}
        />
        <Route path="/home-page/client" element={<ClientHomePage />} />
        <Route
          path="/instructor/add-adventure"
          element={<AddAdventurePage />}
        />
        <Route
          path="/registration/registration-client"
          element={<RegistrationClient />}
        />
        <Route path="/owner/change-data" element={<ChangeOwnerData />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route
          path="/cottage-owner/cottage-profile/:id"
          element={<CottageProfilePage />}
        />
        <Route
          path="/instructor/adventure-profile/:id"
          element={<AdventureProfilePage />}
        />
        <Route
          path="/user-profile/ship-owner"
          element={<ShipOwnerHomePage />}
        />
        <Route path="/user-home-page/admin" element={<AdminHomePage />} />
        <Route path="/user-profile/admin" element={<AdminProfile />} />
        <Route
          path="/home-page/unauth-user"
          element={<UnauthenticatedUserHomePage />}
        />
        <Route
          path="/instructor/adventures"
          element={<InstructorsAdventures />}
        />
        <Route
          path="/admin/registration-requests"
          element={<RegistrationRequestsList />}
        />
        <Route path="/owner/calendar" element={<WorkingCalendar />} />
        <Route path="/admin/loyalty-program" element={<LoyalyProgeramPage />} />
        <Route
          path="/admin/loyalty-program/change"
          element={<ChangeLoyaltyCategory />}
        />
        <Route
          path="/admin/loyalty-program/add-category"
          element={<AddLoyaltyCategory />}
        />
        <Route
          path="/admin/loyalty-program/delete-category"
          element={<DeleteCategory />}
        />
        <Route path="/admin/unchecked-marks" element={<NotApprovedMarks />} />
        <Route path="/admin/add-new-admin" element={<AddAdmin />} />
        <Route path="/admin/complaints-review" element={<ComplaintList />} />
        <Route
          path="/admin/reservation-reports"
          element={<ReservationReportsList />}
        />
        <Route
          path="/admin/delete-account-requests"
          element={<DeleteAccountRequests />}
        />
        <Route
          path="/admin/business-report"
          element={<IncomeStatementAdmin />}
        />
        {/* <Route path="/admin/users" element={<UsersOveview />} /> */}
        <Route path="/admin/offers" element={<OffersOverview />} />
      </Routes>
    </div>
  );
}

export default App;
