/**
 * handles combining a list of possible classnames into a string
 *  this is so you can have conditionals to show a classname
 * @example
 * combineClassnames((isFocused ? 'bg-aqua-base' : null), (isHidden ? 'hide' : null), 'mar-2')
 * // returns 'bg-aqua-base hide mar-2' if all variables are true or just 'mar-2'
 *
 * @param {...String | undefined | null} args - any number of arguments
 * @returns {String}
 */
export default function combineClassnames(...args) {
  return args.filter(Boolean).join(" ");
}
