import React from 'react';

export interface Award {
    image: string;
    description: string;
}

export interface AwardsSectionProps {
    awards: Award[];
}

/** Award/rating badges (image + caption) — same visual treatment as the promotion pages' "Find Out Why" awards row. */
const AwardsSection: React.FC<AwardsSectionProps> = ({ awards }) => {
    if (!awards || awards.length === 0) return null;

    return (
        <div className="px-[5%] md:px-[3%] pt-16 md:pt-20">
            <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-12 mb-10 max-w-6xl mx-auto">
                {awards.map((award, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center">
                        <div className="relative mb-3">
                            <img
                                src={award?.image}
                                alt={award?.description || ''}
                                className="max-h-[140px] md:max-h-[40dvh] object-contain w-auto"
                            />
                        </div>
                        {award?.description?.toLowerCase().includes('stars') ? (
                            <div className="flex items-center justify-center gap-1.5 text-base md:text-[1.5rem] font-bold text-[#4D4D4D]">
                                <span className="whitespace-pre-line tracking-tight">{award.description}</span>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                <p className="text-sm md:text-[1.5rem] font-bold text-black whitespace-pre-line">
                                    {award?.description}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AwardsSection;
