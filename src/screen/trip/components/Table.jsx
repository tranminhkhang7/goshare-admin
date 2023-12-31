import React, { useEffect, useState } from 'react';

import Image01 from '../../../images/transactions-image-01.svg';
import Image02 from '../../../images/transactions-image-02.svg';
import Image03 from '../../../images/user-36-05.jpg';
import Image04 from '../../../images/transactions-image-03.svg';
import Image05 from '../../../images/transactions-image-04.svg';
import Image06 from '../../../images/transactions-image-05.svg';
import Image07 from '../../../images/transactions-image-06.svg';
import Image08 from '../../../images/transactions-image-07.svg';
import Image09 from '../../../images/transactions-image-08.svg';
import AuthService from '../../../services/AuthService';
import TableItem from './TableItem';

function Table({ selectedItems }) {
  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  const getDriversList = async () => {
    try {
      const result = await AuthService.getTripsList();
      if (result.status === 200) {
        const sortedList = result.data.items.sort((a, b) => {
          const statusOrder = (status) => {
            // Define the order for each status
            switch (status) {
              case 0:
                return 1;
              case 1:
                return 2;
              case 2:
                return 3;
              default:
                return 4; // for other statuses
            }
          };

          const statusComparison =
            statusOrder(a.status) - statusOrder(b.status);
          if (statusComparison !== 0) {
            return statusComparison;
          }

          // If status is the same, sort by startTime
          return new Date(a.startTime) - new Date(b.startTime);
        });

        setList(sortedList);
      }
    } catch (error) {
      console.error('Error fetching or sorting the list:', error);
    }
  };

  useEffect(() => {
    getDriversList();
  }, []);

  useEffect(() => {
    selectedItems(isCheck);
  }, [isCheck]);

  return (
    <>
      <div className='bg-white'>
        <div>
          {/* Table */}
          <div className='overflow-x-auto'>
            <table className='w-full table-auto'>
              {/* Table header */}
              <thead className='text-xs font-semibold uppercase border-t border-b text-slate-500 border-slate-200'>
                <tr>
                  <th className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
                    <div className='font-semibold text-left'>Trạng thái</div>
                  </th>
                  <th className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
                    <div className='font-semibold text-left'>Tên tài xế</div>
                  </th>
                  <th className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
                    <div className='font-semibold text-left'>SĐT tài xế</div>
                  </th>
                  <th className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
                    <div className='font-semibold text-left'>Tên người đặt</div>
                  </th>
                  <th className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
                    <div className='font-semibold text-left'>SĐT người đặt</div>
                  </th>
                  <th className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
                    <div className='font-semibold text-left'>Điểm đón</div>
                  </th>
                  <th className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
                    <div className='font-semibold text-left'>Điểm trả</div>
                  </th>
                  <th className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
                    <div className='font-semibold text-left'>Huỷ chuyến</div>
                  </th>
                  {/* stop here */}
                  {/* <th className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
                    <div className='font-semibold text-left'>Trạng thái</div>
                  </th>

                  <th className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
                    <div className='font-semibold text-right'>
                      Thời gian đăng ký
                    </div>
                  </th>
                  <th className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
                    <div className='font-semibold text-left'>Xác thực</div>
                  </th> */}
                </tr>
              </thead>
              {/* Table body */}
              <tbody className='text-sm border-b divide-y divide-slate-200 border-slate-200'>
                {list.map((trip) => {
                  return <TableItem key={trip.id} {...trip} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
