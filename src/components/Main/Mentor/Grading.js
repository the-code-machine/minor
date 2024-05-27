import React, {  useState } from 'react';


import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { useSelector } from 'react-redux';

export const Grading = () => {
 const user = useSelector(state => state);
  const [active, setActive] = useState('Description')
  return (
    <DefaultLayout user={user}>
      <Breadcrumb pageName={"Grading Panel"} />
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
    </DefaultLayout>
  );
};


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
    <div className="rounded-sm border w-full my-7 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Project Information</h3>
      </div>
      <div className="p-7 w-full'">
        <form onSubmit={handleSubmit} className='w-full'>
          <div className='flex w-full space-x-5'>
          <div className="mb-5.5 flex flex-col w-1/2 gap-5.5 ">
            <div className="w-full">
              <h1 className="mb-3 block text-sm font-medium text-black dark:text-white">
                Team Code
              </h1>
              <div

                className="w-full rounded border  text-lg bg-[#C5F2DD] py-3 px-4 text-black border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"

              >ICB-211</div>
            </div>
            <div className="w-full ">
              <h1 className="mb-3 block text-sm font-medium text-black dark:text-white">
                Team Leader
              </h1>
              <div

                className="w-full rounded border  text-lg  bg-[#C5F2DD] py-3 px-4 text-black border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"

              >Sarthak Khare</div>
            </div>
            <div className="w-full ">
              <h1 className="mb-3 block text-sm font-medium text-black dark:text-white">
                Mentor
              </h1>
              <div

                className="w-full rounded border  text-lg  bg-[#C5F2DD] py-3 px-4 text-black border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"

              >DRS sir</div>
            </div>
            <div className="w-full ">
              <h1 className="mb-3 block text-sm font-medium text-black dark:text-white">
                Poject Title
              </h1>
              <div

                className="w-full rounded border  text-lg  bg-[#C5F2DD] py-3 px-4 text-black border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"

              >Automatic Grading System</div>
            </div>



          </div>

          <div className='w-1/2 '>
            <div className="w-full ">
              <h1 className="mb-3 block text-sm font-medium text-black dark:text-white">
                Poject Description
              </h1>
              <div

                className="w-full rounded border  text-xl  bg-[#C5F2DD] py-3 px-4 text-black border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"

              >To remove spaces between words for consistent key retrieval in your table data, you can use a regular expression to remove all spaces in the table headers' string values. This is a common way to ensure that the lowercased key names derived from table headers correctly map to your data objects.</div>
            </div>

          </div>
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
  const [open, setOpen] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

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
    <div className="rounded-sm border my-7 w-full border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Synopsis Submission</h3>
      </div>

    
      <div className="p-7 w-full ">
      <div className="w-full mb-5">
              <h1 className="mb-3 block text-sm  font-medium text-black dark:text-white">
                Cover letter
              </h1>
              <div

                className="w-full rounded border  text-xl  bg-[#C5F2DD] py-3 px-4 text-black border-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"

              >To remove spaces between words for consistent key retrieval in your table data, you can use a regular expression to remove all spaces in the table headers' string values. This is a common way to ensure that the lowercased key names derived from table headers correctly map to your data objects.</div>
            </div>
        {
         open && <>
         <div onClick={()=>setOpen(!open)} className='  w-full h-screen flex justify-center items-center fixed left-0 top-0 z-[100000000] bg-white bg-opacity-70'>
         <iframe
        src="https://www.clickdimensions.com/links/TestPDFfile.pdf"
        className="w-4/5 h-[90vh] " // Set height to full screen and width to 100%
        frameBorder="0" // No border
        allowFullScreen // Allow fullscreen mode if needed
      />
         </div>
         </>
        }
 <div className="flex justify-end gap-4.5">
 <button
              onClick={() => setOpen(!open)}
              className="flex justify-center rounded hover:bg-black py-2 px-6 font-medium bg-transparent border-2 border-black  text-black hover:text-gray hover:bg-opacity-90"
            >View Document
              
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="flex justify-center rounded bg-black py-2 px-6 font-medium text-gray hover:bg-opacity-90"
            >Mark Grading
              
            </button>
          
          </div>

    </div>
    </div>
  );
};








