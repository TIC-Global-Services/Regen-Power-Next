import React from 'react';
import FeatureCardGrid from '@/reuseables/FeatureCardGrid';

interface HomeownerCard {
  title: string;
  description: string;
  image: string;
  textPosition: "top" | "bottom";
  footerTitle: string;
  footerDescription: string;
}

interface HomeownersProps {
  data: {
    topSubtitle: string;
    title: string;
    cards: HomeownerCard[];
    showReadMore: boolean;
    centerButton: boolean;
    centerButtonText: string;
  };
}

const Homeowners = ({ data }: HomeownersProps) => {
  return (
    <FeatureCardGrid
      topSubtitle={data.topSubtitle}
      title={data.title}
      cards={data.cards}
      showReadMore={data.showReadMore}
      centerButton={data.centerButton}
      centerButtonText={data.centerButtonText}
    />
  );
};

export default Homeowners;
