var webSocket = function () {
    var socketManager = api.require('socketManager');

    var _this = this;

    // 创建连接
    _this.create = function (port, callback) {
        socketManager.createSocket({
            host: base_url,
            port: port
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
            if (ret) {
                _this.sid = ret.sid;
                if (typeof callback == 'function') {
                    callback(ret);
                }
            }
        });
    }

    // 关闭连接
    _this.close = function () {
        socketManager.closeSocket({
            sid: _this.sid
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }

    // 发送数据
    _this.write = function (data, callback) {
        socketManager.write({
            sid: _this.sid,
            data: data
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
            if(ret && typeof callback == 'function'){
                callback(ret);
            }
        });
    }
}