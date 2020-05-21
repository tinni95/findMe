import getAge from "./getAge"

const DoB = "24/10/1995"
const expectedAge = 24

test("it works", () => {
    const age = getAge(DoB);
    expect(age).toEqual(expectedAge)
})