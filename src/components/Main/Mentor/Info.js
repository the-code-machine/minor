'use client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import Loader from '@/common/Loader';
import { set } from 'mongoose';

const brandData = [
  {
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCpY5LtQ47cqncKMYWucFP41NtJvXU06-tnQ&usqp=CAU',
    name: 'Google',
    visitors: 3.5,
    conversion: 4.8,
  },
];

const TeamHead = ['Team Id', 'Synopsis', 'Implementation', 'Deployment', 'Testing', 'Final Report'];
const StudentHead = ['UserId', 'Mentor', 'Examiner', 'Team'];

export const Info = () => {
  return (
    <>
      <Breadcrumb pageName={"View Panel"} />
      <TableOne />
    </>
  );
};

const TableOne = () => {
  const [isLoading,setIsLoading ]= useState(false)
  const user = useSelector((state) => state.auth);
  const [teamData, setTeamData] = useState([]);
  const [studentData, setStudentData] = useState([{ userId: '4', mentor: 'View Mentor', examiner: 'View Examiner', team: 'View Team' }]);
  const [active, setActive] = useState('Teams');

  const fetchTeams = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get('/api/dashboard/mentor/teams', {
        headers: {
          'Authorization': 'Bearer ' + user?.token,
        },
      });

      if (response.status === 200) {
        const teams = response.data.teams;
        const formattedTeams = teams.map((team) => {
          if(team.mentorId === user.userId) {
          const teamid = team?.projectId;
          const synopsis = team.synopsis ? (team.synopsisGrade || 'Not Graded') : 'Not Submitted';
          const implementation = team.implementation ? (team.implementationGrade || 'Not Graded') : 'Not Submitted';
          const deployment = team.deployment ? (team.deploymentGrade || 'Not Graded') : 'Not Submitted';
          const testing = team.testing ? (team.testingGrade || 'Not Graded') : 'Not Submitted';
          const finalreport = team.finalReport ? (team.finalReportGrade || 'Not Graded') : 'Not Submitted';

          return { teamid, synopsis, implementation, deployment, testing, finalreport };}
          else {
            return null;
          }
        });

        setTeamData(formattedTeams);
        setIsLoading(false)
      } else {
        setTeamData([]);
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error fetching teams:', error);
      setTeamData([]);
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (user) {
      fetchTeams();
    }
  }, [user]);

  const renderActiveTable = () => {
    switch (active) {
      case 'Teams':
        return <DashboardAdminInfo tableHead={TeamHead} tableData={teamData} />;
      case 'Students':
        return <DashboardAdminInfo tableHead={StudentHead} tableData={studentData} />;
      default:
        return null;
    }
  };

  return (
   <> {isLoading && <Loader/>}
    <div className="rounded-sm border border-stroke bg-white px-5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div className="flex justify-start overflow-x-auto items-center lg:space-x-3 space-x-1">
        <button onClick={() => setActive('Teams')} className={`mb-6 lg:text-xl hover:text-white hover:bg-black text-md font-semibold border-2 ${active === 'Teams' ? 'text-white bg-black border-black' : 'border-black bg-transparent text-black'} lg:px-3 lg:py-2 rounded p-2 dark:text-white`}>
          Teams
        </button>
        {/* <button onClick={() => setActive('Students')} className={`mb-6 lg:text-xl hover:text-white hover:bg-black text-md font-semibold border-2 ${active === 'Students' ? 'bg-black text-white border-black' : 'border-black bg-transparent text-black'} lg:px-3 lg:py-2 rounded p-2 dark:text-white`}>
          Students
        </button> */}
      </div>
      {renderActiveTable()}
    </div>
    </>
  
  );
};

const DashboardAdminInfo = ({ tableHead, tableData }) => {
  return (
    <div className="flex flex-col">
      <table className="table-auto w-full overflow-hidden">
        <thead className="bg-[#C5F2DD] dark:bg-meta-4">
          <tr>
            {tableHead.map((item, index) => (
              <th key={index} className="p-2.5 xl:p-5 text-center text-sm font-medium uppercase xsm:text-base">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, key) => (
            <tr key={key} className="py-5">
              {tableHead.map((header, idx) => (
                <td key={idx} className="p-2.5 xl:p-5 text-center">
                  <button className="lg:text-xl hover:text-white hover:bg-black text-md font-semibold border-2 bg-transparent text-black border-black rounded p-2 w-full dark:text-white flex items-center justify-center">
                  {item[header.replace(/\s+/g, '').toLowerCase()]}

                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
