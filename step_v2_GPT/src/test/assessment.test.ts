import { describe, expect, it } from "vitest";
import { emptyAnswers, scoreAssessment } from "@/lib/assessment";

describe("assessment scoring", () => {
  it("returns at most three suggestions", () => {
    const r = scoreAssessment({ ...emptyAnswers, gaps: ["finance", "marketing", "sales", "people", "strategy"] });
    expect(r).toHaveLength(3);
  });

  it("ranks a gap that also matches a goal first", () => {
    const r = scoreAssessment({ ...emptyAnswers, gaps: ["finance", "people"], goals: ["cash-flow"] });
    expect(r[0]!.serviceId).toBe("finance");
    expect(r[0]!.score).toBe(5);
  });

  it("returns nothing when no answers are selected", () => {
    expect(scoreAssessment(emptyAnswers)).toEqual([]);
  });
});
