var RTC = function () {
    var _this = this;
    var trtc = api.require('tencentRtc');
    _this.sdkAppId = '1400406552'; // 腾讯rtc appid
    _this.scene = 0; // 应用场景  0: 视频通话（VideoCall） 1: 语音通话（AudioCall） 2: 连麦直播（Live） 3: 语聊房（VoiceChatRoom）
    _this.cover = ''; // 暂停推送本地视频时要推送的图片

    // _this.streamId = '';  // 腾讯云直播CDN流Id  
    // _this.appId = ''; // 腾讯云 旁路直播信息 AppID
    // _this.bizId = '';  // 腾讯云 旁路直播信息 bizId
    // _this.otherCDNUrl = '';  // 旁路转推的Url

    // 初始化   
    _this.init = function (scene) {
        trtc.init({}, function (ret, err) {
            // _this.scene = scene;

            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));

            _this.exitRoom(); // 先退出上次房间
        });
    }

    // 进入房间 TRTC 同一时间不支持两个相同的 userId 进入房间，否则会相互干扰。
    _this.enterRoom = function (data) {
        trtc.enterRoom({
            params: {
                sdkAppId: _this.sdkAppId,
                userId: data.uid,
                userSig: data.sign,
                roomId: data.room, // 取值范围: [1 - 4294967294]
                // streamId: _this.streamId
            },
            scene: _this.scene //  应用场景 0: 视频通话（VideoCall） 1: 语音通话（AudioCall） 2: 连麦直播（Live） 3: 语聊房（VoiceChatRoom）
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }

    // 离开房间
    _this.exitRoom = function () {
        trtc.exitRoom({}, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }

    // 连接其他房间
    _this.connectOtherRoom = function (touid, room) {
        trtc.connectOtherRoom({
            userId: touid, // 目标用户Id
            roomId: room //  目标房间号
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }

    // 停止连接其他房间
    _this.disconnectOtherRoom = function () {
        trtc.disconnectOtherRoom({}, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }

    // 开启摄像头预览
    _this.startLocalPreview = function (callback) {
        trtc.startLocalPreview({
            rect: {
                x: api.winWidth / 3 * 2,
                y: 0,
                w: api.winWidth / 3,
                h: api.winHeight / 3
            },
            isFront: true
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
            if (typeof callback == 'function') {
                callback();
            }
        });
    }

    // 停止本地视频采集及预览
    _this.stopLocalPreview = function () {
        trtc.stopLocalPreview({}, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }

    // 暂停/恢复推送本地的视频数据
    _this.muteLocalVideo = function (isMute) {
        trtc.muteLocalVideo({
            isMute: isMute, //  true表示暂停；false表示恢复
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }
    // 设置暂停推送本地视频时要推送的图片
    _this.setVideoMuteImage = function () {
        trtc.setVideoMuteImage({
            img: _this.cover,
            fps: 10
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }

    // 开始拉取并显示指定用户的远端画面
    _this.startRemoteView = function (touid, callback) {
        trtc.startRemoteView({
            rect: {
                x: 0,
                y: 0,
                w: api.winWidth,
                h: api.winHeight
            },
            userId: touid,
            streamType: 0 // 0: 高清大画面 1: 低清小画面 2: 辅流（屏幕分享）
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
            if (typeof callback == 'function') {
                callback();
            }
        });
    }
    // 更新远端画面
    _this.updateRemoteView = function () {
        var os = api.systemType;
        if (os == 'android') {
            api.toast({
                location: 'bottom',
                msg: '该函数仅支持iOS系统'
            });
            return;
        }

        trtc.updateRemoteView({}, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }
    // 停止显示远端视频画面，同时不再拉取该远端用户的视频数据流
    _this.stopRemoteView = function (touid) {
        trtc.stopRemoteView({
            userId: touid,
            streamType: 0
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }
    // 暂停/恢复接收指定的远端视频流
    _this.muteRemoteVideoStream = function (touid, isMute) {
        trtc.muteRemoteVideoStream({
            userId: touid,
            mute: isMute
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }

    // 停止显示远端视频画面，同时不再拉取该远端用户的视频数据流
    _this.stopAllRemoteView = function () {
        trtc.stopAllRemoteView({}, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }
    // 暂停/恢复接收所有远端视频流
    _this.muteAllRemoteVideoStreams = function (isMute) {
        trtc.muteAllRemoteVideoStreams({
            isMute: isMute
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }

    // 开启本地音频的采集和上行
    _this.startLocalAudio = function () {
        trtc.startLocalAudio({
            quality: 0
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }

    // 关闭本地音频的采集和上行
    _this.stopLocalAudio = function () {
        trtc.stopLocalAudio({}, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }
    // 静音/取消静音本地的音频
    _this.muteLocalAudio = function (isMute) {
        trtc.muteLocalAudio({
            isMute: isMute
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }

    // 静音/取消静音指定的远端用户的声音
    _this.muteRemoteAudio = function (touid, isMute) {
        trtc.muteRemoteAudio({
            userId: touid,
            isMute: isMute
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }
    // 静音/取消静音所有用户的声音
    _this.muteAllRemoteAudio = function (isMute) {
        trtc.muteAllRemoteAudio({
            isMute: isMute
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }



    /* 
     * 美颜
     *
     */

    _this.meiyan = function () {
        _this.setBeautyStyle(1);
        _this.setBeautyLevel(8);
        _this.setWhitenessLevel(8);
        _this.setRuddyLevel(8);
    }

    // 设置美颜（磨皮）算法 
    _this.setBeautyStyle = function (mode) {
        // 0: 光滑，适用于美女秀场，效果比较明显
        // 1: 自然，磨皮算法更多地保留了面部细节，主观感受上会更加自然
        // 2: 朦胧(仅支持iOS)
        trtc.setBeautyStyle({
            mode: mode
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }
    // 设置美颜级别 0表示关闭，1 - 9值越大，效果越明显。
    _this.setBeautyLevel = function (level) {
        trtc.setBeautyLevel({
            level: level
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }
    // 设置美白级别 0表示关闭，1 - 9值越大，效果越明显。
    _this.setWhitenessLevel = function (level) {
        trtc.setWhitenessLevel({
            level: level
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }
    // 设置红润级别 0表示关闭，1 - 9值越大，效果越明显。
    _this.setRuddyLevel = function (level) {
        trtc.setRuddyLevel({
            level: level
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }
    // 设置指定素材滤镜特效
    _this.setFilter = function (img) {
        trtc.setFilter({
            img: img
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }
    // 设置滤镜浓度 取值范围: [0 - 1] 默认值: 0.5
    _this.setFilterStrength = function (strength) {
        strength = strength / 10;
        trtc.setFilterStrength({
            strength: strength
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }

    /* 
     * 音乐
     *
     */
    // 设置背景音乐监听
    _this.setMusicListener = function (musicId) {
        trtc.setMusicListener({
            id: musicId
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }
    // 移除背景音乐监听
    _this.removeMusicListener = function (musicId) {
        trtc.removeMusicListener({
            id: musicId
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }
    // 开始播放背景音乐
    _this.startPlayMusic = function (musicId, musicPath) {
        trtc.startPlayMusic({
            id: musicId,
            path: musicPath, // 音乐文件的绝对路径
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }

    // 停止播放背景音乐
    _this.stopPlayMusic = function (musicId) {
        trtc.stopPlayMusic({
            id: musicId
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }

    // 暂停播放背景音乐
    _this.pausePlayMusic = function (musicId) {
        trtc.pausePlayMusic({
            id: musicId
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }
    // 恢复播放背景音乐
    _this.resumePlayMusic = function (musicId) {
        trtc.resumePlayMusic({
            id: musicId
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }

    // 将小数据量的自定义数据嵌入视频帧中
    _this.sendSEIMsg = function (msg, repeatCount) {
        trtc.sendSEIMsg({
            msg: msg,
            repeatCount: repeatCount // 发送数据次数
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }
    /* 
     * 基础设置
     */
    // 判断当前是否为前置摄像头
    _this.isFrontCamera = function () {
        trtc.isFrontCamera({}, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }
    // 切换摄像头
    _this.switchCamera = function (isFront) {
        trtc.switchCamera({
            isFront: isFront
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }

    // 设置监听
    _this.setTrtcListener = function (callback) {
        trtc.setTrtcListener({}, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
            if (typeof callback == 'function') {
                callback(ret);
            }
        });
    }

    // 移除监听
    _this.removeTrtcListener = function () {
        trtc.removeTrtcListener({}, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }

    // 销毁
    _this.destroy = function () {
        trtc.destroy({}, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }

    // 设置视频编码器相关参数
    _this.setVideoEncoderParam = function () {
        trtc.setVideoEncoderParam({
            videoEncParam: {
                resolution: 11,
                fps: 15,
                bitrate: 1000,
                // minBitrate: '',
                resMode: 0, // 0: Portrait 1: Landscape
                enableAdjustRes: true, // 是否允许调整分辨率
            },
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }

    // 本地图像的渲染设置
    _this.setLocalRenderParams = function () {
        trtc.setLocalRenderParams({
            fillMode: 0, // 0: 填充（画面可能会被拉伸裁剪） 1: 适应（画面可能会有黑边）
            mirrorType: 0, // 0: 前置摄像头镜像，后置摄像头不镜像 1: 前后置摄像头画面均镜像 2: 前后置摄像头画面均不镜像
            rotation: 0 // 0: 不旋转 1: 顺时针旋转90度 2: 顺时针旋转180度 3: 顺时针旋转270度
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }
    // 远端图像的渲染设置
    _this.setRemoteRenderParams = function (touid) {
        trtc.setRemoteRenderParams({
            userId: touid,
            streamType: 0, // 视频线路 0: 主路（TRTCVideoStreamTypeBig） 1: 辅路（TRTCVideoStreamTypeSub）
            renderParams: {
                fillMode: 0,
                mirrorType: 0,
                rotation: 0
            }
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }
    // 设置视频编码输出的画面方向，即设置远端用户观看到的和服务器录制的画面方向
    _this.setVideoEncoderRotation = function () {
        trtc.setVideoEncoderRotation({
            rotation: 0
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }
    // 设置编码器输出的画面镜像模式
    _this.setVideoEncoderMirror = function () {
        trtc.setVideoEncoderMirror({
            isMirror: true
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }
    // 设置重力感应的适应模式
    _this.setGSensorMode = function () {
        trtc.setGSensorMode({
            mode: 0
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }

    /* 
     * 其他
     */

    // 移除基本消息（文本消息和自定义消息）的事件监听器
    _this.removeSimpleMsgListener = function () {
        trtc.removeSimpleMsgListener({}, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }
    // 发送自定义消息给房间内所有用户
    _this.sendCustomCmdMsg = function (cmdId, msg) {
        trtc.sendCustomCmdMsg({
            cmdId: cmdId,
            msg: msg
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }

    // 切换角色
    _this.switchRole = function (role) {
        trtc.switchRole({
            role: role
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }
    // 设置音视频数据接收模式，需要在进房前设置才能生效
    _this.setDefaultStreamRecvMode = function () {
        trtc.setDefaultStreamRecvMode({
            isAudioAuto: true, // true表示自动接收音频数据；false表示需要调用 muteRemoteAudio 进行请求或取消。
            isVideoAuto: true //  true表示自动接收视频数据；false表示需要调用 startRemoteView/stopRemoteView 进行请求或取消。
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }

    /* 
     * CDN
     */
    // 开始向腾讯云的直播 CDN 推流
    _this.startPublishing = function () {
        trtc.startPublishing({
            streamId: _this.streamId,
            streamType: 0 //0: 主画面视频流 1: 小画面视频流
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }

    // 停止向腾讯云的直播 CDN 推流
    _this.stopPublishing = function () {
        trtc.stopPublishing({}, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }

    // 开始向友商云的直播 CDN 转推
    _this.startPublishCDNStream = function () {
        trtc.startPublishCDNStream({
            appId: _this.appId, // 腾讯云 旁路直播信息 AppID
            bizId: _this.bizId, // 腾讯云 旁路直播信息 bizId
            url: _this.otherCDNUrl,
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }
    // 停止向非腾讯云地址转推
    _this.stopPublishCDNStream = function () {
        trtc.stopPublishCDNStream({}, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        });
    }

}