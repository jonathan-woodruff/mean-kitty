import React from "react";
import MeanKitty from "./meankitty.js";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

it("initializes the page correctly", () => {
    render(<MeanKitty />);
    
    //it shows insult
    const paragraph = screen.getByRole('insult');
    expect(paragraph).toBeInTheDocument();
    
    //button is enabled
    const button = screen.getByRole('button');
    expect(button).toBeEnabled();
    
    //timer and prompt are hidden
    const prompt = screen.queryByRole('prompt');
    const timer = screen.queryByRole('timer');
    expect(prompt).not.toBeInTheDocument();
    expect(timer).not.toBeInTheDocument();

});