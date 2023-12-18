import React, { useEffect, useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import Datepicker from '../../components/Datepicker';
import AnalyticsCard01 from '../../partials/analytics/AnalyticsCard01';
import AnalyticsCard02 from '../../partials/analytics/AnalyticsCard02';
import AnalyticsCard03 from '../../partials/analytics/AnalyticsCard03';
import AnalyticsCard04 from '../../partials/analytics/AnalyticsCard04';
import AnalyticsCard05 from '../../partials/analytics/AnalyticsCard05';
import AnalyticsCard06 from '../../partials/analytics/AnalyticsCard06';
import AnalyticsCard07 from '../../partials/analytics/AnalyticsCard07';
import AnalyticsCard08 from '../../partials/analytics/AnalyticsCard08';
import AnalyticsCard09 from '../../partials/analytics/AnalyticsCard09';
import AnalyticsCard10 from '../../partials/analytics/AnalyticsCard10';
import AnalyticsCard11 from '../../partials/analytics/AnalyticsCard11';
import DropdownClassic from '../../components/DropdownClassic';
import AuthService from '../../services/AuthService';

function AnalyticsSystem() {
  const [data, setData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getTransactionList = async () => {
    try {
      const result = await AuthService.getAnalytics();
      if (result.status === 200) {
        // console.log(result.data);
        setData(result.data);
      }
    } catch {}
  };

  useEffect(() => {
    getTransactionList();
  }, []);

  return (
    <div className='flex h-screen overflow-hidden'>
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className='relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto'>
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className='w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl'>
            {/* Page header */}
            <div className='mb-8 sm:flex sm:justify-between sm:items-center'>
              {/* Left: Title */}
              <div className='mb-4 sm:mb-0'>
                <h1 className='text-2xl font-bold md:text-3xl text-slate-800'>
                  Thống kê 📊
                </h1>
              </div>
              <DropdownClassic onFilterChange={(value) => console.log(value)} />
            </div>

            {/* Cards */}
            <div className='grid grid-cols-12 gap-6'>
              {/* Line chart (Analytics) */}
              <AnalyticsCard01 data={data} />
              {/*  Line chart (Active Users Right Now) */}
              <AnalyticsCard02 />
              {/* Stacked bar chart (Acquisition Channels) */}
              {/* <AnalyticsCard03 /> */}
              {/* Horizontal bar chart (Audience Overview) */}
              {/* <AnalyticsCard04 /> */}
              {/* Report card (Top Channels) */}
              {/* <AnalyticsCard05 /> */}
              {/* Report card (Top Pages) */}
              {/* <AnalyticsCard06 /> */}
              {/* Report card (Top Countries) */}
              {/* <AnalyticsCard07 /> */}
              {/* Doughnut chart (Sessions By Device) */}
              {/* <AnalyticsCard08 /> */}
              {/* Doughnut chart (Visit By Age Category) */}
              {/* <AnalyticsCard09 /> */}
              {/* Polar chart (Sessions By Gender) */}
              {/* <AnalyticsCard10 /> */}
              {/* Table (Top Products) */}
              <AnalyticsCard11 data={data} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AnalyticsSystem;
