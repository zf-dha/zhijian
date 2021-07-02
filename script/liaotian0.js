// 处理数据
function dealData(data) {
    // console.log(JSON.stringify(data))
    var type = data.type;
    var self = data.self;
    var userid = data.self == 1 ? $api.getStorage('userid') : touserid;
    data.pic_headimg = imgurl + data['head_portrait'];
    var imgw = data.self == 1 ? userInfo.imgw : otherInfo.imgw;
    console.log(imgw)
    var info = {
        imgw: imgw,
        id: data.id,
        headimg: data.pic_headimg,
        content: imgurl + data.content,
        content_origin: imgurl + data.content,
        showtime: data.showtime,
        time: data.time,
        userid: userid,
        second: data.second,
        status: data.status || 0,
        state: data.state || 0,
        isRead: data.isRead || 0, // 是否已读
        is_burn: data.is_burn || 0, // 图片类型(-1焚毁图|0正常|1阅后即焚)  
    };
    info.sender = self == 0 ? 'zs' : 'self';
    var typeArr = ['text', 'image', 'sound', 'video', 'file', 'hongbao', 'area', 'money'];
    info.type = typeArr[type];
    if (type == 0) {
        info.content = getMesge(data.content);
        info.content_origin = data.content;
    }
    // 视频
    if (type == 3) {
        info.cover = imgurl + data.data.cover;
    }
    // 红包
    if (type == 5 || type == 6 || type == 7) {
        info.content = data.content.substring(0, 10);
        info.content_origin = data.content;
    }
    if (type == -1) {
        info.type = 'tip';
        if (data.data && data.data.chat_id) {
            // 红包
            if ($api.getStorage('userid') == data.data.userid) {
                // 我发的
                var text = data.data.touser_name + '领取了你';
            } else {
                // 对方发的 
                var text = '你领取了' + data.data.user_name;
            }
            info.content = text;
            info.content_origin = text;
            info.chat_id = data.data.chat_id;
        }
    }
    console.log(JSON.stringify(info))
    return info;
}


// 打开拍照
function pai_zhao(sourceType, callback) {
    api.getPicture({
        sourceType: sourceType,
        encodingType: 'png',
        destinationType: 'url',
        mediaValue: 'pic',
        quality: 100,
        saveToPhotoAlbum: false,
    }, function (ret, err) {
        if (ret && ret.data) {
            callback && callback(ret.data);
        } else {
            api.toast({
                msg: '没有拍照',
            });
        }
    });
}


function loadAllImage(callback) {
    var $imgs = $('.msg-content-image');
    var len = $imgs.length - loadImage;
    if (len == 0) {
        callback && callback();
        return;
    }
    var loadnum = 0;
    $imgs.load(function () {
        loadnum++;
        loadImage++;
        if (loadnum == len) {
            callback && callback();
        }
    });
    $imgs.error(function () {
        loadnum++;
        loadImage++;
        if (loadnum == len) {
            callback && callback();
        }
    });
};



//得到替换后的消息内容
function getMesge(str) {
    if (!str) {
        return '';
    }
    str = str.replace(/\[(.+?)\]/g, function (a, b) {
        var url = '../../res/img/emotion/' + getEmotionUrl(a) + '.png';
        return '<img src=' + url + ' border="0" width="25"/>';
    });
    str = entityToString(str);
    return str;
}
// 实体字符转html代码
function entityToString(entity) {
    // 若无实体字符则不转换
    if (entity.indexOf('&lt' == -1)) return entity;
    var div = document.createElement('div');
    div.innerHTML = entity;
    var res = div.innerText || div.textContent;
    return res;
}
//根据表情名获取表情图片路径
function getEmotionUrl(text) {
    for (var i = 0; i < emotionUrl.length; i++) {
        if (text == emotionUrl[i].text) {
            return emotionUrl[i].name;
        }
    }
}

// 获取用户信息 自己的
function getUserInfo() {
    _getUser(function (ret) {
        userInfo.imgw = 0;
        imgCss(imgurl + ret.result.head_portrait, function (w, h) {
            console.log(w)
            console.log(h)
            if (w > h) {
                userInfo.imgw = 1;
            }
        })
        userInfo.headimg = imgurl + ret.result.head_portrait;
    })
}

// 获取用户信息 对方的
function getOtherInfo(callback) {
    _getUser(function (ret) {
        console.log(JSON.stringify(ret))
        otherInfo = ret.result;
        // if(ret.result.pull_black == 1){
        //     _alert('您已拉黑对方/对方已拉黑您', function(){
        //         api.closeWin();

        //     })
        //     return;
        // }
        otherInfo.imgw = 0;
        imgCss(imgurl + ret.result.head_portrait, function (w, h) {
            console.log(w)
            console.log(h)
            if (w > h) {
                otherInfo.imgw = 1;
            }
        })
        if (typeof callback == 'function') {
            callback()
        }
    }, touserid, 1)
}

// 复制
function copyTxt(text) {
    var clipBoard = api.require('clipBoard');
    clipBoard.set({
        value: text
    }, function (ret, err) {
        console.log(JSON.stringify(ret))
        console.log(JSON.stringify(err))
        if (ret.status) {
            _msg('复制成功');
        } else {
            _msg('复制失败');
        }
    });
}

// 菜单框
function showAction(text, id, msgType) {
    console.log(text);
    console.log(id);
    console.log(msgType);
    if (msgType == 'sound' || msgType == 'hongbao' || msgType == 'money') {
        return;
    }

    var buttons = msgType == 'text' ? ['撤回', '删除', '复制'] : ['撤回', '删除'];
    // var _id = id.replace('id', '');
    _action('', buttons, function (bIndex) {
        if (bIndex != buttons.length + 1) {
            if (bIndex == 1) {
                // 撤回
                _ajax('home/privatechat/recall', function (ret, err) {
                    console.log(JSON.stringify(ret))
                    console.log(JSON.stringify(err))
                    var msg = ret.msg;
                    _msg(msg);
                    if (ret && ret.code == 200) {
                        recallCss(id);
                    }
                }, {
                    chat_id: id,
                    user_id: $api.getStorage('userid')
                })
            } else if (bIndex == 2) {
                // 删除
                _ajax('home/privatechat/delete', function (ret, err) {
                    console.log(JSON.stringify(ret))
                    console.log(JSON.stringify(err))
                    var msg = ret.msg;
                    _msg(msg);
                    if (ret && ret.code == 200) {
                        var index = $('#id' + id).index();
                        $('#id' + id + ' .msg-item').remove();
                        record.splice(index, 1);
                    }
                }, {
                    chat_id: id,
                    user_id: $api.getStorage('userid')
                })

            } else if (bIndex == 3) {
                copyTxt(text);
            }
        }
    })
}


// 移除被撤回消息
function recallCss(id) {
    console.log(id)
    var index = $('#id' + id).index();
    var html = '<div class="recall"><span>该消息已被撤回</span></div>';
    console.log(index);
    console.log(JSON.stringify(record))
    record[index].status = 3;
    $('#id' + id + ' .msg-item').before(html);
    $('#id' + id + ' .msg-item').remove();
}

// 点击红包
function openRed(id) {
    console.log(id);
    var myuserid = $api.getStorage('userid');
    var index = $('#id' + id).index();
    var data = record[index];
    // console.log(JSON.stringify(record))
    console.log(index);
    console.log(JSON.stringify(data));
    if (data.userid == myuserid) {
        var u = data.type == 'hongbao' ? 'frame0/hong_bao_detail' : 'frame0/money_detail';
        // 自己发的红包
        _url({ id: id }, u);
    } else {
        if (otherInfo.pull_black == 1) {
            _msg('对方已拉黑您');
            return;
        }
        if (data.state == 0) {
            var u = data.type == 'hongbao' ? 'frame0/hong_bao' : 'frame0/money';
            // 对方发的红包
            showDetail(u, { id: id });
        } else {
            var u = data.type == 'hongbao' ? 'frame0/hong_bao_detail' : 'frame0/money_detail';
            _url({ id: id }, u);
        }
    }
}


// 打开红包详情
function openRedDetail(id) {
    _url({ id: id }, 'frame0/hong_bao_detail');
}
// 打开阅后即焚的详情
function openBurn(id) {
    var $this = $('#id' + id);
    var index = $this.index();
    var data = record[index];
    var touid = data.sender == 'self' ? touserid : $api.getStorage('userid');
    if(data.userid != $api.getStorage('userid') && otherInfo.pull_black == 1){
        _msg('对方已拉黑您');
        return;
    }
    _url({ id: id, img: data.content, uid: data.userid, touid: touid, is_burn: data.is_burn, url: 'frame0/burn_detail', title: '详情' });
}
// 打开视频
function openVideo(id) {
    var $this = $('#id' + id);
    var index = $this.index();
    var data = record[index];
    // 视频需使用win打开 监听安卓的keyback
    _url({
        video: data.content,
        cover: data.cover,
        animationType: 0
    }, 'frame0/liaotian_video')
}
// 打开地址
function openArea(id) {
    var $this = $('#id' + id);
    var index = $this.index();
    var data = record[index];
    console.log(JSON.stringify(data));
    _url({
        area: data.content_origin,
        url: 'frame0/map',
        title: '位置'
    })
}


// 更新红包状态
function updateHongbao(id, state) {
    var $this = $('#id' + id);
    var index = $this.index();
    record[index].state = state;
    if (state == 1) {
        $this.find('.red-img').addClass('red-img-no');
    }
    var txtArr = ['等待领取', '已领取', '已过期'];
    $this.find('.red-game').text(txtArr[state]);
}
// 更新焚毁情况
function updateBurn(rets) {
    var id = rets.data.id;
    var $this = $('#id' + id);
    var index = $this.index();
    if (index > -1) {
        console.log(index)
        record[index].is_burn = -1;
        $this.find('.burn-msg').addClass('burn');
        console.log(JSON.stringify(record[index]))
    }
    if (rets.msg) {
        _msg(rets.msg);
    }
}

// 更新聊天消息状态
function updateMsg() {
    // alert('更新聊天消息状态')
    console.log(JSON.stringify(record))
    for (var i = 0, len = record.length; i < len; i++) {
        record[i].isRead = 1;
        $('#id' + record[i].id).find('.read-status').addClass('ready-read');
        $('#id' + record[i].id).find('.read-status').text('已读');
    }
}

// 设置安卓高度
function setAndroidHeight(h) {
    if (api.systemType != 'ios') {
        initHeight(h)
    }
}

// 初始高度
function initHeight() {
    if (api.systemType == 'ios') {
        setBottom(panelHeight)
    } else {
        var element = document.getElementById('msg-bottom');
        if (emotionPan == 1 || extraPan == 1) {
            var height = panelHeight + 20;
            $('#msg-bottom').css({
                'height': height + 'px'
            });
        } else {
            $('#msg-bottom').css({
                'height': '20px'
            });
        }
        // element.scrollIntoView({block: "end", behavior: "smooth"});
        element.scrollIntoView({
            block: "end",
            behavior: "auto"
        });
    }
}

// 设置版面底部高度  安卓使用config softInputMode即可
function setBottom(h) {
    if (api.systemType != 'ios') return;
    $('#msg-list').css('padding-bottom', h + 'px');
    var msgH = $('#msg-list').height();
    var bodyH = $('body').height();
    var bh = h > 100 ? bodyH + msgH + h : bodyH + msgH + h + 200;
    setTimeout(function () {
        document.getElementById('msg-list').scrollTop = bh;
    }, 300)
}



// 打开连麦
function openLM() {
    if (otherInfo.pull_black == 1) {
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
                        id: touserid,
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
                        if (Number(userInfo.volley) < ret.data.recharge) {
                            // 余额不足
                            _alert('余额不足', function () {
                                showDetail('frame4/show_chong');
                            })
                        } else {
                            _url({
                                id: touserid,
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