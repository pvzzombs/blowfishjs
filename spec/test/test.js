const Blowfish = require("../../src/index");

describe("Blowfish initialization", function () {
  var b;
  beforeEach(function () {
    b = new Blowfish();
  });
  it("must set the initial data to zeroes", function () {
    b.initState();
    expect(b.getDataAsHexString()).toBe("0000000000000000");
  });
});

describe("Blowfish data setup", function() {
  var b;
  beforeEach(function(){
    b = new Blowfish();
  });
  it("must set data correctly from an array", function() {
    var arr = [255, 255, 255, 255, 255, 255, 255, 255];
    b.initState();
    b.setDataFromArray(arr);
    expect(b.getDataAsHexString()).toBe("ffffffffffffffff");
  });
  it("must set data correctly from a string", function() {
    var str = "abcdefgh";
    b.initState();
    b.setDataFromString(str);
    expect(b.getDataAsString()).toBe(str);
  });
  it("must obtain data correctly to an array", function() {
    b.initState();
    b.setDataFromString("qwertyui");
    expect(b.getDataAsUint8Array()).toEqual(new Uint8Array([113, 119, 101, 114, 116, 121, 117, 105]));
  });
  it("must set data correctly from a hexadecimal string", function() {
    var hexStr = "beefbeefbeefbeef";
    b.initState();
    b.setDataFromHexString(hexStr);
    expect(b.getDataAsHexString()).toBe(hexStr);
  });
  it("must throw error if hexadecimal string is less than 8 bytes", function() {
    b.initState();
    expect(function(){ b.setDataFromHexString("ff") }).toThrow();
  });
});

describe("Blowfish encryption", function () {
  // From: https://www.schneier.com/wp-content/uploads/2015/12/vectors-2.txt
  var b = new Blowfish();
  var testCases = 5;
  var keyBytes = ["0000000000000000", "FFFFFFFFFFFFFFFF", "3000000000000000", "1111111111111111", "0123456789ABCDEF"];
  var clearBytes = ["0000000000000000", "FFFFFFFFFFFFFFFF", "1000000000000001", "1111111111111111", "1111111111111111"];
  var cipherBytes = ["4EF997456198DD78", "51866FD5B85ECB8A", "7D856F9A613063F2", "2466DD878B963C9D", "61F9C3802281B096"];
  function generateTestName(num) {
    return "must pass #" + (num + 1) + " encryption testcase";
  }
  function generateFunc(index) {
    return function() {
      b.initState();
      b.setKeyFromHexString(keyBytes[index]);
      b.prepareState();
      b.setDataFromHexString(clearBytes[index]);
      b.encrypt();
      expect(b.getDataAsHexString()).toBe(cipherBytes[index]);
    };
  }
  beforeAll(function() {
    for(var i = 0; i < testCases; i++) {
      keyBytes[i] = keyBytes[i].toLowerCase();
      clearBytes[i] = clearBytes[i].toLowerCase();
      cipherBytes[i] = cipherBytes[i].toLowerCase();
    }
  });
  for(var i = 0; i < testCases; i++) {
    it(generateTestName(i), generateFunc(i));
  }
});

describe("Blowfish decryption", function () {
  // From: https://www.schneier.com/wp-content/uploads/2015/12/vectors-2.txt
  var b = new Blowfish();
  var testCases = 5;
  var keyBytes = ["0000000000000000", "FFFFFFFFFFFFFFFF", "3000000000000000", "1111111111111111", "0123456789ABCDEF"];
  var clearBytes = ["0000000000000000", "FFFFFFFFFFFFFFFF", "1000000000000001", "1111111111111111", "1111111111111111"];
  var cipherBytes = ["4EF997456198DD78", "51866FD5B85ECB8A", "7D856F9A613063F2", "2466DD878B963C9D", "61F9C3802281B096"];
  function generateTestName(num) {
    return "must pass #" + (num + 1) + " decryption testcase";
  }
  function generateFunc(index) {
    return function() {
      b.initState();
      b.setKeyFromHexString(keyBytes[index]);
      b.prepareState();
      b.setDataFromHexString(cipherBytes[index]);
      b.decrypt();
      expect(b.getDataAsHexString()).toBe(clearBytes[index]);
    };
  }
  beforeAll(function() {
    for(var i = 0; i < testCases; i++) {
      keyBytes[i] = keyBytes[i].toLowerCase();
      clearBytes[i] = clearBytes[i].toLowerCase();
      cipherBytes[i] = cipherBytes[i].toLowerCase();
    }
  });
  for(var i = 0; i < testCases; i++) {
    it(generateTestName(i), generateFunc(i));
  }
});
