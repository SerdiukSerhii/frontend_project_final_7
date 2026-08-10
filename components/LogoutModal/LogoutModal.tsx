"use client";


import Modal from "../Modal/Modal";
import css from "./LogoutModal.module.css";

interface LogoutModalProps {
    onClose: () => void;
}

export default function LogoutModal({ onClose }: LogoutModalProps) {
    const handleLogout = () => {
        console.log("User logged out");
    }


    return (
        <Modal onClose={onClose}>
            <div className={css.logoutModal}>
                <h2 className={css.title}>Are you sure?</h2>

                <p className={css.text}>We will miss you!</p>

                <div className={css.actions}>
                    <button
                        type="button"
                        className={css.logoutButton}
                        onClick={handleLogout}
                    >
                        Log out
                    </button>

                    <button
                        type="button"
                        className={css.cancelButton}
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>

        </Modal>
    )
};