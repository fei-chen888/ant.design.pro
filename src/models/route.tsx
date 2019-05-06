export interface IRouteItem {
    title: string
    path: string
    to?: string
    component?: any
    children?: Array<IRouteItem>
    showMenu?: boolean
    menuIcon?: string
    remark: string
}

export interface IExRouteItem extends IRouteItem {
    root?: string
    parent?: string
}