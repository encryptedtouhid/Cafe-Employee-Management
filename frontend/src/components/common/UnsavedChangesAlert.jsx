import { Modal } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Component that prompts the user when they try to navigate away with unsaved changes
 * @param {Object} props - Component props
 * @param {boolean} props.hasUnsavedChanges - Whether there are unsaved changes
 * @param {string} props.message - Message to display in the prompt
 */
const UnsavedChangesAlert = ({
                                 hasUnsavedChanges,
                                 message = 'You have unsaved changes. Are you sure you want to leave this page?'
                             }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Handle browser navigation/refresh
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (hasUnsavedChanges) {
                e.preventDefault();
                e.returnValue = message;
                return message;
            }
        };

        // Add event listener for page reload/close
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Clean up event listener
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [hasUnsavedChanges, message]);

    // Handle in-app navigation
    useEffect(() => {
        let unblock;

        if (hasUnsavedChanges) {
            unblock = navigate((nextLocation) => {
                // Don't block the same location
                if (nextLocation.pathname === location.pathname) {
                    return true;
                }

                // Show confirmation dialog
                Modal.confirm({
                    title: 'Unsaved Changes',
                    content: message,
                    okText: 'Leave Page',
                    cancelText: 'Stay on Page',
                    onOk: () => {
                        // Allow navigation
                        unblock();
                        navigate(nextLocation.pathname);
                    },
                });

                // Block navigation
                return false;
            });
        }

        return () => {
            if (unblock) {
                unblock();
            }
        };
    }, [hasUnsavedChanges, navigate, location, message]);

    return null; // This component doesn't render anything
};

UnsavedChangesAlert.propTypes = {
    hasUnsavedChanges: PropTypes.bool.isRequired,
    message: PropTypes.string,
};

export default UnsavedChangesAlert;