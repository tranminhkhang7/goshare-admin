import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AuthImage from '../images/wallpaper.png';
import AuthService from '../services/AuthService';

function Signin() {
  let navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [validationErrors, setValidationErrors] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && password) {
      const payload = { username, password };
      // console.log(payload.username);

      try {
        const res = await AuthService.login(payload);
        console.log(res);
        if (res.status === 200) {
          const accessToken = res.data.accessToken;
          const userRole = 'admin';

          const cookieOptions = {
            expires: new Date(Date.now() + 3600 * 1000 * 24),
            path: '/',
            secure: true,
            // httpOnly: true,
          };

          document.cookie = `access_token=${accessToken}; SameSite=strict; ${Object.entries(
            cookieOptions
          )
            .map(([k, v]) => `${k}=${v}`)
            .join('; ')}`;
          document.cookie = `user_role=${userRole}; SameSite=strict; ${Object.entries(
            cookieOptions
          )
            .map(([k, v]) => `${k}=${v}`)
            .join('; ')}`;

          navigate('/drivers');
        } else {
          setValidationErrors(true);
        }
      } catch (err) {
        console.log(err);
        setValidationErrors(true);
      }
    } else {
      setValidationErrors(true);
    }
  };

  return (
    <main className='bg-white'>
      <div className='relative md:flex'>
        {/* Content */}
        <div className='md:w-1/2'>
          <div className='flex flex-col h-full min-h-screen after:flex-1'>
            {/* Header */}
            <div className='flex-1'>
              <div className='flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8'>
                {/* Logo */}
                <Link className='block' to='/'>
                  <svg width='32' height='32' viewBox='0 0 32 32'>
                    <defs>
                      <linearGradient
                        x1='28.538%'
                        y1='20.229%'
                        x2='100%'
                        y2='108.156%'
                        id='logo-a'
                      >
                        <stop stopColor='#A5B4FC' stopOpacity='0' offset='0%' />
                        <stop stopColor='#A5B4FC' offset='100%' />
                      </linearGradient>
                      <linearGradient
                        x1='88.638%'
                        y1='29.267%'
                        x2='22.42%'
                        y2='100%'
                        id='logo-b'
                      >
                        <stop stopColor='#38BDF8' stopOpacity='0' offset='0%' />
                        <stop stopColor='#38BDF8' offset='100%' />
                      </linearGradient>
                    </defs>
                    <rect fill='#6366F1' width='32' height='32' rx='16' />
                    <path
                      d='M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z'
                      fill='#4F46E5'
                    />
                    <path
                      d='M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z'
                      fill='url(#logo-a)'
                    />
                    <path
                      d='M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z'
                      fill='url(#logo-b)'
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <div className='max-w-sm px-4 py-8 mx-auto'>
              <h1 className='mb-6 text-3xl font-bold text-slate-800'>
                Chào mừng quay trở lại!
              </h1>
              {/* Form */}
              <form>
                <div className='space-y-4'>
                  <div>
                    <label
                      className='block mb-1 text-sm font-medium'
                      htmlFor='email'
                    >
                      Tên đăng nhập
                    </label>
                    <input
                      id='email'
                      className='w-full form-input'
                      type='email'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      className='block mb-1 text-sm font-medium'
                      htmlFor='password'
                    >
                      Mật khẩu
                    </label>
                    <input
                      id='password'
                      className='w-full form-input'
                      type='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className='flex items-center justify-between mt-6'>
                  <div className='mr-1'></div>

                  <button
                    className='text-white bg-indigo-500 btn hover:bg-indigo-600'
                    onClick={handleSubmit}
                  >
                    Đăng nhập
                  </button>
                </div>
              </form>
              {validationErrors && (
                <div className='pt-5 mt-6 border-t border-slate-200'>
                  <div className='mt-5'>
                    <div className='px-3 py-2 rounded bg-amber-100 text-amber-600'>
                      <svg
                        className='inline w-4 h-4 mr-2 fill-current shrink-0'
                        viewBox='0 0 16 16'
                      >
                        <path d='M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.5 10.1l-1.4 1.4L8 9.4l-2.1 2.1-1.4-1.4L6.6 8 4.5 5.9l1.4-1.4L8 6.6l2.1-2.1 1.4 1.4L9.4 8l2.1 2.1z' />
                      </svg>
                      <span className='text-sm'>
                        Tên đăng nhập hoặc mật khẩu không đúng.
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className='absolute top-0 bottom-0 right-0 hidden md:block md:w-1/2'
          aria-hidden='true'
        >
          <img
            className='object-cover object-center w-full h-full'
            src={AuthImage}
            width='760'
            height='1024'
            alt='Authentication'
          />
        </div>
      </div>
    </main>
  );
}

export default Signin;
