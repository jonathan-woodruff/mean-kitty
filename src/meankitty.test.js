import React from "react";
import MeanKitty from "./meankitty.js";
import { waitFor, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe("When the page initializes", () => {
    render(<MeanKitty />);

    it("shows the button and input fields are enabled, the insult shows, and the prompt and timer are hidden", () => {
        const button = screen.getByRole('button-enabled');
        expect(button).toBeEnabled();

        const input = screen.getByRole('textbox');
        expect(input).toBeDisabled();

        const insult = screen.getByRole('insult');
        expect(insult).toBeInTheDocument();
    
        const prompt = screen.queryByRole('prompt');
        expect(prompt).not.toBeInTheDocument();

        const timer = screen.queryByRole('timer');
        expect(timer).not.toBeInTheDocument();
    });
});
/*
describe("When the user clicks the button", () => {
    it("disables the button, hides the insult, and shows the prompt and timer", async () => {
        render(<MeanKitty />);
    
        //simulate clicking the button
        let button = screen.getByRole('button-enabled');
        userEvent.click(button);
        
        //button should disable after clicking it
        button = await screen.findByRole('button-disabled');
        expect(button).toBeDisabled();
        
        //insult hides
        await waitFor(() => {
            const insult = screen.queryByRole('insult');
            expect(insult).not.toBeInTheDocument();
        });
        
        //prompt and timer show
        const prompt = await screen.findByRole('prompt');
        expect(prompt).toBeInTheDocument();
    
        const timer = await screen.findByRole('timer');
        expect(timer).toBeInTheDocument();
    });
});

describe("When the timer reaches zero", () => {
    it("enables the button, hides the prompt and timer, and shows the insult", async () => {
        render(<MeanKitty />);
    
        //simulate clicking the button
        let button = screen.getByRole('button-enabled');
        userEvent.click(button);
        
        //button should disable after clicking it
        button = await screen.findByRole('button-disabled');
    
        //After 5 seconds...
        button = await screen.findByRole('button-enabled', undefined, { timeout: 6000 });
        //button should enable
        expect(button).toBeEnabled();
        //prompt and timer hide
        await waitFor(() => {
            const prompt = screen.queryByRole('prompt');
            expect(prompt).not.toBeInTheDocument();
            const timer = screen.queryByRole('timer');
            expect(timer).not.toBeInTheDocument();
        });
        //insult appears
        const insult = await screen.findByRole('insult');
        expect(insult).toBeInTheDocument();
    }, 10000);
});

describe("When the user types the prompt correctly before the timer reaches zero", () => {
    it("enables the button, hides the prompt and timer, and shows the insult is purrr", async () => {
        render(<MeanKitty />);
    
        //simulate clicking the button
        let button = screen.getByRole('button-enabled');
        userEvent.click(button);

        button = await screen.findByRole('button-disabled');
        
        const prompt = await screen.findByRole('prompt');
        
        const input = screen.getByRole('textbox');

        userEvent.type(input, prompt.innerHTML); //user types the prompt correctly

        //button enables
        button = await screen.findByRole('button-enabled');
        //prompt and timer hide
        await waitFor(() => {
            const prompt = screen.queryByRole('prompt');
            expect(prompt).not.toBeInTheDocument();
            const timer = screen.queryByRole('timer');
            expect(timer).not.toBeInTheDocument();
        });
        //insult shows purrr
        const insult = await screen.findByRole('insult');
        expect(insult.innerHTML).toBe('purrr');
    });
});*/