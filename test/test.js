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
a.setKey("abcdefgh");
a.prepareState();
a.setData("abcdefgh");
a.encrypt();
console.log(a.getDataAsHexString());
a.decrypt();
console.log(a.getDataAsString());

