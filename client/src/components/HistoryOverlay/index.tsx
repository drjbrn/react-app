import dayjs from 'dayjs';
import { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeModal } from '@/store/modalSlice';
import s from './HistoryOverlay.module.scss';

export const HistoryOverlay = () => {
  const dispatch = useAppDispatch();
  const history = useAppSelector((state) => state.history.allHistory);

  const handleCloseModal = () => {
    dispatch(closeModal('history'));
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className={s.history}>
      <div className={s.history_wrap}>
        <h4 className={s.history_title}>History</h4>
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
      <button type='submit' className={s.close} onClick={handleCloseModal}>
        <AiOutlineClose />
      </button>
    </div>
  );
};
