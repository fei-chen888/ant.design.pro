import styles from './Workplace.less'
import * as React from 'react'
import { FormComponentProps } from 'antd/lib/form'
import { IAbstractPageProps, AbstractPage } from 'src/components/Abstract/AbstractPage'

interface IProps extends IAbstractPageProps, FormComponentProps {}
interface IState {}

/**
 * 工作台
 */
interface IProps extends IAbstractPageProps, FormComponentProps {}
export default class WorkplacePage extends AbstractPage<IProps, IState> {
    displayName = 'WorkplacePage'

    getRenderContent() {
        return <div className={styles.workplacePage}>{this.displayName}</div>
    }
}

