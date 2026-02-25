import { render, screen } from '@testing-library/react';
import { Hearts } from '../../components/treasure-hearts';
import '@testing-library/jest-dom';

describe("Hearts component", () => {
  it("renders correct number of red and gray hearts", () => {
    const { container } = render(<Hearts lives={2} />);
    // Red hearts
    expect(container.querySelectorAll(".fill-red-500").length).toBe(2);
    // Gray hearts
    expect(container.querySelectorAll(".fill-none").length).toBe(1);
  });

  it("renders all red hearts when lives is 3", () => {
    const { container } = render(<Hearts lives={3} />);
    expect(container.querySelectorAll(".fill-red-500").length).toBe(3);
    expect(container.querySelectorAll(".fill-none").length).toBe(0);
  });

  it("renders all gray hearts when lives is 0", () => {
    const { container } = render(<Hearts lives={0} />);
    expect(container.querySelectorAll(".fill-red-500").length).toBe(0);
    expect(container.querySelectorAll(".fill-none").length).toBe(3);
  });
});