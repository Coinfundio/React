import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ProductBoard from "./ProductBoard.jsx";

const PROPERTIES_URL = "http://localhost:3344/api/v1/properties?limit=14";

function mockProperties(data) {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data }),
    })
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("ProductBoard", () => {
  it("loads properties and shows the tokens with the highest roi within 1600", async () => {
    mockProperties([
      { id: "oak", tokenPriceUsd: 500, expectedRoi: 9 },
      { id: "mesa", tokenPriceUsd: 700, expectedRoi: 10 },
      { id: "north", tokenPriceUsd: 900, expectedRoi: 12 },
      { id: "skip", tokenPriceUsd: null, expectedRoi: 100 },
    ]);
    render(<ProductBoard />);

    expect(await screen.findByText("mesa")).toBeInTheDocument();
    expect(screen.getByText("north")).toBeInTheDocument();
    expect(screen.queryByText("oak")).not.toBeInTheDocument();
    expect(screen.queryByText("skip")).not.toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith(PROPERTIES_URL);
  });

  it("shows the cheaper set when the roi is tied", async () => {
    mockProperties([
      { id: "palm", tokenPriceUsd: 600, expectedRoi: 8 },
      { id: "quay", tokenPriceUsd: 1000, expectedRoi: 8 },
      { id: "reef", tokenPriceUsd: 1200, expectedRoi: 16 },
    ]);
    render(<ProductBoard />);

    expect(await screen.findByText("reef")).toBeInTheDocument();
    expect(screen.queryByText("palm")).not.toBeInTheDocument();
    expect(screen.queryByText("quay")).not.toBeInTheDocument();
  });

  it("respects fractional prices", async () => {
    mockProperties([
      { id: "dock", tokenPriceUsd: 100.5, expectedRoi: 3.25 },
      { id: "pier", tokenPriceUsd: 1499.4, expectedRoi: 4.5 },
      { id: "yard", tokenPriceUsd: 1499.6, expectedRoi: 4.5 },
    ]);
    render(<ProductBoard />);

    expect(await screen.findByText("dock")).toBeInTheDocument();
    expect(screen.getByText("pier")).toBeInTheDocument();
    expect(screen.queryByText("yard")).not.toBeInTheDocument();
  });

  it("leaves the list empty when no token fits", async () => {
    mockProperties([{ id: "tower", tokenPriceUsd: 2000, expectedRoi: 20 }]);
    render(<ProductBoard />);

    await waitFor(() => expect(fetch).toHaveBeenCalledWith(PROPERTIES_URL));
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });
});
