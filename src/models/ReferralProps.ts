export interface ReferralProps {
    _id?: string
    id: string | undefined
    user: string
    title: string
    text: string
    completed?: boolean
    createdAt: Date
    updatedAt: Date
    ticket: number
    notes?: string
}