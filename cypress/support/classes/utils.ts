import Interfaces from '@interfaces';

export default class Utils {
	/**
     * Helper function to intercept network requests and label them with aliases
     * @param {Interfaces.InterceptParams} params.endpoint - The endpoint to intercept
     * @param {Interfaces.InterceptParams} params.alias - The alias to name the route as
     * @returns {void} void
     * @example
     *    utils.intercept({
     *        endpoint: '/api/login',
     *        alias: 'auth'
     *    });
     */
	intercept(params: Interfaces.InterceptParams): void {
		cy
			.intercept(params.endpoint)
			.as(params.alias);
	}
}