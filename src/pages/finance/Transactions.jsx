import React, { useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import DeleteButton from '../../partials/actions/DeleteButton';
import SearchForm from '../../partials/actions/SearchForm';
import DropdownTransaction from '../../components/DropdownTransaction';
import TransactionsTable from '../../partials/finance/TransactionsTable';
import PaginationClassic from '../../components/PaginationClassic';

function Transactions() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

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
          {/* Content */}
          <div className='w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl'>
            {/* Page header */}
            <div className='mb-4 sm:flex sm:justify-between sm:items-center md:mb-2'>
              {/* Left: Title */}
              <div className='mb-4 sm:mb-0'>
                <h1 className='text-2xl font-bold md:text-3xl text-slate-800'>
                  $47,347.09
                </h1>
              </div>

              {/* Right: Actions */}
              <div className='grid justify-start grid-flow-col gap-2 sm:auto-cols-max sm:justify-end'>
                {/* Delete button */}
                <DeleteButton selectedItems={selectedItems} />

                {/* Search form */}
                <div className='hidden sm:block'>
                  <SearchForm />
                </div>

                {/* Export button */}
                <button className='text-white bg-indigo-500 btn hover:bg-indigo-600'>
                  Export Transactions
                </button>
              </div>
            </div>

            <div className='mb-5'>
              <span>Transactions from </span>
              <DropdownTransaction />
            </div>

            {/* Filters */}
            <div className='mb-5'>
              <ul className='flex flex-wrap -m-1'>
                <li className='m-1'>
                  <button className='inline-flex items-center justify-center px-3 py-1 text-sm font-medium leading-5 text-white duration-150 ease-in-out bg-indigo-500 border border-transparent rounded-full shadow-sm'>
                    View All
                  </button>
                </li>
                <li className='m-1'>
                  <button className='inline-flex items-center justify-center px-3 py-1 text-sm font-medium leading-5 duration-150 ease-in-out bg-white border rounded-full shadow-sm border-slate-200 hover:border-slate-300 text-slate-500'>
                    Completed
                  </button>
                </li>
                <li className='m-1'>
                  <button className='inline-flex items-center justify-center px-3 py-1 text-sm font-medium leading-5 duration-150 ease-in-out bg-white border rounded-full shadow-sm border-slate-200 hover:border-slate-300 text-slate-500'>
                    Pending
                  </button>
                </li>
                <li className='m-1'>
                  <button className='inline-flex items-center justify-center px-3 py-1 text-sm font-medium leading-5 duration-150 ease-in-out bg-white border rounded-full shadow-sm border-slate-200 hover:border-slate-300 text-slate-500'>
                    Canceled
                  </button>
                </li>
              </ul>
            </div>

            {/* Table */}
            <TransactionsTable selectedItems={handleSelectedItems} />

            {/* Pagination */}
            <div className='mt-8'>
              <PaginationClassic />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Transactions;
