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

const sdk = require('../src/index')
const path = require('path')
const { codes } = require('../src/SDKErrors')
// load .env values in the e2e folder, if any
require('dotenv').config({ path: path.join(__dirname, '.env') })

let sdkClient = {}
const orgId = process.env.AUDIENCE_MANAGER_ORG_ID
const apiKey = process.env.AUDIENCE_MANAGER_API_KEY
const accessToken = process.env.AUDIENCE_MANAGER_ACCESS_TOKEN
const id = process.env.AUDIENCE_MANAGER_ID

// fake values!
const dataSourceId = 1
const dataSourceId2 = 2
const dstream = 3
const streamId = 12345
const traitId = 0
const tdpid = 0

beforeAll(async () => {
  sdkClient = await sdk.init(orgId, apiKey, accessToken)
})

test('sdk init test', async () => {
  expect(sdkClient.orgId).toBe(orgId)
  expect(sdkClient.apiKey).toBe(apiKey)
  expect(sdkClient.accessToken).toBe(accessToken)
})
test('test Server Error', async () => {
  const _sdkClient = await sdk.init('Internal error', apiKey, accessToken)
  const promise = _sdkClient.updateStream()

  // just match the error message
  return expect(promise).rejects.toEqual(expect.any(codes.ERROR_UPDATE_STREAM))
})

test('test Invalid Input', async () => {
  const _sdkClient = await sdk.init(orgId, 'Invalid input', accessToken)
  const promise = _sdkClient.updateStream()

  // just match the error message
  return expect(promise).rejects.toEqual(expect.any(codes.ERROR_UPDATE_STREAM))
})

test('test Unauthorized token', async () => {
  const _sdkClient = await sdk.init(orgId, apiKey, 'Unauthorized')
  const promise = _sdkClient.updateStream()

  // just match the error message
  return expect(promise).rejects.toEqual(expect.any(codes.ERROR_UPDATE_STREAM))
})

test('test getProfile API', async () => {
  const params = {}

  // check success response
  const res = await sdkClient.getProfile(dataSourceId, id, params)
  expect(res.ok).toBeTruthy()
})

test('test Stream API', async () => {
  const body = {
    tracing_id: 'string',
    ops: [
      {
        identities: [
          {
            dataSourceId: dataSourceId,
            value: id
          },
          {
            dataSourceId: dataSourceId2,
            value: id
          }
        ],
        traitEvaluation: {
          data: [
            {
              key: 'c_trait',
              value: 1
            }
          ]
        },
        traitInput: {
          traitIds: [
            traitId
          ]
        },
        targetDataSource: [
          tdpid
        ],
        operationType: 'APPEND'
      }
    ]
  }
  // check success response
  const res = await sdkClient.updateStream(streamId, body)
  expect(res.ok).toBeTruthy()
})

test('test Data Collection API', async () => {
  const params = {
    d_orgid: orgId,
    d_sid: streamId,
    d_tdpid: tdpid,
    d_uuid: id,
    d_ws: 'overwrite',
    d_location_id: '6'
  }
  // check success response
  const res = await sdkClient.updateProfile(dstream, params)
  expect(res.ok).toBeTruthy()
})
