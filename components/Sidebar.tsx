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
            <img src="/vercel.svg" className='h-10 w-10 m-5' alt="" />
            <SidebarRow onClick={session ? signOut: signIn} title="Home" Icon={HomeIcon}/>
            <SidebarRow onClick={session ? signOut: signIn} title="Explore" Icon={HashtagIcon} />
            <SidebarRow onClick={session ? signOut: signIn} title="Notifications" Icon={BellIcon} />
            <SidebarRow onClick={session ? signOut: signIn} title="Messages" Icon={MailIcon} />
            <SidebarRow onClick={session ? signOut: signIn} title="Bookmarks" Icon={BookmarkIcon} />
            <SidebarRow onClick={session ? signOut: signIn} title="Lists" Icon={CollectionIcon} />
            <SidebarRow onClick={session ? signOut: signIn}  title={session ? 'Sign out': 'Sign In'} Icon={UserIcon} />
            <SidebarRow onClick={session ? signOut: signIn} title="More" Icon={DotsCircleHorizontalIcon} />
        </div>
    )
}

export default Sidebar