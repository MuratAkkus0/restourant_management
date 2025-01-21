import { Routes, Route } from 'react-router-dom';
import LoginView from '../../views/LoginView';
import HomeView from '../../views/HomeView';
import AdminOverviewView from '../../views/admin/AdminOverviewView';
import ProtectedRegisterAccess from './ProtectedRegisterAccess';
import AdminPanelView from '../../views/admin/AdminPanelView';
import RootView from '../../views/RootView';
import ConfirmAccessView from '../../views/ConfirmAccessView';
import NotFoundView from '../../views/NotFoundView';
import AdminRegisterView from '@/views/admin/AdminRegisterView';
import ProtectedRoutes from './ProtectedRoutes';
import { AppUserRoles } from '@/types/enums/AuthEnums';
import AboutUsView from '@/views/AboutUsView';
import AdminOrdersView from '@/views/admin/AdminOrdersView';
import AdminAddPersonalView from '@/views/admin/AdminAddPersonalView';
import PersonalRegister from '@/views/personal/PersonalRegisterView';
import AdminPersonalManagementView from '@/views/admin/AdminPersonalManagementView';
import { AdminPersonalListView } from '@/views/admin/AdminPersonalListView';
import AdminProductView from '@/views/admin/AdminProductView';
import AdminProductListView from '@/views/admin/AdminProductListView';

function Router() {
  return (
    <>
      <Routes>
        <Route element={<RootView />}>
          <Route index path="/" element={<HomeView />} />
          <Route path="/about-us" element={<AboutUsView />} />
        </Route>

        <Route path="/register" element={<AdminRegisterView />} />
        <Route path="/confirm-access" element={<ConfirmAccessView />} />
        <Route path="/login" element={<LoginView />} />

        <Route path="/personal"></Route>
        <Route path="/personal-register" element={<PersonalRegister />} />

        <Route
          element={
            <ProtectedRoutes
              allowedRoles={[AppUserRoles.ADMIN, AppUserRoles.BOSS]}
            />
          }
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

            {/* Orders Section */}
            <Route path="orders" element={<AdminOrdersView />}>
              <Route path="add-order" element={<div>Orders Overview</div>} />
            </Route>

            {/* Personal Management Section */}
            <Route
              path="personal-management"
              element={<AdminPersonalManagementView />}
            >
              <Route
                path="add-new-personal"
                element={<AdminAddPersonalView />}
              />
              <Route path="personal-list" element={<AdminPersonalListView />} />
            </Route>

            {/* Product Management Section */}
            <Route path="product-management" element={<AdminProductView />}>
              <Route path="product-list" element={<AdminProductListView />} />
              <Route
                path="add-update"
                element={<div>Add or Update Products</div>}
              />
              <Route
                path="product-inventory"
                element={<div>Product Inventory</div>}
              />
              <Route
                path="top-selling"
                element={<div>Top-Selling Products</div>}
              />
            </Route>

            {/* Financials Section */}
            <Route path="financials" element={<div>Financials</div>}>
              <Route path="cash-register" element={<div>Cash Register</div>} />
              <Route
                path="invoice-management"
                element={<div>Invoice Management</div>}
              />
              <Route
                path="payment-methods"
                element={<div>Payment Methods</div>}
              />
              <Route
                path="revenue-profit"
                element={<div>Revenue and Profit Analysis</div>}
              />
            </Route>

            {/* Reports Section */}
            <Route path="reports" element={<div>Reports</div>}>
              <Route path="sales-reports" element={<div>Sales Reports</div>} />
              <Route
                path="personal-performance"
                element={<div>Staff Performance</div>}
              />
              <Route
                path="product-sales-analytics"
                element={<div>Product Sales Analytics</div>}
              />
              <Route
                path="custom-report"
                element={<div>Custom Report Generation</div>}
              />
            </Route>

            {/* Customer Management Section */}
            <Route
              path="customer-management"
              element={<div>Customer Management</div>}
            >
              <Route path="customer-list" element={<div>Customer List</div>} />
              <Route
                path="feedback-reviews"
                element={<div>Feedback & Reviews</div>}
              />
              <Route
                path="customer-support"
                element={<div>Customer Support Requests</div>}
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

            {/* Table Management Section */}
            <Route
              path="table-management"
              element={<div>Table Management</div>}
            >
              <Route path="table-layout" element={<div>Table Layout</div>} />
              <Route path="reservations" element={<div>Reservations</div>} />
              <Route
                path="table-assignments"
                element={<div>Table Assignments</div>}
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

        <Route element={<ProtectedRegisterAccess />}>
          <Route path="/personal"></Route>
        </Route>

        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </>
  );
}

export default Router;
