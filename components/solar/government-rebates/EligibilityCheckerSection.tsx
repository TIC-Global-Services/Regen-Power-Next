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

  // Detect if any answer is "no"
  const hasNo = useMemo(
    () => Object.values(answers).some((v) => v === "no"),
    [answers]
  );

  const notEligibleResult = resultMap["not-eligible"];

  const onSubmit = () => {
    // If any answer is "no", immediately show not-eligible
    if (Object.values(answers).some((v) => v === "no")) {
      setValidationError("");
      setResult("not-eligible");
      return;
    }

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

  const handleReset = () => {
    setAnswers({});
    setValidationError("");
    setResult(null);
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

        {/* Questions + submit wrapper with blur overlay */}
        <div className="relative">
          {/* Questions area — blurs when not eligible after submit */}
          <div
            className="transition-all duration-500"
            style={{
              filter: result === "not-eligible" ? "blur(6px)" : "none",
              pointerEvents: result === "not-eligible" ? "none" : "auto",
              userSelect: result === "not-eligible" ? "none" : "auto",
            }}
          >
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
          </div>

          {/* "Not Eligible" popup overlay */}
          {result === "not-eligible" && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div
                className="w-full max-w-lg rounded-[32px] border border-red-200 bg-white p-8 text-center shadow-2xl md:p-12"
                style={{ animation: "popupFadeIn 0.35s ease-out" }}
              >
                {/* Icon */}
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>

                <p className="text-sm uppercase tracking-[0.18em] text-black/45">
                  Eligibility Result
                </p>
                <h3 className="mt-3 text-3xl tracking-tight text-black md:text-4xl">
                  {notEligibleResult?.title ?? "You Are Not Eligible"}
                </h3>
                <p className="mx-auto mt-4 max-w-md text-base leading-tight text-black/70 md:text-lg">
                  {notEligibleResult?.description ??
                    "Based on your answers, you do not currently qualify for this rebate program."}
                </p>

                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-black/20 bg-black px-8 py-3 text-base font-medium text-white transition-colors hover:bg-black/80"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>

        {activeResult && result !== "not-eligible" && (
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

