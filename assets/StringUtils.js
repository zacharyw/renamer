export function insertAtIndex(base, string, index) {
  const stringArray = base.split('');
  stringArray.splice(index, 0, ...string.split(''));
  return stringArray.join('');
}

export function reverseString(string) {
  return [...string].reverse().join('');
}
