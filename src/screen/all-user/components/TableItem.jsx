import React, { useState } from 'react';
import ModalBasic from '../../../components/ModalBasic';
import AuthService from '../../../services/AuthService';
import {
  formatDate,
  formatDateTime,
  formatPhoneNumber,
} from '../../../utils/Utils';

const statusMapping = {
  0: 'TÀI XẾ',
  1: 'NGƯỜI PHỤ THUỘC',
  2: 'NGƯỜI BẢO HỘ',
};

const statusStyles = {
  0: 'bg-orange-100 text-orange-600',
  1: 'bg-blue-100 text-blue-600',
  2: 'bg-pink-100 text-pink-600',
};

const genderMapping = {
  0: 'NAM',
  1: 'NỮ',
};

const genderStyles = {
  0: 'bg-yellow-100 text-yellow-600',
  1: 'bg-purple-100 text-purple-600',
};

function TableItem(props) {
  const [detailModal, setDetailModal] = useState(false);
  const [banModal, setBanModal] = useState(false);
  const [disabledReason, setDisabledReason] = useState('');
  const [verifyDisabledReason, setVerifyDisabledReason] = useState(null);

  var role = '';
  if (props?.isdriver) role = 0;
  else if (props?.guardian) role = 1;
  else role = 2;

  const disableUser = async () => {
    try {
      const payload = {
        disabledReason: disabledReason,
      };
      const result = await AuthService.disableUser(props.id, payload);
      if (result.status === 200) {
        window.location.reload();
      }
    } catch {}
  };

  const handleDisableUser = () => {
    console.log(disabledReason, verifyDisabledReason);
    if (!disabledReason) {
      setVerifyDisabledReason(true);
      return;
    }
    disableUser();
    // setVerifyModalOpen(false);
    // setUpdateModalOpen(false);
  };

  return (
    <>
      <tr className={`cursor-pointer`}>
        <td
          className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'
          onClick={(e) => {
            e.stopPropagation();
            setDetailModal(true);
          }}
        >
          <div className='text-left'>
            <div
              className={`text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1 ${statusStyles[role]}`}
            >
              {statusMapping[role]}
            </div>
          </div>
        </td>

        <td className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
          <div className='text-left'>{props.name}</div>
        </td>

        <td className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
          <div className='text-left'>{formatPhoneNumber(props.phone)}</div>
        </td>

        <td className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
          <div className='text-left'>{formatDateTime(props.createTime)}</div>
        </td>

        <td className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
          <div className='text-left'>
            <div
              className={`text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1 ${
                genderStyles[props.gender]
              }`}
            >
              {genderMapping[props.gender]}
            </div>
          </div>
        </td>

        <td className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
          <div className='text-left'>
            <button
              className={`text-white bg-indigo-500 btn border-slate-200 hover:border-slate-300`}
              onClick={(e) => {
                e.stopPropagation();
                setBanModal(true);
              }}
            >
              VÔ HIỆU HOÁ
            </button>
          </div>
        </td>
      </tr>
      <ModalBasic
        modalOpen={detailModal}
        setModalOpen={setDetailModal}
        title='Thông tin người dùng chi tiết'
      >
        <div className='px-5 py-4'>
          <div className='space-y-3'>
            <div>
              <label className='block mb-1 text-sm font-medium' htmlFor='name'>
                Tên tài xế
              </label>
              <input
                id='name'
                value={props.name}
                disabled
                className='w-full px-2 py-1 form-input'
                type='text'
                required
              />
            </div>
            <div>
              <label className='block mb-1 text-sm font-medium' htmlFor='name'>
                Giới tính
              </label>
              <div
                className={`text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1 ${
                  props.gender === 1
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'bg-amber-100 text-amber-500'
                } `}
              >
                {props.gender === 1 ? 'Nam' : 'Nữ'}
              </div>
            </div>
            <div>
              <label className='block mb-1 text-sm font-medium' htmlFor='name'>
                Ngày tháng năm sinh
              </label>
              <input
                value={props.createTime.substring(0, 10)}
                disabled
                className='w-full px-2 py-1 form-input'
                required
              />
            </div>
            <div>
              <label className='block mb-1 text-sm font-medium' htmlFor='email'>
                Số điện thoại
              </label>
              <input
                value={formatPhoneNumber(props.phone)}
                disabled
                className='w-full px-2 py-1 form-input'
                required
              />
            </div>

            <div>
              <label className='block mb-1 text-sm font-medium' htmlFor='email'>
                Thời gian đăng ký
              </label>
              <input
                value={formatDateTime(props.createTime)}
                disabled
                className='w-full px-2 py-1 form-input'
                required
              />
            </div>

            <div>
              <label className='block mb-1 text-sm font-medium' htmlFor='email'>
                Thời gian cập nhật gần nhất
              </label>
              <input
                value={formatDateTime(props.updatedTime)}
                disabled
                className='w-full px-2 py-1 form-input'
                required
              />
            </div>

            {props.disabledReason && (
              <div>
                <label
                  className='block mb-1 text-sm font-medium'
                  htmlFor='email'
                >
                  Lý do bị khóa
                </label>
                <textarea
                  value={props.disabledReason}
                  disabled
                  className='w-full px-2 py-1 form-input'
                  required
                />
              </div>
            )}

            {props.guardianId && (
              <>
                <h1 className='text-base font-bold'>
                  Thông tin người phụ thuộc
                </h1>
                <div className='flex gap-4'>
                  <div className='flex items-center justify-center w-1/4 h-full'>
                    <img
                      className='bg-contain rounded-2xl'
                      src={
                        props.guardian?.avatarUrl
                          ? props.guardian?.avatarUrl
                          : 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'
                      }
                      style={{ height: 'auto', width: 'auto' }}
                    />
                  </div>
                  <div className='flex flex-col flex-1'>
                    <div>
                      <label
                        className='block mb-1 text-sm font-medium'
                        htmlFor='email'
                      >
                        ID
                      </label>
                      <input
                        value={props.guardian?.id}
                        disabled
                        className='w-full px-2 py-1 form-input'
                        required
                      />
                    </div>
                    <div>
                      <label
                        className='block mb-1 text-sm font-medium'
                        htmlFor='email'
                      >
                        Tên
                      </label>
                      <input
                        value={props.guardian?.name}
                        disabled
                        className='w-full px-2 py-1 form-input'
                        required
                      />
                    </div>
                    <div>
                      <label
                        className='block mb-1 text-sm font-medium'
                        htmlFor='email'
                      >
                        Số điện thoại
                      </label>
                      <input
                        value={props.guardian?.phone}
                        disabled
                        className='w-full px-2 py-1 form-input'
                        required
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    className='block mb-1 text-sm font-medium'
                    htmlFor='email'
                  >
                    Ngày tháng năm sinh
                  </label>
                  <input
                    value={formatDate(props.guardian?.birth)}
                    disabled
                    className='w-full px-2 py-1 form-input'
                    required
                  />
                </div>
                <div>
                  <label
                    className='block mb-1 text-sm font-medium'
                    htmlFor='email'
                  >
                    Thời gian đăng ký
                  </label>
                  <input
                    value={formatDateTime(props.guardian?.createTime)}
                    disabled
                    className='w-full px-2 py-1 form-input'
                    required
                  />
                </div>

                <div>
                  <label
                    className='block mb-1 text-sm font-medium'
                    htmlFor='email'
                  >
                    Thời gian cập nhật gần nhất
                  </label>
                  <input
                    value={formatDateTime(props.guardian?.updatedTime)}
                    disabled
                    className='w-full px-2 py-1 form-input'
                    required
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div className='px-5 py-4 border-t border-slate-200'>
          <div className='flex flex-wrap justify-end space-x-2'>
            <button
              className='btn-sm border-slate-200 hover:border-slate-300 text-slate-600'
              onClick={(e) => {
                e.stopPropagation();
                setDetailModal(false);
              }}
            >
              Đóng
            </button>
          </div>
        </div>
      </ModalBasic>

      <ModalBasic
        modalOpen={banModal}
        setModalOpen={setBanModal}
        title='Vô hiệu hoá tài khoản'
      >
        <div className='px-5 py-4'>
          <div className='space-y-3'>
            <div className='font-bold'>
              Bạn có chắc chắn muốn vô hiệu hoá tài khoản này? Nếu có vui lòng
              điền lý do bên dưới.
            </div>
            <div>
              <textarea
                value={disabledReason}
                className='w-full px-2 py-1 form-input'
                onChange={(e) => {
                  setDisabledReason(e.target.value);
                  setVerifyDisabledReason(false);
                }}
                required
              />
            </div>
          </div>
          {verifyDisabledReason && (
            <p className='mt-2 text-red-500 ml'>
              Vui lòng chọn nhập lý do vô hiệu hoá
            </p>
          )}
        </div>

        <div className='px-5 py-4 border-t border-slate-200'>
          <div className='flex flex-wrap justify-end space-x-2'>
            <button
              className='btn-sm border-slate-200 hover:border-slate-300 text-slate-600'
              onClick={(e) => {
                e.stopPropagation();
                setBanModal(false);
              }}
            >
              Huỷ
            </button>
            <button
              className='text-white bg-indigo-500 btn-sm hover:bg-indigo-600'
              onClick={handleDisableUser}
            >
              Vô hiệu hoá
            </button>
          </div>
        </div>
      </ModalBasic>
      {/*
      <ModalBasic
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        title='Cập nhật hạn xác thực'
      >
        <div className='px-5 py-4'>
          <div className='space-y-3'>
            <div className='font-bold'>
              Bạn có chắc chắn muốn hồ sơ tài khoản này? Nếu có vui lòng chọn
              ngày hết hạn xác thực mới bên dưới.
            </div>
            <div>
              <label className='block mb-1 text-sm font-medium' htmlFor='name'>
                Ngày hết hạn xác thực
              </label>
              <input
                type='date'
                defaultValue={props.verifyTo.substring(0, 10)}
                value={verifyTo}
                onChange={(e) => {
                  setVerifyTo(e.target.value);
                  setVerifiedToValidation(null);
                }}
                className='w-full px-2 py-1 form-input'
                // min={today}
                required
              />
            </div>
          </div>
          <p className='mt-2 text-red-500 ml'>{verifiedToValidation}</p>
        </div>

        <div className='px-5 py-4 border-t border-slate-200'>
          <div className='flex flex-wrap justify-end space-x-2'>
            <button
              className='btn-sm border-slate-200 hover:border-slate-300 text-slate-600'
              onClick={(e) => {
                e.stopPropagation();
                setUpdateModalOpen(false);
              }}
            >
              Huỷ
            </button>
            <button
              className='text-white bg-indigo-500 btn-sm hover:bg-indigo-600'
              onClick={handleVerify}
            >
              Cập nhật
            </button>
          </div>
        </div>
      </ModalBasic> */}
    </>
  );
}

export default TableItem;
