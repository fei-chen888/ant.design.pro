import styles from './Analysis.less'
import * as React from 'react'
import { FormComponentProps } from 'antd/lib/form'
import { IAbstractPageProps, AbstractPage } from 'src/components/Abstract/AbstractPage'

interface IProps extends IAbstractPageProps, FormComponentProps {}

interface IState {}

/**
 * 数据分析
 */
interface IProps extends IAbstractPageProps, FormComponentProps {}
export default class AnalysisPage extends AbstractPage<IProps, IState> {
    
    displayName = 'analysisPage'

    state: IState = {}

    getRenderContent() {
        return <div className={styles.analysisPage}>{this.displayName}</div>
    }
}

