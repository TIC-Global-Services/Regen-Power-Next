import React from 'react';
import { StaticImageData } from 'next/image';
import CtaSection from './CtaSection';
import getSolarBg from '@/assets/for_your_home.png';

export interface GetSolarProps {
    subtitle?: string;
    mainTitle?: string;
    description?: string;
    buttonText?: string;
    buttonHref?: string;
    bgImage?: string | StaticImageData;
    badge?: string;
    overlayClass?: string;
    children?: React.ReactNode;
}

const GetSolar = ({
    subtitle,
    mainTitle,
    description,
    buttonText,
    buttonHref,
    bgImage,
    overlayClass,
    children,
}: GetSolarProps) => {
    return (
        <CtaSection
            subtitle={subtitle ?? ''}
            title={mainTitle ?? ''}
            description={description}
            buttonText={buttonText}
            buttonHref={buttonHref}
            bgImage={bgImage}
            overlayClass={overlayClass}
        >
            {children}
        </CtaSection>
    );
};

export default GetSolar;
