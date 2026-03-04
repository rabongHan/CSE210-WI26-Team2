import {
  clearTreasureResult,
  getTreasureResult,
  saveTreasureResult,
  type TreasureResult,
} from "../treasure-progress";

describe("treasure-progress localStorage integration", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("saveTreasureResult writes JSON payload to localStorage", () => {
    const payload: TreasureResult = {
      status: "won",
      curr_score: 500,
      total_lives: 2,
      largest_number: 1237,
    };

    saveTreasureResult(payload);

    const raw = localStorage.getItem("progress.treasure");
    expect(raw).not.toBeNull();
    expect(JSON.parse(raw as string)).toEqual(payload);
  });

  test("getTreasureResult returns parsed object when data exists", () => {
    const payload: TreasureResult = {
      status: "lost",
      curr_score: 275,
      total_lives: 0,
      largest_number: 999,
    };

    localStorage.setItem("progress.treasure", JSON.stringify(payload));

    expect(getTreasureResult()).toEqual(payload);
  });

  test("getTreasureResult returns null when storage is empty", () => {
    expect(getTreasureResult()).toBeNull();
  });

  test("getTreasureResult returns null for invalid JSON", () => {
    localStorage.setItem("progress.treasure", "{not-valid-json");
    expect(getTreasureResult()).toBeNull();
  });

  test("clearTreasureResult removes saved value", () => {
    const payload: TreasureResult = {
      status: "won",
      curr_score: 600,
      total_lives: 1,
      largest_number: 2000,
    };

    localStorage.setItem("progress.treasure", JSON.stringify(payload));
    clearTreasureResult();

    expect(localStorage.getItem("progress.treasure")).toBeNull();
    expect(getTreasureResult()).toBeNull();
  });
});

