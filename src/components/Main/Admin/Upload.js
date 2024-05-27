import { useContext } from 'react';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../../layout/DefaultLayout';
import UserContext from '../../../Context';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Upload = () => {
const user = useSelector(state =>state);
  return (
    <DefaultLayout user={user}>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Upload Details" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-5 space-y-5">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Mentor, Students and Teams Information
                </h3>
              </div>
              <div className="p-7">






                <div className="flex justify-between flex-wrap space-y-5 ">
                  <div className=' text-lg font-medium  justify-center items-center flex '>
                    Mentor-Student-Team Information/Google.Sheet.com
                  </div>
                  <div className=' flex justify-end space-x-5'>
                    <button
                      className="flex justify-center rounded  border-2 transition-all bg-transparent py-2 px-6 font-medium text-black border-black hover:bg-black hover:text-white"

                    >
                      View Format
                    </button>
                    <Link to={'https://docs.google.com/spreadsheets/d/1N97t6k6HO-neCP4ni1al9gPC22UA3lGozMmecxXxybU/edit?usp=sharing'}
                      className="flex justify-center rounded bg-black py-2 px-6 font-medium text-gray hover:bg-opacity-90"

                    >
                      Update Details
                    </Link></div>
                </div>

              </div>
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Examiner Information
                </h3>
              </div>
              <div className="p-7">






                <div className="flex justify-between flex-wrap space-y-5">
                  <div className=' text-lg font-medium  justify-center items-center flex '>
                    Examiner/Google.Sheet.com
                  </div>
                  <div className=' flex justify-end space-x-5'>
                    <button
                      className="flex justify-center rounded  border-2 transition-all bg-transparent py-2 px-6 font-medium text-black border-black hover:bg-black hover:text-white"

                    >
                      View Format
                    </button>
                    <Link to={'https://docs.google.com/spreadsheets/d/1OmMF7nI-e8X86I5Ld6qgh7V_GlRJXjfMdXhvGYkj50M/edit?usp=sharing'}
                      className="flex justify-center rounded bg-black py-2 px-6 font-medium text-gray hover:bg-opacity-90"

                    >
                      Update Details
                    </Link></div>
                </div>

              </div>
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Labs Information
                </h3>
              </div>
              <div className="p-7">






                <div className="flex justify-between flex-wrap space-y-5">
                  <div className=' text-lg font-medium  justify-center items-center flex '>
                    Labs Information/Google.Sheet.com
                  </div>
                  <div className=' flex justify-end space-x-5'>
                    <button
                      className="flex justify-center rounded  border-2 transition-all bg-transparent py-2 px-6 font-medium text-black border-black hover:bg-black hover:text-white"

                    >
                      View Format
                    </button>
                    <Link to={'https://docs.google.com/spreadsheets/d/1N97t6k6HO-neCP4ni1al9gPC22UA3lGozMmecxXxybU/edit?usp=sharing'}
                      className="flex justify-center rounded bg-black py-2 px-6 font-medium text-gray hover:bg-opacity-90"

                    >
                      Update Details
                    </Link></div>
                </div>

              </div>
            </div>
          </div>


        </div>
      </div>
    </DefaultLayout>
  );
};


