export interface IreducersBase<T> {
    dispatch?: (action: IreducerAction<T>) => void
}
export interface IreducerAction<T> {
    type: string
    data?: T
}