import {useState} from "react";
import Image from "next/image";
import css from './UserBar.module.css';


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

                <button className={css.exitButton} type="button" onClick={() => setIsLogoutModalOpen(true)}>
                    <svg xmlns="/components/UserBar/logoutBtn.svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={css.exitIcon}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
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