const { sbox0, sbox1, sbox2, sbox3, parray } = require("./subkeys");

const N = 16;

function Blowfish() {
  this.S = [
    new Uint32Array(sbox0),
    new Uint32Array(sbox1),
    new Uint32Array(sbox2),
    new Uint32Array(sbox3)
  ];
  this.P = new Uint32Array(parray);
  this.data = new Uint8Array(8);
  this.key = [];
}

Blowfish.prototype = {
  initState: function () {
    this.S = [
      new Uint32Array(sbox0),
      new Uint32Array(sbox1),
      new Uint32Array(sbox2),
      new Uint32Array(sbox3)
    ];
    this.P = new Uint32Array(parray);
    this.data = new Uint8Array(8);
    this.key = [];
  },
  setDataFromArray: function (arr) {
    var len = arr.length > 8 ? 8 : arr.length;
    this.data = new Uint8Array(8);
    for (var i = 0; i < len; i++) {
      this.data[i] = (arr[i] & 0xff);
    }
  },
  setDataFromString: function (str) {
    var len = str.length > 8 ? 8 : str.length;
    this.data = new Uint8Array(8);
    for (var i = 0; i < len; i++) {
      this.data[i] = (str.charCodeAt(i) & 0xff);
    }
  },
  setDataFromHexString: function (str) {
    if (str.length != 16) {
      throw new Error("Expected length to be 8 bytes");
    }
    this.data = new Uint8Array(8);
    var j = 0;
    for (var i = 0; i < 16; i += 2) {
      //console.log(str.substr(i, 2));
      this.data[j] = (parseInt(str.substr(i, 2), 16) & 0xff);
      j++;
    }
  },
  setKeyFromArray: function (arr) {
    var len = arr.length > 8 ? 8 : arr.length;
    this.key = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      this.key[i] = (arr[i] & 0xff);
    }
  },
  setKeyFromString: function (str) {
    var len = str.length > 8 ? 8 : str.length;
    this.key = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      this.key[i] = (str.charCodeAt(i) & 0xff);
    }
  },
  setKeyFromHexString: function (str) {
    if (str.length % 2 > 0) {
      throw new Error("Expected length to be even");
    }
    //str length is even
    this.key = new Uint8Array(str.length / 2);
    var j = 0;
    for (var i = 0; i < str.length; i += 2) {
      //console.log(str.substr(i, 2));
      this.key[j] = (parseInt(str.substr(i, 2), 16) & 0xff);
      j++;
    }
  },
  F: function (x) {
    var a, b, c, d, y;
    d = x & 0xff;
    x = x >> 8;
    c = x & 0xff;
    x = x >> 8;
    b = x & 0xff;
    x = x >> 8;
    a = x & 0xff;

    y = (this.S[0][a] + this.S[1][b]) & 0xffffffff;
    y = y ^ this.S[2][c];
    y = (y + this.S[3][d]) & 0xffffffff;

    return y;
  },
  encryptHelper: function (xl, xr) {
    var Xl = xl;
    var Xr = xr;
    var temp;
    for (var i = 0; i < N; i++) {
      Xl = Xl ^ this.P[i];
      Xr = this.F(Xl) ^ Xr;
      temp = Xl;
      Xl = Xr;
      Xr = temp;
    }
    temp = Xl;
    Xl = Xr;
    Xr = temp;
    Xr = Xr ^ this.P[N];
    Xl = Xl ^ this.P[N + 1];

    return [Xl, Xr];
  },
  decryptHelper: function (xl, xr) {
    var Xl = xl;
    var Xr = xr;
    var temp;
    for (var i = N + 1; i > 1; i--) {
      Xl = Xl ^ this.P[i];
      Xr = this.F(Xl) ^ Xr;
      temp = Xl;
      Xl = Xr;
      Xr = temp;
    }
    temp = Xl;
    Xl = Xr;
    Xr = temp;
    Xr = Xr ^ this.P[1];
    Xl = Xl ^ this.P[0];

    return [Xl, Xr];
  },
  prepareState: function () {
    var j = 0;
    var data = 0;
    for (var i = 0; i < N + 2; i++) {
      data = 0;
      for (var k = 0; k < 4; k++) {
        data = (data << 8) | this.key[j];
        j = (j + 1) % this.key.length;
      }
      this.P[i] = this.P[i] ^ data;
    }

    var dataL = 0;
    var dataR = 0;

    for (var i = 0; i < N + 2; i += 2) {
      var result = this.encryptHelper(dataL, dataR);
      dataL = result[0];
      dataR = result[1];
      this.P[i] = dataL;
      this.P[i + 1] = dataR;
    }

    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 256; j += 2) {
        var result = this.encryptHelper(dataL, dataR);
        dataL = result[0];
        dataR = result[1];
        this.S[i][j] = dataL;
        this.S[i][j + 1] = dataR;
      }
    }
  },
  encrypt: function () {
    var dataL = 0,
      dataR = 0;
    for (var i = 0; i < 4; i++) {
      dataL = (dataL << 8) | this.data[i];
    }
    for (var i = 4; i < 8; i++) {
      dataR = (dataR << 8) | this.data[i];
    }
    var result = this.encryptHelper(dataL, dataR);
    for (var i = 0; i < 4; i++) {
      this.data[i] = (result[0] >> ((3 - i) * 8)) & 0xff;
    }
    for (var i = 0; i < 4; i++) {
      this.data[4 + i] = (result[1] >> ((3 - i) * 8)) & 0xff;
    }
  },
  decrypt: function () {
    var dataL = 0,
      dataR = 0;
    for (var i = 0; i < 4; i++) {
      dataL = (dataL << 8) | this.data[i];
    }
    for (var i = 4; i < 8; i++) {
      dataR = (dataR << 8) | this.data[i];
    }
    var result = this.decryptHelper(dataL, dataR);
    for (var i = 0; i < 4; i++) {
      this.data[i] = (result[0] >> ((3 - i) * 8)) & 0xff;
    }
    for (var i = 0; i < 4; i++) {
      this.data[4 + i] = (result[1] >> ((3 - i) * 8)) & 0xff;
    }
  },
  getDataAsHexString: function () {
    var output = "";
    for (var i = 0; i < 8; i++) {
      output += this.data[i].toString(16).padStart(2, "0");
    }
    return output;
  },
  getDataAsString: function () {
    var output = "";
    for (var i = 0; i < 8; i++) {
      output += String.fromCharCode(this.data[i]);
    }
    return output;
  },
  getDataAsUint8Array: function () {
    var output = new Uint8Array(8);
    for (var i = 0; i < 8; i++) {
      output[i] = this.data[i];
    }
    return output;
  }
};

module.exports = Blowfish;