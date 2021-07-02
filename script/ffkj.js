var myuserid = $api.getStorage('userid');
var mysex = $api.getStorage('sex');
var ALIPAY = 1; // 0不显示支付宝 1显示

// 打开窗口
function _url(pageParam, url, login) {
	var nameUrl = url;
	if (!url) {
		url = 'win';
		nameUrl = pageParam.url;
	}
	var animationType = 'push';
	if (pageParam.animationType == 0) {
		animationType = 'none';
	}
	var subType = pageParam.subType ? pageParam.subType : 'from_right';
	var slidBackEnabled = pageParam.slidBackEnabled === 0 ? false : true;
	console.log(nameUrl);
	api.openWin({
		name: nameUrl,
		url: html_win + url + '.html',
		pageParam: pageParam,
		reload: true,
		hideHomeIndicator: false,
		slidBackEnabled: slidBackEnabled,
		useWKWebView: true,
		animation: {
			type: animationType, //动画类型（详见动画类型常量）
			subType: subType, //动画子类型（详见动画子类型常量）
			duration: 500
		}
	})
}


// 统一服装调用 Frame页面
// url 页面文件命
// header 不填写默认读取顶部高度    填写1表示不显示header
// footer 不填写默认读取底部高度    填写1表示不显示footer
function _openFrame(url, header, footer, pageParam) {
	// 解析属性	消除点击300S 延时问题 tapmode
	api.parseTapmode();
	var headerh;
	var footerh;
	if (header == 1) {
		headerh = 0;
	} else {
		var header = $api.dom('header');
		$api.fixStatusBar(header);
		var headerPos = $api.offset(header);
		headerh = headerPos.h
	}
	if (footer == 1) {
		footerh = 0;
	} else {
		$api.fixTabBar($api.dom('footer'))
		footerh = $api.offset($api.dom('footer')).h;
	}
	var allowEdit = false;
	if (pageParam && pageParam.allowEdit == 1) {
		allowEdit = true;
	}
	var reload = true;
	if (pageParam && pageParam.reload == 0) {
		reload = false;
	}
	api.openFrame({
		name: url,
		url: html_win + url + '.html',
		bounces: false,
		reload: reload,
		rect: {
			x: 0,
			y: headerh,
			w: 'auto',
			h: 'auto',
			marginBottom: footerh
		},
		allowEdit: allowEdit,
		useWKWebView: true,
		pageParam: pageParam
	})
}


// 打开模态框
function showDetail(url, data, topH, footerH) {
	var th = topH || 0;
	var fh = footerH || 0;
	var a = 'fade';
	if (data && data.animation) {
		a = data.animation;
	}
	api.openFrame({
		name: url,
		url: html_win + url + '.html',
		bounces: false,
		rect: {
			x: 0,
			y: th,
			w: 'auto',
			h: 'auto',
			marginBottom: fh
		},
		useWKWebView: true,
		bgColor: 'rgba(0,0,0,0)',
		animation: {
			type: a, //动画类型（详见动画类型常量）
			subType: "from_top", //动画子类型（详见动画子类型常量）
			duration: 500 //动画过渡时间，默认300毫秒
		},
		pageParam: data,
		reload: true
	})
}

// 延时关闭窗口
function timerWin(time, winName) {
	var t = time || 1000;
	setTimeout(function () {
		if (winName) {
			api.closeToWin({
				name: winName
			})
		} else {
			api.closeWin();
		}
	}, t)
}

// 关闭窗口
function _closeToWin() {
	if (api.pageParam['winName']) {
		api.closeToWin({
			name: api.pageParam['winName']
		})
	} else {
		api.closeWin();
	}
}

// ajax
function _ajax(urls, callback, data) {
	var type = data ? 'post' : 'get';
	var url = urls.toLowerCase(); // 转为小写
	if (url.indexOf('.php') != -1) { // 原生
		var f_url = base_url + 'apis/';
	} else if (url.indexOf('home/') != -1) { // tp3 
		var f_url = base_url + 'apis/index.php/';
		// var f_url = base_url + 'apis/';
	} else if (url.indexOf('api/') != -1) { // tp5
		var f_url = base_url + 'index.php/';
		// var f_url = base_url;
	} else { // 后端封装
		var f_url = base_url + 'apis/index.php?'
	}
	// if (urls.indexOf('User/getNewMsggetNewMsg') == -1 && urls.indexOf('Privatechat/changeread') == -1 && urls.indexOf('Privatechat/getreadcount') == -1) {
	// 	console.log(f_url + urls)
	// }
	if (data) {
		console.log(JSON.stringify(data))
	}
	api.ajax({
		url: f_url + urls,
		method: type,
		data: {
			values: data
		},
		cache: true,
	}, function (ret, err) {
		console.log(JSON.stringify(ret))
		console.log(JSON.stringify(err))
		callback(ret, err);
	});
}


// 上传文件
function _ajaxFile(urls, callback, data, files) {
	var url = urls.toLowerCase(); // 转为小写
	if (url.indexOf('.php') != -1) { // 原生
		var f_url = base_url + 'apis/';
	} else if (url.indexOf('home/') != -1) { // tp3 
		var f_url = base_url + 'apis/index.php/';
	} else if (url.indexOf('api/') != -1) { // tp5
		var f_url = base_url + 'index.php/';
	} else { // 后端封装
		var f_url = base_url + 'apis/index.php?'
	}
	console.log(f_url + urls)
	if (data) {
		console.log(JSON.stringify(data))
	}
	if (files) {
		console.log(JSON.stringify(files))
	}
	api.ajax({
		url: f_url + urls,
		method: 'post',
		timeout: data.timeout || 6000,
		data: {
			values: data,
			files: files
		},
		cache: true,
	}, function (ret, err) {
		console.log(JSON.stringify(ret))
		console.log(JSON.stringify(err))
		callback(ret, err);
	});
}

//loading层
function _loading(data) {
	var msg = (data && data.msg) ? data.msg : '加载中';
	var title = (data && data.title) ? data.title : '';
	api.showProgress({
		title: title,
		text: msg,
		modal: true,
		animationType: 'zoom',
	});
}

// 关闭 提示
function _loadingClose() {
	api.hideProgress();
	api.refreshHeaderLoadDone();
}

var _alertFn;

// 弹出提示
function _alert(msg, callback, title) {
	// api.alert({
	// 	msg: msg,
	// 	title: title,
	// }, functions)
	$('#js-alert').remove();
	_alertFn = function () {
		$('#js-alert').remove();
		if (typeof callback == 'function') {
			callback();
		}
	};
	title = title ? title : '';
	var html = '<div id="js-alert" class="flex-c flex-col new-alert">';
	html += '<div class="alert-wrap">';
	html += '<h3>' + title + '</h3>';
	html += '<div class="text new-padding-tb-10">' + msg + '</div>';
	html += '<div class="btn-wrap flex-col">';
	html += '<button class="a-sub-btn" onclick="_alertFn()">确定</button>';
	html += '</div></div>';
	html += '</div>';
	$('body').append(html);
}


// 统一方向 confirm  // 确定 取消 subIndex = 1,['确定','取消'] subIndex = 2, ['取消', '确定']
function _confirm(data, callback) {
	$('#js-alert').remove();
	var title = data.title ? data.title : '提示';
	var subText = '确定';
	var cancelText = '';
	if (data.btn) {
		subText = data.btn[0];

		if (data.btn[1]) {
			cancelText = data.btn[1];
		}

	}

	var html = '<div id="js-alert" class="flex-c flex-col new-alert">';
	html += '<div class="alert-wrap">';
	html += '<h3>' + title + '</h3>';
	html += '<div class="text new-padding-tb-10">' + data.msg + '</div>';
	html += '<div class="btn-wrap flex-col">';
	html += '<button class="a-sub-btn" onclick="_alertFn(1)">' + subText + '</button>';
	if (cancelText) {
		html += '<button class="a-sub-btn a-cancel-btn" onclick="_alertFn(2)">' + cancelText + '</button>';
	}
	html += '</div></div>';
	html += '<div class="new-close" onclick="_alertFn(0)"></div>';
	html += '</div>';
	$('body').append(html);
	_alertFn = function (index) {
		$('#js-alert').remove();
		if (typeof callback == 'function') {
			callback(index);
		}
	};
}
var _confirmFn;
// 统一方向 confirm  // 确定 取消 subIndex = 1,['确定','取消'] subIndex = 2, ['取消', '确定']
function _submit(data, callback) {
	$('#js-confirm').remove();
	var title = data.title || '提示';
	var buttons = data.btn ? data.btn : ['确定', '取消'];
	var subText = buttons[0];
	var cancelText = buttons[1];
	var html = '<div id="js-confirm" class="flex-c flex-col new-alert">';
	html += '<div class="alert-wrap">';
	html += '<h3>' + title + ':</h3>';
	html += '<div class="text new-padding-tb-10">' + data.msg + '</div>';
	html += '<div class="btn-wrap flex-col">';
	html += '<button class="a-sub-btn" onclick="_confirmFn(1)">' + subText + '</button>';
	html += '<button class="a-del-btn" onclick="_confirmFn(2)">' + cancelText + '</button>';
	html += '</div></div>';
	html += '<div class="new-close" onclick="_confirmFn(0)"></div>';
	html += '</div>';
	$('body').append(html);
	_confirmFn = function (index) {
		$('#js-confirm').remove();
		if (typeof callback == 'function') {
			callback(index);
		}
	};
}

// msg提示
function _msg(msg, duration, location) {
	_loadingClose();
	if (!location) {
		location = 'middle';
	}
	if (!duration) {
		duration = 2000;
	}
	api.toast({
		msg: msg || '错误',
		duration: duration,
		location: location
	});
}


// 底部弹窗
function _action(title, buttons, callback) {
	api.actionSheet({
		title: title,
		buttons: buttons,
		style: {
			// layerColor:'',         //遮蔽层颜色，仅支持 rgba颜色，默认值：rgba（0, 0, 0, 0.4）
			// itemNormalColor:'',    //选项按钮正常状态背景颜色，支持#000、#000000、rgb、rgba，默认值：#F1F1F1
			// itemPressColor:'',     //选项按钮按下时背景颜色，支持#000、#000000、rgb、rgba，默认值：#E6E6E6
			fontNormalColor: '#663DFB', //选项按钮正常状态文字颜色，支持#000、#663DFB、rgb、rgba，默认值：#007AFF
			fontPressColor: '#663DFB', //选项按钮按下时文字颜色，支持#000、#000000、rgb、rgba，默认值：#0060F0
			// titleFontColor:''      //标题文字颜色，支持#000、#000000、rgb、rgba，默认值：#8F8F8F
		}
	}, function (ret, err) {
		callback(ret.buttonIndex);
	});
}

// 广播事件
function _listener(name, callback) {
	api.addEventListener({
		name: name
	}, function (ret) {
		callback(ret);
	})
}

function _send(name, data) {
	api.sendEvent({
		name: name,
		extra: data
	})
}

// 状态栏 1 黑字 0白字
function _heibai(type) {
	var style = type ? 'dark' : 'light'
	api.setStatusBarStyle({
		style: style,
		color: 'rgba(0,0,0,0)'
	});
}


// 退出应用
function keyback() {
	var exitStatu;
	api.addEventListener({
		name: 'keyback'
	}, function () {
		_back();
	})

	function _back() {
		if (!exitStatu) {
			exitStatu = 1;
			_msg("再按一次返回键退出");
			setTimeout(function () {
				exitStatu = null;
			}, 2000)
		} else if (exitStatu == 1) {
			api.closeWidget({
				silent: true
			});
		}
	}
}

/*
 *camera               //相机/拍照/录像
 *contacts             //写入/读取通讯录
 *microphone           //麦克风/录制音频
 *photos               //相册/本地存储。Android上等同storage权限
 *location             //定位
 *locationAlways       //后台定位，只支持iOS
 *notification         //状态栏通知
 *calendar             //日历读写，只支持Android
 *phone                //直接拨打电话/获取手机号码、IMEI（设备标识），只支持Android
 *sensor               //传感器，只支持Android
 *sms                  //后台发送短信，只支持Android
 *storage              //存储空间，读取相册，多媒体，本地存储相关，只支持Android
 */
// 获取相应权限 ios 可通过返回状态判断是否设置了永不询问 安卓无该返回值，故若无权限时，需弹出弹窗询问用户是否设置，再请求该权限
function getPermission(perArr, callback) {
	var sys = api.systemType;

	if (!perArr) {
		if (sys == 'ios') return;
		perArr = ['storage'];
	};


	var list = perArr;
	var result = api.hasPermission({
		list: list
	});

	var noP = []; // 未获取 但可请求 的权限 ios / 安卓需获取的权限[不知晓是否能进行请求]
	var limitArr = []; // 未获取 且禁止请求 的权限 ios
	if (sys == 'ios') {
		for (var i = 0, len = result.length; i < len; i++) {
			if (!result[i].granted) {
				if (result[i].undetermined) { // 可请求
					noP.push(result[i].name);
				} else { // 不可请求
					limitArr.push(result[i].name)
				}

			}
		}
	} else {
		// 仍未被允许的权限 安卓
		for (var i = 0, len = result.length; i < len; i++) {
			if (!result[i].granted) {
				limitArr.push(result[i].name);
			}
		}
	}

	if (noP.length != 0) {
		// 只有ios 会直接请求权限
		askPermis(noP, function (c, arr) {
			noP = arr;
			var _perArr = noP.concat(limitArr);
			if (_perArr.length == 0) {
				// 请求的权限都已开启
				callback(0);
			} else {
				requireQuanXian(_perArr, function (code) {
					callback(code);
				});
			}
		})

	} else {
		var _perArr = limitArr;
		console.log(JSON.stringify(_perArr))
		if (_perArr.length == 0) {
			// 请求的权限都已开启
			if (typeof callback == 'function') {
				callback(0);
			}

		} else {
			requireQuanXian(_perArr, function (code) {
				if (typeof callback == 'function') {
					callback(code);
				}
			});
		}
	}

}

// 权限弹窗
function requireQuanXian(arr, callback) {
	console.log(JSON.stringify(arr))
	var msg = '该操作需要使用到你的';
	var perObj = {
		camera: '相机', //相机/拍照/录像
		microphone: '麦克风', //麦克风/录制音频
		photos: '相册/存储', //相册/本地存储。Android上等同storage权限
		location: '定位', //定位
		notification: '通知', //状态栏通知
		storage: '存储', //存储空间，读取相册，多媒体，本地存储相关，只支持Android
	}
	var brr = [];
	for (var i = 0, len = arr.length; i < len; i++) {
		brr.push(perObj[arr[i]]);
	}
	msg = msg + brr.join('/') + '权限';
	var obj = {
		msg: msg,
		btn: ['立即设置', '稍后再去']
	}
	// _confirm(obj, function (bIndex) {
	// 	if (bIndex == 1) {
	// 		askPermis(arr, callback)
	// 	} else {
	// 		callback(1);
	// 	}
	// })
	api.confirm({
		title: '提示',
		msg: obj.msg,
		buttons: obj.btn
	}, function (ret, err) {
		if (ret.buttonIndex == 1) {
			askPermis(arr, callback)
		} else {
			callback(1);
		}
	});

}
// 请求权限
function askPermis(noP, callback) {
	if (noP.length == 0) {
		if (typeof callback == 'function') {
			callback(0, noP);
		}
		return;
	}

	api.requestPermission({
		list: noP,
		code: 100001
	}, function (ret, err) {
		console.log(JSON.stringify(ret))
		console.log(JSON.stringify(err))
		var noPer = 0;
		var arr = [];
		for (var j = 0, jlen = ret.list.length; j < jlen; j++) {
			if (!ret.list[j].granted) {
				noPer = 1;
				arr.push(ret.list[j].name)
			}
		}
		// 有权限未开启 返回1
		if (typeof callback == 'function') {
			callback(noPer, arr);
		}
	});
}

// 上拉滚动参数统一设置
var textDown = '下拉刷新...',
	textUp = '松开刷新...',
	bgColor = '#fff',
	textColor = '#000',
	visible = true,
	showTime = true,
	loadingImg = '',
	textLoading,
	textTime;

// 通用设置变量
var pagenum = 1;
var pagesize = 10;
//  禁止滚动
var heigutgao = 0;
var pagecount = 10;
var threshold = 0;

function _shangla(functions, refreshHeaderLoading) {
	api.parseTapmode();
	api.setRefreshHeaderInfo({
		visible: true,
		loadingImg: loadingImg,
		bgColor: bgColor,
		textColor: textColor,
		textDown: textDown,
		textUp: textUp,
		showTime: true,

	}, functions);
	// 第一次打开APP，自动执行刷新
	if (!refreshHeaderLoading) {
		api.refreshHeaderLoading();
	}
}

// 渲染数据
function _lists(url, page, loading, data) {
	if (!url) {
		api.refreshHeaderLoadDone();
		return;
	}
	// url = url.toLowerCase(); // 转为小写
	if (!data) {
		data = {};
	}
	data.pagecount = 10;
	data.pagesize = 10;
	data.page = page;
	pagenum = page;
	if ($('#no_more').length == 0) {
		$('body').append('<div id="no_more"></div>');
	}
	_ajax(url, function (ret, err) {
		console.log(JSON.stringify(ret))
		console.log(JSON.stringify(err))
		ret = ret.ret ? ret.ret : ret;
		if (ret) {
			if (loading == 1) { // 上拉刷新时  初始化参数
				$('body').scrollTop(0);
				$('#no_more').text('加载更多');
				$('#no_more').removeClass('null');
				// 重置滚动统计
				heigutgao = 1;
				// pagenum = 0;
				// 停止刷新
				api.refreshHeaderLoadDone();
				view.ffList = [];
			}
			heigutgao = 1;
			if (ret.data && ret.data.data) {
				ret.data = ret.data.data;
			}
			ret.result = ret.result ? ret.result : ret.data ? ret.data : [];
			if (page == 0) {
				view.ffList = [];
			}
			view.ffList = view.ffList.concat(ret.result);

			$('#no_more').text('加载更多');
			if (ret.result.length < pagecount) {
				heigutgao = 0;
				$('#no_more').text('没有更多了');
			}
			console.log(view.ffList.length)
			if (view.ffList.length == 0) {
				$('#no_more').text('');
				$('#no_more').addClass('null');
			}
		} else {
			view.ffList = [];
			api.refreshHeaderLoadDone();
		}
	}, data)
	setTimeout(function () {
		_loadingClose();
	}, 300)
}

// 滚动
function _scrollToBottom(callback) {
	api.addEventListener({
		name: 'scrollToBottom',
		extra: {
			threshold: threshold
		}
	}, function () {
		if (typeof callback != 'function') return;
		callback();
	})
}

// 验证手机号码
function checkMobile(mobile) {
	if (mobile == "") {
		return false;
	} else {
		mobile = mobile.replace(/\s*/g, '');
		if (mobile.length != 11) {
			return false;
		}
		return true;
	}
}

// 随机数 包括最小值 不包括最大值
function getRandom(min, max) {
	var num = Math.floor(Math.random() * (max - min + 1) + min);
	return num;
}

// 判断网络
function judgeNet() {
	api.addEventListener({
		name: 'offline'
	}, function (ret, err) {
		_url({}, 'error');
	});
}

// 清除所有HTML
function clearHtml(s) {
	if (!s) {
		return s;
	}
	var dd = s.replace(/<\/?.+?>/g, "");
	var dds = dd.replace(/ /g, "");
	return dds;
}

// 查看用户详情
function go_userInfo(id, name, sex) {
	if (window.event) {
		window.event.stopPropagation();
	}
	var mysex = $api.getStorage('sex');
	if (sex && mysex == sex) {
		if (id != $api.getStorage('userid')) {
			_msg('不可查看同性的详细信息');
		} else {
			_url({
				url: 'frame4/user',
				title: '个人资料',
				moreTitle: '保存'
			})
		}
		return;
	}
	if (id == $api.getStorage('userid')) {
		_url({
			url: 'frame4/user',
			title: '个人资料',
			moreTitle: '保存'
		})
		return;
	}
	_url({
		url: 'frame0/user_info_frame',
		title: name,
		user_id: id,
		moreType: 1
	})
}


// 打开相册
function openPic(callback, media) {
	var buttons = ['优雅自拍', '浏览相册'];
	var typeArr = ['camera', 'album'];
	var qArr = [100, 100];
	var sys = api.systemType;
	console.log(media)
	var _m = media == 'video' ? 'video' : 'pic';
	var text = media == 'video' ? '选择视频来源' : '选择图片来源';
	_action(text, buttons, function (bIndex) {
		if (bIndex != (buttons.length + 1)) {
			var perArr = sys != 'ios' ? ['camera', 'photos', 'storage'] : ['camera', 'photos'] // 相机 相册 存储
			if (sys != 'ios') {
				getPermission(perArr, function (code) {
					// 1权限未开启 0权限已开启
					if (code != 0) {
						_msg('请先开启相关权限');
					} else {
						api.getPicture({
							sourceType: typeArr[bIndex - 1],
							encodingType: 'png',
							mediaValue: _m,
							destinationType: 'url',
							videoQuality: 'high',
							quality: qArr[bIndex - 1],
							saveToPhotoAlbum: false,
						}, function (ret, err) {
							if (ret && ret.data) {
								if (_m == 'video' && !ret.data.match('.mp4')) {
									_msg('请选择mp4上传');
									return;
								} else {
									if (typeof callback == 'function') {
										callback(ret)
									}
								}
							} else {
								_msg('没有进行选择');
							}
						});
					}
				})
			} else {
				getPermission(perArr, function (code) {
					// 1权限未开启 0权限已开启
					if (code != 0) {
						_msg('请先开启相关权限');
					} else {
						api.getPicture({
							sourceType: typeArr[bIndex - 1],
							encodingType: 'png',
							mediaValue: _m,
							destinationType: 'url',
							quality: qArr[bIndex - 1],
							videoQuality: 'high',
							saveToPhotoAlbum: false,
						}, function (ret, err) {
							if (ret && ret.data) {
								if (_m == 'video' && !ret.data.match('.mp4')) {
									// 修改视频格式
									changeVideoType(ret.data, function (img) {
										if (typeof callback == 'function') {
											callback({
												data: img
											});
										}
									})
								} else {
									if (typeof callback == 'function') {
										callback(ret)
									}
								}
							} else {
								_msg('没有进行选择');
							}
						});
					}
				})

			}
		}
	})
}


// 转换视频格式 ios
function changeVideoType(url, callback) {
	var videoTool = api.require('videoTool');
	videoTool.compressVideo({
		directories: url,
		format: 'mp4',
		presetName: 7
	}, function (rets, errs) {
		console.log(JSON.stringify(rets));
		if (rets.state == 0 && typeof callback == 'function') {
			callback(rets.compressPath)
		}
	});
}


// 获取视频封面
function getVideoCover(url, callback) {
	console.log(url)
	// 获取视频封面
	var videoPlayer = api.require('videoPlayer');
	videoPlayer.videoCapture({
		videoUrl: url,
		time: 1,
		isAblum: false,
		name: '01'
	}, function (ret) {
		if (typeof callback == 'function' && ret.path) {
			callback(ret.path) // 视频封面地址
		}
	});
}

// 上传视频
function pushVideo(url, callback) {
	console.log(url)
	_ajaxFile('api/Tool/videoUpload', function (ret, err) {
		console.log(JSON.stringify(ret))
		console.log(JSON.stringify(err))
		if (ret && ret.data && ret.data.image) {
			callback(ret.data.image);
		}
	}, {}, {
		video: url
	})
}



// 设置上下线 1上线 0下线
function setOnline(state) {
	var uid = $api.getStorage('userid');
	if (!uid) return;
	_ajax('api/login/setOnline', function (ret) {}, {
		state: state,
		user_id: uid,
	})

}

// 打开登录页
function _login() {
	setOnline(0);
	if ($api.getStorage('shang') == 1 && api.systemType == 'ios') {
		_url({
			slidBackEnabled: 0
		}, 'shang/login_win');
	} else {
		_url({
			slidBackEnabled: 0
		}, 'user/login_win');
	}
}

// 声音或震动
function setWarnning() {
	// var voice = 1;
	// var shake = 1;
	var voice = $api.getStorage('voice');
	var shake = $api.getStorage('shake');
	if (shake == 1) {
		//仅震动
		api.notification({
			vibrate: [100, 500]
		});
	}
	if (voice == 1) {
		var audio = api.require('audioStreamer');
		audio.openPlayer({
			path: 'widget://res/tishi.mp3',
			// path: data.url,
		}, function (ret) {
			console.log(JSON.stringify(ret))
			if (ret.status) {

			}
		});
	}
}



// 通知后端将 点赞 报名等信息推送给 发布者uid
function pushMsg(uid) {
	console.log(uid)
	if (!uid) return;
	var obj = {
		user_id: uid
	};
	_ajax('Home/Privatechat/getreadcount', function (ret, err) {

	}, {
		data: JSON.stringify(obj)
	})
}

// 上传单图
function _upImg(data, callback) {
	var user_id = $api.getStorage('userid');
	if (!data) return;
	var image = data.image;
	var water = 1;
	var thumb = 1;
	if (data.water === 0) {
		user_id = undefined;
		water = 0;
	}
	if (!callback || typeof callback != 'function') {
		console.log('未填写回调函数');
		return;
	}
	if (image.indexOf('disk/') != -1) {
		callback(image);
		return;
	}
	_ajaxFile('api/Tool/imagesUpload', function (ret, err) {
		console.log(JSON.stringify(ret))
		console.log(JSON.stringify(err))
		if (ret && ret.data) {
			callback(ret.data.image);
		} else {
			// callback(image);
			_loadingClose();
			_msg('该图无法上传')
		}
	}, {
		thumb: thumb,
		water: water,
		user_id: user_id
	}, {
		image: image
	})
}


// 上传多图
function _upImgs(data, callback) {
	var user_id = $api.getStorage('userid');
	if (!data) return;
	var image = data.image;
	var water = 1;
	var thumb = 1;
	if (data.water === 0) {
		user_id = undefined;
		water = 0;
	}
	if (!callback || typeof callback != 'function') {
		console.log('未填写回调函数');
		return;
	}

	_ajaxFile('api/Tool/imagesUploads', function (ret, err) {
		console.log(JSON.stringify(ret))
		console.log(JSON.stringify(err))
		if (ret && ret.data) {
			callback(ret.data.images);
		} else {
			callback(image)
		}
	}, {
		thumb: thumb,
		water: water,
		user_id: user_id
	}, {
		'image[]': image
	})
}


// 获取主题对象
function returnTheme(callback, type) {
	var obj = {};
	_ajax('home/dymanic/category', function (ret, err) {
		if (ret) {
			var data = ret.result;

			for (var i = 0, len = data.length; i < len; i++) {
				obj[data[i].id] = data[i].name;
			}

			if (typeof callback == 'function') {
				if (type == 1) {
					callback(data);
					return;
				} else if (type == 2) {
					callback(obj, data);
					return;
				} else {
					callback(obj);
				}
			}
		}
	})
}


// 获取用户资料 user_id 被查看人 to_user 是否需要传我的id
function _getUser(callback, user_id, to_user) {
	var myid = $api.getStorage('userid');
	var uid = user_id ? user_id : myid;
	var obj = to_user ? {
		user_id: uid,
		to_user: myid
	} : {
		user_id: uid
	};
	obj.longitude = $api.getStorage('lon');
	obj.latitude = $api.getStorage('lat');
	console.log(JSON.stringify(obj))
	_ajax('api/user/info', function (ret, err) {
		console.log(JSON.stringify(ret))
		console.log(JSON.stringify(err))
		api.refreshHeaderLoadDone();
		if (ret && ret.code == 200) {
			if (!ret.result.id) {
				if (!user_id) {
					// 获取自己的用户信息失败
					_alert('获取用户信息失败，请重新登录', function () {
						_login();
					})
					return;
				} else {
					// 获取对方的用户信息失败
					_alert('该用户可能已经注销', function () {
						_send('freshchat', {
							uid: user_id
						})
						_closeToWin();
					})
					return;
				}
			}
			// if (ret.result.id == myid && ret.result.device != api.deviceId) {
			// 	_alert('该账号已在其他设备登录，请重新登录', function () {
			// 		_login();
			// 	})
			// 	return;
			// }
			if (ret.result.id == myid && ret.result.is_banned == 1) {
				_alert('该账号已被冻结，解封时间为' + ret.result.banned_end_time + ', 如有疑问，请联系客服', function () {
					_login();
				})
				return;
			}
			if (myid == ret.result.id) {
				$api.setStorage('sex', ret.result.sex);
				$api.setStorage('isVip', ret.result.is_vip);
			}
			callback(ret)
		} else {
			if (!user_id) {
				// 获取自己的用户信息失败
				_alert('获取用户信息失败，请重新登录', function () {
					_login();
				})
				return;
			} else {
				// 获取对方的用户信息失败
				_alert('该用户可能已经注销', function () {
					_send('freshchat', {
						uid: user_id
					})
					_closeToWin();
				})
				return;
			}
		}

	}, obj)
}

// 首页
function _home() {
	if ($api.getStorage('shang') == 1 && api.systemType == 'ios') {
		_url({
			slidBackEnabled: 0
		}, 'shop_win');
	} else {
		_url({
			slidBackEnabled: 0
		}, 'index_win');
	}
}

// 打开主窗口
function _index(type) {
	var arr = ['index_win', 'diantai_win', 'xiaoxi_win', 'shop_win', 'member_win'];
	api.openWin({
		name: arr[type],
		url: html_win + arr[type] + '.html',
		reload: false,
		hideHomeIndicator: false,
		slidBackEnabled: false,
		useWKWebView: true,
		animation: {
			type: 'none', //动画类型（详见动画类型常量）
			duration: 500
		}
	})
}

// 更新消息数量
function changeMsgNum(result) {
	if (!result) {
		result = $api.getStorage('msgNum');
		if (!result) return;
	}
	var chat_count = result.cnum;
	var message_count = result.mnum;
	var num = chat_count + message_count;
	if (num && num > 0) {
		num = num > 99 ? '99+' : num;
		$('footer .num').text(num);
		$('footer .num').removeClass('new-hide');
		if (chat_count > 0) {
			chat_count = chat_count > 99 ? '99+' : chat_count;
			$('#js-cnum').text(chat_count);
			$('#js-cnum').removeClass('new-hide');
		} else {
			$('#js-cnum').addClass('new-hide');
		}
		if (message_count > 0) {
			message_count = message_count > 99 ? '99+' : message_count;
			$('#js-mnum').text(message_count);
			$('#js-mnum').removeClass('new-hide');
		} else {
			$('#js-mnum').addClass('new-hide');
		}
	} else {
		$('#js-cnum').addClass('new-hide');
		$('#js-mnum').addClass('new-hide');
		$('footer .num').addClass('new-hide');
	}
}

// 打开单页
function openPage(id) {
	var obj = {
		1: '平台使用规范',
		2: '用户使用协议',
		3: '用户隐私政策',
	}
	var title = obj[id];
	_url({
		url: 'about',
		title: title,
		id: id
	})
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

function resetNotice(uid) {
	var index = $api.getStorage('load');
	var userid = uid ? uid : $api.getStorage('userid');
	if (index || !userid) return;
	// 首次下载
	_ajax('api/Member/resetPush', function (ret, err) {
		if (ret && ret.code == 200) {
			$api.setStorage('load', 1)
		}
	}, {
		user_id: userid
	})
}

// 名字替换
function returnName(name, all) {
	name = name + '';
	if (all == 1) {
		var s1 = name.slice(0, 1);
		var s = s1 + '**';
	} else {
		var s1 = name.slice(0, 3);
		var s2 = name.slice(-3);
		var s = s1 + '**' + s2;
	}
	return s;
}


// 判断是否已同意用户协议
function judgeAgreement() {
	var indexXY = $api.getStorage('indexXY');
	if (indexXY != 1) {
		showDetail('xieyi');
	}
}

// 获取单页内容
function getPageContent(id, callback) {
	_ajax('api/page/view', function (ret, err) {
		console.log(JSON.stringify(ret))
		console.log(JSON.stringify(err))
		if (ret && ret.code == 200 && ret.data) {
			callback(ret.data)
		}
	}, {
		id: id
	})
}

// 图片处理
function returnImg(url) {
	if (url && url.indexOf('disk/') != -1 && url.indexOf('http') == -1) {
		// 在线地址  缺少http
		// return imgurl + url;
		return $api.getStorage('imgurl') + url;
	} else {
		// 非在线地址 / 不缺少http前缀
		return url;
	}
}