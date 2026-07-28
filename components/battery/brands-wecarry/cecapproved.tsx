import React from 'react';
import HowYouUseIt, { HowYouUseItData } from '@/components/battery/battery-product/howyouuseit';

interface CECApprovedProps {
  data: HowYouUseItData;
}

const CECApproved: React.FC<CECApprovedProps> = ({ data }) => {
  return <HowYouUseIt data={data} />;
};

export default CECApproved;