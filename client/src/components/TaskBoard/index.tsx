import { AiOutlinePlus } from 'react-icons/ai';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { openModal } from '@/store/modalSlice';
import { getAllHistory } from '@/store/history/historyThunks';
import { editTask } from '@/store/taskItem/taskItemThunks';
import { getAllColumns } from '@/store/tasksColumn/tasksColumnThunks';
import { ColumnContainer } from '../ColumnContainer';
import { ColumnEditor } from '../ColumnEditor';
import { HistoryOverlay } from '../HistoryOverlay';
import s from './TaskBoard.module.scss';

export const TaskBoard = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.tasksColumn.allData);
  const isOpenModal = useAppSelector((state) => state.modal.addNewColumn);
  const isOpenHistory = useAppSelector((state) => state.modal.history);

  const handleAddColumn = () => {
    dispatch(openModal('addNewColumn'));
  };

  const handleOpenHistory = async () => {
    await dispatch(getAllHistory());
    dispatch(openModal('history'));
  };

  const onDragEnd = async (result: any) => {
    const { draggableId, destination } = result;
    const taskId = draggableId;
    const destinationColumnId = destination?.droppableId;

    const newData = {
      taskId,
      column: destinationColumnId,
    };
    await dispatch(editTask(newData));
    toast.success(`Task successfully moved to another column.`);
    dispatch(getAllColumns());
  };

  return (
    <>
      <section className={s.board}>
        <div className={s.board_header}>
          <h1 className={s.board_title}>Task Board</h1>
          <div className={s.board_buttons}>
            <button
              type='button'
              className={s.board_buttons_history}
              onClick={handleOpenHistory}
            >
              History
            </button>
            <button
              type='button'
              className={s.board_buttons_add}
              onClick={handleAddColumn}
            >
              <AiOutlinePlus />
              Create new list
            </button>
          </div>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <ul className={s.board_columns}>
            {data?.map(({ id, title, tasks }) => (
              <li key={id}>
                <Droppable droppableId={String(id)} key={String(id)}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <ColumnContainer
                        columnTitle={title}
                        tasks={tasks}
                        columnId={id}
                      />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </li>
            ))}
          </ul>
        </DragDropContext>
      </section>
      {isOpenModal && <ColumnEditor isNewColumn />}
      {isOpenHistory && <HistoryOverlay />}
    </>
  );
};
