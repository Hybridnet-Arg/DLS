'use client';
import { Progress } from './progress';
import { formatCurrency } from '@/utils/formatters/currency.formatter';

const ProgressBar = ({
  className = '',
  progressClass = 'h-2',
  progress = 97,
  label = '',
  progressLeft = false,
  progressLabel = '',
  indicatorColor = 'bg-blue-500',
}) => {
  const formatPercentage = (value) => {
    let progress = value;
    if (progress < 100) progress = formatCurrency(value);
    return `${progress}%`;
  };

  return (
    <div className={`flex items-center mb-2 ${className}`}>
      {label ||
        (progressLeft && (
          <span className="w-20 text-xs font-medium text-left mr-2">
            {progressLeft ? `${formatPercentage(progress)}` : label}
          </span>
        ))}
      <div className="flex-1">
        <Progress
          value={progress}
          className={progressClass}
          indicatorColor={indicatorColor}
        />
      </div>
      <span
        className={`ml-2 text-xs font-medium text-right ${progressLabel ? 'w-20' : 'w-14'}`}
      >
        {progressLabel || `${formatPercentage(progress)}`}
      </span>
    </div>
  );
};

export default ProgressBar;
