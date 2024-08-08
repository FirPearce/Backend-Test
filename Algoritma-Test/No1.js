/*
Berikut ini merupakan cara Soal No 1
Reversed String function dengan perulangan

fungsi ini menerima input berupa string, kemudian mencari angka pada string
dengan menggunakan fungsi Number.parseInt(), membalikan string yang tidak berupa angka dengan perulangan
kemudian menggabungkan string yang sudah di reverse dan angka yang sudah dipisahkan sebelumnya.

contoh:
input: "NEGIE1"
output: "EIGEN1"

Untuk mencoba fungsi ini:
ubah nilai dari variabel [const text = "NEGIE1";]
jalankan kode pada terminal "node Algoritma-Test/No1.js"
*/
const reversedString = (text) => {
  let numberString = "";
  let reversedText = "";
  let resultText = "";
  const splittedText = text.split(" ").join("");
  for (let i = 0; i < splittedText.length; i++) {
    if (!Number.parseInt(splittedText[i])) {
      reversedText += splittedText[i];
    } else {
      numberString += splittedText[i];
    }
  }

  for (let i = reversedText.length - 1; i >= 0; i--) {
    resultText += reversedText[i];
  }
  // reversedText = reversedText.split("").reverse().join("");
  resultText += numberString;
  return resultText;
};

const text = "NEGIE1";
console.log(reversedString(text));
