import './login.less'
import * as React from 'react'
import { FormComponentProps } from 'antd/lib/form'
import { IreducersBase } from 'src/models/reducers'
import { Iuser } from 'src/models/user'
import { Login } from 'src/components/Login'
import { AbstractPage, IAbstractPageProps } from 'src/components/Abstract/page'

interface Iprops extends IAbstractPageProps, FormComponentProps, IreducersBase<Iuser> {}
interface Istate {}

/**
 * 登录页面
 */
export default class LoginPage extends AbstractPage<Iprops, Istate> {
    render() {
      return <Login/>
    }
}

