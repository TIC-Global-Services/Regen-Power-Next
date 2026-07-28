import React from 'react';
import SolutionsPortfolio, { PortfolioCard } from '@/reuseables/SolutionsPortfolio';

const zeroInterestCards: PortfolioCard[] = [
    {
        type: 'text',
        variant: 'light-gray',
        title: 'Product Warranty Vs\nPerformance\nWarranty',
        description: 'Product Warranty Covers Manufacturing Defects (Usually 10 Years). Performance Warranty Guarantees A Minimum Energy Throughput Or Capacity Retention — Typically "60-70% Of Original Capacity After 10 Years" Or "X MWh Minimum Throughput". Both Are Standard Across The Brands We Install.',
    },
    {
        type: 'image',
        variant: 'light-green',
    },
    {
        type: 'text',
        variant: 'light-gray',
        title: 'Workmanship\nWarranty',
        description: 'Separate From The Manufacturer Warranty. We Provide A 5-Year Workmanship Warranty On Every Install. If The Install Caused An Issue, We Fix It. If The Product Failed, We Coordinate With The Manufacturer.',
    },
    {
        type: 'text',
        variant: 'light-gray',
        title: 'What Voids A Battery\nWarranty',
        description: 'Common Causes: DIY Electrical Work, Unauthorised Modifications, Installation Outside Temperature Specs, Not Enrolling In Required Firmware Updates. Our Installs Avoid All Of These — That\'s The Point Of A CEC-Accredited Installer.',
    },
    {
        type: 'text',
        variant: 'dark',
        title: 'Aftercare Across 23\nYears Of Installs',
        description: 'Many Of Our 45,000+ Installations Are Still Running 10, 15, Even 20 Years After Day One. We Stock Parts, Service Anywhere In WA, And Our Install Team Is The Same Team That Services It Later.',
    },
    {
        type: 'image',
        variant: 'light-green',
    },
];

const ZeroInterest = () => {
    return (
        <SolutionsPortfolio
            subtitle="Zero Upfront"
            title="Zero Interest"
            description="The WA Government's Interest-Free Loan (Administered By Plenti) Lets Eligible Households Finance A Battery Without Any Out-Of-Pocket Cost."
            cards={zeroInterestCards}
            layout={6}
            className="bg-white"
        />
    );
};

export default ZeroInterest;