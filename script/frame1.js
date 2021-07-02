// 举报
function more(index) {
    var data = view.ffList[index];
    var uid = data.id;
    var dyid = data.dy_id;
    var buttons = uid!=$api.getStorage('userid') ? ['举报']:['删除'];
    // var buttons = ['举报'];
    _action('', buttons, function (bIndex) {
        if (bIndex != buttons.length + 1) {
            if(uid!=$api.getStorage('userid')){
                _url({ url: 'frame0/ju_bao_frame', title: '匿名举报', uid: uid })
            }else{
                _ajax('api/Member/delDymanic', function(ret, err){
                    console.log(JSON.stringify(ret))
                    console.log(JSON.stringify(err))
                    _msg(ret.msg);
                    if(ret && ret.code == 200){
                        view.ffList.splice(index, 1);
                    }
                }, { id: dyid })
            }
        }
    })
}

// 报名
function joinEnroll(id, index) {
    var status = view.ffList[index].self_enroll;
    var url = status == 0 ? 'home/Dymanic/enroll' : 'home/Dymanic/cancelenroll';
    _loading();
    _ajax(url, function (ret, err) {
        console.log(JSON.stringify(ret))
        _loadingClose();
        if (ret) {
            _msg(ret.msg);
            if (ret.code == 200) {
                view.ffList[index].self_enroll = status == 0 ? 1 : 0;
                view.ffList[index].enroll = status == 0 ? parseInt(view.ffList[index] .enroll) + 1 : view.ffList[index].enroll - 1;
                pushMsg(view.ffList[index].id);
            } else if (ret.code == 220) {
                if (ret.msg == '开通会员后才能报名') {
                    _url({ url: 'frame4', title: '开通会员' })
                }
            }
        }
    }, {
        user_id: $api.getStorage('userid'),
        dy_id: id,
    })
}

// 点赞
function zan(id, index, type){
    var status = view.ffList[index].isthumbsup;
    _ajax('home/Dymanic/thumbsup', function (ret, err) {
        console.log(JSON.stringify(ret))
        console.log(JSON.stringify(err))
        if (ret) {
            _msg(ret.msg);
            if (ret.code == 200) {
                view.ffList[index].isthumbsup = status == 0 ? 1 : 0;
                view.ffList[index].num = status == 0 ? parseInt(view.ffList[index].num) + 1 : view.ffList[index].num - 1;
                pushMsg(view.ffList[index].id);
            }
        }
    }, {
        type: parseInt(status) + 1,
        dy_id: id,
        userid: $api.getStorage('userid'),
    })
}

// 添加评论
function addComment(dy_id, uid){
    $('.input-bg').removeClass('new-hide');
    view.inputObj = {
        id: dy_id,
        uid: uid
    };
    $('.input-bg input').focus();
}

// 发布评论
function send(){
    var val = $.trim($('.input-wrap input').val());
    if (!val) {
        _msg('评论不能为空');
        return;
    }
    _ajax('home/Dymanic/comment', function (ret, err) {
        console.log(JSON.stringify(ret))
        console.log(JSON.stringify(err))
        if (ret) {
            _msg(ret.msg);
            if (ret.code == 200) {
                $('.input-wrap input').val('');
                $('.input-bg').addClass('new-hide');
            }
        }
    }, {
        dy_id: view.inputObj.id,
        userid: $api.getStorage('userid'),
        touserid: view.inputObj.uid,
        type: 0, //0为评论，1为回复
        content: val,
    })
}