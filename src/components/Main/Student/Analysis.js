'use client'
import React from 'react';
import CardDataStats from '../../../components/CardDataStats';
import ChartOne from '../../../components/Charts/ChartOne';

import ChartTwo from '../../../components/Charts/ChartTwo';



import { useDispatch, useSelector } from 'react-redux';
import Loader from '@/common/Loader';

export const Analysis = () => {
  const dispatch = useDispatch() 
  const isFetching = useSelector((state)=>state.project.isFetching)
  useEffect(() => {
    const dispatched = async () => {
    
      dispatch({ type: 'AUTH_STATE_CHANGED' });
      dispatch({ type: 'Team_STATE_CHANGED' });
      dispatch({ type: 'PROJECT_STATE_CHANGED' });
    };

    dispatched();
  }, []);
  const team = useSelector((state) => state.project);
  console.log(team)
  const Marks =(section)=>{

      const synopsis = team.synopsis ? (team.synopsisGrade || 'Not Graded') : 'Not Submitted';
      const implementation = team.implementation ? (team.implementationGrade || 'Not Graded') : 'Not Submitted';
      const deployment = team.deployment ? (team.deploymentGrade || 'Not Graded') : 'Not Submitted';
      const testing = team.testing ? (team.testingGrade || 'Not Graded') : 'Not Submitted';
      const finalreport = team.finalReport ? (team.finalReportGrade || 'Not Graded') : 'Not Submitted';

  if(section === 'synopsis')
    {
      return synopsis
    }
    else if(section === 'implementation')
      {
        return implementation
      }
      else if( section === 'deployment')
        {
          return deployment
        }
        else if(section === 'testing')
          {
            return testing
          }
     else{
      return finalreport
     }
  }
  return (
  <>{ isFetching && <Loader/>}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-5 2xl:gap-7.5">
        <CardDataStats title="Synopsis" total={Marks('synopsis')} rate="0.43%" levelUp>
        <img src='/svg/planing.svg'/>
        </CardDataStats>
        <CardDataStats title="Implementation" total={Marks('implementation')} rate="4.35%" levelUp>
        <img src='/svg/implementation.svg'/>
        </CardDataStats>
        <CardDataStats title="Deployment" total={Marks('deployment')} rate="2.59%" levelUp>
        <img src='/svg/deployment.svg'/>
        </CardDataStats>
        <CardDataStats title="Testing" total={Marks('testing')} rate="0.95%" levelDown>
        <img src='/svg/testing.svg'/>
        </CardDataStats>
        <CardDataStats title="Final Report" total={Marks('finalReport')} rate="0.95%" levelDown>
        <img src='/svg/finalreport.svg'/>
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        {/* <ChartThree /> */}
        {/* <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard /> */}
      </div>
      </>

  );
};


