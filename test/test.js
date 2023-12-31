const blowfish = require("../src/index.js");

var a = new blowfish();
a.initState();
a.setKeyFromHexString("aabbccddddccbbaa00");
a.prepareState();
//a.setData([0,0,0,0,0,0,0,0]);
//a.setKey([0,0,0,0,0,0,0,0]);
a.setDataFromHexString("aabbccddaabbccdd");
a.encrypt();
console.log(a.getDataAsHexString());
a.decrypt();
console.log(a.getDataAsHexString());
console.log(a.getDataAsString());
console.log(a.getDataAsUint8Array());
a.setDataFromHexString("beefdeadbeefdead");
a.encrypt();
console.log(a.getDataAsHexString());
a.decrypt();
console.log(a.getDataAsHexString());
console.log(a.getDataAsString());
console.log(a.getDataAsUint8Array());

a.initState();
a.setKeyFromString("abcdefgh");
a.prepareState();
a.setDataFromString("abcdefgh");
a.encrypt();
console.log(a.getDataAsHexString());
a.decrypt();
console.log(a.getDataAsString());

a.initState();
a.setKeyFromString("abcdefgh");
a.prepareState();
a.setDataFromHexString("90cbd763ed79cf23");
a.decrypt();
console.log(a.getDataAsString());

a.initState();
a.setKeyFromString("abcdefgh");
a.prepareState();
a.setDataFromHexString("90cbd763ed79cf23");
a.decrypt();
console.log(a.getDataAsString());
a.setDataFromString("123");
a.encrypt();
console.log(a.getDataAsHexString());
a.decrypt();
console.log(a.getDataAsHexString());
