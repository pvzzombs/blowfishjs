### `.initState()`
Reset the internal state (data, key, pbox, sbox)
#### Example:
```
const Blowfish = require("blowfishjs");
var a = new Blowfish() //automatically resets the internal state
a.initState(); //Calling initState() resets the internal state
```
