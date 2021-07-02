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

