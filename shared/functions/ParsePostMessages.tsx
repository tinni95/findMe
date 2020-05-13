export const parsePostMessages = (messages, id) => {
  return messages.map(message => {
    const image =
      message.pub.id == id
        ? message.pub.pictureUrl
          ? message.pub.pictureUrl
          : require("../../assets/images/placeholder.png")
        : message.pub.pictureUrl
        ? message.pub.pictureUrl
        : require("../../assets/images/placeholder.png");
    return {
      ...message,
      _id: message.id,
      user: {
        id,
        _id: message.pub.id == id ? 2 : 1,
        name: message.pub.nome,
        avatar: image
      }
    };
  });
};

export const parsePostMessage = (message, id) => {
    const image =
      message.pub.id == id
        ? message.pub.pictureUrl
          ? message.pub.pictureUrl
          : require("../../assets/images/placeholder.png")
        : message.pub.pictureUrl
        ? message.pub.pictureUrl
        : require("../../assets/images/placeholder.png");
    return {
      ...message,
      _id: message.id,
      user: {
        id,
        _id: message.pub.id == id ? 2 : 1,
        name: message.pub.nome,
        avatar: image
      }
    };
};
