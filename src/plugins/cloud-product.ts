import { Plugin, User } from '../types';

export const cloudProductPlugin: Plugin = async (user: User) => {
    // Check if the user has less than 3 cloud projects defined
    const hasLessThan3Projects = await checkForLessThan3Projects(user);

    return hasLessThan3Projects;
};

async function checkForLessThan3Projects(user: User): Promise<boolean> {
    // Perform some logic to check if the user has less than 3 cloud projects defined
    // ...
    console.log(user);

    return true; // or false, based on the logic above
}
