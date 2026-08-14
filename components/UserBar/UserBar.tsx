'use client';

import { useState } from 'react';
import Image from 'next/image';

import LogoutModal from '../LogoutModal/LogoutModal';

import css from './UserBar.module.css';

interface UserBarProps {
    name: string;
    avatar: string;
}

const UserBar = ({ name, avatar }: UserBarProps) => {
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const openLogoutModal = () => {
        setIsLogoutModalOpen(true);
    };

    const closeLogoutModal = () => {
        setIsLogoutModalOpen(false);
    };

    return (
        <>
            <div className={css.userBar}>
                <Image
                    src={avatar}
                    alt={`${name}'s avatar`}
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

                <button
                    className={css.exitButton}
                    type="button"
                    aria-label="Log out"
                    onClick={openLogoutModal}
                >
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
                <LogoutModal onClose={closeLogoutModal} />
            )}
        </>
    );
};
    
export default UserBar;