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

describe("Blowfish encryption", function () {
  var b = new Blowfish();
  it("must pass the 1st encryption test", function() {
    b.initState();
    b.setKeyFromHexString("0000000000000000");
    b.prepareState();
    b.setDataFromHexString("0000000000000000");
    b.encrypt();
    expect(b.getDataAsHexString().toLowerCase()).toBe("4EF997456198DD78".toLowerCase());
  });
  it("must pass the 2nd encryption test", function() {
    b.initState();
    b.setKeyFromHexString("FFFFFFFFFFFFFFFF");
    b.prepareState();
    b.setDataFromHexString("FFFFFFFFFFFFFFFF");
    b.encrypt();
    expect(b.getDataAsHexString().toLowerCase()).toBe("51866FD5B85ECB8A".toLowerCase());
  });
  it("must pass the 3rd encryption test", function() {
    b.initState();
    b.setKeyFromHexString("3000000000000000");
    b.prepareState();
    b.setDataFromHexString("1000000000000001");
    b.encrypt();
    expect(b.getDataAsHexString().toLowerCase()).toBe("7D856F9A613063F2".toLowerCase());
  });
  it("must pass the 4th encryption test", function() {
    b.initState();
    b.setKeyFromHexString("1111111111111111");
    b.prepareState();
    b.setDataFromHexString("1111111111111111");
    b.encrypt();
    expect(b.getDataAsHexString().toLowerCase()).toBe("2466DD878B963C9D".toLowerCase());
  });
  it("must pass the 5th encryption test", function() {
    b.initState();
    b.setKeyFromHexString("0123456789ABCDEF");
    b.prepareState();
    b.setDataFromHexString("1111111111111111");
    b.encrypt();
    expect(b.getDataAsHexString().toLowerCase()).toBe("61F9C3802281B096".toLowerCase());
  });
});

describe("Blowfish decryption", function () {
  var b = new Blowfish();
  it("must pass the 1st decryption test", function() {
    b.initState();
    b.setKeyFromHexString("0000000000000000");
    b.prepareState();
    b.setDataFromHexString("4EF997456198DD78");
    b.decrypt();
    expect(b.getDataAsHexString().toLowerCase()).toBe("0000000000000000".toLowerCase());
  });
  it("must pass the 2nd decryption test", function() {
    b.initState();
    b.setKeyFromHexString("FFFFFFFFFFFFFFFF");
    b.prepareState();
    b.setDataFromHexString("51866FD5B85ECB8A");
    b.decrypt();
    expect(b.getDataAsHexString().toLowerCase()).toBe("FFFFFFFFFFFFFFFF".toLowerCase());
  });
  it("must pass the 3rd decryption test", function() {
    b.initState();
    b.setKeyFromHexString("3000000000000000");
    b.prepareState();
    b.setDataFromHexString("7D856F9A613063F2");
    b.decrypt();
    expect(b.getDataAsHexString().toLowerCase()).toBe("1000000000000001".toLowerCase());
  });
  it("must pass the 4th decryption test", function() {
    b.initState();
    b.setKeyFromHexString("1111111111111111");
    b.prepareState();
    b.setDataFromHexString("2466DD878B963C9D");
    b.decrypt();
    expect(b.getDataAsHexString().toLowerCase()).toBe("1111111111111111".toLowerCase());
  });
  it("must pass the 5th decryption test", function() {
    b.initState();
    b.setKeyFromHexString("0123456789ABCDEF");
    b.prepareState();
    b.setDataFromHexString("61F9C3802281B096");
    b.decrypt();
    expect(b.getDataAsHexString().toLowerCase()).toBe("1111111111111111".toLowerCase());
  });
});