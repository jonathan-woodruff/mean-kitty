/* utility functions */
import prompts from '../constants/prompts';
import insults from '../constants/insults';

//get a random prompt
export const getPrompt = () => {
    const index = Math.floor(Math.random() * prompts.length);
    return prompts[index];
};

//get a random insult
export const getInsult = () => {
    const index = Math.floor(Math.random() * insults.length);
    return insults[index];
};