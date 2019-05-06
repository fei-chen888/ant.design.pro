import styles from './Login.less'
import * as React from 'react'
import { FormComponentProps } from 'antd/lib/form'
import { IAbstractPageProps, AbstractPage } from 'src/components/Abstract/AbstractPage'
import { Login } from 'src/components/Login/Login'
import { Layout } from 'antd'

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
            <Layout className={`${styles.loginPage} global-layout`}>
                <Layout.Content className="global-layout-content"><Login/></Layout.Content>
                <Layout.Footer>
                    <div className="global-layout-footer-copyright">
                        Copyright 2019 蚂蚁金服体验技术部出品
                    </div>
                </Layout.Footer>
            </Layout>
        )
    }
}

