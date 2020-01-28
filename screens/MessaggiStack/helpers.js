export const parseMessage = (message, id) => {
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
}


export const parseMessages = (messages, id) => {

    return messages.map(message => {
        const image = message.user.pictureUrl ? { uri: message.user.pictureUrl } : require("../../assets/images/placeholder.png");
        return {
            ...message,
            _id: message.id,
            user: {
                id: message.user.id,
                _id: message.user.id == id ? 2 : 1,
                name: message.user.nome,
                avatar: image
            }
        }
    })
}

export const parsePostMessages = (messages, id) => {
    console.log(id)
    return messages.map(message => {
        console.log(message.pub.id)
        return {
            ...message,
            _id: message.id,
            user: {
                id,
                _id: message.pub.id == id ? 2 : 1,
                name: message.pub.nome,
                avatar: 'https://placeimg.com/140/140/any',
            }
        }
    })
}

export default parseMessages