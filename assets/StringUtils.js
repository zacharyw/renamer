export function insertAtIndex(base, string, index) {
  const stringArray = base.split('');
  stringArray.splice(index, 0, ...string.split(''));
  return stringArray.join('');
}

export function reverseString(string) {
  return [...string].reverse().join('');
}

export function getFilenameArray(string) {
  return [...string].slice(0, string.lastIndexOf('.'));
}

export function getExtensionArray(string) {
  return [...string].slice(string.lastIndexOf('.'));
}
