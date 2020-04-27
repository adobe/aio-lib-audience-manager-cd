/* eslint-disable no-undef */
/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
const { requestInterceptor, reduceError } = require('../src/helpers')

describe('requestInterceptor', () => {
  test('sets the headers', () => {
    const mockReq = { headers: {} }
    const mockAccessToken = 'fake:token'

    const receivedReq = requestInterceptor(mockReq, mockAccessToken)
    expect(receivedReq.headers.Authorization).toBe('Bearer ' + mockAccessToken)
    expect(receivedReq.headers['Content-Type']).toBe('application/json')
  })
})
describe('reduceError', () => {
  // if there is no res => err
  test('err is undefined', () => {
    const mockErr = undefined
    const recieved = reduceError(mockErr)
    expect(recieved).toEqual({})
  })
  test('err is {}', () => {
    const mockErr = {}
    const recieved = reduceError(mockErr)
    expect(recieved).toEqual({})
  })
  test('err is {response: {}}', () => {
    const mockErr = { response: {} }
    const recieved = reduceError(mockErr)
    expect(recieved).toEqual({ response: {} })
  })
  test('err is String', () => {
    const mockErr = 'string'
    const recieved = reduceError(mockErr)
    expect(recieved).toBe('string')
  })
  test('err is {response: {status: 200, statusText: "ok"}}', () => {
    const mockErr = { response: { status: 200, statusText: 'ok' } }
    const recieved = reduceError(mockErr)
    expect(recieved).toEqual({ response: { status: 200, statusText: 'ok' } })
  })
  test('err is {response: {body: {fake: string }}}', () => {
    const mockErr = { response: { body: { fake: 'string' } } }
    const recieved = reduceError(mockErr)
    expect(recieved).toEqual({ response: { body: { fake: 'string' } } })
  })
  test('err is {response: {status: 200, statusText: "ok" body: {fake: "string" }}}', () => {
    const mockErr = { response: { status: 200, statusText: 'ok', body: { fake: 'string' } } }
    const response = (mockErr.response)
    const recieved = reduceError(mockErr)
    expect(recieved).toEqual(
      `200 - ok (${JSON.stringify(response.body)})`
    )
  })
})
