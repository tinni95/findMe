export const adjustLink = link => {
  if (!link.startsWith("http")) {
    return "http://" + link;
  } else return link;
};
