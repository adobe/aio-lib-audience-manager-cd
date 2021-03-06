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
![Node.js CI](https://github.com/adobe/aio-lib-audience-manager-cd/workflows/Node.js%20CI/badge.svg)
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

{{>main-index~}}
{{>all-docs~}}

### Debug Logs

```bash
LOG_LEVEL=debug <your_call_here>
```

Prepend the `LOG_LEVEL` environment variable and `debug` value to the call that invokes your function, on the command line. This should output a lot of debug data for your SDK calls.

### Contributing

Contributions are welcome! Read the [Contributing Guide](./.github/CONTRIBUTING.md) for more information.

### Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
