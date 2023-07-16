## blowfishjs
N/A

## Table Of Contents
- [blowfishjs](#blowfishjs)
- [Table Of Contents](#table-of-contents)
- [Installation](#installation)
  - [Node](#node)
  - [Browser](#browser)
- [Usage](#usage)
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
1. **Initialization:** Use [initState()]() to reset the current state (data, key, pbox, sbox)
2. **Setting the key:** To set the key you can use either one of these:
    - [setKeyFromArray(arr)]()
    - [setKeyFromString(str)]()
    - [setKeyFromHexString(str)]()
3. **Preparing state:** Use [prepareState()]() to mix the key with pbox and sbox
4. **Setting the data:** Set the data with one of these:
    - [setDataFromArray(arr)]()
    - [setDataFromString(str)]()
    - [setDataFromHexString(str)]()
5. **Encryption and decryption:** Use [encrypt()]() to encrypt the data, [decrypt()]() to decrypt the data
6. **Output:** Get the output with either:
    - [getDataAsHexString()]()
    - [getDataAsString()]()
    - [getDataAsUint8Array()]()

## Documentation
Documentation of **blowfishjs** is available [here](docs/blowfishjs.md)

