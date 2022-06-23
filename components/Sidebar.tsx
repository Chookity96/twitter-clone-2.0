import React from 'react'
import TwitterIcon from '@mui/icons-material/Twitter';
import {
    BellIcon,
    HashtagIcon,
    BookmarkIcon,
    CollectionIcon,
    DotsCircleHorizontalIcon,
    MailIcon,
    UserIcon,
    HomeIcon,
} from '@heroicons/react/outline'
import SidebarRow from './SidebarRow';
import { signIn, signOut, useSession } from 'next-auth/react';

function Sidebar() {
    const { data: session } = useSession()

    return (
        <div className='flex flex-col col-span-2 items-center px-4 md:items-start'>
            <img src="https://ra.ac.ae/wp-content/uploads/2020/01/logo-twitter-icon-symbol-0.png" className='h-10 w-10 m-3' alt="" />
            <SidebarRow onClick={() => {}} title="Home" Icon={HomeIcon}/>
            <SidebarRow onClick={() => {}} title="Explore" Icon={HashtagIcon} />
            <SidebarRow onClick={() => {}} title="Notifications" Icon={BellIcon} />
            <SidebarRow onClick={() => {}} title="Messages" Icon={MailIcon} />
            <SidebarRow onClick={() => {}} title="Bookmarks" Icon={BookmarkIcon} />
            <SidebarRow onClick={() => {}} title="Lists" Icon={CollectionIcon} />
            <SidebarRow onClick={session ? signOut: signIn}  title={session ? 'Sign out': 'Sign In'} Icon={UserIcon} />
            <SidebarRow onClick={() => {}} title="More" Icon={DotsCircleHorizontalIcon} />
        </div>
    )
}

export default Sidebar