// 收藏
function _sc(uid, index) {
    var _this = view;
    var status = _this.ffList[index].love;
    _ajax('api/user/attention', function (ret, err) {
        console.log(JSON.stringify(ret))
        console.log(JSON.stringify(err))
        if (ret && ret.code == 200) {
            var msg = status == 0 ? '收藏成功' : '取消收藏成功';
            _msg(msg);
            _this.ffList[index].love = status == 0 ? 1 : 0;
            pushMsg(uid);
        }
    }, {
        user_id: $api.getStorage('userid'), //我的用户id
        to_user: uid, //被看用户id
    })
}

// 收藏&拉黑
function _scAndBlack(index) {
    var _this = view;
    var uid = _this.ffList[index].user_id;
    var love = _this.ffList[index].love;
    var buttons = love == 0 ? ['收藏', '拉黑'] : ['取消收藏', '拉黑'];
    _action('', buttons, function (bIndex) {
        if (bIndex == 1) {
            // 收藏
            _ajax('api/user/attention', function (ret, err) {
                console.log(JSON.stringify(ret))
                console.log(JSON.stringify(err))
                if (ret && ret.code == 200) {
                    _msg('操作成功');
                    _this.ffList[index].love = love == 0 ? 1 : 0;
                    pushMsg(uid);
                } else {
                    _msg('操作失败');
                }
            }, {
                user_id: $api.getStorage('userid'),
                to_user: uid,
            })
        } else if (bIndex == 2) {
            // 拉黑
            _ajax('api/user/addBlackList', function (ret, err) {
                if (ret && ret.code == 200) {
                    _msg(ret.msg);
                    // $('.list').eq(index).addClass('new-hide');
                    // _this.ffList.splice(index, 1);
                    
                    // if (heigutgao == 1) {
                    //     pagenum++;
                    //     getData(pagenum);
                    // }
                } else {
                    _msg('操作失败');
                }
            }, {
                user_id: $api.getStorage('userid'),
                to_user: uid,
            })
        }
    })
}