/**
 * JWT Middleware Modules
 * @module AiEndpointFunction
 */

import axios from 'axios'

/**
 * Fungsi ini digunakan untuk melakukan request ke Ai node 
 * untuk mendeteksi input yang diberikan text spam ataupun tidak
 * @param {string} text 
 * @returns {boolean}
 */
async function predictTextIsSpam(text) {
  if (typeof (text) != 'string') {
    throw new Error("Tipe data untuk prediksi spam haruslah string")
  }
  try {
    // Need to add "http://" if you want to call external address
    let res = await axios.post(`http://${process.env.AI_ENDPOINT}/`, {
      "text": text
    })
    if (res.status != 200) {
      throw new Error("Gagal dalam fetch api")
    }
    return res.data.is_spam
  } catch (e) {
    console.log(e)
    throw new Error("Gagal dalam fetch api")
  }
}

export { predictTextIsSpam }