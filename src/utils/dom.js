'use scrict';

/**
 * Selects an HTML Element
 * @param {string} query Element selector
 * @param {boolean} all Specifies if it should returns all the elements that satisfies the query
 * @returns HTML Element
 */
export const elementSelector = (query, all = false) => all
    ? document.querySelectorAll(query)
    : document.querySelector(query);

/**
 * Adds an event listener to a dom element
 * @param {HTML} element
 * @param {string} type
 * @param {func} handler
 */
export const addEventListener = (element, type, handler) => element.addEventListener(type, handler);
