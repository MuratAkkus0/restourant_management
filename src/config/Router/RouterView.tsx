import { Routes, Route } from 'react-router-dom';
import LoginView from '../../views/LoginView';
import HomeView from '../../views/HomeView';
import AdminOverviewView from '../../views/admin/AdminOverviewView';
import AdminPanelView from '../../views/admin/AdminPanelView';
import RootView from '../../views/RootView';
import NotFoundView from '../../views/NotFoundView';
import AdminRegisterView from '@/views/admin/AdminRegisterView';
import ProtectedRoutes from './ProtectedRoutes';
import { AppUserRoles } from '@/types/enums/AuthEnums';
import AboutUsView from '@/views/AboutUsView';
import AdminProductView from '@/views/admin/AdminProductView';
import AdminProductListView from '@/views/admin/AdminProductListView';
import AdminAddProductView from '@/views/admin/AdminAddProductView';

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
            <Route path="overview" element={<AdminOverviewView />}>
              <Route
                path="todays-orders"
                element={<div>Orders Overview</div>}
              />
              <Route
                path="monthly-reports"
                element={<div>Monthly Reports</div>}
              />
              <Route path="key-metrics" element={<div>Key Metrics</div>} />
            </Route>

            {/* Product Management Section */}
            <Route path="product-management" element={<AdminProductView />}>
              <Route path="product-list" element={<AdminProductListView />} />
              <Route path="add-update" element={<AdminAddProductView />} />
              <Route
                path="product-inventory"
                element={<div>Product Inventory</div>}
              />
              <Route
                path="top-selling"
                element={<div>Top-Selling Products</div>}
              />
            </Route>

            {/* Promotions Section */}
            <Route path="promotions" element={<div>Promotions</div>}>
              <Route
                path="discounts-offers"
                element={<div>Discounts and Offers</div>}
              />
              <Route
                path="campaign-management"
                element={<div>Campaign Management</div>}
              />
            </Route>

            {/* Settings Section */}
            <Route path="settings" element={<div>Settings</div>}>
              <Route
                path="company-info"
                element={<div>Company Information</div>}
              />
              <Route
                path="pos-integration"
                element={<div>POS Integration</div>}
              />
              <Route
                path="access-control"
                element={<div>Access Control & Permissions</div>}
              />
              <Route
                path="notification-preferences"
                element={<div>Notification Preferences</div>}
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
