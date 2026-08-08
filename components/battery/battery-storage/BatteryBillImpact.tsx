import React from 'react';
import FeatureCardGrid, { FeatureCardItem } from '@/reuseables/FeatureCardGrid';

export interface BatteryBillImpactData {
  topSubtitle: string;
  title: string;
  bottomSubtitle?: string;
  cards: FeatureCardItem[];
}

const BatteryBillImpact = ({ data }: { data: BatteryBillImpactData }) => {
  return (
    <div>
      <FeatureCardGrid
        topSubtitle={data.topSubtitle}
        title={data.title}
        showPersonalisedquoteCta={true}
        bottomSubtitle={data.bottomSubtitle}
        cards={data.cards}
        showReadMore={false}
      />

    </div>
  );
};

export default BatteryBillImpact;
