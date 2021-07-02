// 部分滑动 数组
var _paramObj = {
    // 穿衣风格
    style: [{"name":'黑丝'},{"name":'长筒袜'},{"name":'吊带袜'},{"name":'蕾丝'},{"name":'超短裙'},{"name":'雪纺裙'},{"name":'连衣裙'},{"name":'牛仔裤'},{"name":'萝莉'},{"name":'清纯'},{"name":'可爱'},{"name":'御姐'},{"name":'甜美'},{"name":'角色扮演'}],
    // 情感
    emotion:[{"name":"单身"},{"name":"热恋"},{"name":"已婚"}],
    // 语言
    language: [{"name":'本地话'},{"name":'普通话'},{"name":'广东话'},{"name":'客家话'},{"name":'英语'},{"name":'日语'}],
    // 约会节目
    dy_program: [],
    // 约会条件 期望对象
    dy_conditions: [],
     // 约会时间
     dy_time: [{"name":'凌晨'},{"name":'上午'},{"name":'中午'},{"name":'下午'},{"name":'晚上'},{"name":'通宵'},{"name":'一整天'}],
    // 职业
    occupation:[],
    // 星座
    constellation:[{"name":"水瓶座"},{"name":"双鱼座"},{"name":"白羊座"},{"name":"金牛座"},{"name":"双子座"},{"name":"巨蟹座"},{"name":"狮子座"},{"name":"处女座"},{"name":"天秤座"},{"name":"天蝎座"},{"name":"射手座"},{"name":"摩羯座"}],
}


// 打开滑动模块
function openUIActionSelector(data, param, callback){
    console.log(JSON.stringify(data))
    var UIActionSelector = api.require('UIActionSelector');
    var h = api.systemType == 'ios' ? 50 : 40;
    var row = api.systemType == 'ios' ? 3 : 5;
    var fontsize = api.systemType == 'ios' ? 14 : 14;
    var sizeActive = api.systemType == 'ios' ? 14 : 16;
    if(param.col == 1){
        var actives = [2];
    }else if(param.col == 2){
        var actives = [2, 0];
    }else if(param.col == 3){
        var actives = [2, 0, 0];
    }
    UIActionSelector.open({
        datas: data,
        layout: {
            row: row,  // 每屏显示的数据行数
            col: param.col,  // 数据源的数据级数
            height: h,
            size: fontsize,
            sizeActive: sizeActive,
            colorSelected: '#663DFB'
        },
        cancel: {
            text: '取消',
            size: fontsize,
            color: '#663DFB',
            colorActive: '#663DFB'
        },
        ok: {
            text: '确定',
            size: fontsize,
            color: '#663DFB',
            colorActive: '#663DFB'
        },
        title: {
            text: '请选择' + param.title,
            size: fontsize,
            bg: '#fff',
            color: '#000'        
        },
        actives: actives,
        fixedOn: api.frameName,
        selectedBold:false,

    },callback);
}

// 获取交友节目列表
function getProgram(callback){
    var arr = [];
    _ajax('home/dymanic/category', function (ret, err) {
        console.log(JSON.stringify(ret))
        console.log(JSON.stringify(err))
        if (ret && ret.code == 200 && ret.result && ret.result.length > 0) {
            for (var i = 0, len = ret.result.length; i < len; i++) {
                var obj = {name: ret.result[i].name};
                arr.push(obj);
            }
            _paramObj.dy_program = arr;
            if(typeof callback == 'function'){
                callback(arr);
            }else{
                getOccupation();
                setTimeout(function(){
                    getConditions();
                }, 1000)
            }
            console.log(JSON.stringify(_paramObj.dy_program))
        }
    })
}


// 获取职业
function getOccupation(callback) {
    var arr = [];
    _ajax('api/Member/occupation', function (ret, err) {
        console.log(JSON.stringify(ret))
        console.log(JSON.stringify(err))
        if (ret && ret.code == 200 && ret.data && ret.data.length > 0) {
            for (var i = 0, len = ret.data.length; i < len; i++) {
                var obj = {
                    name: ret.data[i].name
                };
                arr.push(obj);
            }
            _paramObj.occupation = arr;
            if (typeof callback == 'function') {
                callback(arr);
            }
        }
    })
}



// 获取期望对象
function getConditions(callback) {
    var arr = [];
    var type = $api.getStorage('sex') == '女' ? 2 : 1;
    _ajax('api/Member/conditions', function (ret, err) {
        console.log(JSON.stringify(ret))
        console.log(JSON.stringify(err))
        if (ret && ret.code == 200 && ret.data && ret.data.length > 0) {
            for (var i = 0, len = ret.data.length; i < len; i++) {
                var obj = {
                    name: ret.data[i].name
                };
                arr.push(obj);
            }
            _paramObj.dy_conditions = arr;
            if (typeof callback == 'function') {
                callback(arr);
            }
            // console.log(JSON.stringify(_paramObj.occupation))
        }
    }, {type:type})
}


// 选择城市
function selectUserCity(ziduan) {
    var path = 'widget://res/city.json';
    openUIActionSelector(path, {
        col: 3,
        title: '城市'
    }, function (ret, err) {
        console.log(JSON.stringify(ret))
        if (ret.eventType == 'ok') {
            var city = ret.level2;
            if(city.indexOf('市')!=-1){
                city = city.split('市')[0];
            }
            var qu = ret.level3;
            if(qu.indexOf('区')!=-1){
                qu = qu.split('区')[0];
            }
            if(qu.indexOf('县')!=-1){
                qu = qu.split('县')[0];
            }
            if(qu.indexOf('市')!=-1){
                qu = qu.split('市')[0];
            }
            var v = city + qu;
            getUserFilter(ziduan, v)
        }
    })
}