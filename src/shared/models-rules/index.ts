import { AppRequest } from '../models';

/**
 * @param {AppRequest} request
 * @returns {string}
 */
export function getUserIdFromRequest(request: AppRequest): string {
  return '20e3ac50-cbee-4983-9d60-556bb6d08eff'
  // return request.user && request.user.id;
}
