import React from 'react';
import { Check, X, Minus, LucideIcon } from 'lucide-react';

/**
 * Generic two-column comparison section.
 *
 * Originally extracted from the "Great Fit" section, this component powers:
 *   - Smart Home Battery · Great Fit   (Check / X icons)
 *   - Battery Storage   · Great Fit   (Check / X icons)
 *   - Battery Product   · Compatible Products (Minus / Minus icons)
 *
 * Pass any column labels + items and optionally override the icons via
 * `leftIcon` / `rightIcon` (lucide components). Defaults to Check / X.
 */
export interface ComparisonColumn {
  /** Title of the left column (e.g. "Good Fit"). */
  leftTitle: string;
  /** Items for the left column. */
  leftItems: string[];
  /** Title of the right column (e.g. "Worth A Conversation First"). */
  rightTitle: string;
  /** Items for the right column. */
  rightItems: string[];
}

export interface ComparisonColumnsData extends ComparisonColumn {
  topSubtitle: string;
  title: string;
  description?: string;
}

interface ComparisonColumnsProps {
  data: ComparisonColumnsData;
  /** Left column icon. Defaults to Check. */
  leftIcon?: LucideIcon;
  /** Right column icon. Defaults to X. */
  rightIcon?: LucideIcon;
}

/**
 * Renders a list item with bold support.
 * Any text matching `**bold**` (markdown-style) is wrapped in <strong>.
 */
const renderItemText = (text: string): React.ReactNode => {
  if (!text.includes("**")) return text;

  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const ComparisonColumns: React.FC<ComparisonColumnsProps> = ({
  data,
  leftIcon: LeftIcon = Check,
  rightIcon: RightIcon = X,
}) => {
  return (
    <section className="bg-white py-16 md:py-10 px-[5%] md:px-[3%]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h3 className="text-2xl md:text-[2.125rem] leading-[1] tracking-tight text-black font-norml">
            {data.topSubtitle}
          </h3>
          <h2 className="text-4xl md:text-[5rem] leading-[1] text-[#63B846] font-normal tracking-tight">
            {data.title}
          </h2>
          {data.description && (
            <p className='text-sm leading-[1.2] md:text-lg tracking-tight mt-1'>{data.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-0">
          {/* Left Column */}
          <div className="bg-[#63B846] w-[335px] min-h-[478px] md:w-[400px] md:min-h-[460px] max-w-full rounded-[20px] p-8 justify-self-center flex flex-col">
            <h4 className="text-2xl font-medium mb-6 text-center text-black">
              {data.leftTitle}
            </h4>
            <ul className="space-y-8 flex-1 flex flex-col justify-center">
              {data.leftItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span className="mt-1 shrink-0">
                    <LeftIcon className="w-5 h-5 text-black" strokeWidth={1.5} />
                  </span>
                  <span className="text-base leading-[1.2] tracking-tight text-black">
                    {renderItemText(item)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column */}
          <div className="bg-[#EEF6EB] w-[335px] min-h-[478px] md:w-[400px] md:min-h-[460px] max-w-full rounded-[20px] p-8 justify-self-center flex flex-col">
            <h4 className="text-2xl font-medium mb-6 text-center text-black">
              {data.rightTitle}
            </h4>
            <ul className="space-y-8 flex-1 flex flex-col justify-center">
              {data.rightItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span className="mt-1 shrink-0">
                    <RightIcon className="w-5 h-5 text-black" strokeWidth={1.5} />
                  </span>
                  <span className="text-base leading-[1.2] tracking-tight text-black">
                    {renderItemText(item)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonColumns;
