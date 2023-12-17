import React, { useEffect, useState } from 'react';
import AuthService from '../../../services/AuthService';
import Toast from '../../../components/Toast';

const titleMapping = {
  //common
  DRIVER_WAGE_PERCENT: 'Phần trăm khấu trừ hệ thống',
  //trip
  FIND_DRIVER_TIMEOUT: 'Thời gian tìm kiếm chuyến',
  DRIVER_RESPONSE_TIMEOUT: 'Thời gian chờ phản hồi',
  //driver
  FIND_DRIVER_RADIUS: 'Bước nhảy bán kính tìm kiếm',
  MAX_FIND_DRIVER_RADIUS: 'Bán kính tìm kiếm tài xế',
  RATING_THRESHOLD: 'Đánh giá tối thiểu',
  MINIMUM_BALANCE_LIMIT: 'Số dư tối thiểu',
  NEAR_DESTINATION_DISTANCE: 'Khoảng cách tiêu chuẩn',
  BALANCE_THRESHOLD: 'Số dư tối thiểu cảnh báo',
  WARNING_DURATION: 'Thời gian nhận cảnh báo',
  DEBT_REPAYMENT_PERIOD: 'Thời gian mà tài xế hoàn tiền',
  //user
  TRIP_CANCELLATION_LIMIT: 'Giới hạn huỷ chuyến',
  CANCELLATION_BAN_DURATION: 'Thời gian vô hiệu hoá',
  TRIP_CANCELLATION_WINDOW: 'Khoảng thời gian vô hiệu hoá',
};

const titleDataUnitMapping = {
  0: 'Phần trăm',
  1: 'Thời gian',
  2: 'Thời gian',
  3: 'Thời gian',
  4: 'Khoảng cách',
  5: 'Khoảng cách',
  6: 'Số lần',
  7: '',
  8: 'Số tiền',
};

const dataUnitMapping = {
  0: '%',
  1: 'phút',
  2: 'giờ',
  3: 'ngày',
  4: 'm',
  5: 'km',
  6: 'lần',
  7: '',
  8: 'đ',
};

function SettingsBoard(props) {
  var KEY = props.page;
  KEY =
    KEY.toUpperCase().replace(/-/g, '_').replace('/SETTINGS/', '') ||
    'FIND-DRIVER-TIMEOUT';

  const [data, setData] = useState();
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState();

  const [warningToast, setWarningToast] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  const getData = async () => {
    try {
      const result = await AuthService.getSettings();
      if (result.status === 200) {
        setData(result?.data?.find((setting) => setting.key === KEY));
        setEditData(result?.data?.find((setting) => setting.key === KEY).value);
      }
    } catch {}
  };

  useEffect(() => {
    getData();
  }, [KEY]);

  const handleSubmit = async () => {
    if (!editData) {
      setWarningToast(true);
      return;
    }
    setWarningToast(false);

    if (!data.id) return;
    const payload = {
      value: editData,
    };
    try {
      const result = await AuthService.updateSettings(data.id, payload);
      if (result.status === 200) {
        setEdit(false);
        setSuccessToast(true);
      } else {
        setEdit(false);
        setWarningToast(true);
      }
    } catch {
      setEdit(false);
      setWarningToast(true);
    }
  };

  return (
    <>
      <div className='grow' id={KEY}>
        {/* Panel body */}
        <div className='p-6 space-y-6'>
          <div>
            <h2 className='mb-4 text-2xl font-bold text-slate-800'>
              {titleMapping[KEY]}
            </h2>
            <div className='text-sm'>{data?.description}</div>
          </div>

          <section>
            <ul>
              <li className='py-3 border-b md:flex md:justify-between md:items-center border-slate-200'>
                {/* Left */}
                <div className='text-sm font-medium text-slate-800'>
                  {titleDataUnitMapping[data?.dataUnit]}
                </div>
                {/* Right */}
                <div className='text-sm text-slate-800ml-4'>
                  {edit ? (
                    <>
                      <input
                        defaultValue={editData}
                        value={editData}
                        onChange={(e) => {
                          setEditData(e.target.value);
                        }}
                        className='h-6 mr-2 text-right bg-indigo-100 border-none rounded-sm w-36'
                        type='number'
                      />
                      <span className='mr-3'>
                        <i>{dataUnitMapping[data?.dataUnit]}</i>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className='mr-3'>
                        <i>
                          {editData} {dataUnitMapping[data?.dataUnit]}
                        </i>
                      </span>
                      <span
                        className='font-medium text-indigo-400 cursor-pointer hover:text-indigo-700'
                        onClick={() => setEdit(true)}
                      >
                        Chỉnh sửa
                      </span>
                    </>
                  )}
                </div>
              </li>
            </ul>
          </section>
        </div>

        {/* Panel footer */}
        <footer>
          <div className='flex flex-col px-6 py-5 border-slate-200'>
            <div className='flex justify-end'>
              <Toast
                type='warning'
                open={warningToast}
                setOpen={setWarningToast}
                className={'flex justify-start flex-1'}
              >
                Có lỗi xảy ra
              </Toast>
              <Toast
                type='success'
                open={successToast}
                setOpen={setSuccessToast}
                className={'flex justify-start flex-1'}
              >
                Cập nhật thành công
              </Toast>

              {edit && (
                <>
                  <div flex>
                    <button
                      className='btn border-slate-200 hover:border-slate-300 text-slate-600'
                      onClick={() => setEdit(false)}
                    >
                      Huỷ
                    </button>
                    <button
                      className='ml-3 text-white bg-indigo-500 btn hover:bg-indigo-600'
                      onClick={handleSubmit}
                    >
                      Lưu thay đổi
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default SettingsBoard;
