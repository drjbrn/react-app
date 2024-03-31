import { Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import { Droppable, Draggable, DraggableProvided } from 'react-beautiful-dnd';
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineEllipsis,
  AiOutlinePlus,
} from 'react-icons/ai';
import { toast } from 'react-toastify';
import { Task } from '@/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { openModal } from '@/store/modalSlice';
import {
  deleteColumn,
  getAllColumns,
  getColumnById,
} from '@/store/tasksColumn/tasksColumnThunks';
import { ColumnEditor } from '../ColumnEditor';
import { TaskEditor } from '../TaskEditor';
import { TaskItem } from '../TaskItem';
import s from './ColumnContainer.module.scss';

interface ColumnContainerProps {
  columnTitle: string;
  tasks: Task[];
  columnId: number | string;
}

export const ColumnContainer = ({
  columnTitle,
  tasks,
  columnId,
}: ColumnContainerProps) => {
  const dispatch = useAppDispatch();
  const isOpenModal = useAppSelector((state) => state.modal.createNewTask);
  const isEditColumn = useAppSelector(
    (state) => state.modal[`editColumn_${columnId}`],
  );

  const handleCreateNewTask = () => {
    dispatch(openModal('createNewTask'));
  };

  const handleEditColumn = async () => {
    await dispatch(getColumnById(+columnId));
    dispatch(openModal(`editColumn_${columnId}`));
  };

  const handleDeleteColumn = async () => {
    await dispatch(deleteColumn(+columnId));
    toast.success(`Column successfully deleted.`);
    dispatch(getAllColumns());
  };

  const items: MenuProps['items'] = [
    {
      label: (
        <button type='button' onClick={handleEditColumn}>
          <AiOutlineEdit />
          Edit
        </button>
      ),
      key: '0',
    },
    {
      label: (
        <button type='button' onClick={handleCreateNewTask}>
          <AiOutlinePlus />
          Add new card
        </button>
      ),
      key: '1',
    },
    {
      label: (
        <button type='button' onClick={handleDeleteColumn}>
          <AiOutlineDelete />
          Delete
        </button>
      ),
      key: '2',
    },
  ];

  return (
    <>
      <section className={s.column}>
        <div className={s.column_header}>
          <h4 className={s.column_title}>{columnTitle}</h4>
          <p>{tasks.length}</p>
          <Dropdown menu={{ items }} trigger={['click']}>
            <button type='button'>
              <Space>
                <AiOutlineEllipsis className={s.dots} />
              </Space>
            </button>
          </Dropdown>
        </div>
        <button
          type='button'
          className={s.column_button}
          onClick={handleCreateNewTask}
        >
          <AiOutlinePlus />
          Add new card
        </button>
        <Droppable droppableId={String(columnId)}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={s.column_list}
            >
              {tasks.map(({ id, title, description, priority, dueDate }) => (
                <Draggable key={String(id)} draggableId={String(id)} index={id}>
                  {(provided: DraggableProvided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskItem
                        id={id}
                        title={title}
                        description={description}
                        priority={priority}
                        dueDate={dueDate}
                        columnId={+columnId}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </section>
      {isOpenModal && <TaskEditor isNewTask />}
      {isEditColumn && <ColumnEditor isEdit columnId={+columnId} />}
    </>
  );
};
