const Loader = () => {
  return (
    <div className="flex h-screen items-center w-screen fixed top-0 left-0 z-[100000000000] justify-center bg-white bg-opacity-80">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-[#1DBF73] border-t-transparent"></div>
    </div>
  );
};

export default Loader;
