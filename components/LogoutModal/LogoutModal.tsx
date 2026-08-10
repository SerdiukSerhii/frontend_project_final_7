"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
// import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/auth";
import Modal from "../Modal/Modal";
import css from "./LogoutModal.module.css";

interface LogoutModalProps {
    onClose: () => void;
}

export default function LogoutModal({ onClose }: LogoutModalProps) {
    
    const router = useRouter();
    // const clearUser = useAuthStore((state) => state.clearUser);
    const mutation = useMutation({
        mutationFn:logout,
        onError: () => {
            toast.error("Logout failed. Please try again.");
        },
        onSettled: () => {
            // clearUser();
            onClose();
            router.push("/");
        },
    });

    


    return (
        <Modal onClose={onClose}>
            <div className={css.logoutModal}>
                <h2 className={css.title}>Are you sure?</h2>

                <p className={css.text}>We will miss you!</p>

                <div className={css.actions}>
                    <button
                        type="button"
                        className={css.logoutButton}
                        onClick={() => mutation.mutate()}
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