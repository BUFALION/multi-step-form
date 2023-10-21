import { MAXSTEP } from "../constants.js";

export async function stepsHandler() {
    const combinedStepObject = {};

    for (let i = 1; i <= MAXSTEP; i++) {
        const stepModuleName = `./step${i}.js`;

        try {
            const { stepObject } = await import(stepModuleName);
            combinedStepObject[i] = stepObject;
        } catch (error) {
            console.error(`Error importing stepObject for step ${i}:`, error);
        }
    }
    return combinedStepObject;
}

