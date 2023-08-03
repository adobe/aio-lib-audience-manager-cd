/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
const helpers = require('../src/helpers')
helpers.requestInterceptor = jest.fn()

const mock = require('./mock')
const sdk = require('../src')
const errorSDK = require('../src/SDKErrors')
const orgId = 'test-orgId'
const apiKey = 'test-apiKey'
const accessToken = 'test-accessToken'

beforeEach(() => {
  helpers.requestInterceptor.mockReset()
})

test('sdk init test', async () => {
  const sdkClient = await sdk.init(orgId, apiKey, accessToken)

  expect(sdkClient.orgId).toBe(orgId)
  expect(sdkClient.apiKey).toBe(apiKey)
  expect(sdkClient.accessToken).toBe(accessToken)
})

test('sdk init error, no orgId passed', async () => {
  await expect(sdk.init(null, apiKey, accessToken)).rejects.toThrow('[AudienceManagerSDK:ERROR_SDK_INITIALIZATION] SDK initialization error(s). Missing arguments: orgId')
})
test('sdk init error, no apiKey passed', async () => {
  await expect(sdk.init(orgId, null, accessToken)).rejects.toThrow('[AudienceManagerSDK:ERROR_SDK_INITIALIZATION] SDK initialization error(s). Missing arguments: apiKey')
})

test('sdk init error, no accessToken passed', async () => {
  await expect(sdk.init(accessToken, apiKey)).rejects.toThrow('[AudienceManagerSDK:ERROR_SDK_INITIALIZATION] SDK initialization error(s). Missing arguments: accessToken')
})

describe('updateStream', () => {
  test('success call', async () => {
    const sdkClient = await sdk.init(orgId, apiKey, accessToken)

    // setting up mocks
    const mockFn = sdkClient.sdk.mockResolved('stream.post_stream__streamId_', mock.data.updateStreamRes)

    // usage
    const res = await sdkClient.updateStream(mock.data.updateStreamReq.streamId, mock.data.updateStreamReq.body)

    // checks, what you expect
    // check response
    expect(res).toEqual(mock.data.updateStreamRes)
    // check swagger client calls
    expect(mockFn).toHaveBeenCalledWith({
      'x-gw-ims-org-id': 'test-orgId',
      'x-api-key': 'test-apiKey',
      streamId: mock.data.updateStreamReq.streamId
    }, {
      requestBody: mock.data.updateStreamReq.body
    })
    expect(helpers.requestInterceptor).toHaveBeenCalled()
  })

  test('error create stream', async () => {
    const sdkClient = await sdk.init(orgId, apiKey, accessToken)

    const err = new Error('swagger-client error')
    const mockFn = sdkClient.sdk.mockRejected('stream.post_stream__streamId_', err)

    await expect(sdkClient.updateStream(mock.data.updateStreamReq.streamId, mock.data.updateStreamReq.body))
      .rejects.toEqual(new errorSDK.codes.ERROR_UPDATE_STREAM({
        sdkDetails: {
          streamId: mock.data.updateStreamReq.streamId,
          body: mock.data.updateStreamReq.body,
          orgId: 'test-orgId',
          apiKey: 'test-apiKey'
        },
        messageValues: err
      }))

    expect(mockFn).toHaveBeenCalledWith({
      'x-gw-ims-org-id': 'test-orgId',
      'x-api-key': 'test-apiKey',
      streamId: mock.data.updateStreamReq.streamId
    }, {
      requestBody: mock.data.updateStreamReq.body
    })
  })
})

describe('updateProfile (Body)', () => {
  test('success call', async () => {
    const sdkClient = await sdk.init(orgId, apiKey, accessToken)

    // setting up mocks
    const mockFn = sdkClient.sdk.mockResolved('dataCollection.post_event_s2s__streamId_', mock.data.updateProfileBodyRes)

    // usage
    const res = await sdkClient.updateProfile(mock.data.updateProfileBodyReq.dStreamId, undefined, mock.data.updateProfileBodyReq.body)

    // checks, what you expect
    // check response
    expect(res).toEqual(mock.data.updateProfileBodyRes)
    // check swagger client calls
    expect(mockFn).toHaveBeenCalledWith({
      'x-gw-ims-org-id': 'test-orgId',
      'x-api-key': 'test-apiKey',
      d_orgId: 'test-orgId',
      dStreamId: mock.data.updateProfileBodyReq.dStreamId
    }, {
      requestBody: mock.data.updateProfileBodyReq.body
    })
    expect(helpers.requestInterceptor).toHaveBeenCalled()
  })

  test('error POST a single Data Collection', async () => {
    const sdkClient = await sdk.init(orgId, apiKey, accessToken)

    const err = new Error('swagger-client error')
    const mockFn = sdkClient.sdk.mockRejected('dataCollection.post_event_s2s__streamId_', err)

    await expect(sdkClient.updateProfile(mock.data.updateProfileBodyReq.dStreamId, undefined, mock.data.updateProfileBodyReq.body))
      .rejects.toEqual(new errorSDK.codes.ERROR_UPDATE_PROFILE({
        sdkDetails: {
          dStreamId: mock.data.updateProfileBodyReq.dStreamId,
          body: mock.data.updateProfileBodyReq.body,
          orgId: 'test-orgId',
          apiKey: 'test-apiKey'
        },
        messageValues: err
      }))

    expect(mockFn).toHaveBeenCalledWith({
      'x-gw-ims-org-id': 'test-orgId',
      'x-api-key': 'test-apiKey',
      d_orgId: 'test-orgId',
      dStreamId: mock.data.updateProfileBodyReq.dStreamId
    }, {
      requestBody: mock.data.updateProfileBodyReq.body
    })
  })
})

describe('updateProfile', () => {
  test('success call', async () => {
    const sdkClient = await sdk.init(orgId, apiKey, accessToken)

    // setting up mocks
    const mockFn = sdkClient.sdk.mockResolved('dataCollection.get_event_s2s__streamId_', mock.data.updateProfileRes)

    // usage
    const res = await sdkClient.updateProfile(mock.data.updateProfileReq.dStreamId, {})

    // checks, what you expect
    // check response
    expect(res).toEqual(mock.data.updateProfileRes)
    // check swagger client calls
    expect(mockFn).toHaveBeenCalledWith({
      'x-gw-ims-org-id': 'test-orgId',
      'x-api-key': 'test-apiKey',
      dStreamId: mock.data.updateProfileReq.dStreamId,
      d_orgId: 'test-orgId'
    })
    expect(helpers.requestInterceptor).toHaveBeenCalled()
  })

  test('error get a single Data Collection by getting event s2s', async () => {
    const sdkClient = await sdk.init(orgId, apiKey, accessToken)

    const err = new Error('swagger-client error')
    const mockFn = sdkClient.sdk.mockRejected('dataCollection.get_event_s2s__streamId_', err)

    await expect(sdkClient.updateProfile(mock.data.updateProfileReq.dStreamId, mock.data.updateProfileReq))
      .rejects.toEqual(new errorSDK.codes.ERROR_UPDATE_PROFILE({
        sdkDetails: {
          dStreamId: mock.data.updateProfileReq.dStreamId,
          orgId: 'test-orgId',
          apiKey: 'test-apiKey'
        },
        messageValues: err
      }))

    expect(mockFn).toHaveBeenCalledWith({
      'x-gw-ims-org-id': 'test-orgId',
      'x-api-key': 'test-apiKey',
      dStreamId: mock.data.updateProfileReq.dStreamId,
      d_orgId: 'test-orgId'

    })
  })
})

describe('getProfile', () => {
  test('success call', async () => {
    const sdkClient = await sdk.init(orgId, apiKey, accessToken)

    // setting up mocks
    const mockFn = sdkClient.sdk.mockResolved('profileViewer.get_profile__dataSourceId___id_', mock.data.getProfileRes)

    // usage
    const res = await sdkClient.getProfile(mock.data.getProfileReq.dataSourceId, mock.data.getProfileReq.id)

    // checks, what you expect
    // check response
    expect(res).toEqual(mock.data.getProfileRes)
    // check swagger client calls
    expect(mockFn).toHaveBeenCalledWith({
      'x-gw-ims-org-id': 'test-orgId',
      'x-api-key': 'test-apiKey',
      dataSourceId: mock.data.getProfileReq.dataSourceId,
      id: mock.data.getProfileReq.id
    })
  })

  test('error get a Profile Data', async () => {
    const sdkClient = await sdk.init(orgId, apiKey, accessToken)

    const err = new Error('swagger-client error')
    const mockFn = sdkClient.sdk.mockRejected('profileViewer.get_profile__dataSourceId___id_', err)

    await expect(sdkClient.getProfile(mock.data.getProfileReq.dataSourceId, mock.data.getProfileReq.id))
      .rejects.toEqual(new errorSDK.codes.ERROR_GET_PROFILE({
        sdkDetails: {
          dataSourceId: mock.data.getProfileReq.dataSourceId,
          id: mock.data.getProfileReq.id,
          orgId: 'test-orgId',
          apiKey: 'test-apiKey'
        },
        messageValues: err
      }))

    expect(mockFn).toHaveBeenCalledWith({
      'x-gw-ims-org-id': 'test-orgId',
      'x-api-key': 'test-apiKey',
      dataSourceId: mock.data.getProfileReq.dataSourceId,
      id: mock.data.getProfileReq.id
    })
  })
})
