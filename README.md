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

## Documentation
Documentation of **blowfishjs** is available [here](DOCS.md)

