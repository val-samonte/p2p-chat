import { bs58 } from '@project-serum/anchor/dist/cjs/utils/bytes'
// https://bradyjoslin.com/blog/encryption-webcrypto/

const buff_to_base64 = (buff: any) =>
  btoa(String.fromCharCode.apply(null, buff))

const base64_to_buf = (b64: any) =>
  Uint8Array.from(atob(b64), (c) => c.charCodeAt(null as any))

const enc = new TextEncoder()
const dec = new TextDecoder()

const getPasswordKey = (password: string) =>
  window.crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, [
    'deriveKey',
  ])

const deriveKey = (passwordKey: any, salt: any, keyUsage: any[]) =>
  window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 250000,
      hash: 'SHA-256',
    },
    passwordKey,
    { name: 'AES-GCM', length: 256 },
    false,
    keyUsage,
  )

export async function hash(value: string) {
  const utf8 = enc.encode(value)
  const hashBuffer = await crypto.subtle.digest('SHA-256', utf8)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray
    .map((bytes) => bytes.toString(16).padStart(2, '0'))
    .join('')
  return hashHex
}

export async function encryptData(secretData: string, password: string) {
  try {
    const salt = window.crypto.getRandomValues(new Uint8Array(16))
    const iv = window.crypto.getRandomValues(new Uint8Array(12))
    const passwordKey = await getPasswordKey(password)
    const aesKey = await deriveKey(passwordKey, salt, ['encrypt'])
    const encryptedContent = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv,
      },
      aesKey,
      enc.encode(secretData),
    )

    const encryptedContentArr = new Uint8Array(encryptedContent)
    let buff = new Uint8Array(
      salt.byteLength + iv.byteLength + encryptedContentArr.byteLength,
    )
    buff.set(salt, 0)
    buff.set(iv, salt.byteLength)
    buff.set(encryptedContentArr, salt.byteLength + iv.byteLength)
    const base64Buff = buff_to_base64(buff)
    return base64Buff
  } catch (e) {
    console.log(`Error - ${e}`)
    return ''
  }
}

export async function decryptData(encryptedData: string, password: string) {
  try {
    const encryptedDataBuff = base64_to_buf(encryptedData)
    const salt = encryptedDataBuff.slice(0, 16)
    const iv = encryptedDataBuff.slice(16, 16 + 12)
    const data = encryptedDataBuff.slice(16 + 12)
    const passwordKey = await getPasswordKey(password)
    const aesKey = await deriveKey(passwordKey, salt, ['decrypt'])
    const decryptedContent = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv,
      },
      aesKey,
      data,
    )
    return dec.decode(decryptedContent)
  } catch (e) {
    console.log(`Error - ${e}`)
    return ''
  }
}

export function getRandom() {
  return bs58.encode(window.crypto.getRandomValues(new Uint8Array(8)))
}
