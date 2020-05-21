const shortid = require('shortid');
export const parsePostMessages = (messages: any, id: any) => {
  return messages.map((message: any) => {
    const image = message.pub.pictureUrl
      ? message.pub.pictureUrl
      : require('../../../assets/images/placeholder.png');
    return {
      ...message,
      _id: shortid.generate(),
      user: {
        id,
        _id: message.pub.id == id ? 2 : 1,
        name: message.pub.nome,
        avatar: image,
      },
    };
  });
};

export const parsePostMessage = (message, id) => {
  const image = message.pub.pictureUrl
    ? message.pub.pictureUrl
    : require('../../../assets/images/placeholder.png');
  return {
    ...message,
    _id: shortid.generate(),
    user: {
      id,
      _id: message.pub.id == id ? 2 : 1,
      name: message.pub.nome,
      avatar: image,
    },
  };
};
