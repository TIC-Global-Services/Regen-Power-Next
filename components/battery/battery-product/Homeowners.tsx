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
  showReadMore?: boolean;
  centerButton?: boolean;
  centerButtonText?: string;
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
      showReadMore={data.showReadMore ?? true}
      centerButton={data.centerButton ?? true}
      centerButtonText={data.centerButtonText}
      hideCenterButtonMobile
    />
  );
};

export default Homeowners;
