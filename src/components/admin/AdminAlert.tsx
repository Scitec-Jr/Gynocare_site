'use client';

interface AdminAlertProps {
  message: string;
  type?: 'error' | 'success' | 'info';
  onDismiss?: () => void;
}

export default function AdminAlert({
  message,
  type = 'error',
  onDismiss,
}: AdminAlertProps) {
  const styles = {
    error: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  return (
    <div
      className={`flex items-start justify-between gap-3 p-4 mb-6 border rounded-lg ${styles[type]}`}
      role="alert"
    >
      <p className="text-sm font-medium">{message}</p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="shrink-0 opacity-60 hover:opacity-100 text-lg leading-none"
          aria-label="Fechar"
        >
          ×
        </button>
      )}
    </div>
  );
}
