import React from "react";
import MeanKitty from "./meankitty.js";
import prompts from './constants/prompts.js';
import insults from './constants/insults.js';
import { getPrompt, getInsult } from './utils/index.js';
import { waitFor, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe("When the page initializes", () => {
    it("enables the button", () => {
        render(<MeanKitty />);
        const button = screen.getByRole('button-enabled');
        expect(button).toBeEnabled();
    });

    it("disables the input field", () => {
        render(<MeanKitty />);
        const input = screen.getByRole('textbox');
        expect(input).toBeDisabled();
    });

    it("shows the insult", () => {
        render(<MeanKitty />);
        const insult = screen.getByRole('insult');
        expect(insult).toBeInTheDocument();
    });
    
    it("hides the prompt", () => {
        render(<MeanKitty />);
        const prompt = screen.queryByRole('prompt');
        expect(prompt).not.toBeInTheDocument();
    });

    it("hides the timer", () => {
        render(<MeanKitty />);
        const timer = screen.queryByRole('timer');
        expect(timer).not.toBeInTheDocument();
    });
});

describe("When the user clicks the button", () => {
    it("disables the button, enables and focuses on the input field, hides the insult, and shows the prompt and timer", async () => {
        render(<MeanKitty />);
    
        //simulate clicking the button
        let button = screen.getByRole('button-enabled');
        userEvent.click(button);
        
        //button should disable after clicking it
        button = await screen.findByRole('button-disabled');
        expect(button).toBeDisabled();

        const input = screen.getByRole('textbox');
        expect(input).toBeEnabled();
        expect(input).toHaveFocus();
        
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
    it("enables the button, disables the input field, hides the prompt and timer, and shows the insult", async () => {
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
        //input field disables
        const input = screen.getByRole('textbox');
        expect(input).toBeDisabled();
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
    it("enables the button, hides the prompt and timer, shows the insult is purrr, and resets the input value to empty string", async () => {
        render(<MeanKitty />);
    
        //simulate clicking the button
        let button = screen.getByRole('button-enabled');
        userEvent.click(button);

        button = await screen.findByRole('button-disabled');
        
        const prompt = await screen.findByRole('prompt');
        
        const input = screen.getByRole('textbox');

        userEvent.type(input, prompt.innerHTML); //user types the prompt correctly

        //button enables
        button = await screen.findByRole('button-enabled', undefined, { timeout: 2000 });
        //input field disables
        expect(input).toBeDisabled();
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
        //input value is an empty string
        expect(input).toHaveValue('');
    });
});

describe("the getPrompt function", () => {
    it("returns a prompt from the prompts array", () => {
        const prompt = getPrompt();
        expect(prompts.includes(prompt)).toBeTruthy();
    });
});

describe("the getInsult function", () => {
    it("returns an insult from the insults array", () => {
        const insult = getInsult();
        expect(insults.includes(insult)).toBeTruthy();
    });
});