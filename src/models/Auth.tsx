/**
 * 登录返回数据接口
 */
export interface IAuthLogin {
    afterUri: string
    staffTenants: string
    token: string
}

/**
 * 获取登陆用户信息
 */
export interface IAuthinfo {
    user: IAuthinfoUser | undefined
}

export interface IAuthinfoUser {
    firstName: string
    fullName: string
    gender: string
    icon: string
    id: number
    lastName: string
    mobile: string
    nickName: string
    username: string
    userAuth: IUserAuth
    stores: Array<IUserStore>
}

export interface IUserAuth {
    storeName: string
    storeId: number
    storeCode: string
    buttonList: Array<string>
    menuList: Array<string>
}

export interface IUserStore {
    id: number
    storeCode: string
    storeName: string
}

/**
 * 用户拥有的租户
 */
export interface IStaffTenant {
    id: number
    icon: string
    tenantCode: string
    tenantName: string
}