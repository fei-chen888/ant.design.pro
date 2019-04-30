import styles from './login.less'
import * as React from 'react'
import { FormComponentProps } from 'antd/lib/form'
import { Login } from 'src/components/Login'
import { AbstractPage, IAbstractPageProps } from 'src/components/Abstract/page'

interface IProps extends IAbstractPageProps, FormComponentProps {}
interface IState {}

/**
 * 登录页面
 */
interface IProps extends IAbstractPageProps, FormComponentProps {}
export default class LoginPage extends AbstractPage<IProps, IState> {
    render() {
      return <div className={styles.login}><Login/></div>
    }
}

