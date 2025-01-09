import { Routes, Route } from 'react-router-dom';
import LoginView from '../../views/LoginView';
import HomeView from '../../views/HomeView';
import AdminDashboardView from '../../views/admin/AdminDashboardView';
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
import { AppUserRoles } from '@/types/models/AuthModels';

function Router() {
  return (
    <>
      <Routes>
        <Route element={<RootView />}>
          <Route index path="/" element={<HomeView />} />
        </Route>
        <Route path="/about-us" element={<ConfirmAccessView />} />

        <Route path="/register" element={<AdminRegisterView />} />
        <Route path="/confirm-access" element={<ConfirmAccessView />} />
        <Route path="/login" element={<LoginView />} />

        <Route path="/personal"></Route>

        <Route
          element={<ProtectedRoutes allowedRoles={[AppUserRoles.admin]} />}
        >
          <Route path="/admin" element={<AdminPanelView />}>
            <Route path="dashboard" element={<AdminDashboardView />}>
              <Route path="orders" element={<div>Orders Overview</div>} />{' '}
              {/* Orders Overview */}
              <Route
                path="monthly-reports"
                element={<div>Monthly Reports</div>}
              />{' '}
              {/* Monthly Reports */}
              <Route path="key-metrics" element={<div>Key Metrics</div>} />{' '}
              {/* Key Metrics */}
            </Route>

            {/* Admin Personal List ve alt yönlendirmeleri */}
            <Route path="personal-list" element={<AdminPersonalListView />}>
              <Route path="add-staff" element={<div>Add New Staff</div>} />{' '}
              {/* Add New Staff */}
              <Route
                path="assign-tasks"
                element={<div>Assign Tasks</div>}
              />{' '}
              {/* Assign Tasks */}
              <Route
                path="performance-metrics"
                element={<div>Staff Performance Metrics</div>}
              />{' '}
              {/* Staff Performance Metrics */}
            </Route>

            {/* Admin Menu ve alt yönlendirmeleri */}
            <Route path="menu" element={<AdminMenuView />}>
              <Route
                path="add-update"
                element={<div>Add/Update Products</div>}
              />{' '}
              {/* Add or Update Products */}
              <Route
                path="product-inventory"
                element={<div>Product Inventory</div>}
              />{' '}
              {/* Product Inventory */}
              <Route
                path="top-selling"
                element={<div>Top-Selling Products</div>}
              />{' '}
              {/* Top-Selling Products */}
            </Route>

            {/* Admin Access Keys */}
            <Route path="access-keys" element={<AdminAccessKeysView />} />

            {/* Staff Management ve alt yönlendirmeleri */}
            <Route
              path="staff-management"
              element={<div>Staff Management</div>}
            >
              <Route path="staff-list" element={<div>Staff List</div>} />{' '}
              {/* Staff List */}
              <Route
                path="assign-roles"
                element={<div>Assign Roles</div>}
              />{' '}
              {/* Assign Roles */}
              <Route path="attendance" element={<div>Attendance</div>} />{' '}
              {/* Attendance */}
            </Route>

            {/* Product Management ve alt yönlendirmeleri */}
            <Route
              path="product-management"
              element={<div>Product Management</div>}
            >
              <Route path="product-list" element={<div>Product List</div>} />{' '}
              {/* Product List */}
              <Route
                path="add-update"
                element={<div>Add or Update Products</div>}
              />{' '}
              {/* Add or Update Products */}
              <Route
                path="product-inventory"
                element={<div>Product Inventory</div>}
              />{' '}
              {/* Product Inventory */}
              <Route
                path="top-selling"
                element={<div>Top-Selling Products</div>}
              />{' '}
              {/* Top-Selling Products */}
            </Route>

            {/* Financials ve alt yönlendirmeleri */}
            <Route path="financials" element={<div>Financials</div>}>
              <Route path="cash-register" element={<div>Cash Register</div>} />{' '}
              {/* Cash Register */}
              <Route
                path="invoice-management"
                element={<div>Invoice Management</div>}
              />{' '}
              {/* Invoice Management */}
              <Route
                path="payment-methods"
                element={<div>Payment Methods</div>}
              />{' '}
              {/* Payment Methods */}
              <Route
                path="revenue-profit"
                element={<div>Revenue and Profit Analysis</div>}
              />{' '}
              {/* Revenue and Profit */}
            </Route>

            {/* Reports ve alt yönlendirmeleri */}
            <Route path="reports" element={<div>Reports</div>}>
              <Route path="sales-reports" element={<div>Sales Reports</div>} />{' '}
              {/* Sales Reports */}
              <Route
                path="staff-performance"
                element={<div>Staff Performance</div>}
              />{' '}
              {/* Staff Performance */}
              <Route
                path="product-sales-analytics"
                element={<div>Product Sales Analytics</div>}
              />{' '}
              {/* Product Sales Analytics */}
              <Route
                path="custom-report"
                element={<div>Custom Report Generation</div>}
              />{' '}
              {/* Custom Report Generation */}
            </Route>

            {/* Customer Management ve alt yönlendirmeleri */}
            <Route
              path="customer-management"
              element={<div>Customer Management</div>}
            >
              <Route path="customer-list" element={<div>Customer List</div>} />{' '}
              {/* Customer List */}
              <Route
                path="feedback-reviews"
                element={<div>Feedback & Reviews</div>}
              />{' '}
              {/* Feedback & Reviews */}
              <Route
                path="customer-support"
                element={<div>Customer Support Requests</div>}
              />{' '}
              {/* Customer Support */}
            </Route>

            {/* Promotions ve alt yönlendirmeleri */}
            <Route path="promotions" element={<div>Promotions</div>}>
              <Route
                path="discounts-offers"
                element={<div>Discounts and Offers</div>}
              />{' '}
              {/* Discounts and Offers */}
              <Route
                path="campaign-management"
                element={<div>Campaign Management</div>}
              />{' '}
              {/* Campaign Management */}
            </Route>

            {/* Table Management ve alt yönlendirmeleri */}
            <Route
              path="table-management"
              element={<div>Table Management</div>}
            >
              <Route path="table-layout" element={<div>Table Layout</div>} />{' '}
              {/* Table Layout */}
              <Route
                path="reservations"
                element={<div>Reservations</div>}
              />{' '}
              {/* Reservations */}
              <Route
                path="table-assignments"
                element={<div>Table Assignments</div>}
              />{' '}
              {/* Table Assignments */}
            </Route>

            {/* Settings ve alt yönlendirmeleri */}
            <Route path="settings" element={<div>Settings</div>}>
              <Route
                path="company-info"
                element={<div>Company Information</div>}
              />{' '}
              {/* Company Information */}
              <Route
                path="pos-integration"
                element={<div>POS Integration</div>}
              />{' '}
              {/* POS Integration */}
              <Route
                path="access-control"
                element={<div>Access Control & Permissions</div>}
              />{' '}
              {/* Access Control */}
              <Route
                path="notification-preferences"
                element={<div>Notification Preferences</div>}
              />{' '}
              {/* Notification Preferences */}
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
