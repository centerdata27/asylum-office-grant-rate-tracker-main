import { useAppContext } from '../../context/AppContext.jsx';

export const Loading = () => {
  const { isDataLoading } = useAppContext();

  return isDataLoading ? (
    <div className='fixed top-0 left-0 bg-black bg-opacity-40 text-6xl text-amber-50 w-full h-full flex justify-center items-center'>
      <div className='bg-amber-900 text-6xl text-amber-50 p-5 rounded-2xl'>Loading Data...</div>
    </div>
  ) : (
    <></>
  );
};
