import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

/**
 * Reusable confirmation dialog component
 * @param {Object} props - Component props
 * @param {boolean} props.open - Whether the dialog is open
 * @param {string} props.title - Dialog title
 * @param {string} props.content - Dialog content message
 * @param {string} props.okText - Text for the confirmation button
 * @param {string} props.cancelText - Text for the cancel button
 * @param {Function} props.onConfirm - Function to call when confirmed
 * @param {Function} props.onCancel - Function to call when canceled
 */
const ConfirmationDialog = ({
                                open,
                                title,
                                content,
                                okText = 'Confirm',
                                cancelText = 'Cancel',
                                onConfirm,
                                onCancel,
                            }) => {
    return (
        <Modal
            title={title}
            open={open}
            onOk={onConfirm}
            onCancel={onCancel}
            okText={okText}
            cancelText={cancelText}
            okButtonProps={{ danger: true }}
        >
            <p>{content}</p>
        </Modal>
    );
};

ConfirmationDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default ConfirmationDialog;