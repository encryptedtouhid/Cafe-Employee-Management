/**
 * Utility functions for form validation
 */

/**
 * Validates a name field (6-10 characters)
 * @param {string} name - The name to validate
 * @returns {boolean} - Whether the name is valid
 */
export const isValidName = (name) => {
    if (!name) return false;
    return name.length >= 6 && name.length <= 10;
};

/**
 * Validates an email address
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
export const isValidEmail = (email) => {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validates a Singapore phone number (starts with 8 or 9, 8 digits)
 * @param {string} phone - The phone number to validate
 * @returns {boolean} - Whether the phone number is valid
 */
export const isValidPhone = (phone) => {
    if (!phone) return false;
    const phoneRegex = /^[89]\d{7}$/;
    return phoneRegex.test(phone);
};

/**
 * Validates a gender value
 * @param {string} gender - The gender to validate
 * @returns {boolean} - Whether the gender is valid
 */
export const isValidGender = (gender) => {
    return gender === 'Male' || gender === 'Female';
};

/**
 * Validates a description field (max 256 characters)
 * @param {string} description - The description to validate
 * @returns {boolean} - Whether the description is valid
 */
export const isValidDescription = (description) => {
    if (!description) return false;
    return description.length <= 256;
};

/**
 * Validates a file size
 * @param {File} file - The file to validate
 * @param {number} maxSize - Maximum file size in bytes
 * @returns {boolean} - Whether the file size is valid
 */
export const isValidFileSize = (file, maxSize = 2 * 1024 * 1024) => {
    if (!file) return true; // File is optional
    return file.size <= maxSize;
};

/**
 * Validates a file type
 * @param {File} file - The file to validate
 * @param {Array<string>} allowedTypes - Array of allowed MIME types
 * @returns {boolean} - Whether the file type is valid
 */
export const isValidFileType = (file, allowedTypes = ['image/jpeg', 'image/png', 'image/gif']) => {
    if (!file) return true; // File is optional
    return allowedTypes.includes(file.type);
};

/**
 * Validates a UUID
 * @param {string} uuid - The UUID to validate
 * @returns {boolean} - Whether the UUID is valid
 */
export const isValidUUID = (uuid) => {
    if (!uuid) return false;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
};

/**
 * Validates an employee ID (UIXXXXXXX format)
 * @param {string} id - The employee ID to validate
 * @returns {boolean} - Whether the ID is valid
 */
export const isValidEmployeeId = (id) => {
    if (!id) return false;
    const idRegex = /^UI[A-Z0-9]{7}$/;
    return idRegex.test(id);
};