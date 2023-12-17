import React, { useState } from 'react';
import ModalBasic from '../../../components/ModalBasic';
import AuthService from '../../../services/AuthService';
import {
  formatDate,
  formatDateTime,
  formatPhoneNumber,
} from '../../../utils/Utils';

const statusMapping = {
  0: 'PENDING',
  1: 'GOING_TO_PICKUP',
  2: 'GOING',
  3: 'COMPLETED',
  4: 'CANCELED',
  5: 'TIMEDOUT',
};

const statusStyles = {
  PENDING: 'bg-orange-100 text-orange-600', //
  GOING_TO_PICKUP: 'bg-blue-100 text-blue-600', //
  GOING: 'bg-blue-500 text-white', //
  COMPLETED: 'bg-green-500 text-white', //
  CANCELED: 'bg-red-500 text-white', //
  TIMEDOUT: 'bg-gray-200 text-black', //
};

function TableItem(props) {
  const [detailModal, setDetailModal] = useState(false);
  const [cancelTripModal, setCancelTripModal] = useState(false);
  // const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  // const [updateModalOpen, setUpdateModalOpen] = useState(false);
  // const [verifyId, setVerifyId] = useState(null);
  // const [verifyTo, setVerifyTo] = useState(null);
  // const [verifiedToValidation, setVerifiedToValidation] = useState(null);

  // const verifyDriver = async () => {
  //   try {
  //     const payload = {
  //       id: verifyId,
  //       verifiedTo: verifyTo,
  //     };
  //     const result = await AuthService.verifyDriver(payload);
  //     if (result.status === 200) {
  //       window.location.reload();
  //     }
  //   } catch {}
  // };

  // const [document, setDocument] = useState(null);
  // const fetchDriverDetail = async () => {
  //   try {
  //     const result = await AuthService.getDriverDocument(props.id);
  //     console.log(result.data);
  //     setDocument(result.data);
  //     // if (result.status === 200) {
  //     //   console.log(result.data.items);
  //     //   setList(result.data.items);
  //     // }
  //   } catch {}
  // };

  const handleCancelTrip = async () => {
    try {
      const result = await AuthService.cancelTrip(props.id);
      if (result.status === 200) {
        setDetailModal(false);
        setCancelTripModal(false);
        window.location.reload();
      } else {
      }
    } catch {}
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
              className={`text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1 ${
                statusStyles[statusMapping[props.status]]
              }`}
            >
              {statusMapping[props.status]}
            </div>
          </div>
        </td>

        <td className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
          <div className='text-left'>
            {props.driver?.name ? props.driver?.name : '-'}
          </div>
        </td>

        <td className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
          <div className='text-left'>
            {props.driver?.phone ? formatPhoneNumber(props.driver?.phone) : '-'}
          </div>
        </td>

        <td className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
          <div className='text-left'>{props.booker?.name}</div>
        </td>

        <td className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
          <div className='text-left'>
            {formatPhoneNumber(props.booker?.phone)}
          </div>
        </td>

        <td className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
          <div className='text-left'>{props.startLocation?.address}</div>
        </td>

        <td className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
          <div className='text-left'>{props.endLocation?.address}</div>
        </td>

        <td className='w-px px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
          {props.status === 1 || props.status === 2 ? (
            <button
              className={`text-white bg-indigo-500 btn border-slate-200 hover:border-slate-300`}
              onClick={(e) => {
                e.stopPropagation();
                setCancelTripModal(true);
              }}
            >
              HUỶ CHUYẾN
            </button>
          ) : (
            <>-</>
          )}
        </td>
      </tr>
      <ModalBasic
        modalOpen={detailModal}
        setModalOpen={setDetailModal}
        title='Thông tin chuyến chi tiết'
      >
        <div className='px-5 py-4'>
          <div className='space-y-3'>
            <h1 className='text-base font-bold'>Thông tin tài xế 👨‍💼</h1>

            <div className='flex gap-4'>
              <div className='flex items-center justify-center w-1/4 h-full'>
                <img
                  className='bg-contain rounded-2xl'
                  src={
                    props.driver?.avatarUrl
                      ? props.driver?.avatarUrl
                      : 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'
                  }
                  style={{ height: 'auto', width: 'auto' }}
                />
              </div>
              <div className='flex flex-col flex-1'>
                <div>
                  <label
                    className='block mb-1 text-sm font-medium'
                    htmlFor='name'
                  >
                    ID
                  </label>
                  <input
                    value={props.driver?.id}
                    disabled
                    className='w-full px-2 py-1 form-input'
                    type='text'
                    required
                  />
                </div>

                <div>
                  <label
                    className='block mb-1 text-sm font-medium'
                    htmlFor='name'
                  >
                    Tên tài xế
                  </label>
                  <input
                    value={props.driver?.name}
                    disabled
                    className='w-full px-2 py-1 form-input'
                    type='text'
                    required
                  />
                </div>

                <div>
                  <label
                    className='block mb-1 text-sm font-medium'
                    htmlFor='name'
                  >
                    Số điện thoại
                  </label>
                  <input
                    value={formatPhoneNumber(props.driver?.phone)}
                    disabled
                    className='w-full px-2 py-1 form-input'
                    type='text'
                    required
                  />
                </div>
              </div>
            </div>

            <h1 className='text-base font-bold'>Thông tin người đặt 🧔</h1>
            <div className='flex gap-4'>
              <div className='flex items-center justify-center w-1/4 h-full'>
                <img
                  className='bg-contain rounded-2xl'
                  src={
                    props.booker?.avatarUrl
                      ? props.booker?.avatarUrl
                      : 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'
                  }
                  style={{ height: 'auto', width: 'auto' }}
                />
              </div>
              <div className='flex flex-col flex-1'>
                <div>
                  <label
                    className='block mb-1 text-sm font-medium'
                    htmlFor='name'
                  >
                    ID
                  </label>
                  <input
                    value={props.booker?.id}
                    disabled
                    className='w-full px-2 py-1 form-input'
                    type='text'
                    required
                  />
                </div>

                <div>
                  <label
                    className='block mb-1 text-sm font-medium'
                    htmlFor='name'
                  >
                    Tên người đặt
                  </label>
                  <input
                    value={props.booker?.name}
                    disabled
                    className='w-full px-2 py-1 form-input'
                    type='text'
                    required
                  />
                </div>

                <div>
                  <label
                    className='block mb-1 text-sm font-medium'
                    htmlFor='name'
                  >
                    Số điện thoại
                  </label>
                  <input
                    value={formatPhoneNumber(props.booker?.phone)}
                    disabled
                    className='w-full px-2 py-1 form-input'
                    type='text'
                    required
                  />
                </div>
              </div>
            </div>

            {props.booker?.id !== props.passenger?.id && (
              <>
                <h1 className='text-base font-bold'>Thông tin người đi 🧓</h1>
                <div className='flex gap-4'>
                  <div className='flex flex-col flex-1'>
                    <div>
                      <label
                        className='block mb-1 text-sm font-medium'
                        htmlFor='name'
                      >
                        Tên người đi
                      </label>
                      <input
                        value={props.passenger?.name}
                        disabled
                        className='w-full px-2 py-1 form-input'
                        type='text'
                        required
                      />
                    </div>

                    <div>
                      <label
                        className='block mb-1 text-sm font-medium'
                        htmlFor='name'
                      >
                        Số điện thoại
                      </label>
                      <input
                        value={formatPhoneNumber(props.passenger?.phone)}
                        disabled
                        className='w-full px-2 py-1 form-input'
                        type='text'
                        required
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            <h1 className='text-base font-bold'>Thông tin chuyến đi 🚗</h1>
            <>
              <div>
                <label
                  className='block mb-1 text-sm font-medium'
                  htmlFor='name'
                >
                  Khoảng cách chuyến đi
                </label>
                <input
                  value={props.distance + 'km'}
                  disabled
                  className='w-full px-2 py-1 form-input'
                  type='text'
                  required
                />
              </div>

              <div>
                <label
                  className='block mb-1 text-sm font-medium'
                  htmlFor='name'
                >
                  Giá cước
                </label>
                <input
                  value={props.price + 'đ'}
                  disabled
                  className='w-full px-2 py-1 form-input'
                  type='text'
                  required
                />
              </div>

              <div>
                <label
                  className='block mb-1 text-sm font-medium'
                  htmlFor='name'
                >
                  Lời nhắn của khách
                </label>
                <input
                  value={props.note}
                  disabled
                  className='w-full px-2 py-1 form-input'
                  type='text'
                  required
                />
              </div>

              <div>
                <label
                  className='block mb-1 text-sm font-medium'
                  htmlFor='name'
                >
                  Thời điểm bắt đầu
                </label>
                <input
                  value={formatDateTime(props.startTime)}
                  disabled
                  className='w-full px-2 py-1 form-input'
                  type='text'
                  required
                />
              </div>

              <div>
                <label
                  className='block mb-1 text-sm font-medium'
                  htmlFor='name'
                >
                  Thời điểm tài xế đón khách
                </label>
                <input
                  value={formatDateTime(props.pickupTime)}
                  disabled
                  className='w-full px-2 py-1 form-input'
                  type='text'
                  required
                />
              </div>

              {props.status === 3 && (
                <>
                  <div>
                    <label
                      className='block mb-1 text-sm font-medium'
                      htmlFor='name'
                    >
                      Thời điểm kết thúc
                    </label>
                    <input
                      value={formatDateTime(props.endTime)}
                      disabled
                      className='w-full px-2 py-1 form-input'
                      type='text'
                      required
                    />
                  </div>
                </>
              )}

              <h2 className='text-base font-semibold'>• Điểm đón khách 📍</h2>
              <div className='flex flex-col flex-1'>
                <div>
                  <label
                    className='block mb-1 text-sm font-medium'
                    htmlFor='name'
                  >
                    ID điểm đón
                  </label>
                  <input
                    value={props.startLocation?.id}
                    disabled
                    className='w-full px-2 py-1 form-input'
                    type='text'
                    required
                  />
                </div>

                <div>
                  <label
                    className='block mb-1 text-sm font-medium'
                    htmlFor='name'
                  >
                    Địa chỉ cụ thể
                  </label>
                  <input
                    value={props.startLocation?.address}
                    disabled
                    className='w-full px-2 py-1 form-input'
                    type='text'
                    required
                  />
                </div>

                <div>
                  <label
                    className='block mb-1 text-sm font-medium'
                    htmlFor='name'
                  >
                    Kinh độ; Vĩ độ
                  </label>
                  <input
                    value={
                      props.startLocation?.latitude +
                      '; ' +
                      props.startLocation?.longitude
                    }
                    disabled
                    className='w-full px-2 py-1 form-input'
                    type='text'
                    required
                  />
                </div>
              </div>
              <h2 className='text-base font-semibold'>• Điểm trả khách 📍</h2>
              <div className='flex flex-col flex-1'>
                <div>
                  <label
                    className='block mb-1 text-sm font-medium'
                    htmlFor='name'
                  >
                    ID điểm trả
                  </label>
                  <input
                    value={props.endLocation?.id}
                    disabled
                    className='w-full px-2 py-1 form-input'
                    type='text'
                    required
                  />
                </div>

                <div>
                  <label
                    className='block mb-1 text-sm font-medium'
                    htmlFor='name'
                  >
                    Địa chỉ cụ thể
                  </label>
                  <input
                    value={props.endLocation?.address}
                    disabled
                    className='w-full px-2 py-1 form-input'
                    type='text'
                    required
                  />
                </div>

                <div>
                  <label
                    className='block mb-1 text-sm font-medium'
                    htmlFor='name'
                  >
                    Kinh độ; Vĩ độ
                  </label>
                  <input
                    value={
                      props.endLocation?.latitude +
                      '; ' +
                      props.endLocation?.longitude
                    }
                    disabled
                    className='w-full px-2 py-1 form-input'
                    type='text'
                    required
                  />
                </div>
              </div>
            </>

            <h1 className='text-base font-bold'>Thông tin xe 🚖</h1>
            <div>
              <label className='block mb-1 text-sm font-medium' htmlFor='name'>
                Biển số xe
              </label>
              <input
                value={props.driver?.car?.licensePlate}
                disabled
                className='w-full px-2 py-1 form-input'
                type='text'
                required
              />
            </div>

            <div>
              <label className='block mb-1 text-sm font-medium' htmlFor='name'>
                Hãng xe
              </label>
              <input
                value={props.driver?.car?.make}
                disabled
                className='w-full px-2 py-1 form-input'
                type='text'
                required
              />
            </div>

            <div>
              <label className='block mb-1 text-sm font-medium' htmlFor='name'>
                Dòng xe
              </label>
              <input
                value={props.driver?.car?.model}
                disabled
                className='w-full px-2 py-1 form-input'
                type='text'
                required
              />
            </div>

            {/* 
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
                value={props.phone}
                disabled
                className='w-full px-2 py-1 form-input'
                required
              />
            </div>

            <div>
              <label
                className='block mb-1 text-sm font-medium'
                htmlFor='feedback'
              >
                Trạng thái
              </label>
              <div
                className={`text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1 ${
                  props.verifyTo > today
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'bg-rose-100 text-rose-500'
                } `}
              >
                {props.verifyTo > today ? 'Đã xác thực' : 'Chưa xác thực'}
              </div>
            </div>

            <div>
              <label className='block mb-1 text-sm font-medium' htmlFor='email'>
                Thời gian đăng ký
              </label>
              <input
                value={
                  props.createTime.substring(0, 10) +
                  ' ' +
                  props.createTime.substring(11, 19)
                }
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
                value={
                  props.updatedTime.substring(0, 10) +
                  ' ' +
                  props.updatedTime.substring(11, 19)
                }
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

            <div>
              <label className='block mb-1 text-sm font-medium' htmlFor='email'>
                Biển số xe
              </label>
              <input
                value={props.car.licensePlate}
                disabled
                className='w-full px-2 py-1 form-input'
                required
              />
            </div>

            <div>
              <label className='block mb-1 text-sm font-medium' htmlFor='email'>
                Hãng xe
              </label>
              <input
                value={props.car.make}
                disabled
                className='w-full px-2 py-1 form-input'
                required
              />
            </div>

            <div>
              <label className='block mb-1 text-sm font-medium' htmlFor='email'>
                Dòng xe
              </label>
              <input
                value={props.car.model}
                disabled
                className='w-full px-2 py-1 form-input'
                required
              />
            </div>

            {props.verifyTo > today && (
              <div>
                <label
                  className='block mb-1 text-sm font-medium'
                  htmlFor='email'
                >
                  Còn hạn đến ngày
                </label>
                <input
                  value={props.verifyTo.substring(0, 10)}
                  disabled
                  className='w-full px-2 py-1 form-input'
                  required
                />
              </div>
            )}

            {document && (
              <div>
                <label
                  className='block mb-1 text-sm font-medium'
                  htmlFor='email'
                >
                  Giấy phép
                </label>
                {document.map((doc) => (
                  <img key={doc.id} src={doc.url} alt={`Document ${doc.id}`} />
                ))}
              </div>
            )} */}
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
        modalOpen={cancelTripModal}
        setModalOpen={setCancelTripModal}
        title='Bạn có muốn huỷ chuyến xe này?'
      >
        <div className='px-5 py-4'>
          <div className='space-y-3'>
            <div className='font-bold'>
              Bạn có chắc chắn muốn huỷ chuyến xe này?
            </div>
            <div className=''>
              Lưu ý: Các giao dịch đã được thực hiện giữa tài xế và khách sẽ
              không được hoàn lại. Vui lòng liên hệ trực tiếp với tài xế để xử
              lý nếu có bất kỳ thắc mắc nào về các vấn đề hoàn tiền.
            </div>
          </div>
        </div>

        <div className='px-5 py-4 border-t border-slate-200'>
          <div className='flex flex-wrap justify-end space-x-2'>
            <button
              className='btn-sm border-slate-200 hover:border-slate-300 text-slate-600'
              onClick={(e) => {
                e.stopPropagation();
                setCancelTripModal(false);
              }}
            >
              Đóng
            </button>
            <button
              className='text-white bg-indigo-500 btn-sm hover:bg-indigo-600'
              onClick={handleCancelTrip}
            >
              Huỷ chuyến
            </button>
          </div>
        </div>
      </ModalBasic>
    </>
  );
}

export default TableItem;
