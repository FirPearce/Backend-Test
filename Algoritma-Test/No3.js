const CountWords = (input, query) => {
  const result = [];
  for (let i = 0; i < query.length; i++) {
    let countTemp = 0;
    for (let j = 0; j < input.length; j++) {
      if (query[i] === input[j]) {
        countTemp++;
      }
    }
    result.push(countTemp);
  }
  return result;
};

const INPUT = ["xc", "dz", "bbb", "dz"];
const QUERY = ["bbb", "ac", "dz"];

console.log(CountWords(INPUT, QUERY)); // Output: "Hello World!"
