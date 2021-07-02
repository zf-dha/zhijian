// 移除被撤回消息
function recallCss(id) {
    var index = $('#id' + id).index();
    // view.ffList[index - 1].status = 3;
    view.ffList[index].status = 3;
}

// 更新聊天消息状态
function updateMsg() {
    for (var i = 0, len = view.ffList.length; i < len; i++) {
        view.ffList[i].isRead = 1;
    }
}

// 打开阅后即焚的详情
function openBurn(index) {
    var data = view.ffList[index];
    var touid = data.self == 1 ? view.touserid : view.userid; // 接收消息方
    console.log(JSON.stringify(data));
    _url({
        id: data.id,
        img: returnImg(data.content),
        uid: data.userid, // 消息所属用户
        touid: touid, // 接收消息方
        is_burn: data.is_burn,
        url: 'frame0/burn_detail',
        title: '详情'
    });
}
// 更新焚毁情况
function updateBurn(rets) {
    var id = rets.data.id;
    var $this = $('#id' + id);
    var index = $this.index();
    if (index > -1) {
        // view.ffList[index - 1].is_burn = -1;
        view.ffList[index].is_burn = -1;
    }
    if (rets.msg) {
        _msg(rets.msg);
    }
}

// 打开视频
function openVideo(index) {
    var data = view.ffList[index];
    // 视频需使用win打开 监听安卓的keyback
    _url({
        video: returnImg(data.content),
        cover: returnImg(data.data.cover),
        animationType: 0
    }, 'frame0/liaotian_video')
}

// 打开地址
function openArea(index) {
    var data = view.ffList[index];
    _url({
        area: data.content,
        url: 'frame0/map',
        title: '位置'
    })
}


// 点击红包
function openRed(index) {
    var data = view.ffList[index];
    console.log(JSON.stringify(data))
    if (data.self == 1) {
        // 自己发的红包
        var u = data.type == 5 ? 'frame0/hong_bao_detail' : 'frame0/money_detail';
        _url({
            id: data.id
        }, u);
    } else {
        // 对方发的红包
        if (data.state == 0) {
            // 未领取
            var u = data.type == 5 ? 'frame0/hong_bao' : 'frame0/money';
            showDetail(u, {
                id: data.id,
                touserid: view.touserid
            });
        } else {
            // 已领取 查看详情
            var u = data.type == 5 ? 'frame0/hong_bao_detail' : 'frame0/money_detail';
            _url({
                id: data.id
            }, u);
        }
    }
}



// 更新红包状态
function updateHongbao(id, state) {
    var $this = $('#id' + id);
    var index = $this.index();
    // view.ffList[index - 1].state = state;
    view.ffList[index].state = state;
}

// 打开连麦
function openLM() {
    if (view.otherInfo.pull_black == 1) {
        _msg('对方已拉黑您');
        return;
    }
    getPermission(['microphone'], function (code) {
        if (code != 0) {
            _msg('请先开启相关权限');
        } else {
            // 获取配置信息
            _ajax('api/member/config', function (ret, err) {
                if (Number(ret.data.recharge) == 0) {
                    // 如果不需要付费
                    _url({
                        id: view.touserid,
                        type: -1,
                        slidBackEnabled: 0
                    }, 'frame0/lianmai');
                    return;
                }
                // 需要付费
                var obj = {
                    msg: '若接通成功需支付 ' + ret.data.recharge + ' 币，请谨慎操作'
                }
                _confirm(obj, function (bIndex) {
                    if (bIndex == 1) {
                        if (Number(view.userInfo.volley) < ret.data.recharge) {
                            // 余额不足
                            _alert('余额不足', function () {
                                showDetail('frame4/show_chong');
                            })
                        } else {
                            _url({
                                id: view.touserid,
                                type: -1,
                                slidBackEnabled: 0
                            }, 'frame0/lianmai');
                        }
                    }
                })
            })
        }
    })
}

// 长按
var timeOutEvent;

function touchstartF(index) {
    var data = view.ffList[index];
    if (data.type == 2) {
        return;
    }
    if (data.type == 5 || data.type == 7) {
        return;
    }
    timeOutEvent = setTimeout(function () {
        timeOutEvent = 0;
        showAction(data.id, data.type, data.content);
    }, 1000);
}

function touchendF(index) {
    clearTimeout(timeOutEvent);
    if (timeOutEvent != 0) {
        // var data = view.ffList[index];
        // _url({
        //     txt: data.name,
        //     touserid: data.touserid,
        //     url: 'frame0/liaotian',
        //     title: '与' + data.name + '的聊天'
        // })
    }
    return false;
}

// 菜单框
function showAction(id, msgType, text) {
    if (msgType == 2 || msgType == 5 || msgType == 7) {
        return;
    }
    var buttons = msgType == 0 ? ['撤回', '删除', '复制'] : ['撤回', '删除'];
    _action('', buttons, function (bIndex) {
        if (bIndex != buttons.length + 1) {
            if (bIndex == 1) {
                // 撤回
                _ajax('home/privatechat/recall', function (ret, err) {
                    var msg = ret.msg;
                    _msg(msg);
                    if (ret && ret.code == 200) {
                        recallCss(id);
                    }
                }, {
                    chat_id: id,
                    user_id: view.userid
                })
            } else if (bIndex == 2) {
                // 删除
                _ajax('home/privatechat/delete', function (ret, err) {
                    var msg = ret.msg;
                    _msg(msg);
                    if (ret && ret.code == 200) {
                        var index = $('#id' + id).index();
                        // view.ffList.splice(index - 1, 1);
                        view.ffList.splice(index, 1);
                    }
                }, {
                    chat_id: id,
                    user_id: view.userid
                })

            } else if (bIndex == 3) {
                copyTxt(text);
            }
        }
    })
}



// 如果是客服 发送一条空消息
function judgeService() {
    _ajax('api/Member/kefu', function (ret, err) {
        if (ret && ret.data && ret.data.id) {
            if (view.touserid == ret.data.id) {
                view.isKeFu = 1;
                console.log('联系客服');
                // 如果是客服 要求对方推送菜单
                _ajax('home/privatechat/addTalk', function (rets, errs) {

                }, {
                    content: '',
                    type: 0,
                    userid: view.userid,
                    touserid: view.touserid,
                })
            }
        }
    })
}

// 打开websocket
function openWS() {
    var userid = view.userid;
    var touserid = view.touserid;
    var _ws = new WS(4);
    _ws.open(function () {
        _ws.send(JSON.stringify({
            userid: userid,
        }));
        judgeService();
        setRead(); // 设置与该用户聊天已读
    })
    // 长连接 渲染数据
    _ws.get(function (rets) {
        if (rets.indexOf('action') != -1) {
            rets = JSON.parse(rets);
            // 获取新消息
            if (rets.code == 200 && rets.action == 'Home/Privatechat/getNewMsg') {
                if (rets.data.users) {
                    var useObj = rets.data.users;
                    if ((useObj.userid != userid && useObj.userid != touserid) || (useObj.touserid != userid && useObj.touserid != touserid)) return;
                    if (rets.data.new && rets.data.new.length > 0) {
                        view.ffList = view.ffList.concat(rets.data.new);
                        // view.ffList = rets.data.new.concat(view.ffList);
                        // if (rets.data.new[0].self == 0) {
                            setRead();
                        // }
                    }
                    if (rets.data.recall && rets.data.recall.length > 0) {
                        for (var i = 0, len = rets.data.recall.length; i < len; i++) {
                            recallCss(rets.data.recall[i]);
                        }
                    }
                }
            }
            if (rets.code == 200 && rets.action == 'Home/Privatechat/changeread') {
                if (rets.data.touserid == touserid) {
                    // 消息已被对方读取
                    updateMsg();
                }
            }
            // 图片已焚毁
            if (rets.code == 200 && rets.action == 'Home/Privatechat/burnImg') {
                updateBurn(rets);
            }
            // 发送现金红包 获取订单号
            if (rets.code == 200 && rets.action == 'Home/Privatechat/addTalk') {
                if (rets.data && rets.data.data) {
                    // 配置正确
                    _send('getHBNum', {
                        id: rets.data.id,
                        info: rets.data.data
                    })
                } else {
                    // 获取配置失败
                    _send('getHBNum', {
                        id: rets.data.id,
                        msg: rets.data.msg
                    })
                }
            }
            goBottom();
        }
    })
}

// 设置与该用户聊天已读
function setRead() {
    // 修改对方消息 阅读情况
    _ajax('Home/Privatechat/changeread', function (ret, err) {
        // 改变自己和该用户的消息数
        _ajax('Home/Privatechat/changecount', function (ret, err) {
            pushMsg(view.userid); // 推给自己
            pushMsg(view.touserid); // 推给自己
        }, {
            user_id: view.userid,
            touserid: view.touserid,
        })
    }, {
        user_id: view.userid,
        touserid: view.touserid,
    })
}

// 滚动到底部
function goBottom(type) {
    var element = document.getElementById('msg-bottom');
    element.scrollIntoView({
        block: "end",
        behavior: "auto"
    });
    setTimeout(function () {
        // console.log('设置底部高度')
        // console.log(JSON.stringify(view.panNum))
        if (api.systemType != 'ios') {
            // 安卓
            if ((view.panStatus == 1) && (view.panNum.input == view.panNum.ext || view.panNum.input == view.panNum.emo)) {
                // 若打开了表情面板 或 控件面板 底部需增加面板高度
                var bh = Number(view.inputBarHeight) + Number(view.panelHeight)
            } else {
                // 安卓 打开键盘无需增加面板高度
                var bh = Number(view.inputBarHeight);
            }
        } else {
            // ios 无论打开键盘还是面板都需要增加面板高度
            var bh = Number(view.inputBarHeight) + Number(view.panelHeight)
        }
        // console.log(bh)
        if (type) {
            // 面板高度变化 将面板设为未打开状态 便于下次若打开的是键盘可以判断
            view.panStatus = 0;
            view.panNum.input++;
        }
        $('#msg-bottom').css({
            'height': bh + 'px'
        });
        // var element = document.getElementById('msg-bottom');
        element.scrollIntoView({
            block: "end",
            behavior: "auto"
        });
    }, 200)
}