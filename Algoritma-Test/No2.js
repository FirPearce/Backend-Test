/*
Berikut ini merupakan cara soal No 2
Get Longest word function dengan menggunakan peruangan

fungsi ini menerima input berupa string, kemudian memisahkan kata dengan menggunakan fungsi split(" ")
kemudian mencari kata terpanjang dengan menggunakan perulangan, dan mengembalikan kata terpanjang dan jumlah hurufnya.

contoh:
input: "Saya sangat senang mengerjakan soal algoritma"
output: "mengerjakan 11"

Untuk mencoba fungsi ini:
ubah nilai dari variabel [const text = "Saya sangat senang mengerjakan soal algoritma";]
jalankan kode pada terminal "node Algoritma-Test/No2.js"
*/
const longSentence = (sentence) => {
  const words = sentence.split(" ");
  let maxWord = 0;
  let getWord = "";
  for (let i = 0; i < words.length; i++) {
    if (words[i].length > maxWord) {
      maxWord = words[i].length;
      getWord = words[i];
    }
  }
  return getWord + " " + maxWord;
};

const text = "Saya sangat senang mengerjakan soal algoritma";
console.log(longSentence(text));
