'use client'
import React, { useEffect, useState } from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Link from 'next/link'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Loader from '@/common/Loader';
import { set } from 'mongoose';
import axios from 'axios';
import toast from 'react-hot-toast';


export default function Home() {
    const team = useSelector((state) => state.team);


    return (
        <>

            <>
                <Breadcrumb pageName={'Create Project'} />

                <ProjectView />


            </>


        </>

    );
};

const ProjectView = () => {
    let paths = window.location.pathname.split('/')
      
    
    const authState = useSelector((state) => state.auth);

    const projectId = paths[4]
    const [isFetch, setIsFetch] = useState(false)
    const [project, setProject] = useState(null)
    const [active, setActive1] = useState('Description')
    const fetchProject = async () => {
        setIsFetch(true)

        
        const url = `/api/dashboard/student/project/${projectId}`

        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${authState?.token}`,
                    'Content-Type': 'application/json',
                },
            })
         
            if (response.status === 201) {
                setProject(response.data.project)
            } else {
                console.error('Error fetching project:', response.status, response.data);
                setProject({})
            }
        } catch (error) {
            setIsFetch(false)
            console.error('Network error:', error);
            setProject({})
        } finally {
            setIsFetch(false)
        }
    }

    const setActive = (value) => {
        switch (value) {
          case 'Description':
             if(project?.description){
                setActive1(value)
             }
             else{
                toast.error('No Description Found')
             }
            break;
            case 'Synopsis':
                if(project?.synopsis){
                   setActive1(value)
                }
                else{
                   toast.error('No Synopsis Found')
                }
               break;
          case 'Implementation':
            if(project?.implementation){
                setActive1(value)
             }
                else{
                    toast.error('No Implementation Found')
                }
            break;
          case 'Deployment':
            if(project?.deployment){
                setActive1(value)
             }
                else{
                    toast.error('No Deployment Found')
                }
            break;
          case 'Testing':
            if(project?.testing){
                setActive1(value)
             }
                else{
                    toast.error('No Testing Found')
                }
            break;
          case 'Final Report':
            if(project?.finalReport){
                setActive1(value)
             }
                else{
                    toast.error('No Final Report Found')
                }
            break;
          default:
            // Handle the default case
            break;
        }
      };
    useEffect(() => {
   if(project == null){
    fetchProject()
      
   }
         
       
    }, [])
    return (
        <>
            {isFetch && <Loader />}
            <div className="flex space-x-1.5 w-full overflow-x-auto scroll-bar">
                <CardDataStats active={active} setActive={setActive} title="Description" total="24/50" rate="0.95%" levelDown>
                    <img src='/svg/description.svg' className='w-12 h-12 object-contain p-1' />
                </CardDataStats>
                <CardDataStats active={active} setActive={setActive} title="Synopsis" total="10/50" rate="0.43%" levelUp>
                    <img src='/svg/planing.svg' className='w-12 h-12 object-contain p-1' />
                </CardDataStats>
                <CardDataStats active={active} setActive={setActive} title="Implementation" total="20/50" rate="4.35%" levelUp>
                    <img src='/svg/implementation.svg' className='w-12 h-12 object-contain ' />
                </CardDataStats>
                <CardDataStats active={active} setActive={setActive} title="Deployment" total="35/50" rate="2.59%" levelUp>
                    <img src='/svg/deployment.svg' className='w-12 h-12 object-contain p-1' />
                </CardDataStats>
                <CardDataStats active={active} setActive={setActive} title="Testing" total="40/50" rate="0.95%" levelDown>
                    <img src='/svg/testing.svg' className='w-12 h-12 object-contain p-1' />
                </CardDataStats>
                <CardDataStats active={active} setActive={setActive} title="Final Report" total="24/50" rate="0.95%" levelDown>
                    <img src='/svg/finalreport.svg' className='w-12 h-12 object-contain p-1' />
                </CardDataStats>
            </div>

            {
                active == 'Description' && <> {<GetDescription project={project} />}</>
            }
            {
                active == 'Synopsis' && <>{<GetSynopsis project={project} />}</>
            }
            {
                active == 'Implementation' && <>{<GetImplementation project={project} />}</>
            }
            {
                active == 'Final Report' && <>{<GetFinalReport project={project} />}</>
            }
            {
                active == 'Deployment' && <>{<GetDeployment project={project} />}</>
            }
            {
                active == 'Testing' && <>{<GetTesting project={project} />}</>
            }


        </>
    )
}
const CardDataStats = ({
    title,
    children,
    active,
    setActive
}) => {
    return (
        <div onClick={() => setActive(title)} className={`rounded-sm border shrink-0 cursor-pointer  ${active == title ? 'border-black bg-[#c5f2dd] transition-all' : 'border-stroke bg-white'} hover:bg-[#c5f2dd] py-3 px-4 shadow-default flex justify-center space-x-3 items-center dark:border-strokedark dark:bg-boxdark`}>
            <div className="flex  items-center justify-center rounded-full  dark:bg-meta-4">
                {children}
            </div>

            <div className=" flex text-lg font-semibold justify-end">

                {title}


            </div>
        </div>
    );
};

const GetDescription = ({ project }) => {


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
                    <p className="mb-3 block text-sm font-medium text-black dark:text-white">
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
const GetDeployment = ({ project }) => {


    const renderMemberWork = () => {
        return Object.keys(project?.deployment).map((role) => {
            if (Array.isArray(project?.deployment[role])) {
                return (
                    <div key={role} className="mb-5">
                        <h3 className="font-medium text-black dark:text-white">{role.toUpperCase()}</h3>
                        {project?.deployment[role].map((work, index) => (
                            <div key={index} className="flex flex-col gap-2 my-2">
                                <textarea rows={3} value={work?.work} className="w-full border  border-black bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white" />
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
                {project && renderMemberWork()}
            </div>
        </div>
    );
};


const GetFinalReport = ({ project }) => {


    const renderMemberWork = () => {
        return Object.keys(project?.finalReport).map((role) => {
            if (Array.isArray(project?.finalReport[role])) {
                return (
                    <div key={role} className="mb-5">
                        <h3 className="font-medium text-black dark:text-white">{role.toUpperCase()}</h3>
                        {project?.finalReport[role].map((work, index) => (
                            <div key={index} className="flex flex-col gap-2 my-2">
                                <textarea rows={3} value={work?.work} className="w-full border  border-black bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white" />
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
                <h3 className="font-medium text-black dark:text-white">Final Report</h3>
            </div>
            <div className="p-7 grid grid-cols-2 grid-rows-2 gap-10">
                {project && renderMemberWork()}
            </div>
        </div>
    );
};

const GetImplementation = ({ project }) => {

    const renderMemberWork = () => {
        return Object.keys(project?.implementation).map((role) => {
            if (Array.isArray(project?.implementation[role])) {
                return (
                    <div key={role} className="mb-5">
                        <h3 className="font-medium text-black dark:text-white">{role.toUpperCase()}</h3>
                        {project?.implementation[role].map((work, index) => (
                            <div key={index} className="flex flex-col gap-2 my-2">
                                <textarea rows={3} value={work?.work} className="w-full border  border-black bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white" />
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
                <h3 className="font-medium text-black dark:text-white">Implementation</h3>
            </div>
            <div className="p-7 grid grid-cols-2 grid-rows-2 gap-10">
                {project && renderMemberWork()}
            </div>
        </div>
    );
};

const GetSynopsis = ({ project }) => {

    const renderMemberWork = () => {
        return Object.keys(project?.synopsis).map((role) => {
            if (Array.isArray(project?.synopsis[role])) {
                return (
                    <div key={role} className="mb-5">
                        <h3 className="font-medium text-black dark:text-white">{role.toUpperCase()}</h3>
                        {project?.synopsis[role].map((work, index) => (
                            <div key={index} className="flex flex-col gap-2 my-2">
                                <textarea rows={3} value={work?.work} className="w-full border  border-black bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white" />
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
                <h3 className="font-medium text-black dark:text-white">Synopsis</h3>
            </div>
            <div className="p-7 grid grid-cols-2 grid-rows-2 gap-10">
                {project && renderMemberWork()}
            </div>
        </div>
    );
};
const GetTesting = ({ project }) => {

    const renderMemberWork = () => {
        return Object.keys(project?.testing).map((role) => {
            if (Array.isArray(project?.testing[role])) {
                return (
                    <div key={role} className="mb-5">
                        <h3 className="font-medium text-black dark:text-white">{role.toUpperCase()}</h3>
                        {project?.testing[role].map((work, index) => (
                            <div key={index} className="flex flex-col gap-2 my-2">
                                <textarea rows={3} value={work?.work} className="w-full border  border-black bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white" />
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
                <h3 className="font-medium text-black dark:text-white">Testing</h3>
            </div>
            <div className="p-7 grid grid-cols-2 grid-rows-2 gap-10">
                {project && renderMemberWork()}
            </div>
        </div>
    );
};
