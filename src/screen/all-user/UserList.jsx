import React, { useState } from 'react';

import Header from '../../partials/Header';
import SearchForm from '../../partials/actions/SearchForm';
import Table from './components/Table';
import Sidebar from '../../partials/Sidebar';
// import Sidebar from '../../partials/SidebarOriginal';

function UserList() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [transactionPanelOpen, setTransactionPanelOpen] = useState(true);

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
  };

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
                    Quản lý người dùng 🧔‍♂️
                  </h1>
                </div>

                {/* Right: Actions */}
                <div className='grid justify-start grid-flow-col gap-2 sm:auto-cols-max sm:justify-end'>
                  {/* Search form */}
                  <div className='hidden sm:block'>
                    <SearchForm />
                  </div>
                </div>
              </div>

              {/* Table */}
              <Table
                selectedItems={handleSelectedItems}
                setTransactionPanelOpen={setTransactionPanelOpen}
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
