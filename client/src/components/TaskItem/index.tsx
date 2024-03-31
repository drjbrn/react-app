import { Dropdown, MenuProps, Select, Space } from 'antd';
import { CiCalendarDate } from 'react-icons/ci';
import { IoIosArrowDown } from 'react-icons/io';
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineEllipsis,
  AiOutlineFolderOpen,
} from 'react-icons/ai';

import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { openModal } from '@/store/modalSlice';
import {
  editTask,
  getTaskById,
  removeTask,
} from '@/store/taskItem/taskItemThunks';
import { getAllColumns } from '@/store/tasksColumn/tasksColumnThunks';
import { getAllHistory, getHistoryById } from '@/store/history/historyThunks';
import { TaskDetailsModal } from '../TaskDetailsModal';
import { TaskEditor } from '../TaskEditor';
import s from './TaskItem.module.scss';

interface TaskItemProps {
  id: number | string;
  title: string;
  description: string;
  priority?: string;
  dueDate?: string;
}

export const TaskItem = ({
  id,
  title,
  description,
  priority,
  dueDate,
}: TaskItemProps) => {
  const dispatch = useAppDispatch();
  const isOpenModal = useAppSelector((state) => state.modal.editTask);
  const columnList = useAppSelector((state) => state.tasksColumn.columnList);
  const isOpenTask = useAppSelector(
    (state) => state.modal[`taskDetails_${id}`],
  );

  const handleDeleteTask = async () => {
    await dispatch(removeTask(+id));
    toast.success(`Task successfully deleted.`);
    dispatch(getAllColumns());
  };

  const handleEditTask = async () => {
    await dispatch(getTaskById(+id));
    dispatch(openModal('editTask'));
  };

  const handleMoveTaskToAnotherColumn = async (value: string, option: any) => {
    const selectedId = option.id;
    const taskId = Number(id);

    if (id) {
      const data = {
        taskId,
        column: selectedId as number,
      };
      await dispatch(editTask(data));
      toast.success(`Task successfully moved to another column.`);
      dispatch(getAllColumns());
    }
  };

  const handleOpenTask = async () => {
    dispatch(getAllHistory());
    await dispatch(getHistoryById(+id));
    dispatch(openModal(`taskDetails_${id}`));
  };

  const items: MenuProps['items'] = [
    {
      label: (
        <button type='button' onClick={handleOpenTask}>
          <AiOutlineFolderOpen />
          Open
        </button>
      ),
      key: '0',
    },
    {
      label: (
        <button type='button' onClick={handleEditTask}>
          <AiOutlineEdit />
          Edit
        </button>
      ),
      key: '1',
    },
    {
      label: (
        <button type='button' onClick={handleDeleteTask}>
          <AiOutlineDelete />
          Delete
        </button>
      ),
      key: '2',
    },
  ];

  return (
    <>
      <div className={s.block}>
        <div className={s.block_wrapper}>
          <h4 className={s.block_title}>{title}</h4>
          <Dropdown menu={{ items }} trigger={['click']}>
            <button type='button'>
              <Space>
                <AiOutlineEllipsis className={s.dots} />
              </Space>
            </button>
          </Dropdown>
        </div>
        <p className={s.block_desc}>{description}</p>
        <div className={s.task_wrap}>
          <p className={s.task_priority}>{priority}</p>
          <div className={s.task_date}>
            <CiCalendarDate />
            {dueDate}
          </div>
        </div>
        <Select
          placeholder='Move to'
          optionFilterProp='children'
          suffixIcon={<IoIosArrowDown />}
          options={columnList}
          onChange={handleMoveTaskToAnotherColumn}
        />
      </div>
      {isOpenModal && <TaskEditor isEdit taskId={+id} />}
      {isOpenTask && (
        <TaskDetailsModal
          id={id}
          title={title}
          description={description}
          priority={priority}
          dueDate={dueDate}
        />
      )}
    </>
  );
};
