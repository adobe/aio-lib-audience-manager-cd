<!--
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
-->

[![Version](https://img.shields.io/npm/v/@adobe/aio-lib-audience-manager-cd.svg)](https://npmjs.org/package/@adobe/aio-lib-audience-manager-cd)
[![Downloads/week](https://img.shields.io/npm/dw/@adobe/aio-lib-audience-manager-cd.svg)](https://npmjs.org/package/@adobe/aio-lib-audience-manager-cd)
[![Build Status](https://travis-ci.com/adobe/aio-lib-audience-manager-cd.svg?branch=master)](https://travis-ci.com/@adobe/aio-lib-audience-manager-cd)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) [![Greenkeeper badge](https://badges.greenkeeper.io/adobe/aio-lib-audience-manager-cd.svg)](https://greenkeeper.io/)
[![Codecov Coverage](https://img.shields.io/codecov/c/github/adobe/aio-lib-audience-manager-cd/master.svg?style=flat-square)](https://codecov.io/gh/adobe/aio-lib-audience-manager-cd/)

# Adobe I/O Audience Manager Customer Data SDK
Javascript SDK wrapping the [Audience Manager Customer Data API](https://dmp-data.adobe.io/__docs#/).

More details on the API can be found [here](https://docs.adobe.com/content/help/en/aam-customer-api/help/beta-guide/customer-api-overview.html).
### Installing

```bash
$ npm install
```
### Usage
1) Initialize the SDK

```javascript
const sdk = require('@adobe/aio-lib-audience-manager-cd')

async function sdkTest() {
  //initialize sdk
  const client = await sdk.init('<orgId>', 'x-api-key', '<valid auth token>')
}
```

2) Call methods using the initialized SDK

```javascript
const sdk = require('@adobe/aio-lib-audience-manager-cd')

async function sdkTest() {
  // initialize sdk
  const audienceManagerCDClient = await sdk.init('<orgId>', 'x-api-key', '<valid auth token>')

  // call methods
  try {
    // Get profiles
    const result = await client.audienceManagerCDClient.getProfile({})
    console.log(result)

  } catch (e) {
    console.error(e)
  }
}
```
All methods available under the SDK are documented [<code>here</code>](#audienceManagerCDCoreApi)

## Classes

<dl>
<dt><a href="#AudienceManagerCDCoreApi">AudienceManagerCDCoreApi</a></dt>
<dd><p>This class provides methods to call Adobe Audience Manager Customer Data APIs.
Before calling any method initialize the instance by calling the <code>init</code> method on it with valid values for orgId, apiKey and accessToken.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#init">init(orgId, apiKey, accessToken)</a> ⇒ <code><a href="#AudienceManagerCDCoreApi">Promise.&lt;AudienceManagerCDCoreApi&gt;</a></code></dt>
<dd><p>Returns a Promise that resolves with a new AudienceManagerCDCoreApi object.</p>
</dd>
</dl>

<a name="AudienceManagerCDCoreApi"></a>

## AudienceManagerCDCoreApi
This class provides methods to call Adobe Audience Manager Customer Data APIs.Before calling any method initialize the instance by calling the `init` method on it with valid values for orgId, apiKey and accessToken.

**Kind**: global class  

* [AudienceManagerCDCoreApi](#AudienceManagerCDCoreApi)
    * [.orgId](#AudienceManagerCDCoreApi+orgId) : <code>string</code>
    * [.apiKey](#AudienceManagerCDCoreApi+apiKey) : <code>string</code>
    * [.accessToken](#AudienceManagerCDCoreApi+accessToken) : <code>string</code>
    * [.init(orgId, apiKey, accessToken)](#AudienceManagerCDCoreApi+init) ⇒ [<code>Promise.&lt;AudienceManagerCDCoreApi&gt;</code>](#AudienceManagerCDCoreApi)
    * [.updateStream(streamId, body)](#AudienceManagerCDCoreApi+updateStream)
    * [.updateProfile(dStreamId, [params], [body])](#AudienceManagerCDCoreApi+updateProfile)
    * [.getProfile(dataSourceId, id, [filter])](#AudienceManagerCDCoreApi+getProfile)

<a name="AudienceManagerCDCoreApi+orgId"></a>

### audienceManagerCDCoreApi.orgId : <code>string</code>
the organization id.

**Kind**: instance property of [<code>AudienceManagerCDCoreApi</code>](#AudienceManagerCDCoreApi)  
<a name="AudienceManagerCDCoreApi+apiKey"></a>

### audienceManagerCDCoreApi.apiKey : <code>string</code>
the API key for your integration.

**Kind**: instance property of [<code>AudienceManagerCDCoreApi</code>](#AudienceManagerCDCoreApi)  
<a name="AudienceManagerCDCoreApi+accessToken"></a>

### audienceManagerCDCoreApi.accessToken : <code>string</code>
the access token for your integration.

**Kind**: instance property of [<code>AudienceManagerCDCoreApi</code>](#AudienceManagerCDCoreApi)  
<a name="AudienceManagerCDCoreApi+init"></a>

### audienceManagerCDCoreApi.init(orgId, apiKey, accessToken) ⇒ [<code>Promise.&lt;AudienceManagerCDCoreApi&gt;</code>](#AudienceManagerCDCoreApi)
Initializes a AudienceManagerCDCoreApi object and returns it.

**Kind**: instance method of [<code>AudienceManagerCDCoreApi</code>](#AudienceManagerCDCoreApi)  
**Returns**: [<code>Promise.&lt;AudienceManagerCDCoreApi&gt;</code>](#AudienceManagerCDCoreApi) - AudienceManagerCDCoreApi object  

| Param | Type | Description |
| --- | --- | --- |
| orgId | <code>string</code> | the organization id |
| apiKey | <code>string</code> | the API key for your integration |
| accessToken | <code>string</code> | the access token for your integration |

<a name="AudienceManagerCDCoreApi+updateStream"></a>

### audienceManagerCDCoreApi.updateStream(streamId, body)
Data streaming: Allows multiple profile updates on the same call.Ingest profile updates related to a given data stream.

**Kind**: instance method of [<code>AudienceManagerCDCoreApi</code>](#AudienceManagerCDCoreApi)  

| Param | Type | Description |
| --- | --- | --- |
| streamId | <code>string</code> | the streamID is an alphanumeric identifier. |
| body | <code>string</code> | the POST body. |

<a name="AudienceManagerCDCoreApi+updateProfile"></a>

### audienceManagerCDCoreApi.updateProfile(dStreamId, [params], [body])
GET/POST a Data Collection:Update a single Audience Manager profile via a GET or POST request.If the `body` is left out the update is performed via a GET request using the `params` object.Otherwise, to enforce a POST request, please set the required parameters into the `body` object

**Kind**: instance method of [<code>AudienceManagerCDCoreApi</code>](#AudienceManagerCDCoreApi)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| dStreamId | <code>string</code> |  | the alphanumeric identifier for this stream. |
| [params] | <code>object</code> | <code>{}</code> | optional request parameters. |
| [params.dSid] | <code>Array</code> |  | unique ID for a trait or a segment. |
| [params.dTDpid] | <code>Array</code> |  | data source for trait evaluation. Only traits from this data source are evaluated. |
| [params.dUuid] | <code>string</code> |  | unique Audience Manager user ID. |
| [params.dMid] | <code>string</code> |  | specifies the Experience Cloud ID set and used by the Experience Cloud ID service. |
| [params.dCid] | <code>string</code> |  | contains a pair of data provider ID and data provider user ID separated by `%01`. |
| [params.dWs] | <code>string</code> |  | write Style indicator: how the provided signals and/or trait IDs act upon the given profile(s). |
| [params.dLocationId] | <code>Array</code> |  | one or more location id that correspond to the region where we've previously seen this user interacting with the adobe services. |
| [body] | <code>object</code> |  | optional request parameters, use this instead of `params` to enforce a POST request. |

<a name="AudienceManagerCDCoreApi+getProfile"></a>

### audienceManagerCDCoreApi.getProfile(dataSourceId, id, [filter])
Get Audience Manager profile:Returns aggregated information for a profile from all Audience Manager regions, including trait and segment qualification information.You can filter the requests by region to return qualification information from certain regions only.

**Kind**: instance method of [<code>AudienceManagerCDCoreApi</code>](#AudienceManagerCDCoreApi)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| dataSourceId | <code>string</code> |  | the unique identifier of the Audience Manager data source that this identity is part of. |
| id | <code>string</code> |  | {integer} profile viewer id. |
| [filter] | <code>Array</code> | <code>[]</code> | one or more location Ids, separated by comma, that correspond to the region(s) where profile information should be fetched from. |

<a name="init"></a>

## init(orgId, apiKey, accessToken) ⇒ [<code>Promise.&lt;AudienceManagerCDCoreApi&gt;</code>](#AudienceManagerCDCoreApi)
Returns a Promise that resolves with a new AudienceManagerCDCoreApi object.

**Kind**: global function  
**Returns**: [<code>Promise.&lt;AudienceManagerCDCoreApi&gt;</code>](#AudienceManagerCDCoreApi) - a Promise with a AudienceManagerCDCoreApi object.  

| Param | Type | Description |
| --- | --- | --- |
| orgId | <code>string</code> | the organization id. |
| apiKey | <code>string</code> | the API key for your integration. |
| accessToken | <code>string</code> | the access token for your integration. |

### Debug Logs

```bash
LOG_LEVEL=debug <your_call_here>
```

Prepend the `LOG_LEVEL` environment variable and `debug` value to the call that invokes your function, on the command line. This should output a lot of debug data for your SDK calls.

### Contributing

Contributions are welcome! Read the [Contributing Guide](./.github/CONTRIBUTING.md) for more information.

### Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
