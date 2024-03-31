import { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { ModalProps } from '@/types';
import { useAppDispatch } from '@/store/hooks';
import { closeModal } from '@/store/modalSlice';
import s from './Modal.module.scss';

export const Modal = ({ modalId, children, className }: ModalProps) => {
  const dispatch = useAppDispatch();
  const handleCloseModal = () => {
    dispatch(closeModal(modalId));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCloseModal();
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      className={`${s.modal} ${className}`}
      role='dialog'
      aria-label='modal'
      aria-modal='true'
    >
      <div className={s.modal_wrap}>
        <div className={s.modal_block}>{children}</div>
        <button
          type='submit'
          className={s.modal_close}
          onClick={handleCloseModal}
        >
          <AiOutlineClose />
        </button>
      </div>
    </div>
  );
};
