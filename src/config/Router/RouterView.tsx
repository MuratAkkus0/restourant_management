import { Routes, Route } from 'react-router-dom';
import LoginView from '../../views/LoginView';
import HomeView from '../../views/HomeView';
import AdminOverviewView from '../../views/admin/AdminOverviewView';
import ProtectedRegisterAccess from './ProtectedRegisterAccess';
import AdminPanelView from '../../views/admin/AdminPanelView';
import AdminPersonalListView from '../../views/admin/AdminPersonalListView';
import AdminMenuView from '../../views/admin/AdminMenuView';
import AdminAccessKeysView from '../../views/admin/AdminAccessKeysView';
import RootView from '../../views/RootView';
import ConfirmAccessView from '../../views/ConfirmAccessView';
import NotFoundView from '../../views/NotFoundView';
import AdminRegisterView from '@/views/admin/AdminRegisterView';
import ProtectedRoutes from './ProtectedRoutes';
import { AppUserRoles } from '@/types/enums/AuthEnums';
import AboutUsView from '@/views/AboutUsView';

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

        <Route
          element={<ProtectedRoutes allowedRoles={[AppUserRoles.admin]} />}
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
            <Route path="orders" element={<AdminOverviewView />}>
              <Route path="add-order" element={<div>Orders Overview</div>} />
            </Route>

            {/* Admin Personal List Section */}
            <Route path="personal-list" element={<AdminPersonalListView />}>
              <Route path="add-staff" element={<div>Add New Staff</div>} />
              <Route path="assign-tasks" element={<div>Assign Tasks</div>} />
              <Route
                path="performance-metrics"
                element={<div>Staff Performance Metrics</div>}
              />
            </Route>

            {/* Admin Menu Section */}
            <Route path="menu" element={<AdminMenuView />}>
              <Route
                path="add-update"
                element={<div>Add/Update Products</div>}
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

            {/* Admin Access Keys Section */}
            <Route path="access-keys" element={<AdminAccessKeysView />} />

            {/* Staff Management Section */}
            <Route
              path="staff-management"
              element={<div>Staff Management</div>}
            >
              <Route path="staff-list" element={<div>Staff List</div>} />
              <Route path="assign-roles" element={<div>Assign Roles</div>} />
              <Route path="attendance" element={<div>Attendance</div>} />
            </Route>

            {/* Product Management Section */}
            <Route
              path="product-management"
              element={<div>Product Management</div>}
            >
              <Route path="product-list" element={<div>Product List</div>} />
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
                path="staff-performance"
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
