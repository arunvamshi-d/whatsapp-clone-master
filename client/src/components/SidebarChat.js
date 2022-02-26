import React ,{ useEffect,useState } from 'react'
import { Avatar } from '@material-ui/core'
import './SidebarChat.css'

function SidebarChat({ messages }) {
    const [seed , setSeed] = useState("")

    useEffect(()=>{
        setSeed(Math.floor(Math.random() * 5000))
    },[])
    return (
        <div className='sidebarChat'>
            <Avatar src={`https://i.pinimg.com/originals/8b/6e/c6/8b6ec60427f9b17c1d9aaf4c415babe3.png`} />

            <div className='sidebarChat__info'>
                <h2>Friendo Mania</h2>
                <p>{messages[messages.length - 1]?.message}</p>
            </div>
        </div>
    )
}

export default SidebarChat
