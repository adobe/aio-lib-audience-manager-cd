# E2E Tests

## Requirements

To run the e2e test you'll need these env variables set:
  1. `AUDIENCE_MANAGER_ORG_ID`
  2. `AUDIENCE_MANAGER_API_KEY`
  3. `AUDIENCE_MANAGER_ACCESS_TOKEN`
  3. `AUDIENCE_MANAGER_DATA_SOURCE_ID`
  4. `AUDIENCE_MANAGER_ID`
  5. `AUDIENCE_MANAGER_STREAM_ID`
  6. `AUDIENCE_MANAGER_DSTREAM_ID`

## Run

`npm run e2e`

## Test overview

The tests cover:

1. Malformed org id, api key or access token
2. `read` APIs
