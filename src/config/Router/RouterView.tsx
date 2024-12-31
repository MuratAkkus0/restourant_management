import { Routes, Route } from 'react-router-dom';
import LoginView from '../../views/LoginView';
import HomeView from '../../views/HomeView';
import PersonalRegisterView from '../../views/waiter/PersonalRegisterView';
import AdminDashboardView from '../../views/admin/AdminDashboardView';
import ProtectedRegisterAccess from './ProtectedRegisterAccess';
import AdminPanel from '../../views/admin/AdminPanelView';
import AdminPersonalListView from '../../views/admin/AdminPersonalListView';
import AdminMenuView from '../../views/admin/AdminMenuView';
import AdminAccessKeysView from '../../views/admin/AdminAccessKeysView';
import RootView from '../../views/RootView';
import ConfirmAccessView from '../../views/ConfirmAccessView';
import NotFoundView from '../../views/NotFoundView';

function Router() {
  return (
    <>
      <Routes>
        <Route element={<RootView />}>
          <Route index path="/" element={<HomeView />} />
          <Route path="/about-us" element={<ConfirmAccessView />} />
        </Route>

        <Route path="/confirm-access" element={<ConfirmAccessView />} />
        <Route path="/login" element={<LoginView />} />

        <Route path="/personal"></Route>

        <Route path="/admin" element={<AdminPanel />}>
          <Route path="dashboard" element={<AdminDashboardView />} />
          <Route path="personal-list" element={<AdminPersonalListView />} />
          <Route path="menu" element={<AdminMenuView />} />
          <Route path="access-keys" element={<AdminAccessKeysView />} />
        </Route>

        <Route element={<ProtectedRegisterAccess />}>
          <Route path="/personal">
            <Route path="register" element={<PersonalRegisterView />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </>
  );
}

export default Router;
