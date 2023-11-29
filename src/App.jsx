import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Fintech from './pages/Fintech';
import Customers from './pages/ecommerce/Customers';
import Orders from './pages/ecommerce/Orders';
import Invoices from './pages/ecommerce/Invoices';
import Shop from './pages/ecommerce/Shop';
import Shop2 from './pages/ecommerce/Shop2';
import Product from './pages/ecommerce/Product';
import Cart from './pages/ecommerce/Cart';
import Cart2 from './pages/ecommerce/Cart2';
import Cart3 from './pages/ecommerce/Cart3';
import Pay from './pages/ecommerce/Pay';
import Campaigns from './pages/Campaigns';
import UsersTabs from './pages/community/UsersTabs';
import UsersTiles from './pages/community/UsersTiles';
import Profile from './pages/community/Profile';
import Feed from './pages/community/Feed';
import Forum from './pages/community/Forum';
import ForumPost from './pages/community/ForumPost';
import Meetups from './pages/community/Meetups';
import MeetupsPost from './pages/community/MeetupsPost';
import CreditCards from './pages/finance/CreditCards';
import Transactions from './pages/finance/Transactions';
import TransactionDetails from './pages/finance/TransactionDetails';
import JobListing from './pages/job/JobListing';
import JobPost from './pages/job/JobPost';
import CompanyProfile from './pages/job/CompanyProfile';
import Messages from './pages/Messages';
import TasksKanban from './pages/tasks/TasksKanban';
import TasksList from './pages/tasks/TasksList';
import Inbox from './pages/Inbox';
import Calendar from './pages/Calendar';
import Account from './pages/settings/Account';
import Notifications from './pages/settings/Notifications';
import Apps from './pages/settings/Apps';
import Plans from './pages/settings/Plans';
import Billing from './pages/settings/Billing';
import Feedback from './pages/settings/Feedback';
import Changelog from './pages/utility/Changelog';
import Roadmap from './pages/utility/Roadmap';
import Faqs from './pages/utility/Faqs';
import EmptyState from './pages/utility/EmptyState';
import PageNotFound from './pages/utility/PageNotFound';
import KnowledgeBase from './pages/utility/KnowledgeBase';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import Onboarding01 from './pages/Onboarding01';
import Onboarding02 from './pages/Onboarding02';
import Onboarding03 from './pages/Onboarding03';
import Onboarding04 from './pages/Onboarding04';
import ButtonPage from './pages/component/ButtonPage';
import FormPage from './pages/component/FormPage';
import DropdownPage from './pages/component/DropdownPage';
import AlertPage from './pages/component/AlertPage';
import ModalPage from './pages/component/ModalPage';
import PaginationPage from './pages/component/PaginationPage';
import TabsPage from './pages/component/TabsPage';
import BreadcrumbPage from './pages/component/BreadcrumbPage';
import BadgePage from './pages/component/BadgePage';
import AvatarPage from './pages/component/AvatarPage';
import TooltipPage from './pages/component/TooltipPage';
import AccordionPage from './pages/component/AccordionPage';
import IconsPage from './pages/component/IconsPage';
import AdminRoute from './routes/AdminRoute';

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route path='/signin' element={<Signin />} />

        <Route
          path='/'
          element={
            <AdminRoute>
              <TransactionDetails />
            </AdminRoute>
          }
        />

        <Route
          path='/drivers'
          element={
            <AdminRoute>
              <TransactionDetails />
            </AdminRoute>
          }
        />

        <Route
          path='/ecommerce/customers'
          element={
            <AdminRoute>
              <Customers />
            </AdminRoute>
          }
        />
        <Route
          path='/dashboard/analytics'
          element={
            <AdminRoute>
              <Analytics />
            </AdminRoute>
          }
        />
        <Route
          path='/dashboard/fintech'
          element={
            <AdminRoute>
              <Fintech />
            </AdminRoute>
          }
        />
        <Route
          path='/ecommerce/orders'
          element={
            <AdminRoute>
              <Orders />
            </AdminRoute>
          }
        />
        <Route
          path='/ecommerce/invoices'
          element={
            <AdminRoute>
              <Invoices />
            </AdminRoute>
          }
        />
        <Route
          path='/ecommerce/shop'
          element={
            <AdminRoute>
              <Shop />
            </AdminRoute>
          }
        />
        <Route
          path='/ecommerce/shop-2'
          element={
            <AdminRoute>
              <Shop2 />
            </AdminRoute>
          }
        />
        <Route
          path='/ecommerce/product'
          element={
            <AdminRoute>
              <Product />
            </AdminRoute>
          }
        />
        <Route
          path='/ecommerce/cart'
          element={
            <AdminRoute>
              <Cart />
            </AdminRoute>
          }
        />
        <Route
          path='/ecommerce/cart-2'
          element={
            <AdminRoute>
              <Cart2 />
            </AdminRoute>
          }
        />
        <Route
          path='/ecommerce/cart-3'
          element={
            <AdminRoute>
              <Cart3 />
            </AdminRoute>
          }
        />
        <Route
          path='/ecommerce/pay'
          element={
            <AdminRoute>
              <Pay />
            </AdminRoute>
          }
        />
        <Route
          path='/campaigns'
          element={
            <AdminRoute>
              <Campaigns />
            </AdminRoute>
          }
        />
        <Route
          path='/community/users-tabs'
          element={
            <AdminRoute>
              <UsersTabs />
            </AdminRoute>
          }
        />
        <Route
          path='/community/users-tiles'
          element={
            <AdminRoute>
              <UsersTiles />
            </AdminRoute>
          }
        />
        <Route
          path='/community/profile'
          element={
            <AdminRoute>
              <Profile />
            </AdminRoute>
          }
        />
        <Route
          path='/community/feed'
          element={
            <AdminRoute>
              <Feed />
            </AdminRoute>
          }
        />
        <Route
          path='/community/forum'
          element={
            <AdminRoute>
              <Forum />
            </AdminRoute>
          }
        />
        <Route
          path='/community/forum-post'
          element={
            <AdminRoute>
              <ForumPost />
            </AdminRoute>
          }
        />
        <Route
          path='/community/meetups'
          element={
            <AdminRoute>
              <Meetups />
            </AdminRoute>
          }
        />
        <Route
          path='/community/meetups-post'
          element={
            <AdminRoute>
              <MeetupsPost />
            </AdminRoute>
          }
        />
        <Route
          path='/finance/cards'
          element={
            <AdminRoute>
              <CreditCards />
            </AdminRoute>
          }
        />
        <Route
          path='/finance/transactions'
          element={
            <AdminRoute>
              <Transactions />
            </AdminRoute>
          }
        />
        <Route
          path='/finance/transaction-details'
          element={
            <AdminRoute>
              <TransactionDetails />
            </AdminRoute>
          }
        />
        <Route
          path='/job/job-listing'
          element={
            <AdminRoute>
              <JobListing />
            </AdminRoute>
          }
        />
        <Route
          path='/job/job-post'
          element={
            <AdminRoute>
              <JobPost />
            </AdminRoute>
          }
        />
        <Route
          path='/job/company-profile'
          element={
            <AdminRoute>
              <CompanyProfile />
            </AdminRoute>
          }
        />
        <Route
          path='/messages'
          element={
            <AdminRoute>
              <Messages />
            </AdminRoute>
          }
        />
        <Route
          path='/tasks/kanban'
          element={
            <AdminRoute>
              <TasksKanban />
            </AdminRoute>
          }
        />
        <Route
          path='/tasks/list'
          element={
            <AdminRoute>
              <TasksList />
            </AdminRoute>
          }
        />
        <Route
          path='/inbox'
          element={
            <AdminRoute>
              <Inbox />
            </AdminRoute>
          }
        />
        <Route
          path='/calendar'
          element={
            <AdminRoute>
              <Calendar />
            </AdminRoute>
          }
        />
        <Route
          path='/settings/account'
          element={
            <AdminRoute>
              <Account />
            </AdminRoute>
          }
        />
        <Route
          path='/settings/notifications'
          element={
            <AdminRoute>
              <Notifications />
            </AdminRoute>
          }
        />
        <Route
          path='/settings/apps'
          element={
            <AdminRoute>
              <Apps />
            </AdminRoute>
          }
        />
        <Route
          path='/settings/plans'
          element={
            <AdminRoute>
              <Plans />
            </AdminRoute>
          }
        />
        <Route
          path='/settings/billing'
          element={
            <AdminRoute>
              <Billing />
            </AdminRoute>
          }
        />
        <Route
          path='/settings/feedback'
          element={
            <AdminRoute>
              <Feedback />
            </AdminRoute>
          }
        />
        <Route
          path='/utility/changelog'
          element={
            <AdminRoute>
              <Changelog />
            </AdminRoute>
          }
        />
        <Route
          path='/utility/roadmap'
          element={
            <AdminRoute>
              <Roadmap />
            </AdminRoute>
          }
        />
        <Route
          path='/utility/faqs'
          element={
            <AdminRoute>
              <Faqs />
            </AdminRoute>
          }
        />
        <Route
          path='/utility/empty-state'
          element={
            <AdminRoute>
              <EmptyState />
            </AdminRoute>
          }
        />
        <Route
          path='/utility/404'
          element={
            <AdminRoute>
              <PageNotFound />
            </AdminRoute>
          }
        />
        <Route
          path='/utility/knowledge-base'
          element={
            <AdminRoute>
              <KnowledgeBase />
            </AdminRoute>
          }
        />
        <Route
          path='/signup'
          element={
            <AdminRoute>
              <Signup />
            </AdminRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <AdminRoute>
              <ResetPassword />
            </AdminRoute>
          }
        />
        <Route
          path='/onboarding-01'
          element={
            <AdminRoute>
              <Onboarding01 />
            </AdminRoute>
          }
        />
        <Route
          path='/onboarding-02'
          element={
            <AdminRoute>
              <Onboarding02 />
            </AdminRoute>
          }
        />
        <Route
          path='/onboarding-03'
          element={
            <AdminRoute>
              <Onboarding03 />
            </AdminRoute>
          }
        />
        <Route
          path='/onboarding-04'
          element={
            <AdminRoute>
              <Onboarding04 />
            </AdminRoute>
          }
        />
        <Route
          path='/component/button'
          element={
            <AdminRoute>
              <ButtonPage />
            </AdminRoute>
          }
        />
        <Route
          path='/component/form'
          element={
            <AdminRoute>
              <FormPage />
            </AdminRoute>
          }
        />
        <Route
          path='/component/dropdown'
          element={
            <AdminRoute>
              <DropdownPage />
            </AdminRoute>
          }
        />
        <Route
          path='/component/alert'
          element={
            <AdminRoute>
              <AlertPage />
            </AdminRoute>
          }
        />
        <Route
          path='/component/modal'
          element={
            <AdminRoute>
              <ModalPage />
            </AdminRoute>
          }
        />
        <Route
          path='/component/pagination'
          element={
            <AdminRoute>
              <PaginationPage />
            </AdminRoute>
          }
        />
        <Route
          path='/component/tabs'
          element={
            <AdminRoute>
              <TabsPage />
            </AdminRoute>
          }
        />
        <Route
          path='/component/breadcrumb'
          element={
            <AdminRoute>
              <BreadcrumbPage />
            </AdminRoute>
          }
        />
        <Route
          path='/component/badge'
          element={
            <AdminRoute>
              <BadgePage />
            </AdminRoute>
          }
        />
        <Route
          path='/component/avatar'
          element={
            <AdminRoute>
              <AvatarPage />
            </AdminRoute>
          }
        />
        <Route
          path='/component/tooltip'
          element={
            <AdminRoute>
              <TooltipPage />
            </AdminRoute>
          }
        />
        <Route
          path='/component/accordion'
          element={
            <AdminRoute>
              <AccordionPage />
            </AdminRoute>
          }
        />
        <Route
          path='/component/icons'
          element={
            <AdminRoute>
              <IconsPage />
            </AdminRoute>
          }
        />
        <Route
          path='*'
          element={
            <AdminRoute>
              <PageNotFound />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
