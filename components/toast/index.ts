import React from 'react'
import { toast, Slide } from 'react-toastify'
import Toast from './toast'

interface IProps {
    onClose?: () => void
    timeToClose?: number | false
}

function showToast(content: React.ReactNode, {
    timeToClose,
    onClose = () => { }
}: IProps) {
    return toast(content, {
        position: 'top-right',
        autoClose: timeToClose,
        transition: Slide,
        closeButton: false,
        className: 'custom-toast',
        bodyClassName: 'custom-toast-body',
        onClose
    })
}

const ToastContent = Toast
export {
    showToast,
    ToastContent
}