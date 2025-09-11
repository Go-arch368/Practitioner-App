import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home Page", () => {
  it("renders heading", () => {
    render(<Home />);
    expect(
      screen.getByText("This is the Practitioner's app")
    ).toBeInTheDocument();
  });
});
