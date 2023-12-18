import React, { useEffect, useState } from 'react';
import TransactionItem from './TransactionsTableItem02';

import Image01 from '../../images/transactions-image-01.svg';
import Image02 from '../../images/transactions-image-02.svg';
import Image03 from '../../images/user-36-05.jpg';
import Image04 from '../../images/transactions-image-03.svg';
import Image05 from '../../images/transactions-image-04.svg';
import Image06 from '../../images/transactions-image-05.svg';
import Image07 from '../../images/transactions-image-06.svg';
import Image08 from '../../images/transactions-image-07.svg';
import Image09 from '../../images/transactions-image-08.svg';
import AuthService from '../../services/AuthService';
import TransactionPanel from './TransactionPanel';

function TransactionsTable02({ selectedItems, setTransactionPanelOpen }) {
  const transactions = [
    {
      id: '0',
      image: Image01,
      name: 'Form Builder CP',
      date: '22/01/2022',
      status: 'Pending',
      amount: '-$1,299.22',
    },
    {
      id: '1',
      image: Image02,
      name: 'Imperial Hotel ****',
      date: '22/01/2022',
      status: 'Completed',
      amount: '-$1,029.77',
    },
    {
      id: '2',
      image: Image03,
      name: 'Aprilynne Pills',
      date: '22/01/2022',
      status: 'Pending',
      amount: '+$499.99',
    },
    {
      id: '3',
      image: Image04,
      name: 'Google Limited UK',
      date: '22/01/2022',
      status: 'Completed',
      amount: '-$1,029.77',
    },
    {
      id: '4',
      image: Image05,
      name: 'Acme LTD UK',
      date: '22/01/2022',
      status: 'Pending',
      amount: '+$2,179.36',
    },
    {
      id: '5',
      image: Image04,
      name: 'Google Limited UK',
      date: '22/01/2022',
      status: 'Canceled',
      amount: '-$1,029.77',
    },
    {
      id: '6',
      image: Image06,
      name: 'Uber',
      date: '22/01/2022',
      status: 'Completed',
      amount: '-$272.88',
    },
    {
      id: '7',
      image: Image07,
      name: 'PublicOne Inc.',
      date: '22/01/2022',
      status: 'Completed',
      amount: '-$199.87',
    },
    {
      id: '8',
      image: Image08,
      name: 'Github Inc.',
      date: '22/01/2022',
      status: 'Completed',
      amount: '-$42.87',
    },
    {
      id: '9',
      image: Image09,
      name: 'Form Builder PRO',
      date: '22/01/2022',
      status: 'Completed',
      amount: '-$112.44',
    },
  ];

  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  const getDriversList = async () => {
    try {
      const result = await AuthService.getDriversList();
      if (result.status === 200) {
      
        setList(result.data.items);
      }
    } catch {}
  };

  useEffect(() => {
    getDriversList();
  }, []);

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
                </tr>
              </thead>
              {/* Table body */}
              <tbody className='text-sm border-b divide-y divide-slate-200 border-slate-200'>
                {list.map((transaction) => {
                  return (
                    <TransactionItem
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

export default TransactionsTable02;
