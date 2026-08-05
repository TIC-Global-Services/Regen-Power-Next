import React from "react";
import Reveal from "@/reuseables/Reveal";
import SectionHeader from "@/reuseables/SectionHeader";
import MissingImage from "@/reuseables/MissingImage";
import type { ResolvedSolarProcessSteps } from "@/lib/strapi/resolvers/solar";
import { span } from "framer-motion/client";

interface SolarProcessFlowProps {
  resolved: ResolvedSolarProcessSteps;
}

const SolarProcessFlow: React.FC<SolarProcessFlowProps> = ({ resolved }) => {
  const steps = resolved.steps;

  return (
    <section className="py-16 md:pb-24 bg-white">
      <div className="px-[5%]">
        <SectionHeader
          subtitle={resolved.subtitle}
          title={resolved.title}
          align="center"
          className="mb-5 md:mb-32"
          subtitleClass="text-xl"
          titleClass="text-[3.125rem]"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col">
              <Reveal
                delay={index * 0.15}
                className="flex flex-col"
              >
                <div className="mb-6">
                  {step.image ? (
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden flex items-center justify-center">
                      <img
                        src={step.image.src}
                        alt={step.image.alt}
                        className="absolute inset-0 w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <MissingImage
                      label={`Step ${step.stepNumber} image`}
                      aspect="aspect-[4/3]"
                    />
                  )}
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-x-3">
                  <span className="text-2xl font-semibold text-[#63B846]">0{index+1}</span>
                  <h3 className="text-lg md:text-2xl font-semibold md:font-medium text-black leading-tight self-baseline">
                    <span>{step.title}</span>
                    {index < steps.length - 1 && (
                      <span className="hidden lg:inline text-black font-bold tracking-tighter text-3xl ml-2">
                        &raquo;
                      </span>
                    )}
                  </h3>
                  <div />
                  <p className="text-base text-black leading-tight font-normal">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex justify-center mt-6 md:mt-8 lg:hidden">
                    <span className="text-black font-bold tracking-tighter text-4xl rotate-90">
                      &raquo;
                    </span>
                  </div>
                )}
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolarProcessFlow;
