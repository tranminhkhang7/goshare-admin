import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function SettingsSidebar() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className='flex px-3 py-6 overflow-x-scroll border-b flex-nowrap no-scrollbar md:block md:overflow-auto md:border-b-0 md:border-r border-slate-200 min-w-60 md:space-y-3'>
      {/* Group 1 */}
      <div>
        <div className='mb-3 text-xs font-semibold uppercase text-slate-400'>
          Cài đặt chung
        </div>
        <ul className='flex mr-3 flex-nowrap md:block md:mr-0'>
          <li className='mr-0.5 md:mr-0 md:mb-0.5'>
            <a
              href='#DRIVER_WAGE_PERCENT'
              className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${
                pathname.includes('/settings#DRIVER_WAGE_PERCENT') &&
                'bg-indigo-50'
              }`}
            >
              <span
                className={`text-sm font-medium ${
                  pathname.includes('/settings#DRIVER_WAGE_PERCENT')
                    ? 'text-indigo-500'
                    : 'hover:text-slate-700'
                }`}
              >
                Phần trăm khấu trừ hệ thống
              </span>
            </a>
          </li>
        </ul>
      </div>
      {/* Group 2 */}
      <div>
        <div className='mb-3 text-xs font-semibold uppercase text-slate-400'>
          Cài đặt chuyến
        </div>
        <ul className='flex mr-3 flex-nowrap md:block md:mr-0'>
          {/* Item 1 */}
          <li className='mr-0.5 md:mr-0 md:mb-0.5'>
            <a
              href='#FIND_DRIVER_TIMEOUT'
              className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${
                pathname.includes('/settings#FIND_DRIVER_TIMEOUT') &&
                'bg-indigo-50'
              }`}
            >
              <span
                className={`text-sm font-medium ${
                  pathname.includes('/settings#FIND_DRIVER_TIMEOUT')
                    ? 'text-indigo-500'
                    : 'hover:text-slate-700'
                }`}
              >
                Thời gian tìm kiếm chuyến
              </span>
            </a>
          </li>

          {/* Item 2 */}
          <li className='mr-0.5 md:mr-0 md:mb-0.5'>
            <a
              href='#DRIVER_RESPONSE_TIMEOUT'
              className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${
                pathname.includes('/settings#DRIVER_RESPONSE_TIMEOUT') &&
                'bg-indigo-50'
              }`}
            >
              <span
                className={`text-sm font-medium ${
                  pathname.includes('/settings#DRIVER_RESPONSE_TIMEOUT')
                    ? 'text-indigo-500'
                    : 'hover:text-slate-700'
                }`}
              >
                Thời gian chờ phản hồi
              </span>
            </a>
          </li>
        </ul>
      </div>

      {/* Group 3 */}
      <div>
        <div className='mb-3 text-xs font-semibold uppercase text-slate-400'>
          Cài đặt tài xế
        </div>
        <ul className='flex mr-3 flex-nowrap md:block md:mr-0'>
          {/* Item 1 */}
          <li className='mr-0.5 md:mr-0 md:mb-0.5'>
            <a
              href='#FIND_DRIVER_RADIUS'
              className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${
                pathname.includes('/settings#FIND_DRIVER_RADIUS') &&
                'bg-indigo-50'
              }`}
            >
              <span
                className={`text-sm font-medium ${
                  pathname.includes('/settings#FIND_DRIVER_RADIUS')
                    ? 'text-indigo-500'
                    : 'hover:text-slate-700'
                }`}
              >
                Bước nhảy bán kính tìm kiếm
              </span>
            </a>
          </li>

          {/* Item 2 */}
          <li className='mr-0.5 md:mr-0 md:mb-0.5'>
            <a
              href='#MAX_FIND_DRIVER_RADIUS'
              className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${
                pathname.includes('/settings#MAX_FIND_DRIVER_RADIUS') &&
                'bg-indigo-50'
              }`}
            >
              <span
                className={`text-sm font-medium ${
                  pathname.includes('/settings#MAX_FIND_DRIVER_RADIUS')
                    ? 'text-indigo-500'
                    : 'hover:text-slate-700'
                }`}
              >
                Bán kính tìm kiếm tài xế
              </span>
            </a>
          </li>

          {/* Item 3 */}
          <li className='mr-0.5 md:mr-0 md:mb-0.5'>
            <a
              href='#RATING_THRESHOLD'
              className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${
                pathname.includes('/settings#RATING_THRESHOLD') &&
                'bg-indigo-50'
              }`}
            >
              <span
                className={`text-sm font-medium ${
                  pathname.includes('/settings#RATING_THRESHOLD')
                    ? 'text-indigo-500'
                    : 'hover:text-slate-700'
                }`}
              >
                Đánh giá tối thiểu
              </span>
            </a>
          </li>

          {/* Item 4 */}
          <li className='mr-0.5 md:mr-0 md:mb-0.5'>
            <a
              href='#MINIMUM_BALANCE_LIMIT'
              className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${
                pathname.includes('/settings#MINIMUM_BALANCE_LIMIT') &&
                'bg-indigo-50'
              }`}
            >
              <span
                className={`text-sm font-medium ${
                  pathname.includes('/settings#MINIMUM_BALANCE_LIMIT')
                    ? 'text-indigo-500'
                    : 'hover:text-slate-700'
                }`}
              >
                Số dư tối thiểu
              </span>
            </a>
          </li>

          {/* Item 5 */}
          <li className='mr-0.5 md:mr-0 md:mb-0.5'>
            <a
              href='#NEAR_DESTINATION_DISTANCE'
              className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${
                pathname.includes('/settings#NEAR_DESTINATION_DISTANCE') &&
                'bg-indigo-50'
              }`}
            >
              <span
                className={`text-sm font-medium ${
                  pathname.includes('/settings#NEAR_DESTINATION_DISTANCE')
                    ? 'text-indigo-500'
                    : 'hover:text-slate-700'
                }`}
              >
                Khoảng cách tiêu chuẩn
              </span>
            </a>
          </li>

          {/* Item 6 */}
          <li className='mr-0.5 md:mr-0 md:mb-0.5'>
            <a
              href='#BALANCE_THRESHOLD'
              className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${
                pathname.includes('/settings#BALANCE_THRESHOLD') &&
                'bg-indigo-50'
              }`}
            >
              <span
                className={`text-sm font-medium ${
                  pathname.includes('/settings#BALANCE_THRESHOLD')
                    ? 'text-indigo-500'
                    : 'hover:text-slate-700'
                }`}
              >
                Số dư tối thiểu cảnh báo
              </span>
            </a>
          </li>

          <li className='mr-0.5 md:mr-0 md:mb-0.5'>
            <a
              href='#WARNING_DURATION'
              className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${
                pathname.includes('/settings#WARNING_DURATION') &&
                'bg-indigo-50'
              }`}
            >
              <span
                className={`text-sm font-medium ${
                  pathname.includes('/settings#WARNING_DURATION')
                    ? 'text-indigo-500'
                    : 'hover:text-slate-700'
                }`}
              >
                Thời gian nhận cảnh báo
              </span>
            </a>
          </li>

          {/* Item 8 */}
          <li className='mr-0.5 md:mr-0 md:mb-0.5'>
            <a
              href='#DEBT_REPAYMENT_PERIOD'
              className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${
                pathname.includes('/settings#DEBT_REPAYMENT_PERIOD') &&
                'bg-indigo-50'
              }`}
            >
              <span
                className={`text-sm font-medium ${
                  pathname.includes('/settings#DEBT_REPAYMENT_PERIOD')
                    ? 'text-indigo-500'
                    : 'hover:text-slate-700'
                }`}
              >
                Thời gian mà tài xế hoàn tiền
              </span>
            </a>
          </li>
        </ul>
      </div>

      {/* Group 4 */}
      <div>
        <div className='mb-3 text-xs font-semibold uppercase text-slate-400'>
          Cài đặt người dùng
        </div>
        <ul className='flex mr-3 flex-nowrap md:block md:mr-0'>
          {/* Item 9 */}
          <li className='mr-0.5 md:mr-0 md:mb-0.5'>
            <a
              href='#TRIP_CANCELLATION_LIMIT'
              className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${
                pathname.includes('/settings#TRIP_CANCELLATION_LIMIT') &&
                'bg-indigo-50'
              }`}
            >
              <span
                className={`text-sm font-medium ${
                  pathname.includes('/settings#TRIP_CANCELLATION_LIMIT')
                    ? 'text-indigo-500'
                    : 'hover:text-slate-700'
                }`}
              >
                Giới hạn huỷ chuyến
              </span>
            </a>
          </li>

          {/* Item 10 */}
          <li className='mr-0.5 md:mr-0 md:mb-0.5'>
            <a
              href='#CANCELLATION_BAN_DURATION'
              className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${
                pathname.includes('/settings#CANCELLATION_BAN_DURATION') &&
                'bg-indigo-50'
              }`}
            >
              <span
                className={`text-sm font-medium ${
                  pathname.includes('/settings#CANCELLATION_BAN_DURATION')
                    ? 'text-indigo-500'
                    : 'hover:text-slate-700'
                }`}
              >
                Thời gian vô hiệu hoá
              </span>
            </a>
          </li>

          {/* Item 11 */}
          <li className='mr-0.5 md:mr-0 md:mb-0.5'>
            <a
              href='#TRIP_CANCELLATION_WINDOW'
              className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${
                pathname.includes('/settings#TRIP_CANCELLATION_WINDOW') &&
                'bg-indigo-50'
              }`}
            >
              <span
                className={`text-sm font-medium ${
                  pathname.includes('/settings#TRIP_CANCELLATION_WINDOW')
                    ? 'text-indigo-500'
                    : 'hover:text-slate-700'
                }`}
              >
                Khoảng thời gian vô hiệu hoá
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SettingsSidebar;
