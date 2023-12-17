import React, { useState } from 'react';
import ModalBasic from '../../../components/ModalBasic';
import AuthService from '../../../services/AuthService';
import { formatPhoneNumber } from '../../../utils/Utils';
import axios from 'axios';
import ModalBlank from '../../../components/ModalBlank';

function TableItem(props) {
  const [warningModal, setWarningModal] = useState(true);

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;

  var fiveDaysFromToday = new Date();
  fiveDaysFromToday.setDate(fiveDaysFromToday.getDate() + 5);
  dd = String(fiveDaysFromToday.getDate()).padStart(2, '0');
  mm = String(fiveDaysFromToday.getMonth() + 1).padStart(2, '0');
  yyyy = fiveDaysFromToday.getFullYear();
  fiveDaysFromToday = yyyy + '-' + mm + '-' + dd;

  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updateDocumentModalOpen, setUpdateDocumentModalOpen] = useState(false);
  const [verifyId, setVerifyId] = useState(null);
  const [verifyTo, setVerifyTo] = useState(null);
  const [verifiedToValidation, setVerifiedToValidation] = useState(null);

  //   - 0:  Id x2
  // - 1:  DriverLicense x2
  // - 2 : VehicleRegistration x2
  // - 3 : RegistrationCertificate x1
  // - 4:  DriverPicture x1

  const [imageId_1, setImageId_1] = useState();
  const [imageId_2, setImageId_2] = useState();

  const [imageDriverLicense_1, setImageDriverLicense_1] = useState();
  const [imageDriverLicense_2, setImageDriverLicense_2] = useState();

  const [imageVehicleRegistration_1, setImageVehicleRegistration_1] =
    useState();
  const [imageVehicleRegistration_2, setImageVehicleRegistration_2] =
    useState();

  const [imageRegistrationCertificate, setImageRegistrationCertificate] =
    useState();
  const [imageDriverPicture, setImageDriverPicture] = useState();

  const verifyDriver = async () => {
    try {
      const payload = {
        id: verifyId,
        verifiedTo: verifyTo,
      };
      const result = await AuthService.verifyDriver(payload);
      if (result.status === 200) {
        window.location.reload();
      }
    } catch {}
  };

  const [document, setDocument] = useState(null);
  const fetchDriverDetail = async () => {
    try {
      const result = await AuthService.getDriverDocument(props.id);
      console.log(result.data);
      setDocument(result.data);
      // if (result.status === 200) {
      //   console.log(result.data.items);
      //   setList(result.data.items);
      // }
    } catch {}
  };

  const handleVerify = () => {
    if (!verifyTo) {
      setVerifiedToValidation('Vui lòng chọn ngày hết hạn xác thực');
      return;
    }
    verifyDriver();
    setVerifyModalOpen(false);
    setUpdateModalOpen(false);
  };

  const handleUpdateDocument = async () => {
    try {
      const formData = new FormData();
      formData.append('List[0].pic', imageId_1);
      formData.append('List[0].type', 0);
      formData.append('List[1].pic', imageId_2);
      formData.append('List[1].type', 0);
      formData.append('List[2].pic', imageDriverLicense_1);
      formData.append('List[2].type', 1);
      formData.append('List[3].pic', imageDriverLicense_2);
      formData.append('List[3].type', 1);
      formData.append('List[4].pic', imageVehicleRegistration_1);
      formData.append('List[4].type', 2);
      formData.append('List[5].pic', imageVehicleRegistration_2);
      formData.append('List[5].type', 2);
      formData.append('List[6].pic', imageRegistrationCertificate);
      formData.append('List[6].type', 3);
      formData.append('List[7].pic', imageDriverPicture);
      formData.append('List[7].type', 4);

      const result = await AuthService.updateDriverDocument(props.id, formData);
      console.log(result);
      if (result.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleShowDetail = () => {
    setFeedbackModalOpen(true);
    fetchDriverDetail();
  };

  return (
    <>
      <tr
        className={`${
          props.verifyTo > today &&
          props.verifyTo < fiveDaysFromToday &&
          'bg-orange-100'
        } cursor-pointer`}
      >
        <td
          className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap md:w-1/2'
          onClick={(e) => {
            e.stopPropagation();
            handleShowDetail();
          }}
        >
          <div className='flex items-center'>
            <div className='mr-2 w-9 h-9 shrink-0 sm:mr-3'>
              <img
                className='bg-contain rounded-full'
                src={props.avatarUrl}
                alt={props.name}
                style={{ height: '36px', width: '36px' }}
              />
            </div>
            <div className='font-medium text-slate-800'>{props.name}</div>
          </div>
        </td>
        <td className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
          <div className='text-left'>{formatPhoneNumber(props.phone)}</div>
        </td>
        <td className='px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
          <div className='text-left'>
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
        </td>
        <td className='w-px px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
          <div className={`text-right font-medium`}>
            {props.createTime.substring(0, 10) +
              ' ' +
              props.createTime.substring(11, 19)}
          </div>
        </td>

        <td className='w-px px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
          {props.verifyTo <= today ? (
            <button
              className={`text-white bg-indigo-500 btn border-slate-200 hover:border-slate-300`}
              onClick={(e) => {
                e.stopPropagation();
                setVerifyModalOpen(true);
                setVerifyId(props.id);
              }}
            >
              XÁC THỰC
            </button>
          ) : (
            <button
              className={`text-indigo-500 btn border-slate-200 hover:border-slate-300`}
              onClick={(e) => {
                e.stopPropagation();
                setUpdateModalOpen(true);
                setVerifyId(props.id);
              }}
            >
              CHỈNH SỬA
            </button>
          )}
        </td>

        <td className='w-px px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap'>
          <button
            className={`text-indigo-500 bg-white btn border-slate-200 hover:border-slate-300`}
            onClick={(e) => {
              e.stopPropagation();
              setUpdateDocumentModalOpen(true);
              // setWarningModal(true);
            }}
          >
            CẬP NHẬT HỒ SƠ
          </button>
        </td>
      </tr>
      <ModalBasic
        modalOpen={feedbackModalOpen}
        setModalOpen={setFeedbackModalOpen}
        title='Thông tin tài xế chi tiết'
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
            )}
          </div>
        </div>

        <div className='px-5 py-4 border-t border-slate-200'>
          <div className='flex flex-wrap justify-end space-x-2'>
            <button
              className='btn-sm border-slate-200 hover:border-slate-300 text-slate-600'
              onClick={(e) => {
                e.stopPropagation();
                setFeedbackModalOpen(false);
              }}
            >
              Đóng
            </button>
          </div>
        </div>
      </ModalBasic>

      <ModalBasic
        modalOpen={verifyModalOpen}
        setModalOpen={setVerifyModalOpen}
        title='Xác thực tài xế'
      >
        <div className='px-5 py-4'>
          <div className='space-y-3'>
            <div className='font-bold'>
              Bạn có chắc chắn muốn xác thực tài khoản này? Nếu có vui lòng chọn
              ngày hết hạn xác thực bên dưới.
            </div>
            <div>
              <label className='block mb-1 text-sm font-medium' htmlFor='name'>
                Ngày hết hạn xác thực
              </label>
              <input
                type='date'
                value={verifyTo}
                onChange={(e) => {
                  setVerifyTo(e.target.value);
                  setVerifiedToValidation(null);
                }}
                className='w-full px-2 py-1 form-input'
                min={today}
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
                setVerifyModalOpen(false);
              }}
            >
              Huỷ
            </button>
            <button
              className='text-white bg-indigo-500 btn-sm hover:bg-indigo-600'
              onClick={handleVerify}
            >
              Xác thực
            </button>
          </div>
        </div>
      </ModalBasic>

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
      </ModalBasic>

      <ModalBlank
        modalOpen={warningModal}
        setModalOpen={setWarningModal}
        title='Thông tin tài xế chi tiết'
      >
        <div>hehe</div>
      </ModalBlank>

      <ModalBasic
        modalOpen={updateDocumentModalOpen}
        setModalOpen={setUpdateDocumentModalOpen}
        title='Cập nhật hồ sơ tài xế'
      >
        <div className='px-5 py-4'>
          <div className='space-y-3'>
            <h1 className='text-base font-bold'>Ảnh CCCD/CMND 🪪</h1>
            <div>
              <label className='block mb-1 text-sm font-medium' htmlFor='name'>
                Ảnh 1:
              </label>
              <input
                type='file'
                onChange={(e) => {
                  setImageId_1(e.target.files[0]);
                }}
                className='w-full px-2 py-1 form-input'
              />
            </div>

            <div>
              <label className='block mb-1 text-sm font-medium' htmlFor='name'>
                Ảnh 2:
              </label>
              <input
                type='file'
                onChange={(e) => {
                  setImageId_2(e.target.files[0]);
                }}
                className='w-full px-2 py-1 form-input'
              />
            </div>

            <h1 className='text-base font-bold'>Ảnh bằng lái xe 🪪</h1>
            <div>
              <label className='block mb-1 text-sm font-medium' htmlFor='name'>
                Ảnh 1:
              </label>
              <input
                type='file'
                onChange={(e) => {
                  setImageDriverLicense_1(e.target.files[0]);
                }}
                className='w-full px-2 py-1 form-input'
              />
            </div>

            <div>
              <label className='block mb-1 text-sm font-medium' htmlFor='name'>
                Ảnh 2:
              </label>
              <input
                type='file'
                onChange={(e) => {
                  setImageDriverLicense_2(e.target.files[0]);
                }}
                className='w-full px-2 py-1 form-input'
              />
            </div>

            <h1 className='text-base font-bold'>Ảnh đăng ký xe 🚗</h1>
            <div>
              <label className='block mb-1 text-sm font-medium' htmlFor='name'>
                Ảnh 1:
              </label>
              <input
                type='file'
                onChange={(e) => {
                  setImageVehicleRegistration_1(e.target.files[0]);
                }}
                className='w-full px-2 py-1 form-input'
              />
            </div>

            <div>
              <label className='block mb-1 text-sm font-medium' htmlFor='name'>
                Ảnh 2:
              </label>
              <input
                type='file'
                onChange={(e) => {
                  setImageVehicleRegistration_2(e.target.files[0]);
                }}
                className='w-full px-2 py-1 form-input'
              />
            </div>

            <h1 className='text-base font-bold'>Ảnh đăng kiểm 🪪</h1>
            <div>
              <input
                type='file'
                onChange={(e) => {
                  setImageRegistrationCertificate(e.target.files[0]);
                }}
                className='w-full px-2 py-1 form-input'
              />
            </div>

            <h1 className='text-base font-bold'>Ảnh tài xế 🧔</h1>
            <div>
              <input
                type='file'
                onChange={(e) => {
                  setImageDriverPicture(e.target.files[0]);
                }}
                className='w-full px-2 py-1 form-input'
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
                setUpdateDocumentModalOpen(false);
              }}
            >
              Huỷ
            </button>
            <button
              className='text-white bg-indigo-500 btn-sm hover:bg-indigo-600'
              onClick={handleUpdateDocument}
            >
              Cập nhậtt
            </button>
          </div>
        </div>
      </ModalBasic>
    </>
  );
}

export default TableItem;
