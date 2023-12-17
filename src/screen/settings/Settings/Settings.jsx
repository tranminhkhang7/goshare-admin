import React, { useState } from 'react';

import Sidebar from '../../../partials/Sidebar';
import Header from '../../../partials/Header';
import SettingsSidebar from '../../../partials/settings/SettingsSidebar';
import SettingsBoard from './SettingsBoard';

const pages = [
  'DRIVER_WAGE_PERCENT',
  'FIND_DRIVER_TIMEOUT',
  'DRIVER_RESPONSE_TIMEOUT',
  'FIND_DRIVER_RADIUS',
  'MAX_FIND_DRIVER_RADIUS',
  'RATING_THRESHOLD',
  'MINIMUM_BALANCE_LIMIT',
  'NEAR_DESTINATION_DISTANCE',
  'BALANCE_THRESHOLD',
  'WARNING_DURATION',
  'DEBT_REPAYMENT_PERIOD',
  'TRIP_CANCELLATION_LIMIT',
  'CANCELLATION_BAN_DURATION',
  'TRIP_CANCELLATION_WINDOW',
];

function Settings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='flex h-screen overflow-hidden'>
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className='relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto'>
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className='w-full px-4 py-0 mx-auto sm:px-6 lg:px-8 max-w-9xl'>
            <div className='mb-8'></div>

            {/* Content */}
            <div className='mb-8 bg-white rounded-sm shadow-lg'>
              <div className='flex flex-col md:flex-row md:-mr-px'>
                <SettingsSidebar />
                <div className='flex flex-col flex-1'>
                  {pages.map((page, index) => (
                    <SettingsBoard page={page} key={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Settings;
