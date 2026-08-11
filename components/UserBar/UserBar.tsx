'use client';

import {useState} from "react";
import Image from "next/image";
import css from './UserBar.module.css';
import LogoutModal from "../LogoutModal/LogoutModal";

 type UserBarProps = {
        name: string;
        avatar: string;
    }

export default function UserBar({name, avatar}: UserBarProps) {
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    return(
        <>
            <div className={css.userBar}>
                <Image 
                    src={avatar} 
                    alt="User Avatar" 
                    className={css.userBarAvatar} 
                    width={40}
                    height={40}
                />
                <p className={css.userBarName}>{name}</p>

                <svg
                    className={css.separator}
                    width="1"
                    height="39"
                    aria-hidden="true"
                >
                    <use href="/icons/symbol-defs.svg#separator" />
                </svg>

                <button className={css.exitButton} type="button" onClick={() => setIsLogoutModalOpen(true)}>
                    <svg
                        className={css.logoutIcon}
                        width="24"
                        height="24"
                        aria-hidden="true"
                    >
                        <use href="/icons/symbol-defs.svg#logout-btn" />
                    </svg>
                </button>
            </div>
            {isLogoutModalOpen && (
                <LogoutModal 
                    onClose={() => setIsLogoutModalOpen(false)} 
                /> 
            )}
        </>

    )
}