'use client'
import { useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';


import Link from 'next/link';
import DatePickerOne from '../../../components/Forms/DatePicker/DatePickerOne';
import { useSelector } from 'react-redux';





export const ControlPanel = () => {

  const user = useSelector((state) => state);
  return (
<>
        <Breadcrumb pageName={"Control Panel"}/>
     <TableOne />
     </>
  );
};

const TableOne = () => {
  const [SynopsisData, setSynopsisData] = useState();
  const [ImplementationData, setImplementationData] = useState();
  const [DeploymentData, setDeployment] = useState();
  const [TestingData, setTestingData] = useState();
  const [finalreportData, setFinalReportData] = useState();
  const [ExaminerData, setExaminerData] = useState();
  const [RequestsData, setRequestsData] = useState();

  const [active, setActive] = useState('Synopsis');

  const renderActiveTable = () => {
    switch (active) {
      case 'Synopsis':
        return <DashboardAdminInfo  tableData={SynopsisData} />;
      case 'Implementation':
        return <DashboardAdminInfo tableData={ImplementationData} />;
      case 'Deployment':
        return <DashboardAdminInfo  tableData={DeploymentData} />;
      case 'Testing':
        return <DashboardAdminInfo  tableData={TestingData} />;
      case 'Final Report':
        return <DashboardAdminInfo  tableData={finalreportData} />;
      case 'Examiner':
        return <DashboardAdminInfo  tableData={ExaminerData} />;
      case 'Requests':
        return <RequestsAdminInfo  tableData={RequestsData} />;
      default:
        return null;
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div className="flex justify-start overflow-x-auto items-center lg:space-x-3 space-x-1">
        <button onClick={() => setActive('Synopsis')} className={`mb-6 lg:text-xl text-md hover:text-white hover:bg-black font-semibold border-2 ${active === 'Synopsis' ? 'text-white bg-black border-black' : 'border-black bg-transparent text-black'} lg:px-3 lg:py-2 rounded p-2 dark:text-white`}>
          Synopsis
        </button>
        <button onClick={() => setActive('Implementation')} className={`mb-6 lg:text-xl hover:text-white hover:bg-black text-md font-semibold border-2 ${active === 'Implementation' ? 'text-white bg-black border-black' : 'border-black bg-transparent text-black'} lg:px-3 lg:py-2 rounded p-2 dark:text-white`}>
          Implementation
        </button>
        <button onClick={() => setActive('Deployment')} className={`mb-6 lg:text-xl hover:text-white hover:bg-black text-md font-semibold border-2 ${active === 'Deployment' ? 'text-white bg-black border-black' : 'border-black bg-transparent text-black'} lg:px-3 lg:py-2 rounded p-2 dark:text-white`}>
          Deployment
        </button>
        <button onClick={() => setActive('Testing')} className={`mb-6 lg:text-xl hover:text-white hover:bg-black text-md font-semibold border-2 ${active === 'Testing' ? ' bg-black text-white border-black' : 'border-black bg-transparent text-black'} lg:px-3 lg:py-2 rounded p-2 dark:text-white`}>
          Testing
        </button>
        <button onClick={() => setActive('Final Report')} className={`mb-6 lg:text-xl hover:text-white hover:bg-black text-md font-semibold border-2 ${active === 'Final Report' ? ' bg-black text-white border-black' : 'border-black bg-transparent text-black'} lg:px-3 lg:py-2 rounded p-2 dark:text-white`}>
          Final Report
        </button>
        <button onClick={() => setActive('Examiner')} className={`mb-6 lg:text-xl hover:text-white hover:bg-black text-md font-semibold border-2 ${active === 'Examiner' ? ' bg-black text-white border-black' : 'border-black bg-transparent text-black'} lg:px-3 lg:py-2 rounded p-2 dark:text-white`}>
          Examination
        </button>
        <button onClick={() => setActive('Requests')} className={`mb-6 lg:text-xl hover:text-white hover:bg-black text-md font-semibold border-2 ${active === 'Requests' ? ' bg-black text-white border-black' : 'border-black bg-transparent text-black'} lg:px-3 lg:py-2 rounded p-2 dark:text-white`}>
          Requests
        </button>
      </div>

      {renderActiveTable()}

    </div>
  );
};

const DashboardAdminInfo = ({  tableData }) => {
    const[selectedStartDate, setSelectedStartDate]=useState(new Date())
    const[selectedEndDate, setSelectedEndDate]=useState(new Date())
  return (
    <>
      <div className="flex flex-col space-y-5">
     
<DatePickerOne title={'Start Date'} selectedDate={selectedStartDate} setSelectedDate={setSelectedStartDate}/>
<DatePickerOne title={'End Date'} selectedDate={selectedEndDate} setSelectedDate={setSelectedEndDate}/>

<div className=' flex space-x-3 justify-end'>
<button  className={`mb-6 lg:text-xl text-md hover:text-white hover:bg-black font-semibold border-2  text-black bg-transparent border-black lg:px-3 lg:py-2 rounded p-2 dark:text-white`}>
          Save Dates
        </button>
<button  className={`mb-6 lg:text-xl text-md hover:text-white hover:bg-black font-semibold border-2  text-black bg-transparent border-black lg:px-3 lg:py-2 rounded p-2 dark:text-white`}>
          Lock Dates
        </button>
</div>
      </div>
    </>
  );
};
const RequestsAdminInfo = () => {
    const tableHead = ['Team',' Synopsis','Implementation','Deployment','Testing','Final Report']
    const [TeamData, setTeamData] = useState([{ team: 'Team 1', synopsis: '10/50', implementation: '20/50', deployment: '35/50', testing: '40/50', finalreport: '24/50' }]);
    return (
        <>
          <div className="flex flex-col">
            <div className={`grid grid-cols-${tableHead.length} scroll-bar rounded-sm text-black bg-[#C5F2DD] dark:bg-meta-4`}>
              {tableHead.map((item, index) => (
                <div key={index} className="p-2.5 xl:p-5 text-center">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">{item}</h5>
                </div>
              ))}
            </div>
    
            {TeamData.map((item, key) => (
              <div className={`grid grid-cols-${tableHead.length} gap-5 py-5`} key={key}>
                {tableHead.map((header, idx) => (
                 
                 
                  <button  className={`mb-6 lg:text-xl text-md  hover:text-white hover:bg-black font-semibold border-2  text-black bg-transparent border-black lg:px-3 lg:py-2 rounded p-2 dark:text-white`}>
                  {item[header.replace(/\s+/g, '').toLowerCase()]}
                </button>
                ))}
              </div>
            ))}
          </div>
        </>
      );
}