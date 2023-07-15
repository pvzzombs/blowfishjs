# Documentation
## API is currently unstable

## Initialization
### `.initState()`
Reset the current state (data, key, pbox, sbox)

## Setting the key
### `.setKeyFromArray(arr)`
Set key from a given array `arr` (or Uint8Array)

### `.setKeyFromString(str)`
Set key from a given string `str`

### `.setKeyFromHexString(str)`
Set key from a given hexadecimal string `str`

## Preparing state
### `.prepareState()`
Mixes the key with pbox and sbox, required after setting the key

## Setting the message (data)
### `.setDataFromArray(arr)`
Set data from a given array `arr` (or Uint8Array)

### `.setDataFromString(str)`
Set data from a given string `str`

### `.setDataFromHexString(str)`
Set data from a given hexadecimal string `str`

## Encryption and decryption
### `.encrypt()`
Encrypts the data

### `.decrypt()`
Decrypts the data

## Output
### `.getDataAsHexString()`
Returns the data as a hexadecimal string

### `.getDataAsString()`
Returns the data as a string

### `.getDataAsUint8Array()`
Returns the data as a `Uint8Array` array

