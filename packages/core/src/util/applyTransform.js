/* @flow */

import type { TransformCall } from '../types';

const resolveTransform = require('./resolveTransform');

/**
 * Applies a transform to generated content
 */
module.exports = async function applyTransform(
  content: string,
  [transform, options]: TransformCall,
  comment: string
): Promise<string> {
  return (await resolveTransform(transform))(content, options, comment);
};
