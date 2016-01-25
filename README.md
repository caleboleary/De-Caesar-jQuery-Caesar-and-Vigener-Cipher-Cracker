# DeCaesar-DeVigenere-JavaScript-Cracker
This uses JavaScript to encode, decode, and attempt to crack Caesar and Vigenere Ciphers. Just a fun personal project, I recently added Index of Coincidence detection to the vigenere cracking, making it much more efficient

Function list:

function enCaesar(str,shift) 
//input str - string - to be encoded
//input shift - integer - to shift by
//return - encoded string

function deCaesar(str,shift)
//input str - string - to be decoded
//input shift - integer - to shift by
//return - string - decoded string

function crackCaesar(str) 
//input str - string - to be cracked
//return - integer - of best guess for shift (to run through deCaesar) based on English frequency analysis

function enVigenere(str,key) {
//input str - string - to be encoded
//input shift - string - to shift by
//return - string - encoded string

function deVigenere(str,key)
//input str - string - to be decoded
//input shift - string - to shift by
//return - string - decoded string

function getIC(str)
//input str - string - to be analyzed
//return - float - index of coincidence for this string. (gibberish and vigenere enciphered code is about .04, english is about .067)

function keyLenVigenere(str,keyLen)
//input str - string - to be cracked
//input keyLen - integer - length of key (no spaces or spec char) 
//return - array - [best guess at the key based on freq analysis, index of coincidence]

function wordMatchr(str)
//input str - string - to look for words
//return - integer - number of words matched in string

function crackVigenere(str) 
//input str - string - to be cracked
//return - array of objects - cointaining guesses based on observed repetition lengths run through @keyLenVigenere and then added if index of coincidence is greater than 6 (avg english is ~6.7)
