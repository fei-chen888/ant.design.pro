/**
 * api baseURL
 */
export const BASEURL = 'https://msa-test-server.meizhidev.com'

/**
 * localStorage 数据加密密钥
 */
export const CRYPTO_SECRET_KEY = '3.1415926'

/**
 * 接口返回状态码
 */
export const REQUEST_STATUSCODE = {
    SUCCESS: {
        code: '20000',
        text: '请求成功'
    },
    UNAUTHORIZED: {
        code: '20401',
        text: '身份验证失败'
    }
}

/**
 * 分页页码大小（列表用）
 */
export const DEFAULT_PAGESIZE = 15

/**
 * 分页页码大小（小组件用）
 */
export const DEFAULT_PAGESIZE_SMALL = 10

/**
 * 后面管理首页地址
 */
export const ADMIN_HOME = '/admin/dashboard/workplace'

/**
 * 登录页页地址
 */
export const ADMIN_LOGIN = '/login'


/**
 * 订单状态
 */
export const ORDER_STATUS = {
    ORDER_WAIT_PAYMENT: {
        code: 'ORDER_WAIT_PAYMENT',
        text: '订单等待付款'
    },
    ORDER_PAYMENT_SUCCESS: {
        code: 'ORDER_PAYMENT_SUCCESS',
        text: '订单付款成功'
    },
    ORDER_SEND_OUT: {
        code: 'ORDER_SEND_OUT',
        text: '卖家已发货'
    },
    ORDER_RECEIVED_PRODUCT: {
        code: 'ORDER_RECEIVED_PRODUCT',
        text: '买家已收货'
    },
    ORDER_REFUND_PROCESS: {
        code: 'ORDER_REFUND_PROCESS',
        text: '订单退款中'
    },
    ORDER_REFUND_SUCESS: {
        code: 'ORDER_REFUND_SUCESS',
        text: '退款成功'
    },
    SERVE_ORDER_IN_SERVICE: {
        code: 'SERVE_ORDER_IN_SERVICE',
        text: '服务中'
    },
    SERVE_ORDER_CONFIRMED: {
        code: 'SERVE_ORDER_CONFIRMED',
        text: '护理师已确认'
    },
    ORDER_SUCCESS: {
        code: 'ORDER_SUCCESS',
        text: '订单交易成功'
    },
    ORDER_CANCELED: {
        code: 'ORDER_CANCELED',
        text: '订单已取消'
    },
    ORDER_CLOSED: {
        code: 'ORDER_CLOSED',
        text: '订单关闭'
    }
}

/**
 * 配送方式
 */
export const EXPRESS_TYPE = {
    NOEXPRESS: {
        code: 'NOEXPRESS',
        text: '-'
    },
    EXPRESS: {
        code: 'EXPRESS',
        text: '物流配送'
    },
    PICK_PRODUCT_YOURSELF: {
        code: 'PICK_PRODUCT_YOURSELF',
        text: '到店自取'
    }
}