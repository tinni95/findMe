import React, { useState, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

export default function SettingsScreen() {
  state = {
    messages: [],
  }
  const [messages, setMessages] = useState([])

  useEffect(() => {
    setMessages([{
      _id: 1,
      text: 'Hello developer',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    }])
  }, [])

  const onSend = (message = []) => {
    setMessages(GiftedChat.append(messages, message))
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={message => onSend(message)}
      user={{
        _id: 1,
      }}
    />
  )
}