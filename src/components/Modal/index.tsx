import React from 'react'
import styles from './modal.module.css'

interface ModalProps {
    open: boolean
    onClose: () => void
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ open, children }) => {
    if (!open) return null
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                {children}
            </div>
        </div>
    )
}

export default Modal