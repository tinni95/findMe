export default posizioniString = post => {
  let toRet = [];
  post.posizioni.map(posizione => {
    toRet.push(posizione.titolo);
  });
  return toRet.join(", ");
};
