export const HTTP_STATUS = {
  // 成功
  SUCCESS: 0,
  // 错误
  ERROR: 1,
  // token 失效
  AUTHENTICATE: 80001,

  // 请求成功
  OK: 200,
  // 请求错误
  BAD_REQUEST: 400,
  // 未授权，请重新登录
  CLIENT_AUTH_ERROR: 401,
  // 拒绝访问
  FORBIDDEN: 403,
  // 请求出错
  NOT_FOUND: 404,
  // 请求超时
  REQUEST_TIMEDOUT: 408,
  // 服务器错误
  SERVER_ERROR: 500,
  // 网络错误
  BAD_GATEWAY: 502,
  // 服务不可用
  SERVICE_UNAVAILABLE: 503,
  // 网络超时
  GATEWAY_TIMEOUT: 504
};
