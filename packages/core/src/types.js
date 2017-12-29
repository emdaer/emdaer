/* @flow */
/* eslint-disable no-use-before-define */

/**
 * A plugin for emdaer
 *
 * @param    {*}               options Whatever input a plugin should need
 * @returns  {Promise<string>}         Generated content
 */
export type Plugin = (options: *) => Promise<string>;

/**
 * A transform for emdaer
 *
 * @param    {string}          content The contents of the file
 * @param    {*}               options Whatever input a transform should need
 * @param    {string}          comment The comment describing the call
 * @returns  {Promise<string>}         Transformed content
 */
export type Transform = (
  content: string,
  options: *,
  comment: string
) => Promise<string>;

/**
 * A description of a plugin to call and which options to call it with
 *
 * @property {string} plugin  The plugin to invoke. Looks for installed modules named emdaer-plugin-<plugin>
 * @property {*}      options The options to call the plugin with
 */
export type PluginCall = [string, *];

/**
 * A description of a transform to call and which options to call it with
 *
 * @property {string} plugin  The transform to invoke. Looks for installed modules named emdaer-transform-<transform>
 * @property {*}      options The options to call the transform with
 */
export type TransformCall = [string, *];
