'use client'
import React, { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoaderUnder from '@/components/LoaderUnder';
import Loader from '@/common/Loader';
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
export const Team = () => {
  const [data, setData] = useState([])
  const[team,setTeam]= useState(null)
  const[isSubmitting,setIsSubmitting]= useState('')
  const [description,setDescription]= useState('')
  const [users, setUsers] = useState()
  const user = useSelector((state) => state.auth);
  const [selectedUsers, setSelectedUsers] = useState(Array(4).fill(null));
  const [selectedPermissions, setSelectedPermissions] = useState({
    first: [],
    second: [],
    third: [],
    fourth: [],
  });
  const [selectedOptions, setSelectedOptions] = useState({});
  const options = [
    { value: 'ProjectManager', label: 'Project Manager' },
    { value: 'Desginer', label: 'Desginer' },
    { value: 'Developer', label: 'Developer' },
    { value: 'Tester', label: 'Tester' },
  ];

  const handlePermissionChange = (memberKey, selectedOption) => {
    setSelectedOptions(prevState => ({
      ...prevState,
      [memberKey]: selectedOption,
    }));
    setSelectedPermissions(prevState => ({
      ...prevState,
      [memberKey]: selectedOption,
    }));
  };

  useEffect(() => {
    setIsSubmitting(true)
    const url = '/api/dashboard/student/team'
    const Fetch = async () => {
      const response = await axios.post(url, { teamId: user?.teamId }, {
        headers: {
          'Authorization': `Bearer ${user?.token}`, // Correct format for Bearer token
          'Content-Type': 'application/json',  // If you're using FormData, make sure Content-Type is set properly
        },
      })

      if (response.data.status === 201) {
        const selectedPermissions = {
          first: { value: response?.data?.data?.permissions?.firstMember ,label: response?.data?.data?.permissions?.firstMember},
          second: { value: response?.data?.data?.permissions?.secondMember,label: response?.data?.data?.permissions?.secondMember},
          third: { value: response?.data?.data?.permissions?.thirdMember ,label:response?.data?.data?.permissions?.thirdMember},
          fourth: { value: response?.data?.data?.permissions?.fourthMember,label: response?.data?.data?.permissions?.fourthMember}
        };
        const memberoptions = []
        memberoptions.push({ value: response?.data?.data?.firstMember, label: response?.data?.data?.firstMember })
        memberoptions.push({ value: response?.data?.data?.secondMember, label: response?.data?.data?.secondMember })
        memberoptions.push({ value: response?.data?.data?.thirdMember, label: response?.data?.data?.thirdMember })
        memberoptions.push({ value: response?.data?.data?.fourthMember, label: response?.data?.data?.fourthMember })
        setData(memberoptions)
        setTeam(response.data.data)
        setSelectedPermissions(selectedPermissions)
        setIsSubmitting(false)
      }
    }
    if (user?.teamId) {
      Fetch()
    }
  
  }, [user?.teamId, user?.token])

  useEffect(() => {

    const fetch = async () => {
      const url = '/api/getUsers'
      const response = await axios.post(url, { selectedOption: user?.userType }, {
        headers: {
          'Authorization': `Bearer ${user?.token}`, // Correct format for Bearer token
          'Content-Type': 'application/json',  // If you're using FormData, make sure Content-Type is set properly
        }
      })
      console.log(response)
      if (response.data.status === 201) {
        const useroptions = response?.data?.data?.map(user => ({ value: user.email, label: user.email }))
        setUsers(useroptions);
        console.log(useroptions)
      }

    }
    if (user?.userType) {
      fetch()
    }
  }, [user?.userType, user?.token,])


  const handleFormSubmit = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    const url = '/api/dashboard/student/checkteam';
    const permissions = []
    permissions.push({firstMember:selectedPermissions.first.value})
    permissions.push({secondMember:selectedPermissions.second.value})
    permissions.push({thirdMember:selectedPermissions.third.value})
    permissions.push({fourthMember:selectedPermissions.fourth.value})
    const teamData = {
        teamId: user?.teamId,
        firstMember: data[0].value,
        secondMember: data[1].value,
        thirdMember: data[2].value,
        fourthMember: data[3].value,
        permissions: permissions,
        description: description,
    };
    

    try {
        const response = await axios.put(url, teamData, {
            headers: {
                'Authorization': `Bearer ${user?.token}`,
                'Content-Type': 'application/json',
            },
        });
        console.log(response);
        if (response.data.status === 201) {
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("An error occurred while submitting the form.");
    } finally {
        setIsSubmitting(false);
    }
};

  return (
<>{ isSubmitting && <Loader/>}
    <div className="w-full">
      <Breadcrumb pageName="Team Details" />

      <div className="col-span-5 xl:col-span-3 w-full">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Team Information</h3>
          </div>
          <div className="p-7">
            <form>
              {['First Member', 'Second Member', 'Third Member', 'Fourth Member'].map((memberName, index) => {
                const memberKey = ['first', 'second', 'third', 'fourth'][index];

                return (
                  <div key={index}>
                    <h1 className="text-black text-md font-medium my-2">{memberName}</h1>
                    <div className="mb-5.5 flex flex-col gap-5.5 shadow-lg border border-[#C5F2DD] p-3 sm:flex-row w-full">
                      <div className="w-full sm:w-1/2">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor={`email-${index}`}>
                          Email
                        </label>
                        <Select
                          styles={customStyles}
                          options={data}
                          value={data[index]}
                          onChange={(selectedOption) => {
                            setSelectedUsers(prevState => {
                              const newState = [...prevState];
                              newState[index] = selectedOption;
                              return newState;
                            });
                          }}
                          placeholder="Select Member"
                        />
                      </div>
                      <div className="w-full sm:w-1/2">
                        <label className="mb-3 block text-sm font-medium text-black" htmlFor={`permissions-${index}`}>
                          Permissions
                        </label>
                        <Select
                          styles={customStyles}
                          options={options.filter(option =>
                            !Object.values(selectedOptions).find(selected => selected.value === option.value) ||
                            selectedOptions[memberKey]?.value === option.value
                          )}
                          value={selectedPermissions[memberKey]}
                          onChange={(selectedOption) => handlePermissionChange(memberKey, selectedOption)}
                          placeholder="Select Permissions"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="mb-5.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="teamDescription">
                  Team Description
                </label>
                <textarea
                onChange={(e)=>setDescription(e.target.value)}
                  className="w-full rounded border border-stroke bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none"
                  name="teamDescription"
                  id="teamDescription"
                  rows={6}
                  placeholder="Write your team description here"
                  value={team?.description ||description}
                />
              </div>
              <div className="flex justify-end gap-4.5">
               { !team?.teamConfirmed && <button
                  onClick={handleFormSubmit}
                  className="flex justify-center rounded bg-black py-2 px-6 font-medium text-gray hover:bg-opacity-90"

                >
                  Submit Team for Approval
                </button>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Team;
