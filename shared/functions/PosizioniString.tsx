export default posizioniString = post => {
  let toRet = [];
  post.posizioni.map(posizione => {
    if (posizione.opened) toRet.push(posizione.titolo);
  });
  return toRet.join(", ");
};
