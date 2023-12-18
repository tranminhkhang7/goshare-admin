import React from 'react';

import Image01 from '../../images/user-28-01.jpg';
import Image02 from '../../images/user-28-02.jpg';
import Image03 from '../../images/user-28-03.jpg';
import Image04 from '../../images/user-28-04.jpg';
import Image05 from '../../images/user-28-05.jpg';
import Image06 from '../../images/user-28-06.jpg';
import Image07 from '../../images/user-28-07.jpg';
import Image09 from '../../images/user-28-09.jpg';
import Image11 from '../../images/user-28-11.jpg';
import { formatCurrency, formatDateTime } from '../../utils/Utils';

function AnalyticsCard11(props) {
  // console.log(props.data);
  return (
    <div className='bg-white border rounded-sm shadow-lg col-span-full border-slate-200'>
      <header className='px-5 py-4 border-b border-slate-100'>
        <h2 className='font-semibold text-slate-800'>Top Products</h2>
      </header>
      <div className='p-3'>
        {/* Table */}
        <div className='overflow-x-auto'>
          <table className='w-full table-auto'>
            {/* Table header */}
            <thead className='text-xs uppercase rounded-sm text-slate-400 bg-slate-50'>
              <tr>
                <th className='p-2 whitespace-nowrap'>
                  <div className='font-semibold text-left'>Số tiền</div>
                </th>
                <th className='p-2 whitespace-nowrap'>
                  <div className='font-semibold text-left'>Phương thức thanh toán</div>
                </th>
                <th className='p-2 whitespace-nowrap'>
                  <div className='font-semibold text-left'>Trạng thái</div>
                </th>
                <th className='p-2 whitespace-nowrap'>
                  <div className='font-semibold text-center'>
                   Loại
                  </div>
                </th>
                <th className='p-2 whitespace-nowrap'>
                  <div className='font-semibold text-center'>Ngày tạo</div>
                </th>
             
              </tr>
            </thead>
            {/* Table body */}
            <tbody className='text-sm divide-y divide-slate-100'>
              {props.data?.map((item) => {
                return (
                  <tr>
                    <td className='p-2 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className='mr-2 bg-indigo-500 rounded-full shrink-0 sm:mr-3'></div>
                        <div className='font-medium text-green-500'>
                          + {formatCurrency(item?.amount)}đ
                        </div>
                      </div>
                    </td>

                    <td className='p-2 whitespace-nowrap '>
                      <div className='px-5 text-blue-500 bg-blue-100 rounded-2xl w-fit'>
                        {item?.paymentMethod}
                      </div>
                    </td>
                    <td className='p-2 whitespace-nowrap'>
                      <div className='px-5 bg-emerald-100 text-emerald-500 rounded-2xl w-fit'>
                        {item?.status}
                      </div>
                    </td>
                    <td className='p-2 whitespace-nowrap'>
                      <div className='px-5 text-amber-500 bg-amber-100 rounded-2xl w-fit'>
                        {item?.type}
                      </div>
                    </td>
                    <td className='p-2 whitespace-nowrap'>
                      <div className='font-medium text-left'>
                        {formatDateTime(item?.createTime)}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsCard11;
