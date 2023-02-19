/**
 * Generates a deep copied object
 * @param {object} object
 * @returns Object
 */
export const deepCopy = (object) => {
    const newObject = {};
    const objectKeys = Object.keys(object);

    objectKeys.forEach(objectKey => {
        const currentValue = object[objectKey];

        newObject[objectKey] = currentValue instanceof Object
            ? deepCopy(currentValue)
            : currentValue;
    });

    return newObject;
};
