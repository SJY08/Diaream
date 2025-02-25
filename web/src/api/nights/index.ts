import { NightLog, SleepLog, SleepStatistics } from "./type"
import { instance, tempCookie } from ".."
import { AxiosError } from "axios"

export default class NightService {
    // ✅ 수면일지 작성
    static async write(log: NightLog): Promise<number> {
        try {
            const response = await instance.post("/nights/write", log)
            return response.status
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                return error.response?.status ?? 500
            }
            return 500 // 서버 오류
        }
    }

    // ✅ 수면일지 조회
    static async get(): Promise<SleepLog[]> {
        try {
            const response = await instance.get("/nights/get")
            return response.data
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 403) {
                    tempCookie.clearToken()
                }
                console.error(
                    "조회 실패:",
                    error.response?.status,
                    error.message
                )
                return [] // 빈 배열로 반환
            }
            console.error("알 수 없는 오류:", error)
            return []
        }
    }

    // ✅ 수면일지 수정
    static async update(nightid: number, log: NightLog): Promise<number> {
        try {
            const response = await instance.put(
                `/nights/update/${nightid}`,
                log
            )
            return response.status
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                return error.response?.status ?? 500
            }
            return 500
        }
    }

    // ✅ 수면 통계 조회
    static async getStat(): Promise<SleepStatistics[]> {
        try {
            const response = await instance.get("/nights/statistics")
            return response.data
        } catch (error: unknown) {
            console.error("통계 조회 실패:", error)
            return []
        }
    }
}
