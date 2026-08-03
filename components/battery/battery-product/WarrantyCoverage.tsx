import React from 'react';
import SolutionsPortfolio, { PortfolioCard, CardLayout } from '@/reuseables/SolutionsPortfolio';

export interface WarrantyCoverageData {
    subtitle?: string;
    title?: string;
    description?: string;
    cards?: PortfolioCard[];
    layout?: CardLayout;
    className?: string;
}

const WarrantyCoverage = ({ data }: { data: WarrantyCoverageData }) => {
    return (
        <SolutionsPortfolio
            subtitle={data.subtitle}
            title={data.title}
            description={data.description}
            cards={data.cards}
            layout={data.layout ?? 6}
            className={data.className ?? 'bg-white'}
        />
    );
};

export default WarrantyCoverage;
