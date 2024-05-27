'use client'
import React, { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { CreatTeamDialog } from '@/components/CreatTeamDialog';
import Loader from '@/common/Loader';
import axios from 'axios';
import { set } from 'mongoose';
import { update } from '@/redux/common/authSlicer';
const customStyles = {
  control: (base, state) => ({
    ...base,
    borderColor: state.isFocused ? '#1DBF73' : 'gray', // Blue border when focused, gray otherwise
    boxShadow: state.isFocused ? '0 0 0 1px #1DBF73' : 'none', // Blue shadow when focused
    '&:hover': {
      borderColor: state.isFocused ? '#1DBF73' : 'black', // Black border on hover when not focused
    },
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isFocused ? '#C5F2DD' : 'white', // Light blue background when focused
    color: 'black' // White text for selected option

  }),


};
export const CreateTeam = () => {
  const user = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const[joinCode,setJoinCode]=useState('')
  const[email,setEmail]=useState(user?.userId);
  const [name, setName] = useState( user?.userId.split('2')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const getTeamId = (userId) => {
    const localPart = userId.split('@')[0];
    const digits = localPart.match(/\d+/g).join('');
    const letters = localPart.match(/[a-zA-Z]+/g).join('').toUpperCase();
    return letters[0] + letters.slice(-1) + digits;
  };
  const URLLink= getTeamId(user?.userId);
  const handleCreateTeam = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Avoid double submissions
    setIsSubmitting(true);

    const teamId = getTeamId(user?.userId);
    const formData = {
      teamId:teamId,
      leaderName: name,
      leaderId: user?.userId,
      firstMember:user?.userId
    };

    try {
      const url= '/api/dashboard/student/team'
      const response = await axios.put(url, formData, {
        headers: {
          'Authorization': `Bearer ${user.token}`, // Correct format for Bearer token
          'Content-Type': 'application/json',  // If you're using FormData, make sure Content-Type is set properly
        },});
      

      if (response.data.status === 201) {
        const updateProfileData = {
          userId: user?.userId,
          teamId:teamId,
        };

        const profileResponse = await axios.put('/api/profile', updateProfileData, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },});

        if (profileResponse.data.status === 201) {
          toast.success('Team created successfully');
           dispatch(update({ teamId: teamId })); // Update teamId in Redux store using
          setIsSubmitting(false)
          setOpen(true);
        } else {
          setIsSubmitting(false)
          setOpen(false)
          const profileError = await profileResponse.json();
          toast.error(profileError.message || 'Failed to update user profile');
        }

        
      } else {
        setIsSubmitting(false)
        setOpen(false)
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to create team');
      }
    } catch (error) {
      setOpen(false)
      toast.error('An error occurred while creating the team');
    } 
  };

  const handleJoinTeam = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Avoid double submissions
    setIsSubmitting(true);
    const formData = {
      teamId:joinCode,
      secondMember:user?.userId,
    };

    try {
      const url= '/api/dashboard/student/team'
      const response = await axios.put(url, formData, {
        headers: {
          'Authorization': `Bearer ${user.token}`, // Correct format for Bearer token
          'Content-Type': 'application/json',  // If you're using FormData, make sure Content-Type is set properly
        },});
      

      if (response.data.status === 201) {
        const updateProfileData = {
          userId: user?.userId,
          teamId:joinCode,
          userType:user?.userType,
        };

        const profileResponse = await axios.put('/api/profile', updateProfileData, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },});

        if (profileResponse.data.status === 201) {
          toast.success('Team created successfully');
           dispatch(update({ teamId: joinCode })); // Update teamId in Redux store using
          setIsSubmitting(false)
        } else {
          setIsSubmitting(false)
          const profileError = await profileResponse.json();
          toast.error(profileError.message || 'Failed to update user profile');
        }

        
      } else {
        setIsSubmitting(false)
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to create team');
      }
    } catch (error) {
      setOpen(false)
      toast.error('An error occurred while creating the team');
    } 
  };
  return (
    <>


{isSubmitting ? <Loader /> :<>
        <CreatTeamDialog open={open} setOpen={setOpen} URLLink={URLLink}/>
          <div className="w-full">
            <Breadcrumb pageName="Create Team" />

            <div className="col-span-5 xl:col-span-3 w-full">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">Team Information</h3>
                </div>
                <div className="p-7">
                  <form >
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      <div className="w-full">
                        <label htmlFor="fullName" className="mb-3 block text-sm font-medium text-black dark:text-white">
                          Leader
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none"
                          type="text"
                          id="fullName"
                          value={name}
                          disabled

                        />
                      </div>
                    </div>
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      <div className="w-full">
                        <label htmlFor="fullName" className="mb-3 block text-sm font-medium text-black dark:text-white">
                          Leader Email
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none"
                          type="email"
                          id="email"

                          value={email}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-4.5 my-5">
                      <button
                        onClick={handleCreateTeam}
                        className="flex justify-center rounded bg-black py-2 px-6 font-medium text-white hover:bg-opacity-90"

                      >
                        Create Team
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full my-10">
            <Breadcrumb pageName="Join Team" />

            <div className="col-span-5 xl:col-span-3 w-full">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">Team Information</h3>
                </div>
                <div className="p-7">
                  <form >
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      <div className="w-full">
                        <label htmlFor="fullName" className="mb-3 block text-sm font-medium text-black dark:text-white">
                          Email
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none"
                          type="text"
                          id="fullName"
                          value={email}
                          disabled

                        />
                      </div>
                    </div>
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      <div className="w-full">
                        <label htmlFor="fullName" className="mb-3 block text-sm font-medium text-black dark:text-white">
                          Unique Team Code
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none"
                          type="text"
                          id="fullName"
                          placeholder='465879'
   value={joinCode}
   onChange={(e)=>setJoinCode(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-4.5 my-5">
                      <button
                          onClick={handleJoinTeam}
                          disabled={isSubmitting}
                        className="flex justify-center rounded bg-black py-2 px-6 font-medium text-white hover:bg-opacity-90"
                      // Disable button while submitting
                      >
                        Join Team
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
    </>}
    </>



  );
};

export default CreateTeam;
