interface BadgeProps {
  text: string;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
  size?: 'sm' | 'md' | 'lg';
}

export function Badge({ text, variant = 'default', size = 'md' }: BadgeProps) {
  const variantClasses = {
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    error: 'bg-red-100 text-red-800 border-red-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200',
    default: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {text}
    </span>
  );
}

export function getStatusVariant(status: string): 'success' | 'warning' | 'error' | 'info' | 'default' {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus === 'completed' || normalizedStatus === 'approved') {
    return 'success';
  }
  if (normalizedStatus === 'in progress') {
    return 'info';
  }
  if (normalizedStatus === 'pending' || normalizedStatus === 'planning') {
    return 'warning';
  }
  if (normalizedStatus === 'rejected' || normalizedStatus === 'overdue') {
    return 'error';
  }

  return 'default';
}

export function getPriorityVariant(priority: string): 'success' | 'warning' | 'error' | 'info' | 'default' {
  const normalizedPriority = priority.toLowerCase();

  if (normalizedPriority === 'high') {
    return 'error';
  }
  if (normalizedPriority === 'medium') {
    return 'warning';
  }
  if (normalizedPriority === 'low') {
    return 'success';
  }

  return 'default';
}
