import dayjs from 'dayjs';
import TextArea from 'antd/es/input/TextArea';
import { DatePicker, Input, Select } from 'antd';
import {
  Controller,
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { IoIosArrowDown } from 'react-icons/io';
import { TaskEditorForm } from '@/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeModal } from '@/store/modalSlice';
import { createNewTask, editTask } from '@/store/taskItem/taskItemThunks';
import { getAllColumns } from '@/store/tasksColumn/tasksColumnThunks';
import { priorityList } from '@/constans/priorityList';
import { Modal } from '../UI/Modal';
import s from './TaskEditor.module.scss';

interface TaskEditorProps {
  isNewTask?: boolean;
  isEdit?: boolean;
  taskId?: number;
}

export const TaskEditor = ({ isNewTask, isEdit, taskId }: TaskEditorProps) => {
  const dispatch = useAppDispatch();
  const taskData = useAppSelector((state) => state.taskItem.task);
  const columnList = useAppSelector((state) => state.tasksColumn.columnList);

  const methods = useForm({
    mode: 'onChange',
  });

  const handleCloseModal = () => {
    methods.reset();
    dispatch(closeModal('createNewTask'));
    dispatch(closeModal('editTask'));
  };

  const onSubmit = async (data: TaskEditorForm) => {
    if (isNewTask) {
      const formattedData = {
        title: data.title,
        description: data.description,
        priority: data.priority,
        dueDate: dayjs(data.dueDate).format('DD.MM.YYYY'),
        column: data.column.id,
      };

      await dispatch(createNewTask(formattedData));
      handleCloseModal();
      dispatch(getAllColumns());
    }

    if (isEdit && taskId) {
      const formattedData = {
        taskId,
        title: data.title,
        description: data.description,
        priority: data.priority,
        dueDate: dayjs(data.dueDate).format('DD.MM.YYYY'),
        column: data.column.id,
      };

      await dispatch(editTask(formattedData));
      handleCloseModal();
      dispatch(getAllColumns());
    }
  };

  return (
    <Modal modalId={isNewTask ? 'createNewTask' : 'editTask'}>
      <>
        <h4 className={s.title}>
          {isNewTask ? 'Create new task' : 'Edit task'}
        </h4>

        <FormProvider {...methods}>
          <form
            id='login'
            className={s.form}
            onSubmit={(e) => e.preventDefault()}
          >
            <Controller
              name='column'
              defaultValue={isEdit && taskData?.column.title}
              control={methods.control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <div className={s.form_wrap}>
                  <h6>Choose list</h6>
                  <Select
                    {...field}
                    options={columnList}
                    placeholder='List'
                    suffixIcon={<IoIosArrowDown />}
                    onChange={(value, option) => {
                      field.onChange(option);
                    }}
                  />
                </div>
              )}
            />
            <Controller
              name='title'
              defaultValue={isEdit && taskData?.title}
              control={methods.control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <div className={s.form_wrap}>
                  <h6>Task name</h6>
                  <Input {...field} placeholder='Task name' />
                </div>
              )}
            />
            <Controller
              name='description'
              defaultValue={isEdit && taskData?.description}
              control={methods.control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <div className={s.form_wrap}>
                  <h6>Description</h6>
                  <TextArea
                    {...field}
                    showCount
                    maxLength={1000}
                    placeholder='Task description'
                    style={{ height: 120, resize: 'none' }}
                  />
                </div>
              )}
            />
            <Controller
              name='priority'
              defaultValue={isEdit && taskData?.priority}
              control={methods.control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <div className={s.form_wrap}>
                  <h6>Priority</h6>
                  <Select
                    {...field}
                    options={priorityList}
                    placeholder='Priority'
                    suffixIcon={<IoIosArrowDown />}
                  />
                </div>
              )}
            />
            <Controller
              name='dueDate'
              defaultValue={isEdit && dayjs(taskData?.dueDate, 'DD.MM.YYYY')}
              control={methods.control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <div className={s.form_wrap}>
                  <h6>Due date</h6>
                  <DatePicker {...field} format='DD.MM.YYYY' />
                </div>
              )}
            />

            <button
              type='submit'
              className={s.form_button}
              onClick={methods.handleSubmit(
                onSubmit as SubmitHandler<FieldValues>,
              )}
            >
              {isNewTask ? 'Create' : 'Submit'}
            </button>
          </form>
        </FormProvider>
      </>
    </Modal>
  );
};
