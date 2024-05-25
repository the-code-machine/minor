
import BrandOne from '../../images/brand/brand-01.svg';
import BrandTwo from '../../images/brand/brand-02.svg';
import BrandThree from '../../images/brand/brand-03.svg';
import BrandFour from '../../images/brand/brand-04.svg';
import BrandFive from '../../images/brand/brand-05.svg';


const TableOne = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5  py-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 ">
      <button className="mb-6 text-xl font-semibold text-black  bg-[#C5F2DD] px-3 py-2 rounded dark:text-white">
        Mentors
      </button>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm text-black bg-[#C5F2DD] dark:bg-meta-4 ">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
             User Id
            </h5>
          </div>
       
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Grading
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Alloted Teams
            </h5>
          </div>
        
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-3 ${
              key === brandData.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <img src={brand.logo} alt="Brand" />
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {brand.name}
              </p>
            </div>



            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
            <button
                      className="flex justify-center rounded  border-2 transition-all bg-transparent py-2 px-6 font-medium text-black border-black hover:bg-black hover:text-white"

                    >
                      View Grading
                    </button>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
            <button
                      className="flex justify-center rounded  border-2 transition-all bg-transparent py-2 px-6 font-medium text-black border-black hover:bg-black hover:text-white"

                    >
                      View Teams
                    </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
