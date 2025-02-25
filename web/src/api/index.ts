import axios, { AxiosError } from "axios"

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL

class TempCookie {
    private accessToken: string | null

    constructor() {
        this.accessToken = null
        this.loadToken() // ✅ 새로고침할 때 localStorage에서 토큰 불러오기
    }

    setToken(token: string) {
        this.accessToken = token.startsWith("Bearer ") ? token.slice(7) : token
        localStorage.setItem("accessToken", this.accessToken) // ✅ localStorage에 저장
    }

    getToken() {
        if (!this.accessToken) {
            this.loadToken()
        }
        return this.accessToken ? `Bearer ${this.accessToken}` : null
    }

    isNull() {
        return !this.getToken()
    }

    loadToken() {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("accessToken")
            this.accessToken = storedToken || null
        }
    }

    clearToken() {
        this.accessToken = null
        localStorage.removeItem("accessToken") // ✅ 로그아웃 시 localStorage에서 삭제
    }
}

export const tempCookie: TempCookie = new TempCookie()

export const instance = axios.create({
    baseURL: BASEURL,
    timeout: 10000,
})

instance.interceptors.request.use(
    (config) => {
        if (typeof window != "undefined") {
            const accessToken = tempCookie.getToken()
            console.log("현재 토큰 :", tempCookie.getToken())
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`
            }
        }
        return config
    },
    (error: AxiosError) => Promise.reject(error)
)
