import React from 'react';
import { StaticImageData } from 'next/image';
import FeatureCardGrid, { FeatureCardItem } from '@/reuseables/FeatureCardGrid';

export interface HomeownerStory {
  title: string;
  description?: string;
  image: StaticImageData | string;
  footerTitle?: string;
  footerDescription?: string;
}

export interface HomeownersData {
  topSubtitle: string;
  title: string;
  stories: HomeownerStory[];
}

const Homeowners = ({ data }: { data: HomeownersData }) => {
  const mappedCards: FeatureCardItem[] = data.stories.map((story) => ({
    title: story.title,
    description: story.description ?? '',
    image: story.image,
    textPosition: 'top',
    footerTitle: story.footerTitle,
    footerDescription: story.footerDescription,
  }));

  return (
    <FeatureCardGrid
      topSubtitle={data.topSubtitle}
      title={data.title}
      cards={mappedCards}
      showReadMore={true}
      centerButton={true}
      centerButtonText="See 2,000+ Verified Reviews On ProductReview.com.au"
    />
  );
};

export default Homeowners;
