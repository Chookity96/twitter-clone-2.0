import {
    CalendarIcon,
    EmojiHappyIcon,
    LocationMarkerIcon,
    PhotographIcon,
    SearchCircleIcon
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import React, { Dispatch, SetStateAction, useRef, useState, } from 'react'
import toast from 'react-hot-toast'
import { Tweet, TweetBody } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'

interface Props {
    setTweets: Dispatch<SetStateAction<Tweet[]>>
}

function TweetBox( {setTweets}: Props ) {
    const [input, setInput] = useState('')
    const {data: session} = useSession()
    const [image, setImage] = useState('');
    const [imageURL, setImageURL] = useState<boolean>(false)
    const imageInputRef = useRef<HTMLInputElement>(null)
    const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        if(!imageInputRef.current?.value) return;

        setImage(imageInputRef.current.value)
        imageInputRef.current.value = ''
        setImageURL(false)
    }

    const postTweet = async () => {
        const tweetInfo: TweetBody ={
            text: input,
            username: session?.user?.name || 'Unknown user',
            profileImg: session?.user?.image || "https://www.itdp.org/wp-content/uploads/2021/06/avatar-man-icon-profile-placeholder-260nw-1229859850-e1623694994111.jpg",
            image: image,
        }

        const result = await fetch(`/api/addTweet`, {
            body: JSON.stringify(tweetInfo),
            method: 'POST',
        })
        const json = await result.json();

        const newTweets = await fetchTweets()
        setTweets(newTweets)

        toast('Tweet Posted', {
            icon: '🚀'
        })
        return json
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        postTweet()

        setInput('')
        setImage('')
        setImageURL(false)
    }
    return (
        <div className='flex space-x-2 p-5'>
            <img 
            src={session?.user?.image || "https://www.itdp.org/wp-content/uploads/2021/06/avatar-man-icon-profile-placeholder-260nw-1229859850-e1623694994111.jpg"} alt=""
                className='h-14 w-14 rounded-full object-cover mt-4' />

            <div className='flex flex-1 items-center pl-2'>
                <form className='flex flex-col flex-1'>
                    <input type="text" placeholder="What's Happening?" className='h-24 w-full text-xl outline-none placeholder:text-xl' value={input} onChange={(e) => setInput(e.target.value)}/>
                    <div className='flex items-center'>
                        <div className='flex space-x-2 text-twitter flex-1'>
                            <PhotographIcon onClick={() => setImageURL(!imageURL)}className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150' />
                            <SearchCircleIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150' />
                            <EmojiHappyIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150' />
                            <CalendarIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150' />
                            <LocationMarkerIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150' />
                        </div>


                        <button onClick={handleSubmit} disabled={!input || !session} className='bg-twitter px-5 py-2 rounded-full font-bold text-white disabled:opacity-40'>Tweet</button>
                    </div>

                    {imageURL && (
                        <form className='mt-5 flex rounded-lg bg-twitter/80 py-2 px-4'>
                            <input className='flex-1 bg-transparent p-2 text-white placeholder:text-white' type="text" placeholder="Enter image URL..." ref={imageInputRef}/>
                            <button onClick={addImageToTweet} className='text-white font-bold'>Add Image</button>
                        </form>

                    )}
                    {image && (
                        <img className='object-contain mt-10 h-40 w-full rounded-xl shadow-lg' src={image} alt="" />
                    )}
                </form>
            </div>
        </div>
    )
}

export default TweetBox