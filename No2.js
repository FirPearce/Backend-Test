const sentence = "Ini Ibu Budi";
const words = sentence.split(" ");
const maxWords = Math.max(...words.map((word) => word.length));
const getWords = words.find((word) => word.length === maxWords);
console.log(getWords, maxWords);
