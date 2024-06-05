'use client'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LoaderUnder from '@/components/LoaderUnder';
import { useDispatch, useSelector } from 'react-redux';

import store from '@/redux/store';
const Profile = () => {
  const user = useSelector((state) => state.auth);
  const isFetching = useSelector((state) => state.auth.isFetching);
  const dispatch = useDispatch()
  useEffect(() => {
    const dispatched = async () => {
 
      dispatch({ type: 'AUTH_STATE_CHANGED' });
    };

    dispatched();
  }, []);

  
  return (

    <>
      {isFetching? <LoaderUnder /> : <> <Breadcrumb pageName="Profile" />

        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="relative z-20 h-35 md:h-65">
            <img
              src={user?.coverImage || 'https://st.depositphotos.com/2228340/2606/i/450/depositphotos_26060543-stock-photo-blue-simplistic-and-minimalist-abstract.jpg'}
              alt="profile cover"
              className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
            />

          </div>
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
              <div className="relative drop-shadow-2">
                <img src={user?.profileImage || "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"} className=' rounded-full' alt="profile" />

              </div>
            </div>
            <div className="mt-4">
              <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                {user?.userId?.split('2')[0] || 'User name'}
              </h3>
              <p className="font-medium">{user?.userType}</p>


              <div className="mx-auto max-w-180 my-5">
                <h4 className="font-semibold text-black dark:text-white">
                  About Me
                </h4>
                <p className="mt-4.5">
                  {user?.bio || `Lorem ipsum dolor sit amet, consectetur adipiscing elit
                Pellentesque posuere fermentum urna, eu condimentum mauris
                tempus ut. Donec fermentum blandit aliquet. Etiam dictum dapibus
                ultricies. Sed vel aliquet libero. Nunc a augue fermentum,
                pharetra ligula sed, aliquam lacus`}
                </p>
              </div>

              <div className="mt-6.5">
                <h4 className="mb-3.5 font-medium text-black dark:text-white">
                  Follow me on
                </h4>
                <div className="flex items-center justify-center gap-3.5">

                  <Link
                    href={user?.twitterUrl || '#'}
                    className="hover:text-black"
                    aria-label="social-icon"
                  >
                    <svg
                      className="fill-current"
                      width="23"
                      height="22"
                      viewBox="0 0 23 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_30_970)">
                        <path
                          d="M20.9813 5.18472C20.2815 5.49427 19.5393 5.69757 18.7795 5.78789C19.5804 5.30887 20.1798 4.55498 20.4661 3.66672C19.7145 4.11405 18.8904 4.42755 18.0315 4.59714C17.4545 3.97984 16.6898 3.57044 15.8562 3.43259C15.0225 3.29474 14.1667 3.43617 13.4218 3.83489C12.6768 4.2336 12.0845 4.86726 11.7368 5.63736C11.3891 6.40746 11.3056 7.27085 11.4993 8.0933C9.97497 8.0169 8.48376 7.62078 7.12247 6.93066C5.76118 6.24054 4.56024 5.27185 3.59762 4.08747C3.25689 4.67272 3.07783 5.33801 3.07879 6.01522C3.07879 7.34439 3.75529 8.51864 4.78379 9.20614C4.17513 9.18697 3.57987 9.0226 3.04762 8.72672V8.77439C3.04781 9.65961 3.35413 10.5175 3.91465 11.2027C4.47517 11.8878 5.2554 12.3581 6.12304 12.5336C5.55802 12.6868 4.96557 12.7093 4.39054 12.5996C4.63517 13.3616 5.11196 14.028 5.75417 14.5055C6.39637 14.983 7.17182 15.2477 7.97196 15.2626C7.17673 15.8871 6.2662 16.3488 5.29243 16.6212C4.31866 16.8936 3.30074 16.9714 2.29688 16.8502C4.04926 17.9772 6.08921 18.5755 8.17271 18.5735C15.2246 18.5735 19.081 12.7316 19.081 7.66522C19.081 7.50022 19.0765 7.33339 19.0691 7.17022C19.8197 6.62771 20.4676 5.95566 20.9822 5.18564L20.9813 5.18472Z"
                          fill=""
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_30_970">
                          <rect
                            width="22"
                            height="22"
                            fill="white"
                            transform="translate(0.666138)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </Link>
                  <Link
                    href={user?.linkedinUrl || '#'}
                    className="hover:text-black"
                    aria-label="social-icon"
                  >
                    <svg
                      className="fill-current"
                      width="23"
                      height="22"
                      viewBox="0 0 23 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_30_974)">
                        <path
                          d="M6.69548 4.58327C6.69523 5.0695 6.50185 5.53572 6.15786 5.87937C5.81387 6.22301 5.34746 6.41593 4.86123 6.41569C4.375 6.41545 3.90878 6.22206 3.56513 5.87807C3.22149 5.53408 3.02857 5.06767 3.02881 4.58144C3.02905 4.09521 3.22244 3.62899 3.56643 3.28535C3.91042 2.9417 4.37683 2.74878 4.86306 2.74902C5.34929 2.74927 5.81551 2.94265 6.15915 3.28664C6.5028 3.63063 6.69572 4.09704 6.69548 4.58327ZM6.75048 7.77327H3.08381V19.2499H6.75048V7.77327ZM12.5438 7.77327H8.89548V19.2499H12.5071V13.2274C12.5071 9.87244 16.8796 9.56077 16.8796 13.2274V19.2499H20.5005V11.9808C20.5005 6.32494 14.0288 6.53577 12.5071 9.31327L12.5438 7.77327Z"
                          fill=""
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_30_974">
                          <rect
                            width="22"
                            height="22"
                            fill="white"
                            transform="translate(0.333862)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </Link>

                  <Link
                    href={user?.githubUrl || '#'}
                    className="hover:text-black"
                    aria-label="social-icon"
                  >
                    <svg
                      className="fill-current"
                      width="23"
                      height="22"
                      viewBox="0 0 23 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_30_982)">
                        <path
                          d="M11.6662 1.83337C6.6016 1.83337 2.49951 5.93546 2.49951 11C2.49847 12.9244 3.10343 14.8002 4.22854 16.3613C5.35366 17.9225 6.94181 19.0897 8.76768 19.6974C9.22602 19.7771 9.39743 19.5021 9.39743 19.261C9.39743 19.0438 9.38552 18.3224 9.38552 17.5542C7.08285 17.9786 6.48701 16.9932 6.30368 16.4771C6.2001 16.2131 5.75368 15.4 5.3641 15.1819C5.04326 15.0105 4.58493 14.586 5.35218 14.575C6.07451 14.5631 6.58968 15.2396 6.76201 15.5146C7.58701 16.9006 8.90518 16.511 9.43135 16.2709C9.51202 15.675 9.75218 15.2745 10.0162 15.0453C7.9766 14.8161 5.84535 14.025 5.84535 10.5188C5.84535 9.52146 6.2001 8.69737 6.78493 8.05479C6.69326 7.82562 6.37243 6.88604 6.8766 5.62562C6.8766 5.62562 7.64385 5.38546 9.39743 6.56612C10.1437 6.35901 10.9147 6.25477 11.6891 6.25629C12.4683 6.25629 13.2474 6.35896 13.9808 6.56521C15.7334 5.37354 16.5016 5.62654 16.5016 5.62654C17.0058 6.88696 16.6849 7.82654 16.5933 8.05571C17.1772 8.69737 17.5329 9.51046 17.5329 10.5188C17.5329 14.037 15.3906 14.8161 13.351 15.0453C13.6829 15.3313 13.9698 15.8813 13.9698 16.7411C13.9698 17.9667 13.9579 18.9521 13.9579 19.262C13.9579 19.5021 14.1302 19.7881 14.5885 19.6965C16.4081 19.0821 17.9893 17.9126 19.1094 16.3526C20.2296 14.7926 20.8323 12.9206 20.8329 11C20.8329 5.93546 16.7308 1.83337 11.6662 1.83337Z"
                          fill=""
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_30_982">
                          <rect
                            width="22"
                            height="22"
                            fill="white"
                            transform="translate(0.666138)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div></>}
    </>
  );
};

export default Profile;
