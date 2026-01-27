import { render, screen } from "@testing-library/react";
import App from '../App.jsx'
import { renderWithProviders } from "../test-utils.jsx";
import { expect } from "vitest";

test('main UI rendered' , () => {
    renderWithProviders(<App />)
    const ele = screen.queryByTestId('parent');
    expect(ele).toBeInTheDocument();
})