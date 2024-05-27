import { useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../../layout/DefaultLayout';
import { useSelector } from 'react-redux';


const brandData = [
  {
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCpY5LtQ47cqncKMYWucFP41NtJvXU06-tnQ&usqp=CAU',
    name: 'Google',
    visitors: 3.5,
    conversion: 4.8,
  },


];

const TeamHead = ['Team',' Synopsis','Implementation','Deployment','Testing','Final Report']
const StudentHead = ['UserId','Mentor','Examiner','Team']
export const Info = () => {

 const user = useSelector(state => state);
  return (
    <DefaultLayout user={user}>
      <Breadcrumb pageName={"View Panel"}/>
     <TableOne brandData={brandData}/>
    </DefaultLayout>
  );
};

const TableOne = () => {
  const [TeamData, setTeamData] = useState([{ team: 'Team 1', synopsis: '10/50', implementation: '20/50', deployment: '35/50', testing: '40/50', finalreport: '24/50' }]);
  const [StudentData, setStudentData] = useState([{ userid: '4', mentor: 'View Mentor', examiner: 'View Examiner', team: 'View Team' }]);

  const [active, setActive] = useState('Teams');

  const renderActiveTable = () => {
    switch (active) {
      case 'Teams':
        return <DashboardAdminInfo tableHead={TeamHead} tableData={TeamData} />;
      case 'Students':
        return <DashboardAdminInfo tableHead={StudentHead} tableData={StudentData} />;
      default:
        return null;
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div className="flex justify-start overflow-x-auto items-center lg:space-x-3 space-x-1">
      
        <button onClick={() => setActive('Teams')} className={`mb-6 lg:text-xl hover:text-white hover:bg-black text-md font-semibold border-2 ${active === 'Teams' ? 'text-white bg-black border-black' : 'border-black bg-transparent text-black'} lg:px-3 lg:py-2 rounded p-2 dark:text-white`}>
          Teams
        </button>
        <button onClick={() => setActive('Students')} className={`mb-6 lg:text-xl hover:text-white hover:bg-black text-md font-semibold border-2 ${active === 'Students' ? ' bg-black text-white border-black' : 'border-black bg-transparent text-black'} lg:px-3 lg:py-2 rounded p-2 dark:text-white`}>
          Students
        </button>
      </div>

      {renderActiveTable()}

    </div>
  );
};

const DashboardAdminInfo = ({ tableHead, tableData }) => {
  return (
    <>
      <div className="flex flex-col">
        <div className={`grid  grid-cols-${tableHead.length} rounded-sm text-black bg-[#C5F2DD] dark:bg-meta-4`}>
          {tableHead.map((item, index) => (
            <div key={index} className="p-2.5 xl:p-5 text-center">
              <h5 className="text-sm font-medium uppercase xsm:text-base">{item}</h5>
            </div>
          ))}
        </div>

        {tableData.map((item, key) => (
          <div className={`grid grid-cols-${tableHead.length} gap-10 py-5`} key={key}>
            {tableHead.map((header, idx) => (
             
          
                <button  className={`lg:text-xl hover:text-white hover:bg-black text-md font-semibold border-2  bg-transparent text-black border-black  rounded p-2 dark:text-white`}>
                {item[header.replace(/\s+/g, '').toLowerCase()]}
              </button>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
