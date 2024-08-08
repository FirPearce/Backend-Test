/*
Berikut ini merupakan cara alternatif No 1
Reversed String function Menggunakan Regular Expression (Regex)

fungsi ini menerima input berupa string, kemudian memisahkan antara huruf dan angka
kemudian mengembalikan string yang sudah di reverse dan digabungkan dengan angka diakhir.

contoh:
input: "NEGIE1"
output: "EIGEN1"

Untuk mencoba fungsi ini:
ubah nilai dari variabel [const text = "NEGIE1";]
jalankan kode pada terminal "node Algoritma-Test/No1-Alternatif.js"
*/
const reversedString = (text) => {
  text = text.split(" ").join("");
  const numberString = text.match(/\d/g).join("");
  const textString = text
    .match(/[a-zA-Z]/g)
    .join("")
    .split("")
    .reverse()
    .join("");
  return textString + numberString;
};

const text = "NEGIE1";
console.log(reversedString(text));
