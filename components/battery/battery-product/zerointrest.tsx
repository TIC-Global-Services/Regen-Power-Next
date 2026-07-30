import React from 'react';
import SolutionsPortfolio from '@/reuseables/SolutionsPortfolio';

interface ZeroInterestCard {
  type: "text" | "image";
  variant: "light-gray" | "light-green" | "dark";
  title: string;
  description: string;
}

interface ZeroInterestProps {
  data: {
    subtitle: string;
    title: string;
    description: string;
    cards: ZeroInterestCard[];
    layout: number;
  };
}

const ZeroInterest = ({ data }: ZeroInterestProps) => {
  return (
    <SolutionsPortfolio
      subtitle={data.subtitle}
      title={data.title}
      description={data.description}
      cards={data.cards}
      layout={data.layout as 3 | 4 | 6}
      className="bg-white"
    />
  );
};

export default ZeroInterest;
