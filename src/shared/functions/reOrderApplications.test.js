import { reOrderApplications } from "./reOrderApplications"

const applications = [
    {
        "messages": [
            {
                "createdAt": "2020-03-03T18:00:57.594Z",
                "text": "We"
            },
            {
                "createdAt": "2020-03-03T18:16:18.059Z",
                "text": "Prova"
            }
        ]
    },
    {
        "messages": [
            {
                "createdAt": "2020-03-03T17:59:53.619Z",
                "text": "We"
            }
        ]
    },
    {
        "messages": [
            {
                "createdAt": "2020-03-03T17:53:02.424Z",
                "text": "We"
            },
            {
                "createdAt": "2020-03-03T18:16:38.902Z",
                "text": "Provaa"
            }
        ]
    }
];


const expected = [
    {
        "messages": [
            {
                "createdAt": "2020-03-03T17:53:02.424Z",
                "text": "We"
            },
            {
                "createdAt": "2020-03-03T18:16:38.902Z",
                "text": "Provaa"
            }
        ]
    },
    {
        "messages": [
            {
                "createdAt": "2020-03-03T18:00:57.594Z",
                "text": "We"
            },
            {
                "createdAt": "2020-03-03T18:16:18.059Z",
                "text": "Prova"
            }
        ]
    },
    {
        "messages": [
            {
                "createdAt": "2020-03-03T17:59:53.619Z",
                "text": "We"
            }
        ]
    },
];



test("it works", () => {
    const age = reOrderApplications(applications);
    expect(age).toEqual(expected)
})

