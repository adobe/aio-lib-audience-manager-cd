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

/**
 * Reduce an Error to a string
 *
 * @private
 * @param {Error} error the Error object to reduce
 * @returns {string} string reduced from an Error
 */
function reduceError (error = {}) {
  const response = error.response
  if (response) {
    if (response.status && response.statusText && response.body) {
      return `${response.status} - ${response.statusText} (${JSON.stringify(response.body)})`
    }
  }

  return error
}

/**
 * A request interceptor that logs the request
 *
 * @private
 * @param {Request} req the request object
 * @param {string} accessToken the access token for your Adobe I/O Audience Manager Integration
 * @returns {Request} the request object
 */
function requestInterceptor (req, accessToken) {
  req.headers.Authorization = 'Bearer ' + accessToken
  req.headers['Content-Type'] = 'application/json'
  return req
}
module.exports = {
  requestInterceptor,
  reduceError
}
