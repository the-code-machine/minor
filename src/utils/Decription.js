'use client'
import Loader from '@/common/Loader';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

export const SendDescription = () => {
    const[isSubmitting,setIsSubmitting]=useState(false)
    const team = useSelector((state) => state.team);
    const [teamCode, setTeamCode] = useState(team?.teamId || '');
    const [teamLeader, setTeamLeader] = useState(team?.leaderId || '');
    const [mentorName, setMentorName] = useState(team?.mentorId || '');
    const [projectTitle, setProjectTitle] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const updateProject = async (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        
        const projectId = teamCode;

        const updateData = {
            title:projectTitle,
            description:projectDescription,
            mentorId:mentorName,
            leaderId:teamLeader
        };

        try {
            const response = await fetch(`/api/dashboard/student/project/${projectId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData)
            });

            const result = await response.json();
            if (response.ok) {
                setIsSubmitting(false) 
                toast.success('Project updated successfully');
               
            } else {
                setIsSubmitting(false)
                toast.error('Error updating project');
            }
        } catch (error) {
            setIsSubmitting(false)
            toast.error('Network error');
        }
   
   
    };

    return (
        <>{isSubmitting && <Loader />}
        <div className="rounded-sm border my-7 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Project Information</h3>
            </div>
            <div className="p-7">
                <form onSubmit={updateProject}>
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                        <div className="w-full sm:w-1/2">
                            <label htmlFor="teamCode" className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Team Code
                            </label>
                            <input
                                type="text"
                                className="w-full rounded border border-stroke bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                                value={teamCode}
                                onChange={(e) => setTeamCode(e.target.value)}
                                id="teamCode"
                                placeholder="ICB-11"
                            />
                        </div>

                        <div className="w-full sm:w-1/2">
                            <label htmlFor="teamLeader" className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Team Leader Id
                            </label>
                            <input
                                type="text"
                                className="w-full rounded border border-stroke bg-[#C5F2DD] py-3 px-4.5 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                                value={teamLeader}
                                onChange={(e) => setTeamLeader(e.target.value)}
                                id="teamLeader"
                                placeholder="Aryan Parshar"
                            />
                        </div>
                    </div>

                    <div className="mb-5.5">
                        <label htmlFor="mentorName" className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Mentor Id
                        </label>
                        <input
                            type="text"
                            className="w-full rounded border border-stroke bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                            value={mentorName}
                            onChange={(e) => setMentorName(e.target.value)}
                            id="mentorName"
                            placeholder="Satish Pawat"
                        />
                    </div>

                    <div className="mb-5.5">
                        <label htmlFor="projectTitle" className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Project Title
                        </label>
                        <input
                            type="text"
                            className="w-full rounded border border-stroke bg-[#C5F2DD] py-3 px-4.5 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                            value={projectTitle}
                            onChange={(e) => setProjectTitle(e.target.value)}
                            id="projectTitle"
                            placeholder="Automatic Grading System ..."
                        />
                    </div>

                    <div className="mb-5.5">
                        <label htmlFor="projectDescription" className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Project Description
                        </label>
                        <textarea
                            className="w-full rounded border border-stroke bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                            rows={6}
                            id="projectDescription"
                            placeholder="Write your description here .."
                            value={projectDescription}
                            onChange={(e) => setProjectDescription(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end gap-4.5">

                        <button
                            type="submit"
                            className="flex justify-center rounded bg-black py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div></>
    );
};

export const GetDescription = () => {
   const project = useSelector((state)=>state.project)

    return (
        <div className="rounded-sm border my-7 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Project Description</h3>
            </div>
            <div className="p-7">
      
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                        <div className="w-full sm:w-1/2">
                            <p className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Team Code
                            </p>
                            <p
                               
                                className="w-full rounded border border-black bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                             
                            >{project?.projectId}</p>
                        </div>

                        <div className="w-full sm:w-1/2">
                            <p className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Team Leader
                            </p>
                            <p
                                
                                className="w-full rounded border border-stroke bg-[#C5F2DD] py-3 px-4.5 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                           
                            
                            >{project?.leaderId}</p>
                        </div>
                    </div>

                    <div className="mb-5.5">
                        <p  className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Mentor Email
                        </p>
                        <p
                           
                            className="w-full rounded border border-black bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        
                        >{project?.mentorId}</p>
                    </div>

                    <div className="mb-5.5">
                        <p className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Project Title
                        </p>
                        <p
                           
                            className="w-full rounded border  border-black bg-[#C5F2DD] py-3 px-4.5 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          
                        >{project?.title}</p>
                    </div>

                    <div className="mb-5.5">
                        <p className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Project Description
                        </p>
                        <p
                            className="w-full rounded border border-black bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                            
                           
                        >{project?.description}</p>
                    </div>

            </div>
        </div>
    );
};