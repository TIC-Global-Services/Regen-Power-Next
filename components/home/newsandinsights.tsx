import FeatureCardGrid, { FeatureCardGridProps, FeatureCardItem } from '@/reuseables/FeatureCardGrid'
import React from 'react'


const data: FeatureCardItem[] = [
//   {
//     title: 'STC Upfront Discount',
//     description: 'Federal STC And WA Rebate Values Are Deducted Directly From Your Quoted Price. You Pay The Post-Rebate Balance.',
//     image: businessBg,
//     textPosition: 'top',
//     footerTitle: 'Best For',
//     footerDescription: 'Any installation — applied by default.',

//   },
//   {
//     title: 'Plenti\nNo-Interest Loan',
//     description: 'WA-Funded No-Interest Loan From $2,001 To $10,000. Flexible 3–10 Year Terms, No Early Repayment Fees.',
//     image: productReviewBg,
//     textPosition: 'top',
//     footerTitle: 'Best For',
//     footerDescription: 'Any installation — applied by default.',

//   },
//   {
//     title: 'Third-Party Finance',
//     description: 'We Can Refer You To Accredited Green-Loan Providers For Larger Systems Or Commercial Installations.',
//     image: productReviewRating,
//     textPosition: 'top',
//     footerTitle: 'Best For',
//     footerDescription: 'Any installation — applied by default.',

//   },
];

const newsandinsights = ({data}: {data:FeatureCardGridProps[]}) => {
  return (
    <div>
        <FeatureCardGrid topSubtitle='Explore Our' title='Latest news & insights' cards={data[0].cards}/>
    </div>
  )
}

export default newsandinsights