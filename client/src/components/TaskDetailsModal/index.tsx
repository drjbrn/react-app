import dayjs from 'dayjs';
import { AiOutlineEdit } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeModal, openModal } from '@/store/modalSlice';
import { getTaskById } from '@/store/taskItem/taskItemThunks';
import { Modal } from '../UI/Modal';
import s from './TaskDetailsModal.module.scss';

interface TaskDetailsModalProps {
  id: number | string;
  title: string;
  description: string;
  priority?: string;
  dueDate?: string;
}

export const TaskDetailsModal = ({
  id,
  title,
  description,
  priority,
  dueDate,
}: TaskDetailsModalProps) => {
  const dispatch = useAppDispatch();
  const history = useAppSelector((state) => state.history.taskHistory);

  const handleEditTask = async () => {
    await dispatch(getTaskById(+id));
    dispatch(closeModal(`taskDetails_${id}`));
    dispatch(openModal('editTask'));
  };

  return (
    <Modal modalId={`taskDetails_${id}`}>
      <div className={s.wrap}>
        <div className={s.details}>
          <div className={s.details_header}>
            <h4 className={s.details_title}>{title}</h4>
            <button
              type='button'
              onClick={() => handleEditTask()}
              className={s.details_edit}
            >
              <AiOutlineEdit />
              Edit
            </button>
          </div>
          <div className={s.details_info}>
            <span>Description:</span>
            <p>{description}</p>
          </div>
          <div className={s.details_info}>
            <span>Due Date:</span>
            <p>{dueDate}</p>
          </div>
          <div className={s.details_info}>
            <span>Priority:</span>
            <p>{priority}</p>
          </div>
        </div>

        <div className={s.history}>
          <h4 className={s.history_title}>Activity</h4>
          {history && (
            <ul className={s.history_list}>
              {history.map(({ id, details, timestamp }) => (
                <li key={id} className={s.history_item}>
                  <p>{details}</p>
                  <p className={s.history_date}>
                    {dayjs(timestamp).format('DD.MM.YY HH:mm')}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Modal>
  );
};
