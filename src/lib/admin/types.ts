export interface Doctor {
  id: number;
  name: string;
  graduation: string;
  createdAt: string;
  updatedAt: string;
}

export interface Exam {
  id: number;
  name: string;
  slug: string;
  information: string;
  preparation: string;
  procedureId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Procedure {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: number;
  doctorId: number;
  examId: number;
  date: string;
  startTime: string;
  endTime: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: number;
  rating: number;
  text: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'secretary';
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
}

export interface DashboardModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
  count?: number;
}

export interface ModalState {
  isOpen: boolean;
  type: 'create' | 'edit' | 'delete' | 'view';
  data?: any;
}

export interface FormState<T> {
  data: Partial<T>;
  errors: Record<string, string>;
  isLoading: boolean;
  isSubmitted: boolean;
}
