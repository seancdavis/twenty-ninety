process.env.ELEVENTY_ENV = "test"

global.onInit = jest.fn((input) => input())
global.ENV = "test"
