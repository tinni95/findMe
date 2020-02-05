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
        const image = message.user.pictureUrl ? message.user.pictureUrl : require("../../assets/images/placeholder.png");
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
    return messages.map(message => {
        const image = message.pub.id == id ? message.pub.pictureUrl ? message.pub.pictureUrl : require("../../assets/images/placeholder.png") :
            message.pub.pictureUrl ? message.pub.pictureUrl : require("../../assets/images/placeholder.png");
        return {
            ...message,
            _id: message.id,
            user: {
                id,
                _id: message.pub.id == id ? 2 : 1,
                name: message.pub.nome,
                avatar: image,
            }
        }
    })
}

export default parseMessages