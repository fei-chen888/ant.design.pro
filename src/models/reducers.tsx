export interface IReducersBase<T> {
    dispatch?: (action: IReducerAction<T>) => void
}
export interface IReducerAction<T> {
    type: string
    data?: T
}