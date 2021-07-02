var WS = function (index) {
    var ws = new WebSocket("ws://" + socket_url + ":8282");
    var _this = this;
    _this.index = index; // 用于标识重启的socket

    // 打开链接
    _this.open = function (callback) {
        ws.onopen = function () {
            // Web Socket 已连接上，使用 send() 方法发送数据
            console.log('socket 已连接');
            // alert('socket已连接, index:'+_this.index)
            if (typeof callback == 'function') {
                callback();
            }
            _this.onclose(callback);
            _this.onerror(callback);
        };
    }

    // 发送数据
    _this.send = function (msg) {
        // console.log('msg: ' + msg);
        ws.send(msg);
    }

    // 接收数据
    _this.get = function (callback) {
        ws.onmessage = function (evt) {
            // console.log('index' + _this.index + ' : ' + evt.data)
            var received_msg = evt.data;
            if (typeof callback == 'function') {
                if ($api.getStorage('userid')) {
                    callback(received_msg);
                }
            }
        };
    }
    // 关闭socket 
    _this.close = function () {
        ws.close();
    }
    // 监听到socket关闭了
    _this.onclose = function (callback) {
        ws.onclose = function () {
            console.log('监听到socket关闭了')
            // ws = new WebSocket("ws://" + socket_url + ":8282");
            // _this.open(callback)
            _send('socketclose', {
                index: _this.index
            });
        };
    }

    // 错误
    _this.onerror = function (callback) {
        ws.onerror = function (e) {
            console.log('socket发生错误');
            ws.close();
        }
    }

}