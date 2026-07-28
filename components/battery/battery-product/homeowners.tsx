import React from 'react';
import FeatureCardGrid, { FeatureCardItem } from '@/reuseables/FeatureCardGrid';
import businessBg from '@/assets/home/zerointrest/businessBg.jpg';
import productReviewBg from '@/assets/home/zerointrest/productReviewBg.png';
import productReviewRating from '@/assets/home/zerointrest/productReviewRating.png';

const homeownersCards: FeatureCardItem[] = [
  {
    title: 'How Solar Batteries\nAre Changing Modern Homes',
    description: '',
    image: businessBg,
    textPosition: 'top',
    footerTitle: 'May 7, 2026',
    footerDescription: 'Discover How Battery Storage Helps Homeowners Reduce Grid Dependence, Lower Electricity Bills, And Access Reliable Power Day And Night.',
  },
  {
    title: '5 Ways EV Charging\nWorks Better With Solar',
    description: '',
    image: productReviewBg,
    textPosition: 'top',
  },
  {
    title: 'Why More Australians Are\nSwitching To Renewable\nEnergy',
    description: '',
    image: productReviewRating,
    textPosition: 'top',
  },
];

const Homeowners = () => {
  return (
    <FeatureCardGrid
      topSubtitle="Perth Homeowners."
      title="Real Bills. Real Savings"
      cards={homeownersCards}
      showReadMore={true}
      centerButton={true}
      centerButtonText="See 2,000+ Verified Reviews On ProductReview.com.au"
    />
  );
};

export default Homeowners;