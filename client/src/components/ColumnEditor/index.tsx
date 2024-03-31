import { Input } from 'antd';
import {
  useForm,
  FormProvider,
  Controller,
  SubmitHandler,
  FieldValues,
} from 'react-hook-form';
import { toast } from 'react-toastify';
import { closeModal } from '@/store/modalSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  createNewColumn,
  editColumn,
  getAllColumns,
} from '@/store/tasksColumn/tasksColumnThunks';
import { Modal } from '../UI/Modal';
import s from './ColumnEditor.module.scss';

interface ColumnEditorProps {
  isNewColumn?: boolean;
  isEdit?: boolean;
  columnId?: number;
}

interface FormColumnEditorData {
  title: string;
}

export const ColumnEditor = ({
  isNewColumn,
  isEdit,
  columnId,
}: ColumnEditorProps) => {
  const dispatch = useAppDispatch();
  const columnData = useAppSelector(
    (state) => state.tasksColumn.columnItemData,
  );

  const methods = useForm({
    mode: 'onChange',
  });

  const handleCloseModal = () => {
    methods.reset();
    dispatch(closeModal('addNewColumn'));
    dispatch(closeModal(`editColumn_${columnId}`));
  };

  const onSubmit = async (data: FormColumnEditorData) => {
    if (isNewColumn) {
      await dispatch(createNewColumn(data.title));
      toast.success(`Success! You've created the column.`);
      handleCloseModal();
      dispatch(getAllColumns());
    }

    if (isEdit && columnId) {
      const formattedData = {
        columnId,
        title: data.title,
      };

      await dispatch(editColumn(formattedData));
      toast.success(`Success! You've changed the column title.`);
      handleCloseModal();
      dispatch(getAllColumns());
    }
  };

  return (
    <Modal modalId={isNewColumn ? 'addNewColumn' : `editColumn_${columnId}`}>
      <>
        <h4 className={s.title}>
          {isNewColumn ? 'Create new list' : 'Edit list'}
        </h4>

        <FormProvider {...methods}>
          <form
            id='column'
            className={s.form}
            onSubmit={(e) => e.preventDefault()}
          >
            <Controller
              name='title'
              defaultValue={isEdit && columnData?.title}
              control={methods.control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Input {...field} size='large' placeholder='List title' />
              )}
            />

            <button
              type='submit'
              className={s.form_button}
              onClick={methods.handleSubmit(
                onSubmit as SubmitHandler<FieldValues>,
              )}
            >
              {isNewColumn ? 'Create' : 'Submit'}
            </button>
          </form>
        </FormProvider>
      </>
    </Modal>
  );
};
