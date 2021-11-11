import '@testing-library/jest-dom'

let warn: jest.SpyInstance

beforeEach(() => {
  warn = jest.spyOn(console, 'warn')
  warn.mockImplementation(() => {})
})

afterEach(() => {
  warn.mockRestore()
})

export {}
