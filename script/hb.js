var id;
apiready = function () {
    id = api.pageParam['id'];
}

// 关闭
function closeFrame() {
    api.closeFrame();
}

// 打开红包
function openRed() {
    var myuid = $api.getStorage('userid');
    _ajax('home/privatechat/receive', function (ret, err) {
        console.log(JSON.stringify(ret));
        console.log(JSON.stringify(err));
        var msg = ret.msg;
        _msg(msg);
        var name = api.frameName == 'frame0/hong_bao' ? 'frame0/hong_bao_detail' : 'frame0/money_detail';
        if (ret.code == 200) {
            // pushMsg(myuid); // 推给自己
            // pushMsg(api.pageParam['touserid']); // 推给对方
            _url({ id: id }, name);
            closeFrame();
        }
    }, {
        chat_id: id,
        user_id:myuid
    })
}