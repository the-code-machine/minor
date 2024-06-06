'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SelectGroupOne from '@/components/Forms/SelectGroup/SelectGroupOne';
import Loader from '@/common/Loader';
import Lottie from 'lottie-react';
import animationData from '@/components/Animation/yUGV1SyCc4.json';
import toast from 'react-hot-toast';
import axios from 'axios';
const SignUp = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [sendBtn, showSendBtn] = useState(true);
  const [showOTP, setShowOTP] = useState(false);
  const [loader, showLoader] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [disabled, setDisabled] = useState(false);
  const naviagte = useRouter()
  const DetailsValidation = () => {
    if (email === '' || password === '' || confirmPassword === '' || selectedOption === '') {
      toast.error('Please fill all the details');
      return false;
    }
    else if (email.includes('@') === false || email.includes('@satiengg.in') === false) {
      toast.error('Please enter valid email!!');
      return false;

    }
    else if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    } else {
      return true;
    }
  };
  const sendOTP = (e) => {
    e.preventDefault();
    if (!DetailsValidation()) {
      showLoader(false);
      return;
    }

    setDisabled(true);
    showLoader(true);
    const url = "/api/otp/generateOtp";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "OTP generated and sent to the email") {
          showLoader(false);
          toast.success("OTP sent successfully");
          showSendBtn(false);
          setShowOTP(true);

        }
        else {
          toast.error("Error sending OTP");
          showLoader(false);
          setShowOTP(false);
          setDisabled(false);
        }

      })
      .catch((error) => {
        toast.error("Error sending OTP");
        showLoader(false);
        setShowOTP(false);
      });
  };

  const Submit = async (e) => {
    e.preventDefault();
    if (!DetailsValidation()) {
      return;
    }
    showLoader(true);

    const url = `/api/auth/signup`;
    const response= await axios.post(url, {email,selectedOption,password})
console.log(response)
        if (response.data.status === 201) {
          showLoader(false);
          toast.success(response.data.message);
          setConfirmPassword('');
          setPassword('');
          setEmail('');
          setSelectedOption('');
          naviagte.push('/auth/login')
        } else {
          toast.error(response.data.message);
          showLoader(false);
          showSendBtn(true);
          setConfirmPassword('');
          setPassword('');
          setEmail('');
          setSelectedOption('');
        }
      
  }
  return (


    <div className="rounded-sm border border-stroke h-screen flex flex-col w-screen justify-center  bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-wrap items-center">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="py-5.5 px-26 text-center">
            <Link className="mb-5.5 inline-block" href="/">
              <h1 className=' text-4xl font-bold text-[#1DBF73]'>Submify</h1>
            </Link>
            <p className="2xl:px-20 my-5">
              Automatic Grading Software for Minor Project fo SATI Students only.
            </p>

            <span className=" inline-block">
            <Lottie animationData={animationData} loop={true} />
            </span>
          </div>
        </div>

        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <div className="w-full p-2 sm:p-5.5 xl:p-5.5">
            <span className="mb-1.5 block font-medium">Minor Project</span>
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Sign Up to Submify
            </h2>

            <form>
              <div className="mb-4">
                <SelectGroupOne selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
              </div>

              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Email
                </label>
                <div className="relative">
                  <input disabled={disabled}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-[#1DBF73] focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-[#1DBF73]"
                  />

                  <span className="absolute right-4 top-4">
                    <svg
                      className="fill-current"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.5">
                        <path
                          d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                          fill=""
                        />
                      </g>
                    </svg>
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Password
                </label>
                <div className="relative">
                  <input disabled={disabled}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-[#1DBF73] focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-[#1DBF73]"
                  />

                  <span className="absolute right-4 top-4">
                    <svg
                      className="fill-current"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.5">
                        <path
                          d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                          fill=""
                        />
                        <path
                          d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                          fill=""
                        />
                      </g>
                    </svg>
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Re-type Password
                </label>
                <div className="relative">
                  <input disabled={disabled}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    type="password"
                    placeholder="Re-enter your password"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-[#1DBF73] focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-[#1DBF73]"
                  />

                  <span className="absolute right-4 top-4">
                    <svg
                      className="fill-current"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.5">
                        <path
                          d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                          fill=""
                        />
                        <path
                          d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                          fill=""
                        />
                      </g>
                    </svg>
                  </span>
                </div>
              </div>

              {sendBtn ? (<div className="mb-5">
                <button
                  onClick={sendOTP}
                  className="w-full cursor-pointer rounded-lg border border-[#1DBF73] bg-[#1DBF73] p-4 text-white transition hover:bg-opacity-90"
                >Send OTP</button>
              </div>) : (<div className="mb-5">
                <button onClick={Submit}
                  className="w-full cursor-pointer rounded-lg border border-[#1DBF73] bg-[#1DBF73] p-4 text-white transition hover:bg-opacity-90"
                >SingUp</button>
              </div>)}



              <div className="mt-6 text-center">
                <p>
                  Already have an account?{' '}
                  <Link href="/auth/login" className="text-[#1DBF73]">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showOTP && <OTPSubmit showLoader={showLoader} showSendBtn={showSendBtn} setShowOtp={setShowOTP} />}
      {loader && <Loader />}
    </div>

  );
};



const OTPSubmit = ({ showLoader, showSendBtn, setShowOtp }) => {
  const [otp, setOtp] = useState("");
  const submit = () => {
    const url = "/api/otp/verifyOtp";
    if (otp.length < 6) {
      toast.error("Please enter a valid OTP");
      return;

    }
    showLoader(true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message == "OTP verification successful") {
          showLoader(false);
          toast.success("OTP submitted successfully");
          showSendBtn(false);
          setShowOtp(false);

        }
        else {
          toast.error("Error submiting OTP");
          showLoader(false);
          showSendBtn(true);
          setShowOtp(false);
        }

      })
      .catch((error) => {
        toast.error("Error submiting OTP");
        showLoader(false);
        showSendBtn(true);
      });
  }
  return (
    <>
      <div className=' fixed top-0 left-0 z-[100] w-screen h-screen bg-white bg-opacity-80 flex justify-center items-center'>
        <div className=' w-96 p-3 bg-white rounded-2xl shadow-lg flex flex-col space-y-5'>
          <h1 className=' font-semibold text-black text-lg'>Enter OTP</h1>
          <input value={otp} onChange={(e) => setOtp(e.target.value)} type='text' className=' rounded-md bg-transparent border-black border-2 text-black p-2 w-full placeholder:text-black outline-none' placeholder='Enter Otp' />
          <button onClick={submit} className=' rounded-md bg-black p-2 w-full text-lg font-semibold text-white hover:bg-opacity-95'>Submit</button>
        </div>
      </div>

    </>
  )
}
export default SignUp;
