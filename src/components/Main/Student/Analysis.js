import React, { useContext } from 'react';
import CardDataStats from '../../../components/CardDataStats';
import ChartOne from '../../../components/Charts/ChartOne';

import ChartTwo from '../../../components/Charts/ChartTwo';


import DefaultLayout from '../../../layout/DefaultLayout';
import { useSelector } from 'react-redux';

export const Analysis = () => {
  const user = useSelector((state) => state);
  return (
    <DefaultLayout  user={user}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-5 2xl:gap-7.5">
        <CardDataStats title="Synopsis" total="10/50" rate="0.43%" levelUp>
        <img src='/svg/planing.svg'/>
        </CardDataStats>
        <CardDataStats title="Implementation" total="20/50" rate="4.35%" levelUp>
        <img src='/svg/implementation.svg'/>
        </CardDataStats>
        <CardDataStats title="Deployment" total="35/50" rate="2.59%" levelUp>
        <img src='/svg/deployment.svg'/>
        </CardDataStats>
        <CardDataStats title="Testing" total="40/50" rate="0.95%" levelDown>
        <img src='/svg/testing.svg'/>
        </CardDataStats>
        <CardDataStats title="Final Report" total="24/50" rate="0.95%" levelDown>
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
    </DefaultLayout>
  );
};


