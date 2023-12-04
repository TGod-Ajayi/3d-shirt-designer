export interface IButtonProps {
    type: 'filled' | 'outlined' | 'text'
    title: string
    onClick: () => void
    customStyles?: string
}