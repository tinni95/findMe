function isClosed(posizione) {
  return !posizione.opened;
}

export const allClosed = posizioni => {
  return posizioni.every(isClosed);
};
