import React from 'react';

interface TableContent {
    value: string;
    description: string;
}

interface MicrogridSpecTableProps {
    headers: {
        col1: string;
        col2: string;
    };
    tableContent: TableContent[];
}

const MicrogridSpecTable: React.FC<MicrogridSpecTableProps> = ({
    headers,
    tableContent,
}) => {
    return (
        <section className="py-16 md:py-24 bg-white px-[5%] md:px-[3%]">
            <div className='bg-[#63B84666] border  border-[hsl(105,45%,50%)] flex  py-2 md:max-w-md mx-auto mb-10 justify-center gap-5 rounded-3xl'>
                <h1 className='text-black font-bold text-xs md:text-base tracking-tight'>Microgrid spec table</h1>
                <p className='text-black text-xs md:text-base tracking-tight'>Industries & applications card row</p>
            </div>
            <div className=" mx-auto max-w-3xl">
                <div className="rounded-[20px] overflow-hidden border border-[#A0CF44]/30">
                    <div className="grid grid-cols-2 bg-[#A0CF44]">
                        <div className="p-4 md:p-5 text-black font-medium text-base md:text-lg tracking-tight">
                            {headers.col1}
                        </div>
                        <div className="p-4 md:p-5 text-black font-medium text-base md:text-lg tracking-tight">
                            {headers.col2}
                        </div>
                    </div>
                    {tableContent.map((row, idx) => (
                        <div
                            key={idx}
                            className={`grid grid-cols-2 border-b ${idx % 2 === 0 ? 'bg-[#EEF6EB]' : 'bg-[#EEF6EB]'
                                }`}
                        >
                            <div className="p-4 md:p-5 text-black text-sm md:text-base font-medium tracking-tight border-r border-black">
                                {row.value}
                            </div>
                            <div className="p-4 md:p-5 text-black/85 text-sm md:text-[15px] tracking-tight leading-snug">
                                {row.description}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MicrogridSpecTable;
