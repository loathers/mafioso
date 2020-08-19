/**
 * generates a hash based on string
 * https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
 *
 * @param {String} str
 * @return {String}
 */
export function hashCode(str) {
  if (!str || str.length <= 0) {
    return 0;
  }

  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i);
    hash = ((hash<<5)-hash)+char;
    hash = hash & hash; // Convert to 32bit integer
  }

  return hash;
}