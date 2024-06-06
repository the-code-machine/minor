'use client'
import Loader from '@/common/Loader';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

export const SendDeployment = () => {
    const[isSubmitting,setIsSubmitting]=useState(false)
    const team = useSelector((state) => state.team);
    const user = useSelector((state) => state.auth);
    const [teamCode, setTeamCode] = useState(team?.teamId || '');
    const [coverLetter, setCoverLetter] = useState('');
    const [attachedFile, setAttachedFile] = useState('');
    const [uploadDeployment, setUploadDeployment] = useState('');

    const updateProject = async (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        
        const projectId = teamCode;

        // Determine the responsibility and structure the update data accordingly
        const responsibility = Responsiblity();
        const deploymentData = {};
        // Convert responsibility string to camelCase
        const responsibilityCamelCase = responsibility?.toLowerCase().replace(/_(\w)/g, (_, letter) => letter.toUpperCase());

        // Use the camelCase string as the key in the synopsisData object
        deploymentData[responsibilityCamelCase] = [{ work: coverLetter, documentUrl: attachedFile }];


        const updateData = {
            deployment: deploymentData,
        };

        if (team?.leaderId === user?.userId) {
            updateData.DeploymentDocument = uploadDeployment;
        }
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

    const Responsiblity = () => {

        if (team) {
            if (team.firstMember === user.userId) {

                return team.permissions.firstMember
            }
            else if (team.secondMember === user.userId) {
                return team.permissions.secondMember
            }
            else if (team.thirdMember === user.userId) {
                return team.permissions.thirdMember
            }
            else if (team.fourthMember === user.userId) {
                return team.permissions.fourthMember
            }
            else {
                return "Not a part of the team"
            }

        }
    }

    return (
        <>{isSubmitting && <Loader/>}
        <div className="rounded-sm border my-7 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 flex justify-between dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Deployment Submission</h3>
                <h3 className="font-medium text-black dark:text-white">Responsibility: {Responsiblity()}</h3>
            </div>
            <div className="p-7">
                <form onSubmit={updateProject}>
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                        <div className="w-full ">
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
                    </div>

                    <div className="mb-5.5">
                        <label htmlFor="coverLetter" className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Describe your responsibility as a {Responsiblity()} in Deployment Submission
                        </label>
                        <textarea
                            className="w-full rounded border border-stroke bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                            rows={6}
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            placeholder="Write your work in synopsis submission...."
                        />
                    </div>
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                        <div className="w-full ">
                            <label htmlFor="attachedFile" className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Upload Your Individual Work Document
                            </label>
                            <input
                                type="text"
                                className="w-full rounded border border-stroke bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                                value={attachedFile}
                                onChange={(e) => setAttachedFile(e.target.value)}
                                id="attachedFile"
                                placeholder="https://drive.google.com/...."
                            />
                        </div>
                    </div>
                    {team?.leaderId === user?.userId &&
                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                            <div className="w-full ">
                                <label htmlFor="uploadSynopsis" className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Upload Deployment Link
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded border border-stroke bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                                    value={uploadDeployment}
                                    onChange={(e) => setUploadDeployment(e.target.value)}
                                    id="uploadSynopsis"
                                    placeholder="https://drive.google.com/...."
                                />
                            </div>
                        </div>}
                    <div className="flex justify-end gap-4.5">
                        <button
                            type="submit"
                            className="flex justify-center rounded bg-black py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div></>
    );
};

export const GetDeployment = () => {
    const team = useSelector((state) => state.team);
    const project = useSelector((state) => state.project);
    const renderMemberWork = () => {
        return Object.keys(project?.deployment).map((role) => {
            if (Array.isArray(project?.deployment[role])) {
                return (
                    <div key={role} className="mb-5">
                        <h3 className="font-medium text-black dark:text-white">{role.toUpperCase()}</h3>
                        {project?.deployment[role].map((work, index) => (
                            <div key={index} className="flex flex-col gap-2 my-2">
                                <textarea rows={3} value={work?.work} className="w-full border  border-black bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"/>
                                <a href={work?.documentUrl} target="_blank" className="border bg-[#C5F2DD] py-3 px-4 text-black border-black ">Document</a>
                            </div>
                        ))}
                    </div>
                );
            }
        });
    };

    return (
        <div className="rounded-sm border my-7 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 flex justify-between dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Deployment</h3>
            </div>
            <div className="p-7 grid grid-cols-2 grid-rows-2 gap-10">
                {team && project && renderMemberWork()}
            </div>
        </div>
    );
};



