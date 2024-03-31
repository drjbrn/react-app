import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useAppDispatch } from './store/hooks';
import { TaskBoard } from './components/TaskBoard';
import { getAllColumns } from './store/tasksColumn/tasksColumnThunks';
import { getAllTaskData } from './store/taskItem/taskItemThunks';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        toast.info('Loading data...', { autoClose: false });
        await dispatch(getAllColumns());
        await dispatch(getAllTaskData());
        toast.dismiss();
      } catch (error) {
        toast.error('An error occurred while loading data');
      }
    };

    fetchData();
  }, []);

  return (
    <main className='container'>
      <TaskBoard />
      <ToastContainer position='top-right' autoClose={3000} />
    </main>
  );
};
