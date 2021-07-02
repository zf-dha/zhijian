//分享模块
(function (window) {
    var Share = function () {};
    var title = '指间公园';
    var des = '看电影，玩游戏，去旅游.....颜值最高的附近交友软件';
    var img = 'widget://image/share_logo.png';
    //分享至微信
    Share.prototype.shareWinXin = function (url, type) {
        var weiXin = api.require('wxPlus');
        weiXin.shareWebpage({
            scene: type,
            title: title,
            description: des,
            thumb: img,
            contentUrl: url,
        }, function (ret, err) {
            api.hideProgress();
            if (ret.status) {
                _ajax('home/User/sharenum', function (rets, errs) {
                    api.closeFrame({});
                }, {
                    user_id: $api.getStorage('userid'),
                })
            } else {
                api.toast({ msg: '分享失败' });
            }
        });
    };
    //分享至qq
    Share.prototype.shareQQ = function (url, type) {
        var qq = api.require('QQPlus');
        qq.shareNews({
            url: url,
            title: title,
            description: des,
            type: type,
            imgUrl: imgurl+'logo.png', // Android平台只支持网络图片
        }, function (ret) {
            if (ret.status) {
                _ajax('home/User/sharenum', function (rets, errs) {
                    api.closeFrame({});
                }, { user_id: $api.getStorage('userid'), })
            } else {
                api.toast({ msg: '分享失败'});
            }
        });
    };
    window.Share = Share;
})(window);