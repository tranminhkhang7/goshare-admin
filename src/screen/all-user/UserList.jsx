import React, { useState } from 'react';

import Header from '../../partials/Header';
import SearchForm from '../../partials/actions/SearchForm';
import Table from './components/Table';
import Sidebar from '../../partials/Sidebar';
// import Sidebar from '../../partials/SidebarOriginal';

function UserList() {
  const [filter, setFilter] = useState('ALL');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [transactionPanelOpen, setTransactionPanelOpen] = useState(true);

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
  };

  const [searchText, setSearchText] = useState('ALL');

  return (
    <div className='flex h-screen overflow-hidden'>
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className='relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto bg-white'>
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className='relative'>
            {/* Content */}
            <div className='w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl'>
              {/* Page header */}
              <div className='mb-4 sm:flex sm:justify-between sm:items-center md:mb-2'>
                {/* Left: Title */}
                <div className='mb-4'>
                  <h1 className='text-2xl font-bold md:text-3xl text-slate-800'>
                    Quản lý người dùng 👨‍👩‍👧‍👦
                  </h1>
                </div>

                {/* Right: Actions */}
                <div className='grid justify-start grid-flow-col gap-2 sm:auto-cols-max sm:justify-end'>
                  {/* Search form */}
                  <div className='hidden sm:block'>
                    {/* <SearchForm
                      onSearchChange={(value) => {
                        setSearchText(value);
                      }}
                    /> */}
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className='mb-5'>
                <ul className='flex flex-wrap -m-1'>
                  <li className='m-1'>
                    <button
                      className={`inline-flex items-center justify-center px-3 py-1 text-sm font-medium leading-5 duration-150 ease-in-out ${
                        searchText === 'ALL'
                          ? 'bg-indigo-500 text-white'
                          : ' bg-white text-indigo-500'
                      } border rounded-full shadow-sm border-slate-200 hover:border-slate-300`}
                      onClick={() => setSearchText('ALL')}
                    >
                      Tất cả
                    </button>
                  </li>

                  <li className='m-1'>
                    <button
                      onClick={() => setSearchText('GUARDIAN')}
                      className={`${
                        searchText === 'GUARDIAN'
                          ? 'bg-indigo-500 text-white'
                          : ' bg-white text-indigo-500'
                      } inline-flex items-center justify-center px-3 py-1 text-sm font-medium leading-5 duration-150 ease-in-out border rounded-full shadow-sm border-slate-200 hover:border-slate-300`}
                    >
                      Người bảo hộ
                    </button>
                  </li>
                  <li className='m-1'>
                    <button
                      onClick={() => setSearchText('DEPENDENT')}
                      className={`${
                        searchText === 'DEPENDENT'
                          ? 'bg-indigo-500 text-white'
                          : ' bg-white text-indigo-500'
                      } inline-flex items-center justify-center px-3 py-1 text-sm font-medium leading-5 duration-150 ease-in-out border rounded-full shadow-sm border-slate-200 hover:border-slate-300`}
                    >
                      Người phụ thuộc
                    </button>
                  </li>
                  <li className='m-1'>
                    <button
                      onClick={() => setSearchText('DRIVER')}
                      className={`${
                        searchText === 'DRIVER'
                          ? 'bg-indigo-500 text-white'
                          : ' bg-white text-indigo-500'
                      } inline-flex items-center justify-center px-3 py-1 text-sm font-medium leading-5 duration-150 ease-in-out border rounded-full shadow-sm border-slate-200 hover:border-slate-300`}
                    >
                      Tài xế
                    </button>
                  </li>
                </ul>
              </div>

              {/* Table */}
              <Table
                selectedItems={handleSelectedItems}
                setTransactionPanelOpen={setTransactionPanelOpen}
                searchText={searchText}
              />
            </div>

            {/* <TransactionPanel
              transactionPanelOpen={transactionPanelOpen}
              setTransactionPanelOpen={setTransactionPanelOpen}
            /> */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserList;
