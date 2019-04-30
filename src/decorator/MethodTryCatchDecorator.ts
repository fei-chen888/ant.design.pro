/**
 * 方法执行错误捕捉装饰器,支持async方法
 * @param catchCallbackName 类中接收cath中回调方法名，回调参数error：Error
 * @returns Function() 返回PropertyDescriptor 
 */
export function methodTryCatchDecorator(catchCallbackName?: string ) {
    async function asyncFn(_this: any, displayName: string, methodName: string, fn: Function, prams: any) {
        try {
            await fn.apply(_this, prams)
        } catch (error) {
            const errorMessage = `${displayName}/${methodName}:${error.toString()}`
            if (catchCallbackName && _this[catchCallbackName]) {
                _this[catchCallbackName](error)
            }
            console.log(errorMessage)
        }
    }

    return (target: any, methodName: string, descriptor: any) => {
        const oldValue = descriptor.value
        descriptor.value = function() {
            const oldArguments = arguments
            const displayName = this.displayName
            asyncFn(this, displayName, methodName, oldValue, oldArguments)
        }
        return descriptor
    }
}