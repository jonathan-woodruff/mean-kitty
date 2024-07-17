import React from "react";
import MeanKitty from "./meankitty.js";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

it("initializes the page correctly", () => {
    render(<MeanKitty />);
    
    //it shows insult
    const paragraph = screen.getByRole('paragraph');
    expect(paragraph).toBeInTheDocument();
    
    //button is enabled
    
    //timer and prompt are hidden

});