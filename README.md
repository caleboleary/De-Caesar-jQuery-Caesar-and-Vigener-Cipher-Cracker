# De-Caesar-jQuery-Caesar-and-Vigener-Cipher-Cracker
This uses JavaScript and jQuery to encode, decode, and attempt to crack Caesar and Vigenere Ciphers. Just a fun personal project, I have many ideas on how to improve the Vigenere cracker and how to incorporate additional ciphers to the program. 

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
//return - string - of best guess based on freq analysis compared to english


function enVigenere(str,key) {
//input str - string - to be encoded
//input shift - string - to shift by
//return - string - encoded string


function deVigenere(str,key)
//input str - string - to be decoded
//input shift - string - to shift by
//return - string - decoded string


function keyLenVigenere(str,keyLen)
//input str - string - to be cracked
//input keyLen - integer - length of key (no spaces or spec char) 
//return - string - best guess at the key based on freq analysis


function crackVigenere(str) 
//input str - string - to be cracked
//return - array of integers - guesses at keylength arranged lowest to highest, to be used with @keyLenVigenere (loop through results of crackVigenere and perform keyLenVigenere on desired number of them)


function frequencyAnalyze(arr)
//input arr - array of strings - to be analyzed
//return - array of floats - ordered the same as input array, lower numbers are closer to english


function wordMatchr(str)
//input str - string - to look for words
//return - integer - number of words matched in string

