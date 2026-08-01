import { Routes, Route } from 'react-router-dom';
import LoginView from '../../views/LoginView';
import HomeView from '../../views/HomeView';
import AdminPanelView from '../../views/admin/AdminPanelView';
import RootView from '../../views/RootView';
import NotFoundView from '../../views/NotFoundView';
import AdminRegisterView from '@/views/admin/AdminRegisterView';
import ProtectedRoutes from './ProtectedRoutes';
import { AppUserRoles } from '@/types/enums/AuthEnums';
import AboutUsView from '@/views/AboutUsView';
import AdminProductListView from '@/views/admin/AdminProductListView';
import AdminAddProductView from '@/views/admin/AdminAddProductView';
import { AdminAddCategoryView } from '@/views/admin/AdminAddCategoryView';
import ComingSoonView from '@/views/admin/ComingSoonView';

function Router() {
  return (
    <>
      <Routes>
        <Route element={<RootView />}>
          <Route index path="/" element={<HomeView />} />
          <Route path="/about-us" element={<AboutUsView />} />
        </Route>

        <Route path="/register" element={<AdminRegisterView />} />
        <Route path="/login" element={<LoginView />} />

        <Route
          element={<ProtectedRoutes allowedRoles={[AppUserRoles.ADMIN]} />}
        >
          <Route path="/admin" element={<AdminPanelView />}>
            {/* Overview Section */}
            <Route path="overview">
              <Route
                path="todays-orders"
                element={<ComingSoonView title="Orders Overview" />}
              />
              <Route
                path="monthly-reports"
                element={<ComingSoonView title="Monthly Reports" />}
              />
              <Route
                path="key-metrics"
                element={<ComingSoonView title="Key Metrics" />}
              />
            </Route>

            {/* Product Management Section */}
            <Route path="product-management">
              <Route path="product-list" element={<AdminProductListView />} />
              <Route path="add-update" element={<AdminAddProductView />} />
              <Route
                path="product-inventory"
                element={<ComingSoonView title="Product Inventory" />}
              />
            </Route>

            {/* Category Management Section */}
            <Route path="category-management">
              <Route
                path="category-list"
                element={<ComingSoonView title="Category List" />}
              />
              <Route path="add-update" element={<AdminAddCategoryView />} />
            </Route>

            {/* Promotions Section */}
            <Route path="promotions">
              <Route
                path="discounts-offers"
                element={<ComingSoonView title="Discounts and Offers" />}
              />
              <Route
                path="campaign-management"
                element={<ComingSoonView title="Campaign Management" />}
              />
            </Route>

            {/* Settings Section */}
            <Route path="settings">
              <Route
                path="company-info"
                element={<ComingSoonView title="Company Information" />}
              />
              <Route
                path="pos-integration"
                element={<ComingSoonView title="POS Integration" />}
              />
              <Route
                path="access-control"
                element={
                  <ComingSoonView title="Access Control & Permissions" />
                }
              />
              <Route
                path="notification-preferences"
                element={
                  <ComingSoonView title="Notification Preferences" />
                }
              />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </>
  );
}

export default Router;
