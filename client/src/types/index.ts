export interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  createdAt: string;
  updateAt: string;
  column?: {
    createdAt: string,
    id: number,
    title: string,
    updateAt: string,
  };
}

export interface SingleTask extends Task {
  column: {
    createdAt: string,
    id: number,
    title: string,
    updateAt: string,
  };
}

export interface Column {
  id: number;
  title: string;
  tasks: Task[];
  createdAt: string;
  updateAt: string;
}

export interface ColumnListItem {
  id: number;
  value: string;
  label: string;
}

export interface History {
  action: string;
  details: string;
  entityId: number;
  entityType: string;
  id: number;
  timestamp: string;
}

export interface PriorityOption {
  value: string;
  label: string;
}

export interface ModalProps {
  modalId: string;
  children: React.ReactNode;
  className?: string;
}

export interface TaskEditorForm {
  column: Column;
  description: string;
  dueDate: string;
  priority: string;
  title: string;
}
