/**
 * Returns a Promise that resolves with a new AudienceManagerCDCoreApi object.
 *
 * @param {string} orgId the organization id.
 * @param {string} apiKey the API key for your integration.
 * @param {string} accessToken the access token for your integration.
 * @returns {Promise<AudienceManagerCDCoreApi>} a Promise with a AudienceManagerCDCoreApi object.
 */
declare function init(orgId: string, apiKey: string, accessToken: string): Promise<AudienceManagerCDCoreApi>;

/**
 * This class provides methods to call Adobe Audience Manager Customer Data APIs.
 * Before calling any method initialize the instance by calling the `init` method on it with valid values for orgId, apiKey and accessToken.
 *
 */
declare class AudienceManagerCDCoreApi {
    /**
     * Initializes a AudienceManagerCDCoreApi object and returns it.
     *
     * @param {string} orgId  the organization id
     * @param {string} apiKey the API key for your integration
     * @param {string} accessToken the access token for your integration
     * @returns {Promise<AudienceManagerCDCoreApi>} AudienceManagerCDCoreApi object
     */
    init(orgId: string, apiKey: string, accessToken: string): Promise<AudienceManagerCDCoreApi>;
    /**
     * the organization id.
     *
     * @type {string}
     */
    orgId: string;
    /**
     *the API key for your integration.
     *
     * @type {string}
     */
    apiKey: string;
    /**
     * the access token for your integration.
     *
     * @type {string}
     */
    accessToken: string;
    /**
     * Data streaming: Allows multiple profile updates on the same call.
     *
     * Ingest profile updates related to a given data stream.
     *
     * @param {string} streamId the streamID is an alphanumeric identifier.
     * @param {string} body the POST body.
     */
    updateStream(streamId: string, body: string): void;
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
    updateProfile(dStreamId: string, params?: {
        dSid?: any[];
        dTDpid?: any[];
        dUuid?: string;
        dMid?: string;
        dCid?: string;
        dWs?: string;
        dLocationId?: any[];
    }, body?: any): void;
    /** Get Audience Manager profile:
     * Returns aggregated information for a profile from all Audience Manager regions, including trait and segment qualification information.
     * You can filter the requests by region to return qualification information from certain regions only.
     *
     * @param {string} dataSourceId the unique identifier of the Audience Manager data source that this identity is part of.
     * @param {string} id {integer} profile viewer id.
     * @param {Array} [filter=[]] one or more location Ids, separated by comma, that correspond to the region(s) where profile information should be fetched from.
     */
    getProfile(dataSourceId: string, id: string, filter?: any[]): void;
}

