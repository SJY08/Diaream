export interface Login {
    id: string
    password: string
}

export interface Signup {
    id: string
    name: string
    password: string
}

export interface User {
    id: string
    name: string
    password: string
    days_since_signup: number
}
