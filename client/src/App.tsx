/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
import { useEffect } from 'react';
import { useAppDispatch } from './store/hooks';
import { TaskBoard } from './components/TaskBoard';
import { getAllColumns } from './store/tasksColumn/tasksColumnThunks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllTaskData } from './store/taskItem/taskItemThunks';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllTaskData());
    dispatch(getAllColumns());
  }, [dispatch]);

  return (
    <main className='container'>
      <TaskBoard />
      <ToastContainer position='top-right' autoClose={3000} />
    </main>
  );
};
