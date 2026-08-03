import React from 'react';
import ComparisonTable, { ComparisonTableData } from '@/components/battery/battery-product/ComparisonTable';

const AtAGlance: React.FC<{ data: ComparisonTableData }> = ({ data }) => {
  return <ComparisonTable data={data} />;
};

export default AtAGlance;