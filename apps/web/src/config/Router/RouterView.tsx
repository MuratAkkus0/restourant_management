import { Routes, Route } from 'react-router-dom';
import LoginView from '../../views/LoginView';
import HomeView from '../../views/HomeView';
import AdminPanelView from '../../views/admin/AdminPanelView';
import RootView from '../../views/RootView';
import NotFoundView from '../../views/NotFoundView';
import AdminRegisterView from '@/views/admin/AdminRegisterView';
import ProtectedRoutes from './ProtectedRoutes';
import AdminProductListView from '@/views/admin/AdminProductListView';
import AdminAddProductView from '@/views/admin/AdminAddProductView';
import { AdminAddCategoryView } from '@/views/admin/AdminAddCategoryView';
import AdminOverviewView from '@/views/admin/AdminOverviewView';
import AdminMenuPublishView from '@/views/admin/AdminMenuPublishView';
import AdminCompanyInfoView from '@/views/admin/AdminCompanyInfoView';
import AdminAccessControlView from '@/views/admin/AdminAccessControlView';
import AcceptInviteView from '@/views/AcceptInviteView';
import PublicMenuView from '@/views/PublicMenuView';
import ComingSoonView from '@/views/admin/ComingSoonView';

function Router() {
  return (
    <>
      <Routes>
        <Route element={<RootView />}>
          <Route index path="/" element={<HomeView />} />
        </Route>

        <Route path="/register" element={<AdminRegisterView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/accept-invite" element={<AcceptInviteView />} />
        <Route path="/menu/:companySlug" element={<PublicMenuView />} />

        <Route element={<ProtectedRoutes allowedRoles={['OWNER', 'ADMIN', 'STAFF']} />}>
          <Route path="/admin" element={<AdminPanelView />}>
            {/* Overview Section */}
            <Route path="overview">
              <Route index element={<AdminOverviewView />} />
              <Route path="todays-orders" element={<ComingSoonView title="Orders Overview" />} />
              <Route path="monthly-reports" element={<ComingSoonView title="Monthly Reports" />} />
              <Route path="key-metrics" element={<ComingSoonView title="Key Metrics" />} />
            </Route>

            {/* Product Management Section */}
            <Route path="product-management">
              <Route path="product-list" element={<AdminProductListView />} />
              <Route path="add-update" element={<AdminAddProductView />} />
              <Route path="product-inventory" element={<ComingSoonView title="Product Inventory" />} />
            </Route>

            {/* Category Management Section */}
            <Route path="category-management">
              <Route path="category-list" element={<AdminAddCategoryView />} />
              <Route path="add-update" element={<AdminAddCategoryView />} />
            </Route>

            {/* Menu & QR Section */}
            <Route path="menu">
              <Route path="publish" element={<AdminMenuPublishView />} />
            </Route>

            {/* Promotions Section */}
            <Route path="promotions">
              <Route path="discounts-offers" element={<ComingSoonView title="Discounts and Offers" />} />
              <Route path="campaign-management" element={<ComingSoonView title="Campaign Management" />} />
            </Route>

            {/* Settings Section */}
            <Route path="settings">
              <Route path="company-info" element={<AdminCompanyInfoView />} />
              <Route path="pos-integration" element={<ComingSoonView title="POS Integration" />} />
              <Route path="access-control" element={<AdminAccessControlView />} />
              <Route
                path="notification-preferences"
                element={<ComingSoonView title="Notification Preferences" />}
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
