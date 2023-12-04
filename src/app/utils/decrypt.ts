const aesjs = require("aes-js");

const decrypt = (value: any, key: number[]) => {
  console.log(value, key);
  var encryptedBytes = aesjs.utils.hex.toBytes(value ? value : "");

  var aesCtr = new aesjs.ModeOfOperation.ctr(key);
  var decryptedBytes = aesCtr.decrypt(encryptedBytes);

  // Convert our bytes back into text
  var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
  console.log(JSON.parse(decryptedText));
  return JSON.parse(decryptedText);
};

export default decrypt;
