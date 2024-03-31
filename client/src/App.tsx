import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useAppDispatch } from './store/hooks';
import { TaskBoard } from './components/TaskBoard';
import { getAllColumns } from './store/tasksColumn/tasksColumnThunks';
import { getAllTaskData } from './store/taskItem/taskItemThunks';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllTaskData());
    dispatch(getAllColumns());
  }, []);

  return (
    <main className='container'>
      <TaskBoard />
      <ToastContainer position='top-right' autoClose={3000} />
    </main>
  );
};
