import {uniqueNamesGenerator, colors} from 'unique-names-generator';

export const randomColor = (): string => {
    return uniqueNamesGenerator({dictionaries: [colors]});
};