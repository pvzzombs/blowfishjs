## blowfishjs
N/A

<!-- omit in toc -->
## Table Of Contents
- [blowfishjs](#blowfishjs)
- [Installation](#installation)
  - [Node](#node)
  - [Browser](#browser)
- [Usage](#usage)
  - [Example](#example)
- [Documentation](#documentation)

## Installation
### Node
1. Clone or download the repository
```
git clone https://github.com/pvzzombs/blowfishjs.git
cd blowfishjs
```
2. Run `npm install`
```
npm install
```
3. Install as a dev dependency (Inside another node project or npm package)  
```
npm install --save-dev path/to/blowfishjs
```
### Browser
1. Clone or download the repository
```
git clone https://github.com/pvzzombs/blowfishjs.git
cd blowfishjs
```
2. Run `npm install`
```
npm install
```
3. Run `npm run bundle`
```
npm run bundle
```
4. Run `npm run minify`
```
npm run minify
```
5. Grab and include blowfish.min.js from the `dist` folder into your project

## Usage
### Example
```
const Blowfish = require("blowfishjs"); //for Node (Not required in browser)
var a = new Blowfish();
a.initState();
a.setKeyFromString("abcdefgh");
a.prepareState();
a,setDataFromString("abcdefgh");
a.encrypt();
console.log(a.getDataAsHexString());
a.decrypt();
console.log(a.getDataAsString());
```
1. **Initialization:** Use [initState()](docs/Initialization/initState.md) to reset the current state (data, key, pbox, sbox)
2. **Setting the key:** To set the key you can use either one of these:
    - [setKeyFromArray(arr)](docs/Setters/setKeyFromArray.md)
    - [setKeyFromString(str)](docs/Setters/setKeyFromString.md)
    - [setKeyFromHexString(str)](docs/Setters/setKeyFromHexString.md)
3. **Preparing state:** Use [prepareState()]() to mix the key with pbox and sbox
4. **Setting the data:** Set the data with one of these:
    - [setKeyFromArray(arr)](docs/Setters/setKeyFromArray.md)
    - [setKeyFromString(str)](docs/Setters/setKeyFromString.md)
    - [setKeyFromHexString(str)](docs/Setters/setKeyFromHexString.md)
5. **Encryption and decryption:** Use [encrypt()](docs/Modifiers/encrypt.md) to encrypt the data, [decrypt()](docs/Modifiers/decrypt.md) to decrypt the data
6. **Output:** Get the output with either:
    - [getDataAsHexString()](docs/Getters/getDataAsHexString.md)
    - [getDataAsString()](docs/Getters/getDataAsString.md)
    - [getDataAsUint8Array()](docs/Getters/getDataAsUint8Array.md)

## Documentation
Documentation of **blowfishjs** is available [here](docs/blowfishjs.md)

