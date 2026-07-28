import GetSolar from '@/reuseables/getsolar';
import React from 'react'
import { da } from 'zod/locales';

const pickYourBrand = ({ data }: { data: { subTitle: string; title: string; description: string; buttontext: string;buttonRef:string } }) => {
    return (
        <div>
            <GetSolar
                subtitle={data.subTitle}
                mainTitle={data.title}
                description={data.description}
                buttonText={data.buttontext}
                buttonHref={data.buttonRef}
                overlayClass=''
            />
        </div>
    )
}

export default pickYourBrand