import React, {useEffect, useState} from "react";
import './app.css';

function Chat({socket, username, room }){
        const [currentMessage, setCurrentMessage] = useState('')
        const [messageList, setMessageList] = useState([])
        



        const sendMessage = async () =>{
            if (currentMessage !== ''){
                const messageData = {
                    room: room,
                    author: username,
                    message: currentMessage,
                    time: new Date(Date.now()).getHours() + ':' 
                    + new Date(Date.now()).getMinutes(),

                }

                await socket.emit('send_message', messageData)
                setMessageList((list)=> [...list, messageData]);
            }
        }

        useEffect(()=>{
            socket.off('receive_message').on('receive_message', (data) =>{
                //console.log(data)
                setMessageList((list)=> [...list, data]);
            })
        }, {socket})
            
    return(
        <div>

        < div className="chat-window " >

        <div className="chat-header">
            <p>live chat</p>
        </div>
        <div className="chat-body">
            {messageList.map((messageContent)=>{
                return <h1>{messageContent.message}</h1>;
            })}
        </div>
    <div className="chat-footer">
            <input type="text" placeholder="Hey..." 
            onChange={(event) => {setCurrentMessage(event.target.value)}}></input>
            <button onClick={sendMessage}>&#9658;</button>
     </div>
     </div>
    </div>
    );
}

export default Chat