let webSocket = null

/**
 * 建立websocket连接
 * @param {string} url ws地址
 */
export const createSocket = url => {
  webSocket && webSocket.close()
  if (!webSocket) {
    console.log('websocket连接中...')
    webSocket = new WebSocket(url)
    webSocket.onopen = () => {
      console.log('连接成功')
    }
    webSocket.onmessage = onmessageWS
    // webSocket.onerror = () => { console.log('连接错误') }
    // webSocket.onclose = () => { webSocket.close() }
  } else {
    console.log('websocket已连接')
  }
}

/** 连接失败重连 */
// const onerrorWS = () => {
//   Socket.close()
//   clearInterval(setIntervalWesocketPush)
//   console.log('连接失败重连中')
//   if (Socket.readyState !== 3) {
//     Socket = null
//     createSocket()
//   }
// }

/** WS数据接收统一处理 */
const onmessageWS = e => {
  window.dispatchEvent(new CustomEvent('onmessageWS', {
    detail: {
      data: e.data
    }
  }))
}

// /**
//  * 发送数据但连接未建立时进行处理等待重发
//  * @param {any} message 需要发送的数据
//  */
// const connecting = message => {
//   setTimeout(() => {
//     if (Socket.readyState === 0) {
//       connecting(message)
//     } else {
//       Socket.send(JSON.stringify(message))
//     }
//   }, 1000)
// }

/**
 * 发送数据
 * @param {any} message 需要发送的数据
 */
export const sendWSPush = message => {
  if (webSocket !== null) {
    webSocket.send(message)
  }
}

/** 断开连接 **/
export const closeWS = () => {
  console.log('websocket断开连接..')
  if (webSocket !== null) {
    webSocket.onclose = () => {
      webSocket.close()
      console.log('websocket断开连接')
      webSocket = null
    }
  }
}

// export const sendPing = (time = 5000, ping = 'ping') => {
//   clearInterval(setIntervalWesocketPush)
//   Socket.send(ping)
//   setIntervalWesocketPush = setInterval(() => {
//     Socket.send(ping)
//   }, time)
// }
