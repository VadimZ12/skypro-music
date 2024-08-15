import "@testing-library/jest-dom";
import "@testing-library/dom"
import { render, screen } from "@testing-library/react";
import { Menu } from "./Menu";

describe("Компонент навигации", () => {
  it("Должен отрендерить картинку с логотипом", () => {
    render(<Menu />);
    const image = screen.getByAltText("Логотип скайпро музыка");
    expect(image).toBeInTheDocument();
  });
  test("Должен отрендерить бургер меню", () => {
    render(<Menu />);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});