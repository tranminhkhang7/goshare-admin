import React, { useEffect, useState } from 'react';
import AuthService from '../../services/AuthService';

// Import utilities

function AnalyticsCard02() {
  const [aboutToPick, setAboutToPick] = useState(0);
  const [onGoing, setOnGoing] = useState(0);

  const fetchTrips = async () => {
    try {
      const result = await AuthService.getTripsList();
      if (result.status === 200) {
        setAboutToPick(
          result.data.items.filter((item) => item.status === 1).length
        );
        setOnGoing(
          result.data.items.filter((item) => item.status === 2).length
        );
      } else {
      }
    } catch {}
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <div className='flex flex-col bg-white border rounded-sm shadow-lg col-span-full xl:col-span-4 border-slate-200'>
      <header className='px-5 py-4 border-b border-slate-100'>
        <h2 className='font-semibold text-slate-800'>
          Đang hoạt động
        </h2>
      </header>
      {/* Card content */}
      <div className='flex flex-col h-full'>
        {/* Live visitors number */}
        <div className='px-5 py-3'>
          <div className='flex items-center'>
            {/* Red dot */}
            <div
              className='relative flex items-center justify-center w-4 h-4 mr-3 rounded-full bg-rose-100'
              aria-hidden='true'
            >
              <div className='absolute w-1.5 h-1.5 rounded-full bg-rose-500'></div>
            </div>
            {/* Vistors number */}
            <div>
              <div className='mr-2 text-3xl font-bold text-slate-800'>{onGoing}</div>
              <div className='text-sm text-slate-500'>Đang trong chuyến</div>
            </div>
          </div>
        </div>

        <div className='px-5 py-3'>
          <div className='flex items-center'>
            {/* Red dot */}
            <div
              className='relative flex items-center justify-center w-4 h-4 mr-3 rounded-full bg-rose-100'
              aria-hidden='true'
            >
              <div className='absolute w-1.5 h-1.5 rounded-full bg-rose-500'></div>
            </div>
            {/* Vistors number */}
            <div>
              <div className='mr-2 text-3xl font-bold text-slate-800'>{aboutToPick}</div>
              <div className='text-sm text-slate-500'>Chuẩn bị vào chuyến</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsCard02;
