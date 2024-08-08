const diffMatrix = (Matrix) => {
  let sumNum1 = 0;
  let sumNum2 = 0;
  for (let i = 0; i < Matrix.length; i++) {
    sumNum1 += Matrix[i][i];
    sumNum2 += Matrix[i][Matrix.length - 1 - i];
  }
  return sumNum1 - sumNum2;
};

const Matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(diffMatrix(Matrix));
