'use client'
import React, { useEffect, useState } from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { Project } from './Project';
import Link from 'next/link'
import { useSelector } from 'react-redux';
import { GetSynopsis, SendSynopsis } from '@/utils/Synopsis';
import { GetDescription, SendDescription } from '@/utils/Decription';
import { GetImplementation, SendImplementation } from '@/utils/Implementation';
import { GetFinalReport, SendFinalReport } from '@/utils/FinalReport';
import { GetDeployment, SendDeployment } from '@/utils/Deployment';
import { GetTesting, SendTesting } from '@/utils/Testing';

export const CreateProject = () => {
    const team = useSelector((state) => state.team);


    return (
        <>

            <>
                <Breadcrumb pageName={'Create Project'} />

                <> {team?.teamConfirmed && <ProjectView />}  </>
                <> {!team?.teamConfirmed && <CreateProjectView />}  </>

            </>


        </>

    );
};

const CreateProjectView = () => {
    return (
        <>
            <div className="col-span-5 xl:col-span-3 w-full">
                <div className="rounded-sm border border-stroke bg-white shadow-default flex justify-center items-center dark:border-strokedark dark:bg-boxdark">
                    <div className="p-7 flex  space-x-5"></div>

                    <div className="p-7 flex  space-x-5">



                        <div className="flex flex-col gap-4.5 justify-center items-center my-5">
                            <p className=' text-center font-medium'>

                                Before you can create a project, you need to ensure that you have already established a team. The team serves as the foundational unit, providing the structure and collaborative environment necessary for a project to thrive. Without a team, there would be no clear framework for project roles, responsibilities, or communication. Therefore, the first step towards launching a project is to bring together a group of people with a common goal, forming a team. Once this team is in place, you can proceed to plan, develop, and eventually create your project.
                            </p>
                            <Link
                                href={'/dashboard/student/team'}
                                className="flex justify-center rounded w-1/4 bg-black py-2 px-6 font-medium text-white hover:bg-opacity-90"

                            >
                                Create Team
                            </Link>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}
const ProjectView = () => {
   
    const project = useSelector((state)=>state.project)
    console.log(project)
    const [active, setActive] = useState('Description')
    return (
        <>
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
                active == 'Description' && <> {!project?.description ?<SendDescription />:<GetDescription/>}</>
            }
            {
                active == 'Synopsis' && <>{!project?.synopsis ?<SendSynopsis />:<GetSynopsis/>}</>
            }
            {
                active == 'Implementation' && <>{!project?.implementation ?<SendImplementation />:<GetImplementation/>}</>
            }
            {
                active == 'Final Report' && <>{!project?.finalReport ?<SendFinalReport />:<GetFinalReport/>}</>
            }
            {
                active == 'Deployment' && <>{!project?.deployment ?<SendDeployment />:<GetDeployment/>}</>
            }
            {
                active == 'Testing' && <>{!project?.testing ?<SendTesting />:<GetTesting/>}</>
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







