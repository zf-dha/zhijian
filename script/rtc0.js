var RTC = function () {
    var _this = this;
    var tencentTRTC = api.require('tencentTRTC');

    // 进入
    _this.in = function (data, callback) {
        tencentTRTC.enterRoom({
            appId: '1400406552',
            userId: data.uid,
            roomId: data.room,
            userSig: data.sign,
            scene: 0,
        }, function (ret, err) {
            console.log(JSON.stringify(ret))
            console.log(JSON.stringify(err))
            if (typeof callback == 'function') {
                callback(ret)
            }

        });
    }

    // 退出
    _this.exit = function () {
        tencentTRTC.exitRoom({});
    }

    // 本地语音
    _this.myAudio = function () {
        tencentTRTC.startLocalAudio({});
    }
    // 关闭 本地语音
    _this.stopMyAudio = function () {
        tencentTRTC.stopLocalAudio({});
    }
    // 暂停/恢复推送本地的音频数据
    _this.muteMyAudio = function (mute) {
        tencentTRTC.muteLocalAudio({
            mute: mute // true:暂停，false:恢复
        });
    }
    // 暂停/恢复推送其他的音频数据
    _this.muteOtherAudio = function (uid, mute) {
        tencentTRTC.muteRemoteAudio({
            remoteUid: uid,
            mute: mute // true:暂停，false:恢复
        });
    }
    // 暂停/恢复推送所有其他的音频数据
    _this.muteAllOtherAudio = function (mute) {
        tencentTRTC.muteAllRemoteAudio({
            mute: mute // true:暂停，false:恢复
        });
    }
    // 本地画面
    _this.myView = function () {
        tencentTRTC.startLocalPreview({
            // 画面预览控件位置
            rect: {
                x: api.frameWidth/2, //数字类型，控件到屏幕左边框距离，默认：0
                y: 0, //数字类型，控件到屏幕上边框距离，默认：0
                w: api.frameWidth/2, //数字类型，控件宽，默认：300
                h: 300, //数字类型，控件高，默认：300
            },
            isFrontCamera: true, // 是否开启前置摄像头
            fixedOn: api.frameName,
            fixed: true,
        });
    }
    // 停止本地画面
    _this.stopMyView = function () {
        tencentTRTC.stopLocalPreview({});
    }

    // 暂停/恢复推送本地的视频数据
    _this.muteMyView = function (mute) {
        tencentTRTC.muteLocalVideo({
            mute: mute // true:暂停，false:恢复
        });
    }


    // 显示对方画面
    _this.otherView = function (uid, callback) {
        // 画面预览控件位置
        tencentTRTC.startRemoteView({
            // 画面预览控件位置
            rect: {
                x: 0, //数字类型，控件到屏幕左边框距离，默认：0
                y: 0, //数字类型，控件到屏幕上边框距离，默认：0
                w: api.frameWidth/2, //数字类型，控件宽，默认：300
                h: 300, //数字类型，控件高，默认：300
            },
            fixedOn: api.frameName,
            fixed: true,
            remoteUid: uid,
        });
    }
    // 停止对方画面
    _this.stopOtherView = function (uid) {
        tencentTRTC.stopRemoteView({
            remoteUid: uid,
        });
    }
    // 停止所有其他画面
    _this.stopAllOtherView = function () {
        tencentTRTC.stopAllRemoteView({});
    }

    // 暂停/恢复推送其他的视频数据
    _this.muteOtherView = function (uid, mute) {
        tencentTRTC.muteRemoteVideoStream({
            remoteUid: uid,
            mute: mute // true:暂停，false:恢复
        });
    }
    // 暂停/恢复推送所有其他的视频数据
    _this.muteAllOtherView = function (mute) {
        tencentTRTC.muteAllRemoteVideoStreams({
            mute: mute // true:暂停，false:恢复
        });
    }

    // 切换摄像头
    _this.switch = function () {
        tencentTRTC.switchCamera({});
    }
    // 旋转角度
    _this.rotate = function (r) {
        // 0：不旋转
        // 1：顺时针旋转90度
        // 2：顺时针旋转180度
        // 3：顺时针旋转270度
        tencentTRTC.setLocalViewRotation({
            rotation: r
        });
    }
    // 旋转角度
    _this.rotateOther = function (uid, r) {
        // 0：不旋转
        // 1：顺时针旋转90度
        // 2：顺时针旋转180度
        // 3：顺时针旋转270度
        tencentTRTC.setRemoteViewRotation({
            remoteUid: uid,
            rotation: r
        });
    }
    // 旋转角度
    _this.rotateOtherSee = function (r) {
        // 0：不旋转
        // 1：顺时针旋转90度
        // 2：顺时针旋转180度
        // 3：顺时针旋转270度
        tencentTRTC.setVideoEncoderRotation({
            rotation: r
        });
    }

    // 设置本地镜像
    _this.setMyMirror = function (type) {
        // 0：前置摄像头镜像，后置摄像头不开启镜像
        // 1：前置摄像头和后置摄像头都开启镜 
        // 2：前置摄像头和后置摄像头都不开启镜像
        tencentTRTC.setLocalViewMirror({
            type: type
        });
    }
    // 设置编码器输出的画面镜像模式
    _this.setServeMirror = function (mirror) {
        tencentTRTC.setVideoEncoderMirror({
            mirror: mirror
        });
    }

    // 视频截图
    _this.cut = function (uid, type, callback) {
        tencentTRTC.snapshotVideo({
            remoteUid: uid,
            streamType: type, // 0：摄像头画面 1：屏幕分享画面. ios: 0：主画面视频流 1：小画面视频流 2：辅流（屏幕分享）  
        }, function (ret) {
            if (ret && ret.status) {
                if (typeof callback == 'function') {
                    callback(ret.imgPath)
                }
            }
        });
    }

    // 设置 SDK 采集音量
    _this.setSdkVoice = function (v) {
        tencentTRTC.setAudioCaptureVolume({
            volume: v
        });
    }
    // 获取 SDK 采集音量
    _this.getSdkVoice = function (callback) {
        tencentTRTC.getAudioCaptureVolume({}, function (ret) {
            if (ret && ret.status) {
                if (typeof callback == 'function') {
                    callback(ret.volume)
                }
            }
        });
    }
    // 设置 SDK 播放音量
    _this.setSdkPlayV = function (v) {
        tencentTRTC.setAudioPlayoutVolume({
            volume: v
        });
    }
    // 获取 SDK 播放音量
    _this.setSdkPlayV = function (callback) {
        tencentTRTC.getAudioPlayoutVolume({}, function (ret) {
            if (ret && ret.status) {
                if (typeof callback == 'function') {
                    callback(ret.volume)
                }
            }
        });
    }
    // 开启耳返
    _this.setEar = function (enable) {
        tencentTRTC.enableAudioEarMonitoring({
            enable: enable
        });
    }

    // 查询是否支持开启闪光灯
    _this.checkLinght = function (callback) {
        tencentTRTC.isCameraTorchSupported({}, function (ret, err) {
            if (ret && ret.status) {
                if (typeof callback == 'function') {
                    callback(ret.enable)
                }
            }
        });
    }
    // 开关闪光灯
    _this.linght = function (enable) {
        tencentTRTC.enableTorch({
            enable: enable,
        });
    }
    // 1：熊孩子
    // 2：萝莉
    // 3：大叔
    // 4：重金属
    // 5：感冒
    // 6：外国人
    // 7：困兽
    // 8：死肥宅
    // 9：强电流
    // 10：重机械
    // 11：空灵
    // 变声
    _this.changeVoice = function (type) {
        tencentTRTC.setVoiceChangerType({
            type: type,
        }, function (ret, err) {});
    }

    // 0： 图像铺满屏幕， 超出显示视窗的视频部分将被裁剪
    // 1： 图像长边填满屏幕， 短边区域会被填充黑色
    _this.mode = function (type, uid) {
        // 设置本地图像的渲染模式
        tencentTRTC.setLocalViewFillMode({
            type: type,
        });
        tencentTRTC.setRemoteViewFillMode({
            remoteUid: uid,
            type: type,
        });
    }

    // 分辨率
    _this.param = function () {
        tencentTRTC.setVideoEncoderParam({
            videoResolution: 112,
            resMode: 1, // 0：横屏分辨率 1：竖屏分辨率
            videoFps: '15fps',
            videoBitrate: '1500kbps',
            enableAdjustRes: true
        });
    }

    // 设置音频路由 ，0:扬声器、1:听筒
    _this.ways = function (route) {
        tencentTRTC.setAudioRoute({
            route: route
        });
    }


    // ‘error’:错误回调
    // ‘warning’：警告事件
    // ‘enterRoom’：进入房间
    // ‘exitRoom’：退出房间
    // ‘remoteUserEnterRoom’:有用户加入当前房间
    // ‘remoteUserLeaveRoom’:由用户离开当前房间
    // ‘firstVideoFrame’:开始渲染本地或远程用户的首帧画面               
    // 'firstAudioFrame':开始播放远程用户的首帧音频（本地声音暂不通知）
    // 'sendFirstLocalVideoFrame':首帧本地视频数据已经被送出
    // ‘sendFirstLocalAudioFrame’:首帧本地音频数据已经被送出
    // ‘connectionLost’:与服务器连接断开
    // ‘tryToReconnect’:尝试重新连接到服务器
    // ‘connectionRecovery’:与服务器连接恢复
    // ‘screenCaptureStarted’:屏幕分享开始
    // ‘screenCapturePaused’:屏幕分享暂停
    // ‘screenCaptureResumed‘：屏幕分享恢复
    // ’screenCaptureStoped‘：屏幕分享停止
    // 监听
    _this.listener = function (name, callback) {
        tencentTRTC.setTRTCListener({}, function (ret, err) {
            console.log(JSON.stringify(ret))
            console.log(JSON.stringify(err))
        });
    }
}