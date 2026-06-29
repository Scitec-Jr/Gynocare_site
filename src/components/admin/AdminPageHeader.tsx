interface AdminPageHeaderProps {
  title: string;
  subtitle?: string;
  total?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function AdminPageHeader({
  title,
  subtitle,
  total,
  action,
}: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-(--main-dark-color)">
          {title}
        </h1>
        {(subtitle || total !== undefined) && (
          <p className="text-gray-500 text-sm mt-1">
            {subtitle}
            {total !== undefined && (
              <span>
                {subtitle ? ' · ' : ''}
                {total} registro{total !== 1 ? 's' : ''}
              </span>
            )}
          </p>
        )}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="px-5 py-2.5 bg-(--main-color) text-white rounded-lg hover:bg-(--main-light-color) transition-colors font-semibold text-sm whitespace-nowrap shadow-sm"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
