import { CRYPTO_SECRET_KEY } from 'src/utils/Constants'
import CryptoJS from 'crypto-js'

const cryptoLocalStorage = {
    setItem: (key: string, value: string) => {
        localStorage.setItem(key, CryptoJS.AES.encrypt(value, CRYPTO_SECRET_KEY))
        return 
    },
    getItem: (key: string) => {
        try {
            const text = localStorage.getItem(key)
            if (text) {
                const bytes = CryptoJS.AES.decrypt(text, CRYPTO_SECRET_KEY)
                const plaintext = bytes.toString(CryptoJS.enc.Utf8)
                return plaintext
            } else {
                return null
            }
        } catch (error) {
            localStorage.clear()
            return null
        }
    },
    removeItem: (key: string) => localStorage.removeItem(key)
}

export function getToken() {
    return cryptoLocalStorage.getItem('token')
}

export function setToken(token: string) {
    cryptoLocalStorage.setItem('token', token)
}

export function removeToken() {
    cryptoLocalStorage.removeItem('token')
    cryptoLocalStorage.removeItem('tenantCode')
    cryptoLocalStorage.removeItem('userinfo')
}

export function getTenantCode(): string {
    return cryptoLocalStorage.getItem('tenantCode') || ''
}

export function setTenantCode(tenantCode: string) {
    cryptoLocalStorage.setItem('tenantCode', tenantCode)
}

export function getUserinfo(): string {
    return cryptoLocalStorage.getItem('userinfo') || ''
}

export function setUserinfo(userinfo: string) {
    cryptoLocalStorage.setItem('userinfo', userinfo)
}