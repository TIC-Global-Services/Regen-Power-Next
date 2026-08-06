import React from 'react';
import FAQ, { FAQItem } from '@/reuseables/faq';
import { StaticImageData } from 'next/image';

export interface BatteryFAQData {
  topTitle: string;
  title: string;
  listTitle: string;
  image: StaticImageData | string;
  items: FAQItem[];
}

const BatteryFAQ = ({ data }: { data: BatteryFAQData }) => {
  return (
    <FAQ
      topTitle={data.topTitle}
      title={data.title}
      listTitle={data.listTitle}
      image={data.image}
      items={data.items}
      hideImageMobile
    />
  );
};

export default BatteryFAQ;
