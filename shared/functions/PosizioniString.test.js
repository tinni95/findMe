import PosizioniString from "./PosizioniString"

const post = {
    posizioni:
        [
            {
                titolo: "Prova1",
                blava: "dasd",
                cacca: "sa"
            },
            {
                titolo: "Prova2",
                blava: "dasd",
                cacca: "sa"
            },
            {
                titolo: "Prova3",
                blava: "dasd",
                cacca: "sa"
            }
        ]

}

const postLong = {
    posizioni:
        [
            {
                titolo: "Prova1",
                blava: "dasd",
                cacca: "sa"
            },
            {
                titolo: "Prova2",
                blava: "dasd",
                cacca: "sa"
            },
            {
                titolo: "Prova3",
                blava: "dasd",
                cacca: "sa"
            },
            {
                titolo: "Prova1",
                blava: "dasd",
                cacca: "sa"
            },
            {
                titolo: "Prova2",
                blava: "dasd",
                cacca: "sa"
            },
            {
                titolo: "Prova3",
                blava: "dasd",
                cacca: "sa"
            },
            {
                titolo: "Prova1",
                blava: "dasd",
                cacca: "sa"
            },
            {
                titolo: "Prova2",
                blava: "dasd",
                cacca: "sa"
            },
            {
                titolo: "Prova3",
                blava: "dasd",
                cacca: "sa"
            }
        ]

}

const expected = "Prova1, Prova2, Prova3"


test("it works with short length", () => {
    const posizioniString = PosizioniString(post);
    expect(expected).toEqual(posizioniString)
})

