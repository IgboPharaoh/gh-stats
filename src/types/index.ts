export type Contributions = Record<string, Record<string, Array<string>>>

export type GridSet = {
    month: string
    boxes: Array<{ day: number; is_active: boolean }>
    is_active: boolean
}[]

export type Contribution = {
    is_active: boolean
    desc: string
    day: number
    date: string
    activity: string[]
}