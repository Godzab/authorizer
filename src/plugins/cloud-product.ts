import {Plugin} from '../types';

export const cloudProductPlugin: Plugin = async () => {
    // Check if the user has less than 3 cloud projects defined
    return await checkForLessThan3Projects();
};

async function checkForLessThan3Projects(): Promise<boolean> {
    // Perform some logic to check if the user has less than 3 cloud projects defined
    return true; // or false, based on the logic above
}
