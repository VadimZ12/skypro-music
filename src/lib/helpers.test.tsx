import { timer } from "./helper";

describe("Функция форматирования времени трека", () => {
  it("Правильно форматирует число в строку", () => {
    const result = timer(5);
    expect(result).toBe("0:05");
  });
  it("Правильно форматирует 0 в строку", () => {
    const result = timer(0);
    expect(result).toBe("0:00");
  });
});