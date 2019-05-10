export interface INotice {
    type: 'success' | 'warning' | 'error' | 'info'
    message: string | React.ReactNode
    description: string | React.ReactNode
    onClose?: () => void
}