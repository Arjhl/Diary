const aesjs = require("aes-js");

const encrypt = (data: any, key: any) => {
  var textBytes = aesjs.utils.utf8.toBytes(JSON.stringify(data));
  var aesCtr = new aesjs.ModeOfOperation.ctr(key);
  var encryptedBytes = aesCtr.encrypt(textBytes);
  console.log("aes-js", encryptedBytes);

  var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes).toString();
  console.log(encryptedHex);
  return encryptedHex;
};

export default encrypt;
