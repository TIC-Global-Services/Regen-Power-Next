import React from 'react';
import ComparisonColumns, {
  ComparisonColumnsData,
} from '@/reuseables/ComparisonColumns';
import { Check, Minus, LucideIcon } from 'lucide-react';

/**
 * Great Fit section — thin wrapper over the shared ComparisonColumns
 * component. Uses Check / Minus icons by default; callers may override.
 */
export interface GreatFitData extends ComparisonColumnsData {}

interface GreatFitProps {
  data: GreatFitData;
  /** Left column icon. Defaults to Check. */
  leftIcon?: LucideIcon;
  /** Right column icon. Defaults to Minus. */
  rightIcon?: LucideIcon;
}

const GreatFit: React.FC<GreatFitProps> = ({
  data,
  leftIcon = Check,
  rightIcon = Minus,
}) => {
  return (
    <ComparisonColumns
      data={data}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
    />
  );
};

export default GreatFit;
