import React, { useEffect, useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import bike from '../../images/bike.png';
import car4 from '../../images/car4.png';
import car7 from '../../images/car4.png';
import car9 from '../../images/bike9.png';

import AuthService from '../../services/AuthService';
import { formatCurrency } from '../../utils/Utils';
import Toast from '../../components/Toast';

function Fee() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selected, setSelected] = useState();
  const [feeList, setFeeList] = useState();

  const [editBase, setEditBase] = useState(false);
  const [basePrice, setBasePrice] = useState();
  const [baseDistance, setBaseDistance] = useState();

  const [editRange1, setEditRange1] = useState(false);
  const [range1Price, setRange1Price] = useState();

  const [editRange2, setEditRange2] = useState(false);
  const [range2Price, setRange2Price] = useState();

  const [editRange3, setEditRange3] = useState(false);
  const [range3Price, setRange3Price] = useState();

  const [successToast, setSuccessToast] = useState(false);

  const getFee = async () => {
    try {
      const result = await AuthService.getFee();
      if (result.status === 200) {
        setFeeList(result.data);
        setSelected(result.data[3]);
      }
    } catch {}
  };

  useEffect(() => {
    setEditBase(false);
    setEditRange1(false);
    setEditRange2(false);
    setEditRange3(false);

    setBasePrice(selected?.basePrice);
    setBaseDistance(selected?.baseDistance);

    setRange1Price(
      selected?.policies?.find((policy) => policy.minDistance === 1)?.pricePerKm
    );
    setRange2Price(
      selected?.policies?.find((policy) => policy.minDistance === 3)?.pricePerKm
    );
    setRange3Price(
      selected?.policies?.find((policy) => policy.minDistance === 5)?.pricePerKm
    );
  }, [selected]);

  useEffect(() => {
    getFee();
  }, []);

  const handleUpdateBase = async (id) => {
    if (!id) return;

    const payload = {
      base_price: parseFloat(basePrice),
      base_distance: parseFloat(baseDistance),
    };
    try {
      const result = await AuthService.updateBaseFee(id, payload);
      if (result.status === 200) {
        setEditBase(false);
        setSuccessToast(true);
      }
    } catch {}
  };

  const handleUpdateRange = async (id) => {
    console.log(id);
    if (!id) return;
    const payload = {
      price_per_km: parseFloat(range1Price),
    };
    try {
      const result = await AuthService.updateRangeFee(id, payload);
      if (result.status === 200) {
        setEditRange1(false);
        setEditRange2(false);
        setEditRange3(false);
      }
    } catch {}
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
          <div className='lg:relative lg:flex'>
            {/* Content */}
            <div className='w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl'>
              {/* Page header */}
              <div className='mb-5 sm:flex sm:justify-between sm:items-center'>
                {/* Left: Title */}
                <div className='mb-4 sm:mb-0'>
                  <h1 className='text-2xl font-bold md:text-3xl text-slate-800'>
                    Cước phí 💲
                  </h1>
                </div>
              </div>

              {/* Credit cards */}
              <div className='space-y-2'>
                {/* Card 1 */}
                <label
                  className='relative block w-full text-left cursor-pointer'
                  onClick={() => setSelected(feeList[0])}
                >
                  <input
                    type='radio'
                    name='radio-buttons'
                    className='sr-only peer'
                    defaultChecked
                  />
                  <div className='p-4 duration-150 ease-in-out border rounded shadow-sm border-slate-200 hover:border-slate-300'>
                    <div className='grid items-center grid-cols-12 gap-x-2'>
                      {/* Card */}
                      <div className='flex items-center order-1 col-span-6 space-x-4 sm:order-none sm:col-span-3 lg:sidebar-expanded:col-span-6 xl:sidebar-expanded:col-span-3'>
                        <img
                          src={bike}
                          width={36}
                          height={36}
                          className='mr-6'
                        />
                        <div className='order-2 col-span-6 text-left sm:order-none sm:col-span-3 sm:text-center lg:sidebar-expanded:hidden xl:sidebar-expanded:block'>
                          <div className='text-base font-medium truncate text-slate-800'>
                            Xe máy
                          </div>
                        </div>
                      </div>
                      {/* Name */}
                    </div>
                  </div>
                  <div
                    className='absolute inset-0 border-2 border-transparent rounded pointer-events-none peer-checked:border-indigo-400'
                    aria-hidden='true'
                  />
                </label>

                {/* Card 2 */}
                <label
                  className='relative block w-full text-left cursor-pointer'
                  onClick={() => setSelected(feeList[1])}
                >
                  <input
                    type='radio'
                    name='radio-buttons'
                    className='sr-only peer'
                    defaultChecked
                  />
                  <div className='p-4 duration-150 ease-in-out border rounded shadow-sm border-slate-200 hover:border-slate-300'>
                    <div className='grid items-center grid-cols-12 gap-x-2'>
                      {/* Card */}
                      <div className='flex items-center order-1 col-span-6 space-x-4 sm:order-none sm:col-span-3 lg:sidebar-expanded:col-span-6 xl:sidebar-expanded:col-span-3'>
                        <img src={car4} width={62} height={62}></img>
                        <div className='order-2 col-span-6 text-left sm:order-none sm:col-span-3 sm:text-center lg:sidebar-expanded:hidden xl:sidebar-expanded:block'>
                          <div className='text-base font-medium truncate text-slate-800'>
                            Xe ô tô 4 chỗ
                          </div>
                        </div>
                      </div>
                      {/* Name */}
                    </div>
                  </div>
                  <div
                    className='absolute inset-0 border-2 border-transparent rounded pointer-events-none peer-checked:border-indigo-400'
                    aria-hidden='true'
                  />
                </label>

                {/* Card 3 */}
                <label
                  className='relative block w-full text-left cursor-pointer'
                  onClick={() => setSelected(feeList[2])}
                >
                  <input
                    type='radio'
                    name='radio-buttons'
                    className='sr-only peer'
                    defaultChecked
                  />
                  <div className='p-4 duration-150 ease-in-out border rounded shadow-sm border-slate-200 hover:border-slate-300'>
                    <div className='grid items-center grid-cols-12 gap-x-2'>
                      {/* Card */}
                      <div className='flex items-center order-1 col-span-6 space-x-4 sm:order-none sm:col-span-3 lg:sidebar-expanded:col-span-6 xl:sidebar-expanded:col-span-3'>
                        <img src={car7} width={62} height={62}></img>
                        <div className='order-2 col-span-6 text-left sm:order-none sm:col-span-3 sm:text-center lg:sidebar-expanded:hidden xl:sidebar-expanded:block'>
                          <div className='text-base font-medium truncate text-slate-800'>
                            Xe ô tô 7 chỗ
                          </div>
                        </div>
                      </div>
                      {/* Name */}
                    </div>
                  </div>
                  <div
                    className='absolute inset-0 border-2 border-transparent rounded pointer-events-none peer-checked:border-indigo-400'
                    aria-hidden='true'
                  />
                </label>

                {/* Card 4 */}
                <label
                  className='relative block w-full text-left cursor-pointer'
                  onClick={() => setSelected(feeList[3])}
                >
                  <input
                    type='radio'
                    name='radio-buttons'
                    className='sr-only peer'
                    defaultChecked
                  />
                  <div className='p-4 duration-150 ease-in-out border rounded shadow-sm border-slate-200 hover:border-slate-300'>
                    <div className='grid items-center grid-cols-12 gap-x-2'>
                      <div className='flex items-center order-1 col-span-6 space-x-4 sm:order-none sm:col-span-3 lg:sidebar-expanded:col-span-6 xl:sidebar-expanded:col-span-3'>
                        <img src={car9} width={62} height={62}></img>
                        <div className='order-2 col-span-6 text-left sm:order-none sm:col-span-3 sm:text-center lg:sidebar-expanded:hidden xl:sidebar-expanded:block'>
                          <div className='text-base font-medium truncate text-slate-800'>
                            Xe ô tô 9 chỗ
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className='absolute inset-0 border-2 border-transparent rounded pointer-events-none peer-checked:border-indigo-400'
                    aria-hidden='true'
                  />
                </label>

                <Toast
                  type='success'
                  open={successToast}
                  setOpen={setSuccessToast}
                  className={'flex justify-start flex-1'}
                >
                  Cập nhật thành công
                </Toast>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className='lg:sticky lg:top-16 bg-slate-50 lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar lg:shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 lg:w-[390px] lg:h-[calc(100vh-64px)]'>
                <div className='px-4 py-8 lg:px-8'>
                  <div className='max-w-sm mx-auto lg:max-w-none'>
                    <div className='mb-6 font-semibold text-center text-slate-800'>
                      Xe {selected?.carType} chỗ
                    </div>

                    {selected?.carType === 2 ? (
                      <img src={bike} width={'auto'} height={'auto'} />
                    ) : selected?.carType === 4 ? (
                      <img src={car4} width={'auto'} height={'auto'} />
                    ) : selected?.carType === 7 ? (
                      <img src={car7} width={'auto'} height={'auto'} />
                    ) : (
                      <img src={car9} width={'auto'} height={'auto'} />
                    )}

                    {/* Details */}
                    <div className='mt-6'>
                      <div className='mb-1 text-sm font-semibold text-slate-800'>
                        Chi tiết
                      </div>
                      <ul>
                        <li className='flex items-center justify-between py-3 border-b border-slate-200'>
                          <div className='text-sm'>Tên loại xe</div>
                          <div className='ml-2 text-sm font-medium text-slate-800'>
                            Xe {selected?.carType} chỗ
                          </div>
                        </li>
                        {/* <li className='flex items-center justify-between py-3 border-b border-slate-200'>
                          <div className='text-sm'>Status</div>
                          <div className='flex items-center whitespace-nowrap'>
                            <div className='w-2 h-2 mr-2 rounded-full bg-emerald-500' />
                            <div className='text-sm font-medium text-slate-800'>
                              Active
                            </div>
                          </div>
                        </li> */}
                      </ul>
                    </div>

                    {/* Payment Limits */}
                    <div className='mt-6'>
                      <div className='mb-4 text-sm font-semibold text-slate-800'>
                        Thông tin cơ bản
                      </div>
                      <div className='pb-4 border-b border-slate-200'>
                        <div className='flex justify-between mb-2 text-sm'>
                          <div>Phí cơ bản</div>
                          {editBase ? (
                            <input
                              defaultValue={selected?.basePrice}
                              value={basePrice}
                              onChange={(e) => {
                                setBasePrice(e.target.value);
                              }}
                              className='h-6 text-right bg-indigo-100 border-none w-36'
                              type='number'
                            />
                          ) : (
                            <div className='italic'>
                              {formatCurrency(basePrice)}đ
                            </div>
                          )}
                        </div>
                        <div className='flex justify-between mb-2 text-sm'>
                          <div>Khoảng cách cơ bản</div>
                          {editBase ? (
                            <input
                              defaultValue={selected?.baseDistance}
                              value={baseDistance}
                              onChange={(e) => {
                                setBaseDistance(e.target.value);
                              }}
                              className='h-6 text-right bg-indigo-100 border-none w-36'
                              type='number'
                            />
                          ) : (
                            <div className='italic'>{baseDistance}km</div>
                          )}
                        </div>
                      </div>
                      <button
                        className={`w-full btn ${
                          editBase
                            ? 'text-slate-200 border-indigo-500 bg-indigo-500'
                            : 'border-slate-200 text-slate-600'
                        }  hover:border-slate-300 `}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (editBase === true) {
                            handleUpdateBase(selected?.id);
                          } else setEditBase(true);
                        }}
                      >
                        <svg
                          className='w-4 h-4 fill-slate-200 text-slate-500 shrink-0'
                          viewBox='0 0 16 16'
                        >
                          <path d='M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z' />
                        </svg>
                        <span className='ml-2'>Chỉnh sửa</span>
                      </button>
                    </div>

                    <div className='mt-6'>
                      <div className='mb-4 text-sm font-semibold text-slate-800'>
                        Thông tin phí luỹ tiến
                      </div>
                      <div className='pb-4 border-b border-slate-200'>
                        <div className='flex justify-between mb-2 text-sm'>
                          <div>Chặng 1 - 3km</div>
                          {editRange1 ? (
                            <input
                              defaultValue={range1Price}
                              value={range1Price}
                              onChange={(e) => {
                                setRange1Price(e.target.value);
                              }}
                              className='h-6 text-right bg-indigo-100 border-none w-36'
                              type='number'
                            />
                          ) : (
                            <div className='italic'>{range1Price}đ</div>
                          )}
                        </div>
                        <button
                          className={`w-full btn ${
                            editRange1
                              ? 'text-slate-200 border-indigo-500 bg-indigo-500'
                              : 'border-slate-200 text-slate-600'
                          }  hover:border-slate-300 `}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (editRange1 === true) {
                              handleUpdateRange(
                                selected?.policies?.find(
                                  (policy) => policy.minDistance === 1
                                )?.id
                              );
                            } else setEditRange1(true);
                          }}
                        >
                          <svg
                            className='w-4 h-4 fill-current text-slate-500 shrink-0'
                            viewBox='0 0 16 16'
                          >
                            <path d='M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z' />
                          </svg>
                          <span className='ml-2'>Chỉnh sửa</span>
                        </button>

                        <div className='flex justify-between mt-4 mb-2 text-sm'>
                          <div>Chặng 3 - 5km</div>
                          {editRange2 ? (
                            <input
                              defaultValue={range2Price}
                              value={range2Price}
                              onChange={(e) => {
                                setRange2Price(e.target.value);
                              }}
                              className='h-6 text-right bg-indigo-100 border-none w-36'
                              type='number'
                            />
                          ) : (
                            <div className='italic'>{range2Price}đ</div>
                          )}
                        </div>
                        <button
                          className={`w-full btn ${
                            editRange2
                              ? 'text-slate-200 border-indigo-500 bg-indigo-500'
                              : 'border-slate-200 text-slate-600'
                          }  hover:border-slate-300 `}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (editRange2 === true) {
                              handleUpdateRange(
                                selected?.policies?.find(
                                  (policy) => policy.minDistance === 3
                                )?.id
                              );
                            } else setEditRange2(true);
                          }}
                        >
                          <svg
                            className='w-4 h-4 fill-current text-slate-500 shrink-0'
                            viewBox='0 0 16 16'
                          >
                            <path d='M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z' />
                          </svg>
                          <span className='ml-2'>Chỉnh sửa</span>
                        </button>

                        <div className='flex justify-between mt-4 mb-2 text-sm'>
                          <div>Chặng từ 5km</div>
                          {editRange3 ? (
                            <input
                              defaultValue={range3Price}
                              value={range3Price}
                              onChange={(e) => {
                                setRange3Price(e.target.value);
                              }}
                              className='h-6 text-right bg-indigo-100 border-none w-36'
                              type='number'
                            />
                          ) : (
                            <div className='italic'>{range3Price}đ</div>
                          )}
                        </div>
                        <button
                          className={`w-full btn ${
                            editRange3
                              ? 'text-slate-200 border-indigo-500 bg-indigo-500'
                              : 'border-slate-200 text-slate-600'
                          }  hover:border-slate-300 `}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (editRange3 === true) {
                              handleUpdateRange(
                                selected?.policies?.find(
                                  (policy) => policy.minDistance === 5
                                )?.id
                              );
                            } else setEditRange3(true);
                          }}
                        >
                          <svg
                            className='w-4 h-4 fill-current text-slate-500 shrink-0'
                            viewBox='0 0 16 16'
                          >
                            <path d='M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z' />
                          </svg>
                          <span className='ml-2'>Chỉnh sửa</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Fee;
