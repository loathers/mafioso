/**
 * handles combining a list of possible classnames into a string
 *  this is so you can have conditionals to show a classname
 * @example
 * combineClassnames((isFocused ? 'bg-aqua-base' : null), (isHidden ? 'hide' : null), 'mar-2')
 * // returns 'bg-aqua-base hide mar-2' if all variables are true or just 'mar-2'
 */
export default function combineClassnames(
  ...args: (string | undefined | null)[]
) {
  return args.filter((i) => !!i).join(" ");
}
