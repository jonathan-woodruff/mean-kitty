import prompts from '../constants/prompts.js';
import insults from '../constants/insults.js';
import { getPrompt, getInsult } from './index.js';

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