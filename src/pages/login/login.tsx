import styles from './Login.less'
import * as React from 'react'
import { FormComponentProps } from 'antd/lib/form'
import { IAbstractPageProps, AbstractPage } from 'src/components/Abstract/AbstractPage'
import { Login } from 'src/components/Login/Login'

interface IProps extends IAbstractPageProps, FormComponentProps {}
interface IState {}

/**
 * 登录页面
 */
interface IProps extends IAbstractPageProps, FormComponentProps {}
export default class LoginPage extends AbstractPage<IProps, IState> {
    displayName = 'LoginPage'

    getRenderContent() {
        return (
          <div className={styles.login}><Login/></div>
        )
    }
}

