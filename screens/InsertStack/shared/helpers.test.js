import { indexOfPosition } from "./helpers";
var _ = require("lodash");

const posizioni = [
    {
        __typename: 'data',
        title: "Finanziatore",
        type: "Socio Finanziatore",
        field: "Economia",
        description: "da"
    }
]
const posizione = {
    __typename: 'data',
    title: "Finanziatore",
    type: "Socio Finanziatore",
    field: "Economia",
    description: "da"
}
const posizione2 = {
    __typename: 'data',
    title: "Finanziatdasdaore",
    type: "Socio Finanziatore",
    description: "da"
}

test("it works", () => {
    const index = indexOfPosition(posizioni, posizione);
    expect(index).toEqual(0);
    const index2 = indexOfPosition(posizioni, posizione2);
    expect(index2).toEqual(-1);
})