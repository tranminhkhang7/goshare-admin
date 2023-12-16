import React, { useEffect, useState } from 'react';

import AuthService from '../../../services/AuthService';
import TableItem from './TableItem';

function Table({ selectedItems, setTransactionPanelOpen, searchText }) {
  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  const getDriversList = async () => {
    try {
      const result = await AuthService.getDriversList();
      if (result.status === 200) {
        console.log(result.data.items);
        setList(result.data.items);
      }
    } catch {}
  };

  const [filteredList, setFilteredList] = useState([]);
  useEffect(() => {
    getDriversList();
  }, []);

  useEffect(() => {
    if (searchText === null || searchText.length === 0) {
      setFilteredList(list);
    }
    setFilteredList(
      list.filter((item) => {
        const lowerSearchText = searchText.toLowerCase();
        const lowerName = item.name.toLowerCase();
        const lowerPhone = item.phone.toLowerCase();
        const lowerId = item.id.toLowerCase();

        return (
          lowerName.includes(lowerSearchText) ||
          lowerPhone.includes(lowerSearchText) ||
          lowerId.includes(lowerSearchText)
        );
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
                    <div className='font-semibold text-left'>Tên tài xế</div>
                  </th>
                  <th className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
                    <div className='font-semibold text-left'>Số điện thoại</div>
                  </th>
                  <th className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
                    <div className='font-semibold text-left'>Trạng thái</div>
                  </th>

                  <th className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
                    <div className='font-semibold text-right'>
                      Thời gian đăng ký
                    </div>
                  </th>
                  <th className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
                    <div className='font-semibold text-left'>Xác thực</div>
                  </th>
                  <th className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
                    <div className='font-semibold text-left'>Cập nhật hồ sơ</div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className='text-sm border-b divide-y divide-slate-200 border-slate-200'>
                {filteredList.map((transaction) => {
                  return (
                    <TableItem
                      id={transaction.id}
                      name={transaction.name}
                      gender={transaction.gender}
                      birthday={transaction.birth}
                      avatarUrl={transaction.avatarUrl}
                      phone={transaction.phone}
                      isverify={transaction.isverify}
                      createTime={transaction.createTime}
                      updatedTime={transaction.updatedTime}
                      disabledReason={transaction.disabledReason}
                      car={transaction.car}
                      verifyTo={transaction.verifyTo}
                      // date={transaction.date}
                      // status={transaction.status}
                      // amount={transaction.amount}
                      // handleClick={handleClick}
                      // isChecked={isCheck.includes(transaction.id)}
                      // setTransactionPanelOpen={setTransactionPanelOpen}
                    />
                  );
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
