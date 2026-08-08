"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import SectionHeader from '@/reuseables/SectionHeader';
import Fade from '@/reuseables/fade';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParagraphItem {
  text: string | React.ReactNode;
  isSecondary?: boolean;
}

interface EditorialTextSectionProps {
  badge?: string;
  subtitle: string;
  title: string | React.ReactNode;
  description?: string;
  paragraphs: ParagraphItem[];
  align?: 'left' | 'center' | 'right';
  className?: string;
  subtitleClass?: string;
  titleClass?: string;
  descriptionClass?: string;
  paragraphsClass?: string;
  revealEffect?: boolean;
}

const SplitWords = ({ text }: { text: string }) => {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="inline-block mr-[0.25em] word-span text-[#D4D4D8]"
        >
          {word}
        </span>
      ))}
    </>
  );
};

const EditorialTextSection: React.FC<EditorialTextSectionProps> = ({
  badge,
  subtitle,
  title,
  description,
  paragraphs,
  align = 'left',
  className = '',
  subtitleClass = '',
  titleClass = '',
  descriptionClass = '',
  paragraphsClass = '',
  revealEffect = false
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!revealEffect || !sectionRef.current) return;

    const sectionEl = sectionRef.current;
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const allWords = gsap.utils.toArray<HTMLElement>(
        sectionEl.querySelectorAll(".word-span") || []
      );

      if (allWords.length === 0) return;

      const createAnimation = (pinMultiplier: number, stagger: number) => {
        const getEnd = () => `+=${Math.round(window.innerHeight * pinMultiplier)}`;

        const textReveal = gsap.to(allWords, {
          color: "#000000",
          stagger,
          ease: "none",
          scrollTrigger: {
            trigger: sectionEl,
            start: "top top",
            end: getEnd,
            scrub: 0.7,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        });

        const pinTrigger = ScrollTrigger.create({
          trigger: sectionEl,
          start: "top top",
          end: getEnd,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        });

        return () => {
          textReveal.kill();
          pinTrigger.kill();
        };
      };

      mm.add("(min-width: 1280px)", () => createAnimation(1.35, 0.1));
      mm.add("(min-width: 768px) and (max-width: 1279px)", () => createAnimation(1.1, 0.09));
      mm.add("(max-width: 767px)", () => createAnimation(0.85, 0.06));
    }, sectionEl);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [revealEffect, paragraphs]);

  const renderParagraph = (para: ParagraphItem, idx: number) => {
    const colorClass = para.isSecondary ? 'text-gray-400' : 'text-black';

    if (revealEffect && typeof para.text === 'string') {
      return (
        <p key={idx} className={colorClass}>
          <SplitWords text={para.text} />
        </p>
      );
    }

    if (revealEffect) {
      return (
        <p key={idx} className={colorClass}>
          <span className="word-span inline-block text-[#D4D4D8]">{para.text}</span>
        </p>
      );
    }

    return (
      <p key={idx} className={colorClass}>
        {para.text}
      </p>
    );
  };

  const headerSection = (
    <>
      {badge && (
        <div className={`mb-6 flex ${align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center'}`}>
          <span className="bg-[#E1D9D4] text-gray-900 text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full">
            {badge}
          </span>
        </div>
      )}
      <SectionHeader
        subtitle={subtitle}
        title={title}
        description={description}
        align={align}
        subtitleClass={subtitleClass}
        titleClass={titleClass}
        descClass={descriptionClass}
        className="mb-8"
      />
    </>
  );

  if (revealEffect) {
    return (
      <section
        ref={sectionRef}
        className={`w-full bg-white relative overflow-hidden min-h-screen flex flex-col justify-center px-[5%]`}
      >
        <div className="w-full">
          {headerSection}
          <div className={`text-lg md:text-3xl font-light leading-tight tracking-tight mt-8 ${paragraphsClass || (align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center')}`}>
            {paragraphs.map(renderParagraph)}
          </div>
        </div>
      </section>
    );
  }

  return (    <div className={``}>
      {headerSection}
      <Fade delay={0.2} duration={0.8}>
        <div className={`mx-auto text-lg md:text-3xl font-light leading-tight tracking-tight mt-8 ${paragraphsClass || (align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center')}`}>
          {paragraphs.map((para, idx) => (
            <p key={idx} className={para.isSecondary ? 'text-gray-400' : 'text-black'}>
              {para.text}
            </p>
          ))}
        </div>
      </Fade>
    </div>
  );
};

export default EditorialTextSection;
