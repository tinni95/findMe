
export default parseMessages = (messages, subId) => {
    return messages.map(message => {
        return {
            ...message,
            _id: message.id,
            user: {
                _id: subId == message.user.id ? 1 : 2,
                name: message.user.nome,
                avatar: 'https://placeimg.com/140/140/any',
            }
        }
    })
}