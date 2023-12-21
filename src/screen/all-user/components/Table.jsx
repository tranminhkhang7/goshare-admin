import React, { useEffect, useState } from 'react';

import AuthService from '../../../services/AuthService';
import TableItem from './TableItem';

function Table({ selectedItems, setTransactionPanelOpen, searchText }) {
  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  const getDriversList = async () => {
    try {
      const result = await AuthService.getUsersList();
      if (result.status === 200) {
        setList(result.data.items);
      }
    } catch {}
  };

  const [filteredList, setFilteredList] = useState([]);
  useEffect(() => {
    getDriversList();
  }, []);

  useEffect(() => {
    if (
      searchText === null ||
      searchText.length === 0 ||
      searchText === 'ALL'
    ) {
      setFilteredList(list);
      return;
    }
    setFilteredList(
      list.filter((item) => {
        var role = ''; //driver = 0, dependent = 1, guardian = 2
        if (item?.isdriver) role = 'DRIVER';
        else if (item?.guardian) role = 'DEPENDENT';
        else role = 'GUARDIAN';

        return searchText.includes(role);
      })
    );
  }, [searchText, list]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(list.map((li) => li.id));
    if (selectAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setSelectAll(false);
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

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
                    <div className='font-semibold text-left'>Tài khoản</div>
                  </th>
                  <th className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
                    <div className='font-semibold text-left'>Tên</div>
                  </th>
                  <th className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
                    <div className='font-semibold text-left'>Số điện thoại</div>
                  </th>
                  <th className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
                    <div className='font-semibold text-left'>
                      Thời gian đăng ký
                    </div>
                  </th>
                  <th className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
                    <div className='font-semibold text-left'>Giới tính</div>
                  </th>
                  <th className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
                    <div className='font-semibold text-left'>Số dư ví</div>
                  </th>
                  <th className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
                    <div className='font-semibold text-left'>Vô hiệu hoá</div>
                  </th>
                  <th className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
                    <div className='font-semibold text-left'>
                      Cập nhật số dư
                    </div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className='text-sm border-b divide-y divide-slate-200 border-slate-200'>
                {filteredList.map((user) => {
                  return <TableItem key={user.id} {...user} />;
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
