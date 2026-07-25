"use client";

import React, { useMemo, useState } from "react";
import CtaButton from "@/reuseables/CtaButton";
import SectionHeader from "@/reuseables/SectionHeader";
import type { ResolvedRebatesEligibilityChecker } from "@/lib/strapi/resolvers/rebates";

interface Props {
  resolved: ResolvedRebatesEligibilityChecker;
}

type AnswerValue = "yes" | "no";

export default function EligibilityCheckerSection({ resolved }: Props) {
  const [answers, setAnswers] = useState<Record<string, AnswerValue | undefined>>({});
  const [validationError, setValidationError] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const unanswered = useMemo(
    () => resolved.questions.filter((q) => !answers[String(q.id)]),
    [answers, resolved.questions]
  );

  const resultMap = useMemo(
    () =>
      Object.fromEntries(
        resolved.results.map((r) => [r.key, { title: r.title, description: r.description }])
      ),
    [resolved.results]
  );

  const onSubmit = () => {
    if (unanswered.length > 0) {
      setValidationError("Answer every question before submitting the eligibility check.");
      setResult(null);
      return;
    }

    setValidationError("");

    const stackPass = resolved.questions
      .filter((q) => !q.loanOnly)
      .every((q) => answers[String(q.id)] === "yes");

    const incomePass = resolved.questions
      .filter((q) => q.loanOnly)
      .every((q) => answers[String(q.id)] === "yes");

    if (stackPass && incomePass) {
      setResult("eligible-stack");
    } else if (stackPass && !incomePass) {
      setResult("eligible-rebates-only");
    } else {
      setResult("not-eligible");
    }
  };

  const activeResult = result ? resultMap[result] : null;

  return (
    <section className="bg-white px-[5%] py-16 md:py-24">
      <div>
        <SectionHeader
          badge={resolved.badge}
          title={resolved.title}
          description={resolved.description}
          align="left"
          className="mb-10 max-w-4xl"
          titleClass="text-5xl md:text-[3.75rem] font-light leading-none text-black"
          descClass="max-w-4xl text-base md:text-xl text-black/85"
        />

        <div className="space-y-4">
          {resolved.questions.map((question) => {
            const value = answers[String(question.id)];

            return (
              <div
                key={String(question.id)}
                className="flex flex-col gap-5 rounded-[28px] bg-[#F1F8EC] px-6 py-6 md:flex-row md:items-center md:justify-between md:px-9"
              >
                <div className="max-w-4xl">
                  <h3 className="text-2xl leading-tight tracking-tight text-black md:text-[2rem]">
                    {question.question}
                  </h3>
                  <p className="mt-3 text-base leading-tight text-black/80 md:text-xl">
                    {question.helperText}
                  </p>
                </div>

                <div className="flex gap-3 md:flex-shrink-0">
                  {(["yes", "no"] as const).map((option) => {
                    const active = value === option;

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setAnswers((prev) => ({ ...prev, [String(question.id)]: option }));
                          setValidationError("");
                        }}
                        aria-pressed={active}
                        className={`min-w-28 rounded-[20px] border px-8 py-3 text-xl tracking-tight transition-colors ${
                          active
                            ? "border-[#63B846] bg-[#63B846] text-white"
                            : "border-black/25 bg-white/70 text-black hover:border-[#63B846]"
                        }`}
                      >
                        {option === "yes" ? "Yes" : "No"}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col items-end gap-4">
          {validationError && (
            <p className="text-sm font-medium text-red-600">{validationError}</p>
          )}

          <CtaButton
            text="Submit"
            onClick={() => onSubmit()}
            textColor="text-black"
          />
        </div>

        {activeResult && (
          <div className="mt-10 rounded-[32px] border border-[#DCE8D8] bg-[#F7FBF5] p-8 md:p-10">
            <p className="text-sm uppercase tracking-[0.18em] text-black/45">Eligibility Result</p>
            <h3 className="mt-3 text-3xl tracking-tight text-black md:text-4xl">
              {activeResult.title}
            </h3>
            <p className="mt-4 max-w-4xl text-lg leading-tight text-black/80 md:text-2xl">
              {activeResult.description}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
