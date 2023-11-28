/**
 * The randomChar function returns a random character from a given string.
 * @param {string} characters - string that contains characters to select from.
 * @returns {string} - random character from the provided string.
 */
const randomChar = (characters: string): string => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters.charAt(randomIndex);
};

/**
 * Shuffle characters of a given string.
 * @param {string} string - String to shuffle.
 * @returns {string} - Shuffled string.
 */
const shuffleString = (string: string): string => {
    const array = string.split("");
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join("");
};

/**
 * Generate a random password.
 * @return {string} - Random string as a password.
 */
const generatePassword = (): string => {
    const length = Math.floor(Math.random() * 11) + 6;
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numericChars = "0123456789";
    const specialChars = "!@#$%^&*?";

    const allChars = lowercaseChars + uppercaseChars + numericChars + specialChars;

    let password = "";

    // Ensure at least one character from each category
    password +=
        randomChar(lowercaseChars) +
        randomChar(uppercaseChars) +
        randomChar(numericChars) +
        randomChar(specialChars);

    // Generate the remaining characters
    for (let i = 4; i < length; i++) {
        password += randomChar(allChars);
    }

    return shuffleString(password);
};

export { generatePassword };
