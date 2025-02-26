// ✅ 수면일지에 관련된 인터페이스
export interface NightLog {
    title: string
    content: string
    date: string // "YYYY-MM-DDTHH:MM:SS"
    sleep: string // "YYYY-MM-DDTHH:MM:SS"
    wake: string // "YYYY-MM-DDTHH:MM:SS"
}

// ✅ 수면일지 조회에 필요한 데이터 타입
export interface SleepLog {
    nightid: number
    title: string
    content: string
    date: string // "YYYY-MM-DDTHH:MM:SS"
    sleep: string
    wake: string
    sleep_duration: number
    created_at: string // "YYYY-MM-DDTHH:MM:SS"
}

// ✅ 수면 통계에 관련된 데이터 타입
export interface SleepStatistics {
    sleep_date: string // 날짜
    avg_sleep_hours: number // 해당 날짜의 평균 수면 시간
}
