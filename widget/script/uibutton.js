var UIBOX = function () {
    var _this = this;
    var UIChatBox = api.require('UIChatBox');

    // 打开聊天框
    _this.open = function (eArr, callback) {
        UIChatBox.open({
            placeholder: '',
            maxRows: 4,
            // disableSendMessage: true,
            // placeholder: '禁言中',
            emotionPath: 'widget://res/img/emotion',
            texts: {
                recordBtn: {
                    normalTitle: '按住说话',
                    activeTitle: '松开结束',
                },
                sendBtn: {
                    title: '发送',
                },
            },

            styles: {

                inputBar: {
                    borderColor: '#d9d9d9',
                    bgColor: '#f2f2f2',
                },
                inputBox: {
                    borderColor: '#B3B3B3',
                    bgColor: '#FFFFFF',
                },
                emotionBtn: {
                    normalImg: 'widget://res/img/face.png',
                },
                extrasBtn: {
                    normalImg: 'widget://res/img/jia.png',
                },
                keyboardBtn: {
                    normalImg: 'widget://res/img/jian_pan.png',
                },
                speechBtn: {
                    normalImg: 'widget://res/img/lu_yin.png',
                },
                recordBtn: {
                    normalBg: '#fff',
                    activeBg: '#c4c4c4',
                    color: '#663DFB',
                    size: 14,
                },
                indicator: {
                    target: 'both',
                    color: '#c4c4c4',
                    activeColor: '#9e9e9e',
                },
                sendBtn: {
                    titleColor: '#fff',
                    bg: '#663DFB',
                    activeBg: '#663DFB',
                    titleSize: 14,
                },
            },
            extras: {
                titleSize: 10,
                titleColor: '#a3a3a3',
                btns: eArr,
            },
        }, function (ret, err) {
            if (ret) {
                if (typeof callback == 'function') {
                    callback(ret);
                }
                // 隐藏附加面板
                UIChatBox.closeBoard();
            } else {
                console.log(JSON.stringify(err));
            }
        })

    }
    // 关闭面板
    _this.close = function () {
        UIChatBox.closeBoard();
    }
    // 监听录音按钮 长按
    _this.record = function (callback) {
        UIChatBox.addEventListener({
            target: 'recordBtn',
            name: 'press',
        }, function (ret, err) {
            if (ret) {
                var micResult = api.hasPermission({
                    list: ['microphone', 'storage']
                });
                if (!micResult[0].granted) {
                    getPermission(['microphone', 'storage'], function (code) {
                        if (code != 0) {
                            _msg('请先开启相关权限');
                        }
                    })
                } else {
                    if (typeof callback == 'function') {
                        callback()
                    }
                }
            } else {
                alert(JSON.stringify(err));
            }
        });
    }
    // 监听录音按钮 滑动
    _this.recordMove = function (callback) {
        UIChatBox.addEventListener({
            target: 'recordBtn',
            name: 'move_out',
        }, function (ret, err) {
            if (ret) {
                if (typeof callback == 'function') {
                    callback()
                }
            } else {
                alert(JSON.stringify(err));
            }
        });
    }
    // 监听录音按钮 停止
    _this.recordCancel = function (callback) {
        UIChatBox.addEventListener({
            target: 'recordBtn',
            name: 'press_cancel',
        }, function (ret, err) {
            // console.log(JSON.stringify(ret))
            // console.log(JSON.stringify(err))
            if (ret) {
                if (typeof callback == 'function') {
                    callback()
                }
            } else {
                alert(JSON.stringify(err));
            }
        });
    }

    _this.inputMove = function (callback) {
        //监听 inputBar
        UIChatBox.addEventListener({
            target: 'inputBar',
            name: 'move'
        }, function (ret, err) {
            if (typeof callback == 'function') {
                callback(ret)
            }
        });
    }
    _this.inputExt = function (callback) {
        UIChatBox.addEventListener({
            target: 'inputBar',
            name: 'showExtras'
        }, function (ret, err) {
            if (typeof callback == 'function') {
                callback(ret)
            }
        });
    }
    _this.inputEmo = function (callback) {
        UIChatBox.addEventListener({
            target: 'inputBar',
            name: 'showEmotion'
        }, function (ret, err) {
            if (typeof callback == 'function') {
                callback(ret)
            }
        });
    }


}

// 返回按钮 del为1 表示去除arr中含有的，del=0表示获取arr中的
function returnButton(arr, del) {
    var extrasBtn = {
        '图片': {
            title: '图片',
            normalImg: 'widget://res/img/nim_message_plus_photo_normal.png',
            activeImg: 'widget://res/img/nim_message_plus_photo_normal.png',
        },
        '视频': {
            title: '视频',
            normalImg: 'widget://res/img/nim_message_plus_video_normal.png',
            activeImg: 'widget://res/img/nim_message_plus_video_normal.png',
        },
        '位置': {
            title: '位置',
            normalImg: 'widget://res/img/nim_message_plus_location_normal.png',
            activeImg: 'widget://res/img/nim_message_plus_location_normal.png',
        },
        '阅后即焚': {
            title: '阅后即焚',
            normalImg: 'widget://res/img/message_plus_snapchat_normal.png',
            activeImg: 'widget://res/img/message_plus_snapchat_normal.png',
        },
        '现金红包': {
            title: '现金红包',
            normalImg: 'widget://res/img/ic_sendluckybag.png',
            activeImg: 'widget://res/img/ic_sendluckybag.png',
        },
        '红包': {
            title: '红包',
            normalImg: 'widget://res/img/ic_maskdollar.png',
            activeImg: 'widget://res/img/ic_maskdollar.png',
        },
        '连麦': {
            title: '连麦',
            normalImg: 'widget://res/img/ic_voicecall.png',
            activeImg: 'widget://res/img/ic_voicecall.png',
        }
    }
    var brr = [];
    var keyArr = [];
    if (!arr) {
        for (var k in extrasBtn) {
            brr.push(extrasBtn[k]);
            keyArr.push(k);
        }
    } else {
        if (!del) {
            for (var i = 0, len = arr.length; i < len; i++) {
                brr.push(extrasBtn[arr[i]]);
            }
            keyArr = arr;
        } else {
            for (var i = 0, len = arr.length; i < len; i++) {
                delete extrasBtn[arr[i]];
            }
            for (var k in extrasBtn) {
                brr.push(extrasBtn[k]);
                keyArr.push(k);
            }
        }
    }
    return {
        btnArr: brr,
        keyArr: keyArr
    };
}

// 聊天模块
function editor() {
    var btnObj = view.otherInfo.lianmai_limit != 1 ? returnButton() : returnButton(['连麦'], 1);
    if (view.ios) {
        btnObj = returnButton(['图片', '视频']);
    }
    var uibox = new UIBOX();
    uibox.open(btnObj.btnArr, function (ret) {
        var type = ret.eventType;
        if (ret.inputBarHeight) {
            view.inputBarHeight = ret.inputBarHeight;
        }
        if (type == 'send') {
            // 发送
            var content = ret.msg;
            if (!$api.trim(content)) {
                _msg('内容不能为空');
                return
            }
            sendMsg({
                type: 0,
                content: content,
            })
        } else if (type == 'clickExtras') {
            uiboxClick(btnObj.keyArr[ret.index]);
        }
    })
    // 录音
    uibox.record(function () {
        console.log('录音中---')
        view.recordTxt = '手指上划，取消发送';
        view.record = 1;
        recMp3.start();
    })
    // 录音取消
    uibox.recordMove(function () {
        console.log('已取消---')
        view.recordTxt = '已取消';
        setTimeout(function () {
            view.record = 0;
            recMp3.stop();
        }, 500)
    })
    // 录音完成
    uibox.recordCancel(function () {
        console.log('录音完成---');
        setTimeout(function () {
            recMp3.stop(function (ret) {
                console.log(JSON.stringify(ret))
                if (ret && ret.status) {
                    if (ret.duration) {
                        if (ret.duration < 1) {
                            view.recordTxt = '录音时间太短';
                            setTimeout(function () {
                                view.record = 0;
                            }, 500)
                        } else {
                            view.record = 0;
                            var path = ret.path;
                            path = path.replace('fs://', api.fsDir + '/');
                            sendMsg({
                                type: 2,
                                second: ret.duration,
                                content: ret.path
                            })
                        }
                    } else {
                        view.recordTxt = '录音时间太短';
                        setTimeout(function () {
                            view.record = 0;
                        }, 500)
                    }
                }
            });
        }, 500)
    })

    // 因表情面板和控件面板按钮点击后 只可监听到面版打开的情况
    uibox.inputMove(function (ret) {
        // console.log('面板高度变化')
        // console.log(JSON.stringify(ret))
        if (ret) {
            // 面板收起
            if (ret.panelHeight == 0) { // panelHeight输入框下边缘距离屏幕底部的高度
                view.panStatus = 0;
            }
            var h = ret.panelHeight ? ret.panelHeight + api.safeArea.bottom : api.safeArea.bottom;
            view.panelHeight = h;
            goBottom(1);
        }
    })
    uibox.inputExt(function (ret) {
        // console.log('控件面板已打开')
        // 控件面板已打开
        view.panNum.input++;
        view.panNum.ext = view.panNum.input;
        view.panStatus = 1;
        // console.log(JSON.stringify(view.panNum))
    })
    uibox.inputEmo(function (ret) {
        // console.log('表情面板已打开')
        // 表情面板已打开
        view.panNum.input++;
        view.panNum.emo = view.panNum.input;
        view.panStatus = 1;
        // console.log(JSON.stringify(view.panNum))
    })
}

// 发消息
function sendMsg(data) {
    var obj = {
        type: data.type,
        userid: view.userid,
        touserid: view.touserid,
        content: data.content,
    }
    if (view.otherInfo.pull_black == 1) {
        _msg('对方已拉黑您');
        return;
    }
    if (data.type == 1) {
        // 图片
        _upImg({
            image: data.content
        }, function (u) {
            obj.content = u;
            obj.is_burn = data.is_burn;
            _ajax('home/Privatechat/addTalk', function (ret, err) {
                if (ret && ret.code == 400) {
                    _msg(ret.msg);
                }
            }, obj)
        })
    } else if (data.type == 2) {
        // delete obj.content;
        obj.second = data.second || 1;
        // 语音
        pushVideo(data.content, function (v) {
            obj.content = v;
            _ajax('home/privatechat/addTalk', function (ret, err) {
                console.log(JSON.stringify(ret))
                if (ret && ret.code == 400) {
                    _msg(ret.msg);
                }
            }, obj)
        })
    } else if (data.type == 3) {
        // 视频
        pushVideo(data.content, function (v) {
            _upImg({
                image: data.cover
            }, function (vimg) {
                obj.content = v;
                obj.cover = vimg;
                _ajax('home/privatechat/addTalk', function (ret) {
                    if (ret && ret.code == 400) {
                        _msg(ret.msg);
                    }
                }, obj)
            })
        })
    } else {
        // 文本 / 定位
        _ajax('home/privatechat/addTalk', function (ret) {
            if (ret && ret.code == 400) {
                _msg(ret.msg);
            }
        }, obj)
    }

}

// 点击输入框控件
function uiboxClick(str) {
    console.log(str);
    // ios 点击控件后 面板高度监听未生效
    if (api.systemType == 'ios') {
        view.panelHeight = 0; // 点击控件 面板收起
        goBottom(1);
    }
    switch (str) {
        case '图片':
            openPic(function (result) {
                sendMsg({
                    type: 1,
                    content: result.data,
                });
            })
            break;
        case '阅后即焚':
            openPic(function (result) {
                sendMsg({
                    type: 1,
                    content: result.data,
                    is_burn: 1,
                });
            })
            break;
        case '视频':
            openPic(function (result) {
                // 封面
                getVideoCover(result.data, function (cover) {
                    sendMsg({
                        type: 3,
                        content: result.data,
                        cover: cover,

                    });
                })
            }, 'video')
            break;
        case '位置':
            getPermission(['location'], function (code) {
                if (code != 0) {
                    _msg('请先开启定位');
                } else {
                    map.getLocation(function (ret) {
                        if (ret.status) {
                            sendMsg({
                                type: 6,
                                content: ret.lon + ',' + ret.lat,
                            });
                        }
                    })
                }
            })
            break;
        case '现金红包':
            _url({
                touserid: view.touserid
            }, 'frame0/fa_money')
            break;
        case '红包':
            _url({
                touserid: view.touserid
            }, 'frame0/fa_hong_bao')
            break;
        case '连麦':
            openLM();
            break;

        default:
            break;
    }


}