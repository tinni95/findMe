
export const parseMessages = (messages, id) => {
    return messages.map(message => {
        return {
            ...message,
            _id: message.id,
            user: {
                id: message.user.id,
                _id: message.user.id == id ? 2 : 1,
                name: message.user.nome,
                avatar: 'https://placeimg.com/140/140/any',
            }
        }
    })
}

export const parsePostMessages = (messages, id) => {
    return messages.map(message => {
        return {
            ...message,
            _id: message.id,
            sub: {
                id: message.user.id,
                _id: message.user.id == id ? 2 : 1,
                name: message.user.nome,
                avatar: 'https://placeimg.com/140/140/any',
            }
        }
    })
}

export default parseMessages