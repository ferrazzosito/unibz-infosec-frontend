// @ts-check

import { createDiffieHellman } from 'diffie-hellman/browser';
window.Buffer = window.Buffer || require("buffer").Buffer;

/**
 * Create a Diffie Hellman exchange generating a key pair with the specified bit-length.
 * The role parameter specifies whether the key agreement has to be generated from scratch (Alice)
 * or starting from the prime and generator received from the other side (Bob). In this latter
 * case the prime and generator buffers, otherwise ignored, are used. 
 *  
 * @param {string} role
 * @param {number} keyLength
 * @param {Buffer?} prime
 * @param {Buffer?} generator 
 */
const beginDiffieHellman = function(role, keyLength = 256, prime = null, generator = null) {
    let dh;
    switch (role) {
        case "alice":
            dh = createDiffieHellman(keyLength);
            break;
        case "bob":
            if (prime && generator) {
                dh = createDiffieHellman(prime, generator);
                break;
            }
        default:
            throw new Error("prime and generator have to be non-null for bob");
    }
    dh.generateKeys();
    return dh;
};

/**
 * Reconstruct a DH wrapper from stored key pair.
 * 
 * @param {Buffer} pub 
 * @param {Buffer} priv
 * @param {Buffer} n
 * @param {Buffer} g
 */
const reconstructDiffieHellman = function(pub, priv, n, g) {
    const dh = createDiffieHellman(n, g);
    dh.setPublicKey(pub);
    dh.setPrivateKey(priv);
    return dh;
};

const _beginDiffieHellman = beginDiffieHellman;
export { _beginDiffieHellman as beginDiffieHellman };
const _reconstructDiffieHellman = reconstructDiffieHellman;
export { _reconstructDiffieHellman as reconstructDiffieHellman };