const posizioniString = (post: any) => {
  let toRet: any[] = [];
  post.posizioni.map((posizione: any) => {
    if (posizione.opened) toRet.push(posizione.titolo);
  });
  return toRet.join(', ');
};

export default posizioniString;
