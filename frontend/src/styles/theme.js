/**
 * Application theme configuration
 * This file contains theme settings for Ant Design components and custom variables
 */

// Ant Design theme customization
const antTheme = {
    // Primary color palette
    'primary-color': '#1890ff', // Primary color for all components
    'link-color': '#1890ff', // Link color
    'success-color': '#52c41a', // Success state color
    'warning-color': '#faad14', // Warning state color
    'error-color': '#f5222d', // Error state color
    'font-size-base': '14px', // Major text font size
    'heading-color': 'rgba(0, 0, 0, 0.85)', // Heading text color
    'text-color': 'rgba(0, 0, 0, 0.65)', // Major text color
    'text-color-secondary': 'rgba(0, 0, 0, 0.45)', // Secondary text color
    'disabled-color': 'rgba(0, 0, 0, 0.25)', // Disabled state color
    'border-radius-base': '4px', // Major border radius
    'border-color-base': '#d9d9d9', // Major border color
    'box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)', // Major shadow for layers

    // Layout
    'layout-header-background': '#001529',
    'layout-body-background': '#f0f2f5',
    'layout-header-height': '64px',
    'layout-header-padding': '0 50px',
    'layout-footer-padding': '24px 50px',
    'layout-content-padding': '24px',

    // Card
    'card-head-padding': '16px',
    'card-inner-head-padding': '12px',
    'card-padding-base': '24px',
    'card-padding-wider': '32px',

    // Form
    'form-item-margin-bottom': '24px',
    'form-vertical-label-padding': '0 0 8px',

    // Table
    'table-padding-vertical': '16px',
    'table-padding-horizontal': '16px',

    // Button
    'btn-font-weight': '500',
    'btn-border-radius-base': '4px',
    'btn-border-width': '1px',
    'btn-height-base': '32px',
    'btn-height-lg': '40px',
    'btn-height-sm': '24px',
};

// Custom application theme variables
const appTheme = {
    // Font families
    fontFamily: {
        primary: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        monospace: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
    },

    // Spacing
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
    },

    // Shadows
    shadows: {
        small: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        medium: '0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
        large: '0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)',
    },

    // Transitions
    transitions: {
        short: '0.15s ease-in-out',
        medium: '0.3s ease-in-out',
        long: '0.5s ease-in-out',
    },

    // Z-index levels
    zIndex: {
        dropdown: 1000,
        sticky: 1010,
        modal: 1100,
        popover: 1200,
        tooltip: 1300,
    },

    // Responsive breakpoints
    breakpoints: {
        xs: '480px',
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        xxl: '1600px',
    },

    // Custom colors
    colors: {
        headerText: '#fff',
        footerBackground: '#f7f7f7',
        borderLight: '#f0f0f0',
        hoverBackground: '#f9f9f9',
        cardShadow: '0 1px 3px rgba(0,0,0,0.05)',
        tableHeaderBg: '#fafafa',
    },
};

// Export the complete theme configuration
export default {
    antTheme,
    ...appTheme,
};