export const randomResource = (arr) => {
  const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return arr[randomInteger(0, arr.length-1)]
}