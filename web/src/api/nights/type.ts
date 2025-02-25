// interface.ts

// 수면일지에 관련된 인터페이스
export interface NightLog {
    title: string
    content: string
    date: string
    sleep: string // "HH:MM:SS"
    wake: string // "HH:MM:SS"
}

// 수면일지 조회에 필요한 데이터 타입
export interface SleepLog {
    nightid: number
    title: string
    content: string
    date: string
    sleep: string
    wake: string
    created_at: string // 수면일지 작성 시간
}

// 수면 통계에 관련된 데이터 타입
export interface SleepStatistics {
    user_id: number
    name: string
    sleep_count: number
    avg_sleep_hours: number
}
