/*
Berikut ini merupakan cara Alternatif No 2
Get Longest word function tanpa menggunakan perulangan dengan menggunakan fungsi map dan find pada array

fungsi ini menerima input berupa string, kemudian memisahkan kata dengan menggunakan fungsi split(" ") mengubah kata menjadi array
kemudian mencari panjang kata dengan operator spread dan fungsi max untuk mencari kata terpanjang,
dan mencari kata tersebut dengan fungsi find pada array, dan mengembalikan kata terpanjang dan jumlah hurufnya.

contoh:
input: "Saya sangat senang mengerjakan soal algoritma"
output: "mengerjakan 11"

Untuk mencoba fungsi ini:
ubah nilai dari variabel [const text = "Saya sangat senang mengerjakan soal algoritma";]
jalankan kode pada terminal "node Algoritma-Test/No2.js"
*/
const longSentence = (sentence) => {
  sentence = sentence.split(" ");
  const maxWords = Math.max(...sentence.map((word) => word.length));
  const getWords = sentence.find((word) => word.length === maxWords);
  return getWords + " " + maxWords;
};

const sentence = "Saya sangat senang mengerjakan soal algoritma";
console.log(longSentence(sentence));
