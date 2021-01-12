/**
 * Return node(s) with the given data-test attribute
 * @param {ShallowWrapper} wrapper - shallow wrapper
 * @param {string} val - value of attribute
 * @returns {ShallowWrapper} - found node(s)
 */

export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};
