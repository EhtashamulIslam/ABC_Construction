interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
  height?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'gray';
}

export function ProgressBar({
  progress,
  showLabel = true,
  height = 'md',
  color = 'blue',
}: ProgressBarProps) {
  const percentage = Math.min(Math.max(progress, 0), 100);

  const heightClasses = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6',
  };

  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    yellow: 'bg-yellow-600',
    red: 'bg-red-600',
    gray: 'bg-gray-600',
  };

  const getColorByProgress = () => {
    if (percentage === 100) return 'green';
    if (percentage >= 70) return 'blue';
    if (percentage >= 40) return 'yellow';
    return 'red';
  };

  const progressColor = color === 'blue' && percentage > 0 ? getColorByProgress() : color;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        {showLabel && (
          <span className="text-sm font-medium text-gray-700">{percentage}%</span>
        )}
      </div>
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${heightClasses[height]}`}>
        <div
          className={`${heightClasses[height]} ${colorClasses[progressColor]} transition-all duration-300 rounded-full flex items-center justify-center text-xs text-white font-medium`}
          style={{ width: `${percentage}%` }}
        >
          {height === 'lg' && <span>{percentage}%</span>}
        </div>
      </div>
    </div>
  );
}

interface BudgetProgressProps {
  allocated: number;
  spent: number;
  currency?: string;
}

export function BudgetProgress({ allocated, spent, currency = 'BDT' }: BudgetProgressProps) {
  const percentage = allocated > 0 ? (spent / allocated) * 100 : 0;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Spent: {formatCurrency(spent, currency)}
        </span>
        <span className="text-sm text-gray-500">
          Budget: {formatCurrency(allocated, currency)}
        </span>
      </div>
      <ProgressBar progress={percentage} showLabel={false} />
      <div className="flex justify-between items-center mt-1">
        <span className="text-xs text-gray-500">{percentage.toFixed(1)}% utilized</span>
        <span className="text-xs text-gray-500">
          Remaining: {formatCurrency(allocated - spent, currency)}
        </span>
      </div>
    </div>
  );
}

function formatCurrency(amount: number, currency: string): string {
  return `${currency} ${(amount / 1000000).toFixed(2)}M`;
}
