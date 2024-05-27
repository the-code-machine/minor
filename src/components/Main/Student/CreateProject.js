import React, {  useEffect, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { Project } from './Project';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const CreateProject = () => {
 const user = useSelector(state=> state);
   
    const [projectView, setprojectView] = useState(false)
    const path = window.location.pathname;
    const projectId = path.split('/')[3];
    console.log(projectId)
   
    return (
        <>
            {
                projectId != 'project-not-found' && <Project />
            }
            {
                projectId == 'project-not-found' && <>
                    <DefaultLayout user={user}>
                        <Breadcrumb pageName={'Create Project'} />

                        <> {projectView && <ProjectView />}  </>
                        <> {!projectView && <CreateProjectView teamId={user.teamId} setprojectView={setprojectView}/>}  </>

                    </DefaultLayout>
                </>
            }
        </>

    );
};

const CreateProjectView = ({ teamId ,setprojectView}) => {
    return (
        <>
            <div className="col-span-5 xl:col-span-3 w-full">
                <div className="rounded-sm border border-stroke bg-white shadow-default flex justify-center items-center dark:border-strokedark dark:bg-boxdark">
                    <div className="p-7 flex  space-x-5"></div>
                   
                    <div className="p-7 flex  space-x-5">
                     
                     
                        {teamId == null && 
                        <div className="flex flex-col gap-4.5 justify-center items-center my-5">
                            <p className=' text-center font-medium'>
                                
Before you can create a project, you need to ensure that you have already established a team. The team serves as the foundational unit, providing the structure and collaborative environment necessary for a project to thrive. Without a team, there would be no clear framework for project roles, responsibilities, or communication. Therefore, the first step towards launching a project is to bring together a group of people with a common goal, forming a team. Once this team is in place, you can proceed to plan, develop, and eventually create your project.
                            </p>
                            <Link
                                to={'/dashboard/team'}
                                className="flex justify-center rounded w-1/4 bg-black py-2 px-6 font-medium text-white hover:bg-opacity-90"

                            >
                                Create Team
                            </Link>
                        </div>}
                        {teamId != null &&   <div className="flex flex-col justify-center items-center gap-4.5 my-5">
                        <p className='text-center font-medium'>
                        Having successfully established a team, you are now ready to embark on creating a project. The formation of a team is a significant milestone as it brings together individuals with diverse skills and perspectives, laying the groundwork for collaborative work. With this key step completed, you can shift your focus to the next phase, where you can plan, design, and execute your project. The team's creation sets the stage for effective teamwork, communication, and problem-solving, all of which are essential as you move forward with your project.
                            </p>
                            <button
                              onClick={() => setprojectView(true)}
                                className="flex justify-center rounded bg-black py-2 px-6 font-medium w-1/4 text-white hover:bg-opacity-90"

                            >
                                Create Project
                            </button>
                        </div>}
                      
                    </div>
                </div>
            </div>
        </>
    )
}
const ProjectView = () => {
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
                active == 'Description' && <><Description /></>
            }
            {
                active == 'Synopsis' && <><Synopsis /></>
            }
            {
                active == 'Implementation' && <><Implementation /></>
            }
            {
                active == 'Final Report' && <><Finalreport /></>
            }
            {
                active == 'Deployment' && <><Deployment /></>
            }
            {
                active == 'Testing' && <><Testing /></>
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

const Description = () => {
    const [teamCode, setTeamCode] = useState('');
    const [teamLeader, setTeamLeader] = useState('');
    const [mentorName, setMentorName] = useState('');
    const [projectTitle, setProjectTitle] = useState('');
    const [projectDescription, setProjectDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const projectDetails = {
            teamCode,
            teamLeader,
            mentorName,
            projectTitle,
            projectDescription,
        };

        try {
            const response = await fetch('/project-description', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectDetails),
            });

            if (response.ok) {
                alert('Project description saved successfully!');
            } else {
                alert('Failed to save project description.');
            }
        } catch (error) {
            console.error('Error during form submission:', error);
            alert('An error occurred while saving the project description.');
        }
    };

    return (
        <div className="rounded-sm border my-7 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Project Information</h3>
            </div>
            <div className="p-7">
                <form onSubmit={handleSubmit}>
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
                                Team Leader
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
                            Mentor Name
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
        </div>
    );
};


const Synopsis = () => {
    const [teamCode, setTeamCode] = useState('');
    const [teamLeader, setTeamLeader] = useState('');
    const [mentorName, setMentorName] = useState('');
    const [coverLetter, setCoverLetter] = useState('');
    const [attachedFile, setAttachedFile] = useState(null);

    const handleFileChange = (e) => {
        setAttachedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('teamCode', teamCode);
        formData.append('teamLeader', teamLeader);
        formData.append('mentorName', mentorName);
        formData.append('coverLetter', coverLetter);

        if (attachedFile) {
            formData.append('synopsisFile', attachedFile);
        }

        try {
            const response = await fetch('/synopsis-submission', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Synopsis submitted successfully!');
            } else {
                alert('Failed to submit synopsis.');
            }
        } catch (error) {
            console.error('Error during form submission:', error);
            alert('An error occurred while submitting the synopsis.');
        }
    };

    return (
        <div className="rounded-sm border my-7 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Synopsis Submission</h3>
            </div>
            <div className="p-7">
                <form onSubmit={handleSubmit}>
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
                                Team Leader
                            </label>
                            <input
                                type="text"
                                className="w-full rounded border border-stroke bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                                value={teamLeader}
                                onChange={(e) => setTeamLeader(e.target.value)}
                                id="teamLeader"
                                placeholder="Aryan Parshar"
                            />
                        </div>
                    </div>

                    <div className="mb-5.5">
                        <label htmlFor="mentorName" className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Mentor Name
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
                        <label htmlFor="coverLetter" className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Cover Letter
                        </label>
                        <textarea
                            className="w-full rounded border border-stroke bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                            rows={6}
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            placeholder="Write your cover letter here .."
                        />
                    </div>

                    <div className="rounded-sm border my-5 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                File Upload
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Attach Document
                                </label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#C5F2DD] file:py-3 file:px-5 file:hover:bg-black file:hover:bg-opacity-10 focus:border-black active:border-black disabled:cursor-default disabled:bg-[#C5F2DD] dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white text-black dark:focus:border-black"
                                />
                            </div>
                        </div>
                    </div>

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
        </div>
    );
};


const Implementation = () => {
    const [teamCode, setTeamCode] = useState('');
    const [teamLeader, setTeamLeader] = useState('');
    const [mentorName, setMentorName] = useState('');
    const [coverLetter, setCoverLetter] = useState('');
    const [files, setFiles] = useState({
        techStack: null,
        dataFlowDiagram: null,
        designDocs: null,
    });

    const handleFileChange = (fieldName) => (e) => {
        setFiles((prevFiles) => ({
            ...prevFiles,
            [fieldName]: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('teamCode', teamCode);
        formData.append('teamLeader', teamLeader);
        formData.append('mentorName', mentorName);
        formData.append('coverLetter', coverLetter);

        Object.entries(files).forEach(([key, file]) => {
            if (file) {
                formData.append(key, file);
            }
        });

        try {
            const response = await fetch('/implementation-submission', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Implementation details submitted successfully!');
            } else {
                alert('Failed to submit implementation details.');
            }
        } catch (error) {
            console.error('Error during form submission:', error);
            alert('An error occurred while submitting implementation details.');
        }
    };

    return (
        <div className="rounded-sm border my-7 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Implementation Submission</h3>
            </div>
            <div className="p-7">
                <form onSubmit={handleSubmit}>
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
                                Team Leader
                            </label>
                            <input
                                type="text"
                                className="w-full rounded border border-stroke bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                                value={teamLeader}
                                onChange={(e) => setTeamLeader(e.target.value)}
                                id="teamLeader"
                                placeholder="Aryan Parshar"
                            />
                        </div>
                    </div>

                    <div className="mb-5.5">
                        <label htmlFor="mentorName" className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Mentor Name
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
                        <label htmlFor="coverLetter" className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Cover Letter
                        </label>
                        <textarea
                            className="w-full rounded border border-stroke bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                            rows={6}
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            placeholder="Write your cover letter here .."
                        />
                    </div>

                    <div className="rounded-sm border my-5 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                File Upload
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Technology Stack
                                </label>
                                <input
                                    type="file"
                                    onChange={handleFileChange('techStack')}
                                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#C5F2DD] file:py-3 file:px-5 file:hover:bg-black file:hover:bg-opacity-10 focus:border-black active:border-black disabled:cursor-default disabled:bg-[#C5F2DD] dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white text-black dark:focus:border-black"
                                />
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Data Flow Diagram
                                </label>
                                <input
                                    type="file"
                                    onChange={handleFileChange('dataFlowDiagram')}
                                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#C5F2DD] file:py-3 file:px-5 file:hover:bg-black file:hover:bg-opacity-10 focus:border-black active:border-black disabled:cursor-default disabled:bg-[#C5F2DD] dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white text-black dark:focus:border-black"
                                />
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Low-Level and High-Level Design
                                </label>
                                <input
                                    type="file"
                                    onChange={handleFileChange('designDocs')}
                                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#C5F2DD] file:py-3 file:px-5 file:hover:bg-black file:hover:bg-opacity-10 focus:border-black active:border-black disabled:cursor-default disabled:bg-[#C5F2DD] dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white text-black dark:focus:border-black"
                                />
                            </div>
                        </div>
                    </div>

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
        </div>
    );
};



const Deployment = () => {
    const [teamCode, setTeamCode] = useState('');
    const [teamLeader, setTeamLeader] = useState('');
    const [mentorName, setMentorName] = useState('');
    const [projectTitle, setProjectTitle] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [deploymentLink, setDeploymentLink] = useState('');
    const [attachedFile, setAttachedFile] = useState(null);

    const handleFileChange = (e) => {
        setAttachedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const projectDetails = {
            teamCode,
            teamLeader,
            mentorName,
            projectTitle,
            projectDescription,
            deploymentLink,
        };

        const formData = new FormData();
        Object.keys(projectDetails).forEach((key) => {
            formData.append(key, projectDetails[key]);
        });

        if (attachedFile) {
            formData.append('attachedFile', attachedFile);
        }

        try {
            const response = await fetch('/project-deployment', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Project details and deployment link saved successfully!');
            } else {
                alert('Failed to save project details.');
            }
        } catch (error) {
            console.error('Error during form submission:', error);
            alert('An error occurred while saving the project details.');
        }
    };

    return (
        <div className="rounded-sm border my-7 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Deployment Information</h3>
            </div>
            <div className="p-7">
                <form onSubmit={handleSubmit}>
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
                                Team Leader
                            </label>
                            <input
                                type="text"
                                className="w-full rounded border border-stroke bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                                value={teamLeader}
                                onChange={(e) => setTeamLeader(e.target.value)}
                                id="teamLeader"
                                placeholder="Aryan Parshar"
                            />
                        </div>
                    </div>

                    <div className="mb-5.5">
                        <label htmlFor="mentorName" className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Mentor Name
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
                            className="w-full rounded border border-stroke bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                            value={projectTitle}
                            onChange={(e) => setProjectTitle(e.target.value)}
                            id="projectTitle"
                            placeholder="Automatic Grading System ..."
                        />
                    </div>

                    <div className="mb-5.5">
                        <label htmlFor="deploymentLink" className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Deployment Link
                        </label>
                        <input
                            type="text"
                            className="w-full rounded border border-stroke bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                            value={deploymentLink}
                            onChange={(e) => setDeploymentLink(e.target.value)}
                            id="deploymentLink"
                            placeholder="e.g., http://myproject.com"
                        />
                    </div>

                    <div className="rounded-sm border my-5 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">File Upload</h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Documentation
                                </label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#C5F2DD] file:py-3 file:px-5 file:hover:bg-black file:hover:bg-opacity-10 focus:border-black active:border-black disabled:cursor-default disabled:bg-[#C5F2DD] dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white text-black dark:focus:border-black"
                                />
                            </div>
                        </div>
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
        </div>
    );
};


const Testing = () => {
    const [teamCode, setTeamCode] = useState('');
    const [teamLeader, setTeamLeader] = useState('');
    const [mentorName, setMentorName] = useState('');
    const [projectTitle, setProjectTitle] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [gitHubLink, setGitHubLink] = useState('');
    const [attachedFile, setAttachedFile] = useState(null);

    const handleFileChange = (e) => {
        setAttachedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const projectDetails = {
            teamCode,
            teamLeader,
            mentorName,
            projectTitle,
            projectDescription,
            gitHubLink,
        };

        const formData = new FormData();
        Object.keys(projectDetails).forEach((key) => {
            formData.append(key, projectDetails[key]);
        });

        if (attachedFile) {
            formData.append('attachedFile', attachedFile);
        }

        try {
            const response = await fetch('/project-testing', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Project testing information saved successfully!');
            } else {
                alert('Failed to save project testing information.');
            }
        } catch (error) {
            console.error('Error during form submission:', error);
            alert('An error occurred while saving the project testing information.');
        }
    };

    return (
        <div className="rounded-sm border my-7 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Testing Information</h3>
            </div>
            <div className="p-7">
                <form onSubmit={handleSubmit}>
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
                                Team Leader
                            </label>
                            <input
                                type="text"
                                class="w-full rounded border border-stroke bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                                value={teamLeader}
                                onChange={(e) => setTeamLeader(e.target.value)}
                                id="teamLeader"
                                placeholder="Aryan Parshar"
                            />
                        </div>
                    </div>

                    <div className="mb-5.5">
                        <label htmlFor="mentorName" className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Mentor Name
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
                            className="w-full rounded border border-stroke bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                            value={projectTitle}
                            onChange={(e) => setProjectTitle(e.target.value)}
                            id="projectTitle"
                            placeholder="Automatic Grading System ..."
                        />
                    </div>

                    <div className="mb-5.5">
                        <label htmlFor="gitHubLink" className="mb-3 block text-sm font-medium text-black dark:text-white">
                            GitHub Link
                        </label>
                        <input
                            type="text"
                            className="w-full rounded border border-stroke bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                            value={gitHubLink}
                            onChange={(e) => setGitHubLink(e.target.value)}
                            id="gitHubLink"
                            placeholder="e.g., http://github.com/myproject"
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
        </div>
    );
};

const Finalreport = () => {
    const [teamCode, setTeamCode] = useState('');
    const [teamLeader, setTeamLeader] = useState('');
    const [mentorName, setMentorName] = useState('');
    const [coverLetter, setCoverLetter] = useState('');
    const [attachedFile, setAttachedFile] = useState(null);

    const handleFileChange = (e) => {
        setAttachedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('teamCode', teamCode);
        formData.append('teamLeader', teamLeader);
        formData.append('mentorName', mentorName);
        formData.append('coverLetter', coverLetter);

        if (attachedFile) {
            formData.append('synopsisFile', attachedFile);
        }

        try {
            const response = await fetch('/finalreport-submission', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Synopsis submitted successfully!');
            } else {
                alert('Failed to submit synopsis.');
            }
        } catch (error) {
            console.error('Error during form submission:', error);
            alert('An error occurred while submitting the synopsis.');
        }
    };

    return (
        <div className="rounded-sm border my-7 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Final Report Submission</h3>
            </div>
            <div className="p-7">
                <form onSubmit={handleSubmit}>
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
                                Team Leader
                            </label>
                            <input
                                type="text"
                                className="w-full rounded border border-stroke bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                                value={teamLeader}
                                onChange={(e) => setTeamLeader(e.target.value)}
                                id="teamLeader"
                                placeholder="Aryan Parshar"
                            />
                        </div>
                    </div>

                    <div className="mb-5.5">
                        <label htmlFor="mentorName" className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Mentor Name
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
                        <label htmlFor="coverLetter" className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Cover Letter
                        </label>
                        <textarea
                            className="w-full rounded border border-stroke bg-[#C5F2DD] py-3 px-4 text-black focus:border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                            rows={6}
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            placeholder="Write your cover letter here .."
                        />
                    </div>

                    <div className="rounded-sm border my-5 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                File Upload
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Attach Document
                                </label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#C5F2DD] file:py-3 file:px-5 file:hover:bg-black file:hover:bg-opacity-10 focus:border-black active:border-black disabled:cursor-default disabled:bg-[#C5F2DD] dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white text-black dark:focus:border-black"
                                />
                            </div>
                        </div>
                    </div>

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
        </div>
    );
};