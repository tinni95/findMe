import { parsePositions } from "./helpers";

const posizioni = [
    {
        __typename: 'data',
        title: "Michele",
        type: "Socio Operativo",
        field: "Economia",
        description: "dasdas",
        requisiti: ["PHP"]
    },
    {
        __typename: 'data',
        title: "Michele",
        type: "Socio Operativo",
        field: "Economia",
        description: "dasdas",
        requisiti: ["lmln", "PHP"]
    }
]

const wanted = [
    {
        __typename: 'data',
        title: "Michele",
        type: "Socio Operativo",
        field: "Economia",
        description: "dasdas",
        requisiti: { set: ["PHP"] }
    },
    {
        __typename: 'data',
        title: "Michele",
        type: "Socio Operativo",
        field: "Economia",
        description: "dasdas",
        requisiti: { set: ["lmln", "PHP"] }
    }
]
test("it works", () => {
    const parsedPosition = parsePositions(posizioni);
    expect(parsedPosition).toEqual(wanted)
    console.log(parsedPosition)
})