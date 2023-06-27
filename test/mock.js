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

const BadRequest = {
  err: {
    throws: new Error('Bad Request')
  },
  message: 'Bad Request'

}
const UnauthorizedRequest = {
  err: {
    throws: new Error('Unauthorized')
  },
  message: 'Unauthorized'
}
const ForbiddenRequest = {
  err: {
    throws: new Error('Forbidden Request')
  },
  message: 'Forbidden Request'
}
const NotFound = {
  err: {
    throws: new Error('Not Found')
  },
  message: 'Not Found'
}
const InternalServerError = {
  err: {
    throws: new Error('Internal Server Error')
  },
  message: 'Internal Server Error'
}

const updateStreamReq = {
  streamId: 813,
  body: {
    sourceId: 999
  }
}
const updateStreamRes = {
  sourceId: 813
}
const updateProfileBodyReq = {
  dStreamId: 813,
  body: {
    sourceId: 999
  }
}
const updateProfileBodyRes = {
  sourceId: 813,
  dStreamId: 813
}
const updateProfileReq = {
  dStreamId: 813
}
const updateProfileRes = {
  sourceId: 813
}
const getProfileReq = {
  dataSourceId: 66722,
  id: 3517094
}
const getProfileRes = {
  dataSourceId: 66722,
  id: 3517094

}

const data = {
  updateStreamReq,
  updateStreamRes,
  updateProfileRes,
  updateProfileReq,
  updateProfileBodyRes,
  updateProfileBodyReq,
  getProfileReq,
  getProfileRes
}

module.exports = {
  data,
  errors: {
    Bad_Request: BadRequest,
    Unauthorized_Request: UnauthorizedRequest,
    Forbidden_Request: ForbiddenRequest,
    Not_Found: NotFound,
    Internal_Server_Error: InternalServerError
  }
}
