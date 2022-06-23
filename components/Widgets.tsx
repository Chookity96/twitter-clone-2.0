import { SearchIcon } from '@heroicons/react/outline'
import React from 'react'
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';

function Widgets() {
    return (
        <div className='mt-2 px-2 col-span-2 hidden lg:inline'>
            <div className='flex items-center bg-gray-100 rounded-full p-3 mt-2 space-x-2'>
                <SearchIcon className='h-5 w-5 text-gray-400' />
                <input type="text" placeholder='Search Twitter' className='outline-none bg-transparent flex-1' />
            </div>

            <TwitterTimelineEmbed
                sourceType="profile"
                screenName="imgver"
                options={{ height: 1000 }}
            />
        </div>

    )
}

export default Widgets