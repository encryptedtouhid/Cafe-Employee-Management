/**
 * Utility functions for formatting data
 */

/**
 * Format a date to a readable string
 * @param {Date|string} date - The date to format
 * @returns {string} - Formatted date string
 */
export const formatDate = (date) => {
    if (!date) return '';

    const dateObj = typeof date === 'string' ? new Date(date) : date;

    return dateObj.toLocaleDateString('en-SG', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

/**
 * Format a file size in bytes to a human-readable string
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted file size
 */
export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Format a number with commas as thousands separators
 * @param {number} number - The number to format
 * @returns {string} - Formatted number
 */
export const formatNumber = (number) => {
    if (number === null || number === undefined) return '';
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Format phone number with proper spacing
 * @param {string} phone - The phone number to format
 * @returns {string} - Formatted phone number
 */
export const formatPhone = (phone) => {
    if (!phone) return '';

    // For Singapore numbers (8 digits)
    if (/^[89]\d{7}$/.test(phone)) {
        return phone.slice(0, 4) + ' ' + phone.slice(4);
    }

    return phone;
};

/**
 * Convert days to a readable duration string
 * @param {number} days - Number of days
 * @returns {string} - Formatted duration
 */
export const formatDuration = (days) => {
    if (!days && days !== 0) return '';

    if (days < 1) {
        return 'Less than a day';
    }

    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    const remainingDays = days % 30;

    let result = '';

    if (years > 0) {
        result += `${years} ${years === 1 ? 'year' : 'years'}`;
    }

    if (months > 0) {
        if (result) result += ', ';
        result += `${months} ${months === 1 ? 'month' : 'months'}`;
    }

    if (remainingDays > 0 && years === 0) {
        if (result) result += ', ';
        result += `${remainingDays} ${remainingDays === 1 ? 'day' : 'days'}`;
    }

    return result;
};

/**
 * Truncate text with ellipsis if it exceeds maxLength
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} - Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
    if (!text) return '';

    if (text.length <= maxLength) {
        return text;
    }

    return text.substring(0, maxLength - 3) + '...';
};

/**
 * Convert an employee ID to a display format
 * @param {string} id - The employee ID
 * @returns {string} - Formatted ID
 */
export const formatEmployeeId = (id) => {
    if (!id) return '';

    if (/^UI[A-Z0-9]{7}$/.test(id)) {
        return `UI-${id.substring(2, 5)}-${id.substring(5)}`;
    }

    return id;
};