/* eslint-disable jsdoc/require-returns */
/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the 'License');
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
// const fetch = require('cross-fetch')
const Swagger = require('swagger-client')
const loggerNamespace = 'aio-lib-audience-manager-cd'
const logger = require('@adobe/aio-lib-core-logging')(loggerNamespace, {
  level: process.env.LOG_LEVEL
})
const {
  reduceError,
  requestInterceptor,
  responseInterceptor
} = require('./helpers')
const { codes } = require('./SDKErrors')
/**
 * Returns a Promise that resolves with a new AudienceManagerCDCoreApi object.
 *
 * @param {string} orgId the organization id.
 * @param {string} apiKey the API key for your integration.
 * @param {string} accessToken the access token for your integration.
 * @returns {Promise<AudienceManagerCDCoreApi>} a Promise with a AudienceManagerCDCoreApi object.
 */
function init (orgId, apiKey, accessToken) {
  return new Promise((resolve, reject) => {
    const clientWrapper = new AudienceManagerCDCoreApi()

    clientWrapper.init(orgId, apiKey, accessToken)
      .then(initializedSDK => {
        logger.debug('sdk initialized successfully')
        resolve(initializedSDK)
      })
      .catch(err => {
        logger.debug(`sdk init error: ${err}`)
        reject(err)
      })
  })
}

/**
 * This class provides methods to call Adobe Audience Manager Customer Data APIs.
 * Before calling any method initialize the instance by calling the `init` method on it with valid values for orgId, apiKey and accessToken.
 *
 */
class AudienceManagerCDCoreApi {
  /**
   * Initializes a AudienceManagerCDCoreApi object and returns it.
   *
   * @param {string} orgId  the organization id
   * @param {string} apiKey the API key for your integration
   * @param {string} accessToken the access token for your integration
   * @returns {Promise<AudienceManagerCDCoreApi>} AudienceManagerCDCoreApi object
   */
  async init (orgId, apiKey, accessToken) {
    const spec = require('../spec/api.json')
    const swagger = new Swagger({
      spec: spec,
      requestInterceptor: req => requestInterceptor(req, accessToken),
      responseInterceptor,
      usePromise: true
    })
    this.sdk = await swagger

    const initErrors = []
    if (!orgId) {
      initErrors.push('orgId')
    }
    if (!apiKey) {
      initErrors.push('apiKey')
    }
    if (!accessToken) {
      initErrors.push('accessToken')
    }

    if (initErrors.length) {
      const sdkDetails = { orgId, apiKey, accessToken }
      throw new codes.ERROR_SDK_INITIALIZATION({
        sdkDetails,
        messageValues: `${initErrors.join(', ')}`
      })
    }

    /**
     * the organization id.
     *
     * @type {string}
     */
    this.orgId = orgId

    /**
     *the API key for your integration.
     *
     * @type {string}
     */
    this.apiKey = apiKey

    /**
     * the access token for your integration.
     *
     * @type {string}
     */
    this.accessToken = accessToken

    return this
  }

  __requestBody (body) {
    return {
      requestBody: body
    }
  }

  /**
   * Data streaming: Allows multiple profile updates on the same call.
   *
   * Ingest profile updates related to a given data stream.
   *
   * @param {string} streamId the streamID is an alphanumeric identifier.
   * @param {string} body the POST body.
   */
  async updateStream (streamId, body) {
    var params = {}
    params.streamId = streamId
    params['x-gw-ims-org-id'] = this.orgId
    params['x-api-key'] = this.apiKey
    const sdkDetails = { streamId, body, orgId: this.orgId, apiKey: this.apiKey }

    try {
      const response = await this.sdk.apis.stream.post_stream__streamId_(params, this.__requestBody(body))
      return response
    } catch (err) {
      throw new codes.ERROR_UPDATE_STREAM({
        sdkDetails,
        messageValues: reduceError(err)
      })
    }
  }

  /**
   * GET/POST a Data Collection:
   * Update a single Audience Manager profile via a GET or POST request.
   * If the `body` is left out the update is performed via a GET request using the `params` object.
   * Otherwise, to enforce a POST request, please set the required parameters into the `body` object
   *
   * @param {string} dStreamId the alphanumeric identifier for this stream.
   * @param {object} [params={}] optional request parameters.
   * @param {Array} [params.dSid] unique ID for a trait or a segment.
   * @param {Array} [params.dTDpid] data source for trait evaluation. Only traits from this data source are evaluated.
   * @param {string} [params.dUuid] unique Audience Manager user ID.
   * @param {string} [params.dMid] specifies the Experience Cloud ID set and used by the Experience Cloud ID service.
   * @param {string} [params.dCid] contains a pair of data provider ID and data provider user ID separated by `%01`.
   * @param {string} [params.dWs] write Style indicator: how the provided signals and/or trait IDs act upon the given profile(s).
   * @param {Array} [params.dLocationId]   one or more location id that correspond to the region where we've previously seen this user interacting with the adobe services.
   * @param {object} [body] optional request parameters, use this instead of `params` to enforce a POST request.
   */
  async updateProfile (dStreamId, params = {}, body) {
    params.dStreamId = dStreamId
    params.d_orgId = this.orgId
    params['x-gw-ims-org-id'] = this.orgId
    params['x-api-key'] = this.apiKey
    const sdkDetails = { dStreamId, params, orgId: this.orgId, apiKey: this.apiKey }
    try {
      if (body) {
        const response = await this.sdk.apis.dataCollection.post_event_s2s__streamId_(params, this.__requestBody(body))
        return response
      }
      const response = await this.sdk.apis.dataCollection.get_event_s2s__streamId_(params)
      return response
    } catch (err) {
      throw new codes.ERROR_UPDATE_PROFILE({
        sdkDetails,
        messageValues: reduceError(err)
      })
    }
  }

  /** Get Audience Manager profile:
   * Returns aggregated information for a profile from all Audience Manager regions, including trait and segment qualification information.
   * You can filter the requests by region to return qualification information from certain regions only.
   *
   * @param {string} dataSourceId the unique identifier of the Audience Manager data source that this identity is part of.
   * @param {string} id {integer} profile viewer id.
   * @param {Array} [filter=[]] one or more location Ids, separated by comma, that correspond to the region(s) where profile information should be fetched from.
   */
  async getProfile (dataSourceId, id, filter = []) {
    const params = {}
    params.dataSourceId = dataSourceId
    params.id = id
    params['x-gw-ims-org-id'] = this.orgId
    params['x-api-key'] = this.apiKey
    const sdkDetails = { dataSourceId, id, orgId: this.orgId, apiKey: this.apiKey }

    try {
      const response = await this.sdk.apis.profileViewer.get_profile__dataSourceId___id_(params)
      return response
    } catch (err) {
      throw new codes.ERROR_GET_PROFILE({
        sdkDetails,
        messageValues: reduceError(err)
      })
    }
  }
}

module.exports = {
  init: init
}
