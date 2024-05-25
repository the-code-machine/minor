
import { useEffect, useState } from "react";



export default ({open,setOpen,URLLink}) => {
  const [copyState, setCopyState] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(URLLink).then(
      function () {
        setCopyState(true);
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  };

  useEffect(() => {
    if (copyState) {
      setTimeout(() => setCopyState(false), 3000);
    }
  }, [copyState]);

  return (<>
    { open &&  <div className=" fixed top-0 left-0 z-[10000000] justify-center items-center h-screen w-full">
     
        <div className=" w-full max-w-lg mx-auto px-4 bg-white opacity-40">
          <div className="bg-white rounded-md shadow-lg px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-medium  text-graydark">
                Share this Unique Code
              </div>
              <div className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mx-auto"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-3 text-sm leading-relaxed text-left text-gray-500">
                Share this unique code with your friends to join your team.
            </div>
            <div className="p-2 border rounded-lg flex items-center justify-between mt-4">
              <p className="text-sm text-gray-600 overflow-hidden">{URLLink}</p>
              <button
                className={`relative text-gray-500 ${
                  copyState ? "text-black pointer-events-none" : ""
                }`}
                onClick={handleCopy}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 pointer-events-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                {copyState ? (
                  <div className="absolute -top-12 -left-3 px-2 py-1.5 rounded-xl bg-black font-semibold text-white text-[10px] after:absolute after:inset-x-0 after:mx-auto after:top-[22px] after:w-2 after:h-2 after:bg-black after:rotate-45">
                    Copied
                  </div>
                ) : (
                  ""
                )}
              </button>
            </div>
            <div>
              <button onClick={()=>setOpen(!open)} className="text-sm mt-3 py-2.5 px-8 flex-1 text-white bg-black rounded-md outline-none ring-offset-2 ring-black focus:ring-2">
                Done
              </button>
            </div>
          </div>
        </div>
  
    </div>}</>
  );
};
