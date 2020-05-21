
function isClosed(posizione:any) {
	return !posizione.opened;
}

export const allClosed = (posizioni:any) => {
	return posizioni.every(isClosed);
};
