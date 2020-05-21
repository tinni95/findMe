import { groupApplications } from "./groupApplications"

const received = [
    {
        "messages": [
            {
                "createdAt": "2020-03-08T20:10:50.802Z"
            }
        ],
        "from": {
            "pictureUrl": "https://i.ibb.co/0Jdv9Mh/ago.jpg"
        },
        "post": {
            "titolo": "Designer Maglette",
            "id": "ck7jh5lxg06ek0871mou0r08s"
        }
    },
    {
        "messages": [
            {
                "createdAt": "2020-03-08T20:09:50.825Z"
            }
        ],
        "from": {
            "pictureUrl": null
        },
        "post": {
            "titolo": "Designer Maglette",
            "id": "ck7jh5lxg06ek0871mou0r08s"
        }
    },
    {
        "messages": [
            {
                "createdAt": "2020-03-08T20:05:50.835Z"
            }
        ],
        "from": {
            "pictureUrl": null
        },
        "post": {
            "titolo": "Designer Maglette",
            "id": "ck7jh5lxg06ek0871mou0r08s"
        }
    },
    {
        "messages": [
            {
                "createdAt": "2020-03-08T20:04:50.846Z"
            }
        ],
        "from": {
            "pictureUrl": null
        },
        "post": {
            "titolo": "Designer Maglette",
            "id": "ck7jh5lxg06ek0871mou0r08s"
        }
    },
    {
        "messages": [
            {
                "createdAt": "2020-03-08T20:14:03.854Z"
            }
        ],
        "from": {
            "pictureUrl": "https://i.ibb.co/0Jdv9Mh/ago.jpg"
        },
        "post": {
            "titolo": "Designer Maglette",
            "id": "ck7jh5lxb06eg0871cmg74772"
        }
    }
]


const expected = { "ck7jh5lxb06eg0871cmg74772": [{ "from": { "pictureUrl": "https://i.ibb.co/0Jdv9Mh/ago.jpg" }, "messages": [{ "createdAt": "2020-03-08T20:14:03.854Z" }], "post": { "id": "ck7jh5lxb06eg0871cmg74772", "titolo": "Designer Maglette" }, "postId": "ck7jh5lxb06eg0871cmg74772" }], "ck7jh5lxg06ek0871mou0r08s": [{ "from": { "pictureUrl": "https://i.ibb.co/0Jdv9Mh/ago.jpg" }, "messages": [{ "createdAt": "2020-03-08T20:10:50.802Z" }], "post": { "id": "ck7jh5lxg06ek0871mou0r08s", "titolo": "Designer Maglette" }, "postId": "ck7jh5lxg06ek0871mou0r08s" }, { "from": { "pictureUrl": null }, "messages": [{ "createdAt": "2020-03-08T20:09:50.825Z" }], "post": { "id": "ck7jh5lxg06ek0871mou0r08s", "titolo": "Designer Maglette" }, "postId": "ck7jh5lxg06ek0871mou0r08s" }, { "from": { "pictureUrl": null }, "messages": [{ "createdAt": "2020-03-08T20:05:50.835Z" }], "post": { "id": "ck7jh5lxg06ek0871mou0r08s", "titolo": "Designer Maglette" }, "postId": "ck7jh5lxg06ek0871mou0r08s" }, { "from": { "pictureUrl": null }, "messages": [{ "createdAt": "2020-03-08T20:04:50.846Z" }], "post": { "id": "ck7jh5lxg06ek0871mou0r08s", "titolo": "Designer Maglette" }, "postId": "ck7jh5lxg06ek0871mou0r08s" }] }



test("it works with short length", () => {
    expect(groupApplications(received)).toEqual(expected)
    console.log(expected[ck7jh5lxb06eg0871cmg74772])
})

