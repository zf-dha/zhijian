(function() {
	iosSelectUtil = {
		isArray: function(arg1) {
			return Object.prototype.toString.call(arg1) === '[object Array]';
		},
		isFunction: function(arg1) {
			return typeof arg1 === 'function';
		},
		attrToData: function(dom, index) {
			var obj = {};
			for (var p in dom.dataset) {
				obj[p] = dom.dataset[p];
			}
			obj['dom'] = dom;
			obj['atindex'] = index;
			return obj;
		},
		attrToHtml: function(obj) {
			var html = '';
			for (var p in obj) {
				html += 'data-' + p + '="' + obj[p] + '"';
			}
			return html;
		}
	};
	// Layer
	function Layer(html, opts) {
		if (!(this instanceof Layer)) {
			return new Layer(html, opts);
		}
		this.html = html;
		this.opts = opts;
		var el = document.createElement('div');
		el.className = 'olay';
		// var layer_el = $('<div class="layer"></div>');
		var layer_el = document.createElement('div');
		layer_el.className = 'layer';
		this.el = el;
		this.layer_el = layer_el;
		this.init();
	}
	Layer.prototype = {
		init: function() {
			this.layer_el.innerHTML = this.html;
			if (this.opts.container && document.querySelector(this.opts.container)) {
				document.querySelector(this.opts.container).appendChild(this.el);
			}
			else {
				document.body.appendChild(this.el);
			}
			this.el.appendChild(this.layer_el);
			this.el.style.height = Math.max(document.documentElement.getBoundingClientRect().height, window.innerHeight);
			if (this.opts.className) {
				this.el.className += ' ' + this.opts.className;
			}
			this.bindEvent();
		},
		bindEvent: function() {
			var sureDom = this.el.querySelectorAll('.sure');
			var closeDom = this.el.querySelectorAll('.close');
			var self = this;
			for (var i = 0, len = sureDom.length; i < len; i++) {
				sureDom[i].addEventListener('click', function(e) {
					self.close();
				});
			}
			for (var i = 0, len = closeDom.length; i < len; i++) {
				closeDom[i].addEventListener('click', function(e) {
					self.close();
				});
			}
		},
		close: function() {
			if (this.el) {
				this.el.parentNode.removeChild(this.el);
				this.el = null;
			}
		}
	}
	/*
	 level: ??????????????? 1 2 3 ????????????3???
	 data: [oneLevelArray[, twoLevelArray[, threeLevelArray]]]
	 options:
	     container: ??????????????????????????? ??????
	     callback: ??????????????????????????????
	     title: ?????????title
	     itemHeight: ??????????????????????????? 35
	     headerHeight: ????????????????????? ?????? 44
	     cssUnit: px??????rem ?????????px
	     addClassName: ?????????????????? ?????????????????????
	     relation: ?????? [oneTwoRelation, twoThreeRelation, threeFourRelation, fourFiveRelation] ????????????[0, 0, 0, 0]
		     oneTwoRelation: ?????????????????????????????????parentId??????
		     twoThreeRelation: ?????????????????????????????????parentId??????
		     threeFourRelation: ?????????????????????????????????parentId??????
		     fourFiveRelation: ?????????????????????????????????parentId??????
	     oneLevelId: ???????????????id
	     twoLevelId: ???????????????id
	     threeLevelId: ???????????????id
	     fourLevelId: ???????????????id
	     fiveLevelId: ???????????????id
	     showLoading: ?????????????????????????????????????????????????????????????????????true???????????????????????????????????????
	 */
	function IosSelect(level, data, options) {
		if (!iosSelectUtil.isArray(data) || data.length === 0) {
			return;
		}
		this.data = data;
		this.level = level || 1;
		this.options = options;
		this.typeBox = 'one-level-box';
		if (this.level === 1) {
			this.typeBox = 'one-level-box';
		}
		else if (this.level === 2) {
			this.typeBox = 'two-level-box';
		}
		else if (this.level === 3) {
			this.typeBox = 'three-level-box';
		}
		else if (this.level === 4) {
			this.typeBox = 'four-level-box';
		}
		else if (this.level === 5) {
			this.typeBox = 'five-level-box';
		}
		this.callback = options.callback;
		this.title = options.title || '';
		this.options.itemHeight = options.itemHeight || 35;
		this.options.headerHeight = options.headerHeight || 44;
		this,options.relation = iosSelectUtil.isArray(this.options.relation)? this.options.relation: [];
		this.options.oneTwoRelation = this.options.relation[0];
		this.options.twoThreeRelation = this.options.relation[1];
		this.options.threeFourRelation = this.options.relation[2];
		this.options.fourFiveRelation = this.options.relation[3];
		if (this.options.cssUnit !== 'px' && this.options.cssUnit !== 'rem') {
			this.options.cssUnit = 'px';
		}
		this.setBase();
		this.init();
	};

	IosSelect.prototype = {
		init: function() {
			this.initLayer();
			// ?????????????????????
			this.selectOneObj = {};
			this.selectTwoObj = {};
			this.selectThreeObj = {};
			this.selectFourObj = {};
			this.selectFiveObj = {};
			this.setOneLevel(this.options.oneLevelId, this.options.twoLevelId, this.options.threeLevelId, this.options.fourLevelId, this.options.fiveLevelId);
		},
		initLayer: function() {
			var self = this;
			var all_html = [
				'<header style="height: ' + this.options.headerHeight + this.options.cssUnit + '; line-height: ' + this.options.headerHeight + this.options.cssUnit + '" class="iosselect-header">',
					'<h2 id="iosSelectTitle"></h2>',
					'<a style="height: ' + this.options.headerHeight + this.options.cssUnit + '; line-height: ' + this.options.headerHeight + this.options.cssUnit + '" href="javascript:void(0)" class="close">??????</a>',
					'<a style="height: ' + this.options.headerHeight + this.options.cssUnit + '; line-height: ' + this.options.headerHeight + this.options.cssUnit + '" href="javascript:void(0)" class="sure">??????</a>',
				'</header>',
				'<section class="iosselect-box">',
					'<div class="one-level-contain" id="oneLevelContain">',
						'<ul class="select-one-level">',
						'</ul>',
					'</div>',
					'<div class="two-level-contain" id="twoLevelContain">',
						'<ul class="select-two-level">',
						'</ul>',
					'</div>',
					'<div class="three-level-contain" id="threeLevelContain">',
						'<ul class="select-three-level">',
						'</ul>',
					'</div>',
					'<div class="four-level-contain" id="fourLevelContain">',
						'<ul class="select-four-level">',
						'</ul>',
					'</div>',
					'<div class="five-level-contain" id="fiveLevelContain">',
						'<ul class="select-five-level">',
						'</ul>',
					'</div>',
				'</section>',
				'<hr class="cover-area1"/>',
				'<hr class="cover-area2"/>',
				'<div class="ios-select-loading-box" id="iosSelectLoadingBox">',
				    '<div class="ios-select-loading"></div>',
				'</div>'
			].join('\r\n');
			this.iosSelectLayer = new Layer(all_html, {
				className: 'ios-select-widget-box ' + this.typeBox + (this.options.addClassName? ' ' + this.options.addClassName: ''),
				container: this.options.container || ''
			});

			this.iosSelectTitleDom = document.querySelector('#iosSelectTitle');
			this.iosSelectLoadingBoxDom = document.getElementById('iosSelectLoadingBox');
			if (this.options.title) {
				this.iosSelectTitleDom.innerHTML = this.options.title;
			}

			if (this.options.headerHeight && this.options.itemHeight) {
				this.coverArea1Dom = document.querySelector('.cover-area1');
				this.coverArea1Dom.style.top = this.options.headerHeight + this.options.itemHeight * 3 + this.options.cssUnit;

				this.coverArea2Dom = document.querySelector('.cover-area2');
				this.coverArea2Dom.style.top = this.options.headerHeight + this.options.itemHeight * 4 + this.options.cssUnit;
			}

			this.oneLevelContainDom = document.querySelector('#oneLevelContain');
			this.twoLevelContainDom = document.querySelector('#twoLevelContain');
			this.threeLevelContainDom = document.querySelector('#threeLevelContain');
			this.fourLevelContainDom = document.querySelector('#fourLevelContain');
			this.fiveLevelContainDom = document.querySelector('#fiveLevelContain');

			this.oneLevelUlContainDom = document.querySelector('.select-one-level');
			this.twoLevelUlContainDom = document.querySelector('.select-two-level');
			this.threeLevelUlContainDom = document.querySelector('.select-three-level');
			this.fourLevelUlContainDom = document.querySelector('.select-four-level');
			this.fiveLevelUlContainDom = document.querySelector('.select-five-level');

			this.iosSelectLayer.el.querySelector('.layer').style.height = this.options.itemHeight * 7 + this.options.headerHeight + this.options.cssUnit;

			this.oneLevelContainDom.style.height = this.options.itemHeight * 7 + this.options.cssUnit;

			this.offsetTop = document.body.scrollTop;
			document.body.classList.add('ios-select-body-class');
			window.scrollTo(0, 0);

			this.scrollOne = new IScroll('#oneLevelContain', {
				probeType: 3,
				bounce: false
			});
			this.scrollOne.on('scrollStart', function() {
				Array.prototype.slice.call(self.oneLevelContainDom.querySelectorAll('li')).forEach(function(v, i, o) {
					if (v.classList.contains('at')) {
						v.classList.remove('at');
					} else if (v.classList.contains('side1')) {
						v.classList.remove('side1');
					} else if (v.classList.contains('side2')) {
						v.classList.remove('side2');
					}
				});
			});
			this.scrollOne.on('scroll', function() {
				var pa = Math.abs(this.y / self.baseSize) / self.options.itemHeight;
				var plast = 1;

				plast = Math.round(pa) + 1;
				Array.prototype.slice.call(self.oneLevelContainDom.querySelectorAll('li')).forEach(function(v, i, o) {
					if (v.classList.contains('at')) {
						v.classList.remove('at');
					} else if (v.classList.contains('side1')) {
						v.classList.remove('side1');
					} else if (v.classList.contains('side2')) {
						v.classList.remove('side2');
					}
				});

				var pdom = self.oneLevelContainDom.querySelector('li:nth-child(' + (plast + 3) + ')');
				pdom.classList.add('at');

				self.oneLevelContainDom.querySelector('li:nth-child(' + (plast + 2) + ')').classList.add('side1');
				self.oneLevelContainDom.querySelector('li:nth-child(' + (plast + 1) + ')').classList.add('side2');
				self.oneLevelContainDom.querySelector('li:nth-child(' + (plast + 4) + ')').classList.add('side1');
				self.oneLevelContainDom.querySelector('li:nth-child(' + (plast + 5) + ')').classList.add('side2');
			});
			this.scrollOne.on('scrollEnd', function() {
				var pa = Math.abs(this.y / self.baseSize) / self.options.itemHeight;
				var plast = 1;
				var to = 0;
				if (Math.ceil(pa) === Math.round(pa)) {
					to = Math.ceil(pa) * self.options.itemHeight * self.baseSize;
					plast = Math.ceil(pa) + 1;
				} else {
					to = Math.floor(pa) * self.options.itemHeight * self.baseSize;
					plast = Math.floor(pa) + 1;
				}
				self.scrollOne.scrollTo(0, -to, 0);

				var pdom = self.oneLevelContainDom.querySelector('li:nth-child(' + (plast + 3) + ')');

				Array.prototype.slice.call(self.oneLevelContainDom.querySelectorAll('li')).forEach(function(v, i, o) {
					if (v.classList.contains('at')) {
						v.classList.remove('at');
					} else if (v.classList.contains('side1')) {
						v.classList.remove('side1');
					} else if (v.classList.contains('side2')) {
						v.classList.remove('side2');
					}
				});

				pdom.classList.add('at');

				self.oneLevelContainDom.querySelector('li:nth-child(' + (plast + 2) + ')').classList.add('side1');
				self.oneLevelContainDom.querySelector('li:nth-child(' + (plast + 1) + ')').classList.add('side2');
				self.oneLevelContainDom.querySelector('li:nth-child(' + (plast + 4) + ')').classList.add('side1');
				self.oneLevelContainDom.querySelector('li:nth-child(' + (plast + 5) + ')').classList.add('side2');

				self.selectOneObj = iosSelectUtil.attrToData(pdom, plast);

				if (self.level > 1 && self.options.oneTwoRelation === 1) {
					self.setTwoLevel(self.selectOneObj.id, self.selectTwoObj.id, self.selectThreeObj.id, self.selectFourObj.id, self.selectFiveObj.id);
				}
			});
			if (this.level >= 2) {
				this.twoLevelContainDom.style.height = this.options.itemHeight * 7 + this.options.cssUnit;
				this.scrollTwo = new IScroll('#twoLevelContain', {
					probeType: 3,
					bounce: false
				});
				this.scrollTwo.on('scrollStart', function() {
					Array.prototype.slice.call(self.twoLevelContainDom.querySelectorAll('li')).forEach(function(v, i, o) {
						if (v.classList.contains('at')) {
							v.classList.remove('at');
						} else if (v.classList.contains('side1')) {
							v.classList.remove('side1');
						} else if (v.classList.contains('side2')) {
							v.classList.remove('side2');
						}
					});
				});
				this.scrollTwo.on('scroll', function() {
					var pa = Math.abs(this.y / self.baseSize) / self.options.itemHeight;
					var plast = 0;
					plast = Math.round(pa) + 1;

					var cdom = self.twoLevelContainDom.querySelector('li:nth-child(' + (plast + 3) + ')');

					Array.prototype.slice.call(self.twoLevelContainDom.querySelectorAll('li')).forEach(function(v, i, o) {
						if (v.classList.contains('at')) {
							v.classList.remove('at');
						} else if (v.classList.contains('side1')) {
							v.classList.remove('side1');
						} else if (v.classList.contains('side2')) {
							v.classList.remove('side2');
						}
					});

					cdom.classList.add('at');

					self.twoLevelContainDom.querySelector('li:nth-child(' + (plast + 2) + ')').classList.add('side1');
					self.twoLevelContainDom.querySelector('li:nth-child(' + (plast + 1) + ')').classList.add('side2');
					self.twoLevelContainDom.querySelector('li:nth-child(' + (plast + 4) + ')').classList.add('side1');
					self.twoLevelContainDom.querySelector('li:nth-child(' + (plast + 5) + ')').classList.add('side2');
				});
				this.scrollTwo.on('scrollEnd', function() {
					var pa = Math.abs(this.y / self.baseSize) / self.options.itemHeight;
					var plast = 1;
					var to = 0;
					if (Math.ceil(pa) === Math.round(pa)) {
						to = Math.ceil(pa) * self.options.itemHeight * self.baseSize;
						plast = Math.ceil(pa) + 1;
					} else {
						to = Math.floor(pa) * self.options.itemHeight * self.baseSize;
						plast = Math.floor(pa) + 1;
					}
					self.scrollTwo.scrollTo(0, -to, 0);

					var cdom = self.twoLevelContainDom.querySelector('li:nth-child(' + (plast + 3) + ')');

					Array.prototype.slice.call(self.twoLevelContainDom.querySelectorAll('li')).forEach(function(v, i, o) {
						if (v.classList.contains('at')) {
							v.classList.remove('at');
						} else if (v.classList.contains('side1')) {
							v.classList.remove('side1');
						} else if (v.classList.contains('side2')) {
							v.classList.remove('side2');
						}
					});

					cdom.classList.add('at');

					self.twoLevelContainDom.querySelector('li:nth-child(' + (plast + 2) + ')').classList.add('side1');
					self.twoLevelContainDom.querySelector('li:nth-child(' + (plast + 1) + ')').classList.add('side2');
					self.twoLevelContainDom.querySelector('li:nth-child(' + (plast + 4) + ')').classList.add('side1');
					self.twoLevelContainDom.querySelector('li:nth-child(' + (plast + 5) + ')').classList.add('side2');

					self.selectTwoObj = iosSelectUtil.attrToData(cdom, plast);

					if (self.level > 2 && self.options.twoThreeRelation === 1) {
						self.setThreeLevel(self.selectOneObj.id, self.selectTwoObj.id, self.selectThreeObj.id, self.selectFourObj.id, self.selectFiveObj.id);
					}
				});
			}
			if (this.level >= 3) {
				this.threeLevelContainDom.style.height = this.options.itemHeight * 7 + this.options.cssUnit;
				this.scrollThree = new IScroll('#threeLevelContain', {
					probeType: 3,
					bounce: false
				});
				this.scrollThree.on('scrollStart', function() {
					Array.prototype.slice.call(self.threeLevelContainDom.querySelectorAll('li')).forEach(function(v, i, o) {
						if (v.classList.contains('at')) {
							v.classList.remove('at');
						} else if (v.classList.contains('side1')) {
							v.classList.remove('side1');
						} else if (v.classList.contains('side2')) {
							v.classList.remove('side2');
						}
					});
				});
				this.scrollThree.on('scroll', function() {
					var pa = Math.abs(this.y / self.baseSize) / self.options.itemHeight;
					var plast = 0;
					plast = Math.round(pa) + 1;

					var ddom = self.threeLevelContainDom.querySelector('li:nth-child(' + (plast + 3) + ')');

					Array.prototype.slice.call(self.threeLevelContainDom.querySelectorAll('li')).forEach(function(v, i, o) {
						if (v.classList.contains('at')) {
							v.classList.remove('at');
						} else if (v.classList.contains('side1')) {
							v.classList.remove('side1');
						} else if (v.classList.contains('side2')) {
							v.classList.remove('side2');
						}
					});

					ddom.classList.add('at');

					self.threeLevelContainDom.querySelector('li:nth-child(' + (plast + 2) + ')').classList.add('side1');
					self.threeLevelContainDom.querySelector('li:nth-child(' + (plast + 1) + ')').classList.add('side2');
					self.threeLevelContainDom.querySelector('li:nth-child(' + (plast + 4) + ')').classList.add('side1');
					self.threeLevelContainDom.querySelector('li:nth-child(' + (plast + 5) + ')').classList.add('side2');
				});
				this.scrollThree.on('scrollEnd', function() {
					var pa = Math.abs(this.y / self.baseSize) / self.options.itemHeight;
					var plast = 1;
					var to = 0;
					if (Math.ceil(pa) === Math.round(pa)) {
						to = Math.ceil(pa) * self.options.itemHeight * self.baseSize;
						plast = Math.ceil(pa) + 1;
					} else {
						to = Math.floor(pa) * self.options.itemHeight * self.baseSize;
						plast = Math.floor(pa) + 1;
					}
					self.scrollThree.scrollTo(0, -to, 0);

					var ddom = self.threeLevelContainDom.querySelector('li:nth-child(' + (plast + 3) + ')');

					Array.prototype.slice.call(self.threeLevelContainDom.querySelectorAll('li')).forEach(function(v, i, o) {
						if (v.classList.contains('at')) {
							v.classList.remove('at');
						} else if (v.classList.contains('side1')) {
							v.classList.remove('side1');
						} else if (v.classList.contains('side2')) {
							v.classList.remove('side2');
						}
					});

					ddom.classList.add('at');

					self.threeLevelContainDom.querySelector('li:nth-child(' + (plast + 2) + ')').classList.add('side1');
					self.threeLevelContainDom.querySelector('li:nth-child(' + (plast + 1) + ')').classList.add('side2');
					self.threeLevelContainDom.querySelector('li:nth-child(' + (plast + 4) + ')').classList.add('side1');
					self.threeLevelContainDom.querySelector('li:nth-child(' + (plast + 5) + ')').classList.add('side2');

					self.selectThreeObj = iosSelectUtil.attrToData(ddom, plast);
					if (self.level >= 4 && self.options.threeFourRelation === 1) {
						self.setFourLevel(self.selectOneObj.id, self.selectTwoObj.id, self.selectThreeObj.id, self.selectFourObj.id, self.selectFiveObj.id);
					}
				});
			}
			if (this.level >= 4) {
				this.fourLevelContainDom.style.height = this.options.itemHeight * 7 + this.options.cssUnit;
				this.scrollFour = new IScroll('#fourLevelContain', {
					probeType: 3,
					bounce: false
				});
				this.scrollFour.on('scrollStart', function() {
					Array.prototype.slice.call(self.fourLevelContainDom.querySelectorAll('li')).forEach(function(v, i, o) {
						if (v.classList.contains('at')) {
							v.classList.remove('at');
						} else if (v.classList.contains('side1')) {
							v.classList.remove('side1');
						} else if (v.classList.contains('side2')) {
							v.classList.remove('side2');
						}
					});
				});
				this.scrollFour.on('scroll', function() {
					var pa = Math.abs(this.y / self.baseSize) / self.options.itemHeight;
					var plast = 0;
					plast = Math.round(pa) + 1;

					var ddom = self.fourLevelContainDom.querySelector('li:nth-child(' + (plast + 3) + ')');

					Array.prototype.slice.call(self.fourLevelContainDom.querySelectorAll('li')).forEach(function(v, i, o) {
						if (v.classList.contains('at')) {
							v.classList.remove('at');
						} else if (v.classList.contains('side1')) {
							v.classList.remove('side1');
						} else if (v.classList.contains('side2')) {
							v.classList.remove('side2');
						}
					});

					ddom.classList.add('at');

					self.fourLevelContainDom.querySelector('li:nth-child(' + (plast + 2) + ')').classList.add('side1');
					self.fourLevelContainDom.querySelector('li:nth-child(' + (plast + 1) + ')').classList.add('side2');
					self.fourLevelContainDom.querySelector('li:nth-child(' + (plast + 4) + ')').classList.add('side1');
					self.fourLevelContainDom.querySelector('li:nth-child(' + (plast + 5) + ')').classList.add('side2');
				});
				this.scrollFour.on('scrollEnd', function() {
					var pa = Math.abs(this.y / self.baseSize) / self.options.itemHeight;
					var plast = 1;
					var to = 0;
					if (Math.ceil(pa) === Math.round(pa)) {
						to = Math.ceil(pa) * self.options.itemHeight * self.baseSize;
						plast = Math.ceil(pa) + 1;
					} else {
						to = Math.floor(pa) * self.options.itemHeight * self.baseSize;
						plast = Math.floor(pa) + 1;
					}
					self.scrollFour.scrollTo(0, -to, 0);

					var ddom = self.fourLevelContainDom.querySelector('li:nth-child(' + (plast + 3) + ')');

					Array.prototype.slice.call(self.fourLevelContainDom.querySelectorAll('li')).forEach(function(v, i, o) {
						if (v.classList.contains('at')) {
							v.classList.remove('at');
						} else if (v.classList.contains('side1')) {
							v.classList.remove('side1');
						} else if (v.classList.contains('side2')) {
							v.classList.remove('side2');
						}
					});

					ddom.classList.add('at');

					self.fourLevelContainDom.querySelector('li:nth-child(' + (plast + 2) + ')').classList.add('side1');
					self.fourLevelContainDom.querySelector('li:nth-child(' + (plast + 1) + ')').classList.add('side2');
					self.fourLevelContainDom.querySelector('li:nth-child(' + (plast + 4) + ')').classList.add('side1');
					self.fourLevelContainDom.querySelector('li:nth-child(' + (plast + 5) + ')').classList.add('side2');

					self.selectFourObj = iosSelectUtil.attrToData(ddom, plast);

					if (self.level >= 5 && self.options.fourFiveRelation === 1) {
						self.setFiveLevel(self.selectOneObj.id, self.selectTwoObj.id, self.selectThreeObj.id, self.selectFourObj.id, self.selectFiveObj.id);
					}
				});
			}
			if (this.level >= 5) {
				this.fiveLevelContainDom.style.height = this.options.itemHeight * 7 + this.options.cssUnit;
				this.scrollFive = new IScroll('#fiveLevelContain', {
					probeType: 3,
					bounce: false
				});
				this.scrollFive.on('scrollStart', function() {
					Array.prototype.slice.call(self.fiveLevelContainDom.querySelectorAll('li')).forEach(function(v, i, o) {
						if (v.classList.contains('at')) {
							v.classList.remove('at');
						} else if (v.classList.contains('side1')) {
							v.classList.remove('side1');
						} else if (v.classList.contains('side2')) {
							v.classList.remove('side2');
						}
					});
				});
				this.scrollFive.on('scroll', function() {
					var pa = Math.abs(this.y / self.baseSize) / self.options.itemHeight;
					var plast = 0;
					plast = Math.round(pa) + 1;

					var ddom = self.fiveLevelContainDom.querySelector('li:nth-child(' + (plast + 3) + ')');

					Array.prototype.slice.call(self.fiveLevelContainDom.querySelectorAll('li')).forEach(function(v, i, o) {
						if (v.classList.contains('at')) {
							v.classList.remove('at');
						} else if (v.classList.contains('side1')) {
							v.classList.remove('side1');
						} else if (v.classList.contains('side2')) {
							v.classList.remove('side2');
						}
					});

					ddom.classList.add('at');

					self.fiveLevelContainDom.querySelector('li:nth-child(' + (plast + 2) + ')').classList.add('side1');
					self.fiveLevelContainDom.querySelector('li:nth-child(' + (plast + 1) + ')').classList.add('side2');
					self.fiveLevelContainDom.querySelector('li:nth-child(' + (plast + 4) + ')').classList.add('side1');
					self.fiveLevelContainDom.querySelector('li:nth-child(' + (plast + 5) + ')').classList.add('side2');
				});
				this.scrollFive.on('scrollEnd', function() {
					var pa = Math.abs(this.y / self.baseSize) / self.options.itemHeight;
					var plast = 1;
					var to = 0;
					if (Math.ceil(pa) === Math.round(pa)) {
						to = Math.ceil(pa) * self.options.itemHeight * self.baseSize;
						plast = Math.ceil(pa) + 1;
					} else {
						to = Math.floor(pa) * self.options.itemHeight * self.baseSize;
						plast = Math.floor(pa) + 1;
					}
					self.scrollFive.scrollTo(0, -to, 0);

					var ddom = self.fiveLevelContainDom.querySelector('li:nth-child(' + (plast + 3) + ')');

					Array.prototype.slice.call(self.fiveLevelContainDom.querySelectorAll('li')).forEach(function(v, i, o) {
						if (v.classList.contains('at')) {
							v.classList.remove('at');
						} else if (v.classList.contains('side1')) {
							v.classList.remove('side1');
						} else if (v.classList.contains('side2')) {
							v.classList.remove('side2');
						}
					});

					ddom.classList.add('at');

					self.fiveLevelContainDom.querySelector('li:nth-child(' + (plast + 2) + ')').classList.add('side1');
					self.fiveLevelContainDom.querySelector('li:nth-child(' + (plast + 1) + ')').classList.add('side2');
					self.fiveLevelContainDom.querySelector('li:nth-child(' + (plast + 4) + ')').classList.add('side1');
					self.fiveLevelContainDom.querySelector('li:nth-child(' + (plast + 5) + ')').classList.add('side2');

					self.selectFiveObj = iosSelectUtil.attrToData(ddom, plast);
				});
			}

			// ?????? ?????? ??????
			this.closeBtnDom = this.iosSelectLayer.el.querySelector('.close');
			this.closeBtnDom.addEventListener('click', function(e) {
				if (document.body.classList.contains('ios-select-body-class')) {
					document.body.classList.remove('ios-select-body-class');
				}
				window.scrollTo(0, self.offsetTop);
			});

			this.selectBtnDom = this.iosSelectLayer.el.querySelector('.sure');
			this.selectBtnDom.addEventListener('click', function(e) {
				if (document.body.classList.contains('ios-select-body-class')) {
					document.body.classList.remove('ios-select-body-class');
				}
				window.scrollTo(0, self.offsetTop);
				self.callback && self.callback(self.selectOneObj, self.selectTwoObj, self.selectThreeObj, self.selectFourObj, self.selectFiveObj);
			});
		},
		loadingShow: function() {
			this.options.showLoading && (this.iosSelectLoadingBoxDom.style.display = 'block');
		},
		loadingHide: function() {
			this.iosSelectLoadingBoxDom.style.display = 'none';
		},
		getOneLevel: function() {
			return this.data[0];
		},
		setOneLevel: function(oneLevelId, twoLevelId, threeLevelId, fourLevelId, fiveLevelId) {
			if (iosSelectUtil.isArray(this.data[0])){
				var oneLevelData = this.getOneLevel();
				this.renderOneLevel(oneLevelId, twoLevelId, threeLevelId, fourLevelId, fiveLevelId, oneLevelData);
			}
			else if (iosSelectUtil.isFunction(this.data[0])) {
				this.loadingShow();
				this.data[0](function(oneLevelData) {
					this.loadingHide();
					this.renderOneLevel(oneLevelId, twoLevelId, threeLevelId, fourLevelId, fiveLevelId, oneLevelData);
				}.bind(this));
			}
			else {
				throw new Error('data format error');
			}
		},
		renderOneLevel: function(oneLevelId, twoLevelId, threeLevelId, fourLevelId, fiveLevelId, oneLevelData) {
			var hasAtId = oneLevelData.some(function(v, i, o) {
				return v.id == oneLevelId;
			});
			if (!hasAtId) {
				oneLevelId = oneLevelData[0]['id'];
			}
			var oneHtml = '';
			var self = this;
			var atIndex = 0;
			oneHtml += '<li style="height: ' + this.options.itemHeight + this.options.cssUnit + '; line-height: ' + this.options.itemHeight + this.options.cssUnit +';"></li>';
			oneHtml += '<li style="height: ' + this.options.itemHeight + this.options.cssUnit + '; line-height: ' + this.options.itemHeight + this.options.cssUnit +';"></li>';
			oneHtml += '<li style="height: ' + this.options.itemHeight + this.options.cssUnit + '; line-height: ' + this.options.itemHeight + this.options.cssUnit +';"></li>';
			oneLevelData.forEach(function(v, i, o) {
				if (v.id == oneLevelId) {
					oneHtml += '<li style="height: ' + this.options.itemHeight + this.options.cssUnit + '; line-height: ' + this.options.itemHeight + this.options.cssUnit +';" ' + iosSelectUtil.attrToHtml(v) + ' class="at">' + v.value + '</li>';
					atIndex = i + 1 + 3;
				} else {
					oneHtml += '<li style="height: ' + this.options.itemHeight + this.options.cssUnit + '; line-height: ' + this.options.itemHeight + this.options.cssUnit +';"' + iosSelectUtil.attrToHtml(v) + '>' + v.value + '</li>';
				}
			}.bind(this));
			oneHtml += '<li style="height: ' + this.options.itemHeight + this.options.cssUnit + '; line-height: ' + this.options.itemHeight + this.options.cssUnit +';"></li>';
			oneHtml += '<li style="height: ' + this.options.itemHeight + this.options.cssUnit + '; line-height: ' + this.options.itemHeight + this.options.cssUnit +';"></li>';
			oneHtml += '<li style="height: ' + this.options.itemHeight + this.options.cssUnit + '; line-height: ' + this.options.itemHeight + this.options.cssUnit +';"></li>';
			this.oneLevelUlContainDom.innerHTML = oneHtml;

			this.scrollOne.refresh();
			this.scrollOne.scrollToElement('li:nth-child(' + (atIndex - 3) + ')', 0);
			if (this.level >= 2) {
				this.setTwoLevel(oneLevelId, twoLevelId, threeLevelId, fourLevelId, fiveLevelId);
			}

			var pdom = this.oneLevelContainDom.querySelector('.at');
			this.oneLevelContainDom.querySelector('li:nth-child(' + (atIndex - 1) + ')').classList.add('side1');
			this.oneLevelContainDom.querySelector('li:nth-child(' + (atIndex - 2) + ')').classList.add('side2');
			this.oneLevelContainDom.querySelector('li:nth-child(' + (atIndex + 1) + ')').classList.add('side1');
			this.oneLevelContainDom.querySelector('li:nth-child(' + (atIndex + 2) + ')').classList.add('side2');

			this.selectOneObj = iosSelectUtil.attrToData(pdom, atIndex);
		},
		getTwoLevel: function(oneLevelId) {
			var twoLevelData = [];
			if (this.options.oneTwoRelation === 1) {
				this.data[1].forEach(function(v, i, o) {
					if (v['parentId'] === oneLevelId) {
						twoLevelData.push(v);
					}
				});
			} else {
				twoLevelData = this.data[1];
			}
			return twoLevelData;
		},
		setTwoLevel: function(oneLevelId, twoLevelId, threeLevelId, fourLevelId, fiveLevelId) {
			if (iosSelectUtil.isArray(this.data[1])) {
				var twoLevelData = this.getTwoLevel(oneLevelId);
				this.renderTwoLevel(oneLevelId, twoLevelId, threeLevelId, fourLevelId, fiveLevelId, twoLevelData);
			}
			else if (iosSelectUtil.isFunction(this.data[1])) {
				this.loadingShow();
				this.data[1](oneLevelId, function(twoLevelData) {
					this.loadingHide();
					this.renderTwoLevel(oneLevelId, twoLevelId, threeLevelId, fourLevelId, fiveLevelId, twoLevelData);
				}.bind(this));
			}
			else {
				throw new Error('data format error');
			}
		},
		renderTwoLevel: function(oneLevelId, twoLevelId, threeLevelId, fourLevelId, fiveLevelId, twoLevelData) {
			var atIndex = 0;
			var hasAtId = twoLevelData.some(function(v, i, o) {
				return v.id == twoLevelId;
			});
			if (!hasAtId) {
				twoLevelId = twoLevelData[0]['id'];
			}
			var twoHtml = '';
			var self = this;
			twoHtml += '<li style="height: ' + this.options.itemHeight + this.options.cssUnit + '; line-height: ' + this.options.itemHeight + this.options.cssUnit +';"></li>';
			twoHtml += '<li style="height: ' + this.options.itemHeight + this.options.cssUnit + '; line-height: ' + this.options.itemHeight + this.options.cssUnit +';"></li>';
			twoHtml += '<li style="height: ' + this.options.itemHeight + this.options.cssUnit + '; line-height: ' + this.options.itemHeight + this.options.cssUnit +';"></li>';
			twoLevelData.forEach(function(v, i, o) {
				if (v.id == twoLevelId) {
					twoHtml += '<li style="height: ' + this.options.itemHeight + this.options.cssUnit + '; line-height: ' + this.options.itemHeight + this.options.cssUnit +';"' + iosSelectUtil.attrToHtml(v) + ' class="at">' + v.value + '</li>';
					atIndex = i + 1 + 3;
				} else {
					twoHtml += '<li style="height: ' + this.options.itemHeight + this.options.cssUnit + '; line-height: ' + this.options.itemHeight + this.options.cssUnit +';"' + iosSelectUtil.attrToHtml(v) + '>' + v.value + '</li>';
				}
			}.bind(this));
			twoHtml += '<li style="height: ' + this.options.itemHeight + this.options.cssUnit + '; line-height: ' + this.options.itemHeight + this.options.cssUnit +';"></li>';
			twoHtml += '<li style="height: ' + this.options.itemHeight + this.options.cssUnit + '; line-height: ' + this.options.itemHeight + this.options.cssUnit +';"></li>';
			twoHtml += '<li style="height: ' + this.options.itemHeight + this.options.cssUnit + '; line-height: ' + this.options.itemHeight + this.options.cssUnit +';"></li>';
			this.twoLevelUlContainDom.innerHTML = twoHtml;
			this.scrollTwo.refresh();
			this.scrollTwo.scrollToElement(':nth-child(' + (atIndex - 3) + ')', 0);
			if (this.level >= 3) {
				this.setThreeLevel(oneLevelId, twoLevelId, threeLevelId, fourLevelId, fiveLevelId);
			}

			var cdom = self.twoLevelContainDom.querySelector('li:nth-child(' + atIndex + ')');
			cdom.classList.add('at');
			self.twoLevelContainDom.querySelector('li:nth-child(' + (atIndex - 1) + ')').classList.add('side1');
			self.twoLevelContainDom.querySelector('li:nth-child(' + (atIndex - 2) + ')').classList.add('side2');
			self.twoLevelContainDom.querySelector('li:nth-child(' + (atIndex + 1) + ')').classList.add('side1');
			self.twoLevelContainDom.querySelector('li:nth-child(' + (atIndex + 2) + ')').classList.add('side2');

			self.selectTwoObj = iosSelectUtil.attrToData(cdom, atIndex);
		},
		getThreeLevel: function(oneLevelId, twoLevelId) {
			var threeLevelData = [];
			if (this.options.twoThreeRelation === 1) {
				this.data[2].forEach(function(v, i, o) {
					if (v['parentId'] === twoLevelId) {
						threeLevelData.push(v);
					}
				});
			} else {
				threeLevelData = this.data[2];
			}
			return threeLevelData;
		},
		setThreeLevel: function(oneLevelId, twoLevelId, threeLevelId, fourLevelId, fiveLevelId) {
			if (iosSelectUtil.isArray(this.data[2])) {
				var threeLevelData = this.getThreeLevel(oneLevelId, twoLevelId);
				this.renderThreeLevel(oneLevelId, twoLevelId, threeLevelId, fourLevelId, fiveLevelId, threeLevelData);
			}
			else if (iosSelectUtil.isFunction(this.data[2])) {
				this.loadingShow();
				this.data[2](oneLevelId, twoLevelId, function(threeLevelData) {
					this.loadingHide();
					this.renderThreeLevel(oneLevelId, twoLevelId, threeLevelId, fourLevelId, fiveLevelId, threeLevelData);
				}.bind(this));
			}
			else {
				throw new Error('data format error');
			}
		},
	    renderThreeLevel: function(oneLevelId, twoLevelId, threeLevelId, fourLevelId, fiveLevelId, threeLevelData) {
	    	var atIndex = 0;
			var hasAtId = threeLevelData.some(function(v, i, o) {
				return v.id == threeLevelId;
			});
			if (!hasAtId) {
				threeLevelId = threeLevelData[0]['id'];
			}
			var threeHtml = '';
			var self = this;
			threeHtml += '<li style="height: ' + this.options.itemHeight +this.options.cssUnit +  '; line-height: ' + this.options.itemHeight +this.options.cssUnit + '"></li>';
			threeHtml += '<li style="height: ' + this.options.itemHeight +this.options.cssUnit +  '; line-height: ' + this.options.itemHeight +this.options.cssUnit + '"></li>';
			threeHtml += '<li style="height: ' + this.options.itemHeight +this.options.cssUnit +  '; line-height: ' + this.options.itemHeight +this.options.cssUnit + '"></li>';
			threeLevelData.forEach(function(v, i, o) {
				if (v.id == threeLevelId) {
					threeHtml += '<li style="height: ' + this.options.itemHeight + this.options.cssUnit + '; line-height: ' + this.options.itemHeight + this.options.cssUnit +';"' + iosSelectUtil.attrToHtml(v) + ' class="at">' + v.value + '</li>';
					atIndex = i + 1 + 3;
				} else {
					threeHtml += '<li style="height: ' + this.options.itemHeight + this.options.cssUnit + '; line-height: ' + this.options.itemHeight + this.options.cssUnit +';"' + iosSelectUtil.attrToHtml(v) + '>' + v.value + '</li>';
				}
			}.bind(this));
			threeHtml += '<li style="height: ' + this.options.itemHeight +this.options.cssUnit +  '; line-height: ' + this.options.itemHeight +this.options.cssUnit + '"></li>';
			threeHtml += '<li style="height: ' + this.options.itemHeight +this.options.cssUnit +  '; line-height: ' + this.options.itemHeight +this.options.cssUnit + '"></li>';
			threeHtml += '<li style="height: ' + this.options.itemHeight +this.options.cssUnit +  '; line-height: ' + this.options.itemHeight +this.options.cssUnit + '"></li>';
			this.threeLevelUlContainDom.innerHTML = threeHtml;
			this.scrollThree.refresh();
			this.scrollThree.scrollToElement(':nth-child(' + (atIndex - 3) + ')', 0);

			if (this.level >= 4) {
				this.setFourLevel(oneLevelId, twoLevelId, threeLevelId, fourLevelId, fiveLevelId);
			}

			var ddom = self.threeLevelContainDom.querySelector('li:nth-child(' + atIndex + ')');
			ddom.classList.add('at');
			self.threeLevelContainDom.querySelector('li:nth-child(' + (atIndex - 1) + ')').classList.add('side1');
			self.threeLevelContainDom.querySelector('li:nth-child(' + (atIndex - 2) + ')').classList.add('side2');
			self.threeLevelContainDom.querySelector('li:nth-child(' + (atIndex + 1) + ')').classList.add('side1');
			self.threeLevelContainDom.querySelector('li:nth-child(' + (atIndex + 2) + ')').classList.add('side2');

			self.selectThreeObj = iosSelectUtil.attrToData(ddom, atIndex);
	    },
	    getFourLevel: function(oneLevelId, twoLevelId, threeLevelId) {
			var fourLevelData = [];
			if (this.options.threeFourRelation === 1) {
				this.data[3].forEach(function(v, i, o) {
					if (v['parentId'] === threeLevelId) {
						fourLevelData.push(v);
					}
				});
			} else {
				fourLevelData = this.data[3];
			}
			return fourLevelData;
		},
		setFourLevel: function(oneLevelId, twoLevelId, threeLevelId, fourLevelId, fiveLevelId) {
			if (iosSelectUtil.isArray(this.data[3])) {
				var fourLevelData = this.getFourLevel(oneLevelId, twoLevelId, threeLevelId);
				this.renderFourLevel(oneLevelId, twoLevelId, threeLevelId, fourLevelId, fiveLevelId, fourLevelData);
			}
			else if (iosSelectUtil.isFunction(this.data[3])) {
				this.loadingShow();
				this.data[3](oneLevelId, twoLevelId, threeLevelId, function(fourLevelData) {
					this.loadingHide();
					this.renderFourLevel(oneLevelId, twoLevelId, threeLevelId, fourLevelId, fiveLevelId, fourLevelData);
				}.bind(this));
			}
			else {
				throw new Error('data format error');
			}
		},
	    renderFourLevel: function(oneLevelId, twoLevelId, threeLevelId, fourLevelId, fiveLevelId, fourLevelData) {
	    	var atIndex = 0;
			var hasAtId = fourLevelData.some(function(v, i, o) {
				return v.id == fourLevelId;
			});
			if (!hasAtId) {
				fourLevelId = fourLevelData[0]['id'];
			}
			var fourHtml = '';
			var self = this;
			fourHtml += '<li style="height: ' + this.options.itemHeight +this.options.cssUnit +  '; line-height: ' + this.options.itemHeight +this.options.cssUnit + '"></li>';
			fourHtml += '<li style="height: ' + this.options.itemHeight +this.options.cssUnit +  '; line-height: ' + this.options.itemHeight +this.options.cssUnit + '"></li>';
			fourHtml += '<li style="height: ' + this.options.itemHeight +this.options.cssUnit +  '; line-height: ' + this.options.itemHeight +this.options.cssUnit + '"></li>';
			fourLevelData.forEach(function(v, i, o) {
				if (v.id == fourLevelId) {
					fourHtml += '<li style="height: ' + this.options.itemHeight + this.options.cssUnit + '; line-height: ' + this.options.itemHeight + this.options.cssUnit +';"' + iosSelectUtil.attrToHtml(v) + ' class="at">' + v.value + '</li>';
					atIndex = i + 1 + 3;
				} else {
					fourHtml += '<li style="height: ' + this.options.itemHeight + this.options.cssUnit + '; line-height: ' + this.options.itemHeight + this.options.cssUnit +';"' + iosSelectUtil.attrToHtml(v) + '>' + v.value + '</li>';
				}
			}.bind(this));
			fourHtml += '<li style="height: ' + this.options.itemHeight +this.options.cssUnit +  '; line-height: ' + this.options.itemHeight +this.options.cssUnit + '"></li>';
			fourHtml += '<li style="height: ' + this.options.itemHeight +this.options.cssUnit +  '; line-height: ' + this.options.itemHeight +this.options.cssUnit + '"></li>';
			fourHtml += '<li style="height: ' + this.options.itemHeight +this.options.cssUnit +  '; line-height: ' + this.options.itemHeight +this.options.cssUnit + '"></li>';
			this.fourLevelUlContainDom.innerHTML = fourHtml;
			this.scrollFour.refresh();
			this.scrollFour.scrollToElement(':nth-child(' + (atIndex - 3) + ')', 0);

			if (this.level >= 5) {
				this.setFiveLevel(oneLevelId, twoLevelId, threeLevelId, fourLevelId, fiveLevelId);
			}

			var ddom = self.fourLevelContainDom.querySelector('li:nth-child(' + atIndex + ')');
			ddom.classList.add('at');
			self.fourLevelContainDom.querySelector('li:nth-child(' + (atIndex - 1) + ')').classList.add('side1');
			self.fourLevelContainDom.querySelector('li:nth-child(' + (atIndex - 2) + ')').classList.add('side2');
			self.fourLevelContainDom.querySelector('li:nth-child(' + (atIndex + 1) + ')').classList.add('side1');
			self.fourLevelContainDom.querySelector('li:nth-child(' + (atIndex + 2) + ')').classList.add('side2');

			self.selectFourObj = iosSelectUtil.attrToData(ddom, atIndex);
	    },
	    getFiveLevel: function(oneLevelId, twoLevelId, threeLevelId, fourLevelId) {
			var fiveLevelData = [];
			if (this.options.fourFiveRelation === 1) {
				this.data[4].forEach(function(v, i, o) {
					if (v['parentId'] === fourLevelId) {
						fiveLevelData.push(v);
					}
				});
			} else {
				fiveLevelData = this.data[4];
			}
			return fiveLevelData;
		},
		setFiveLevel: function(oneLevelId, twoLevelId, threeLevelId, fourLevelId, fiveLevelId) {
			if (iosSelectUtil.isArray(this.data[4])) {
				var fiveLevelData = this.getFiveLevel(oneLevelId, twoLevelId, threeLevelId, fourLevelId);
				this.renderFiveLevel(oneLevelId, twoLevelId, threeLevelId, fourLevelId, fiveLevelId, fiveLevelData);
			}
			else if (iosSelectUtil.isFunction(this.data[4])) {
				this.loadingShow();
				this.data[4](oneLevelId, twoLevelId, threeLevelId, fourLevelId, function(fiveLevelData) {
					this.loadingHide();
					this.renderFiveLevel(oneLevelId, twoLevelId, threeLevelId, fourLevelId, fiveLevelId, fiveLevelData);
				}.bind(this));
			}
			else {
				throw new Error('data format error');
			}
		},
	    renderFiveLevel: function(oneLevelId, twoLevelId, threeLevelId, fourLevelId, fiveLevelId, fiveLevelData) {
	    	var atIndex = 0;
			var hasAtId = fiveLevelData.some(function(v, i, o) {
				return v.id == fiveLevelId;
			});
			if (!hasAtId) {
				fiveLevelId = fiveLevelData[0]['id'];
			}
			var fiveHtml = '';
			var self = this;
			fiveHtml += '<li style="height: ' + this.options.itemHeight +this.options.cssUnit +  '; line-height: ' + this.options.itemHeight +this.options.cssUnit + '"></li>';
			fiveHtml += '<li style="height: ' + this.options.itemHeight +this.options.cssUnit +  '; line-height: ' + this.options.itemHeight +this.options.cssUnit + '"></li>';
			fiveHtml += '<li style="height: ' + this.options.itemHeight +this.options.cssUnit +  '; line-height: ' + this.options.itemHeight +this.options.cssUnit + '"></li>';
			fiveLevelData.forEach(function(v, i, o) {
				if (v.id == fiveLevelId) {
					fiveHtml += '<li style="height: ' + this.options.itemHeight + this.options.cssUnit + '; line-height: ' + this.options.itemHeight + this.options.cssUnit +';"' + iosSelectUtil.attrToHtml(v) + ' class="at">' + v.value + '</li>';
					atIndex = i + 1 + 3;
				} else {
					fiveHtml += '<li style="height: ' + this.options.itemHeight + this.options.cssUnit + '; line-height: ' + this.options.itemHeight + this.options.cssUnit +';"' + iosSelectUtil.attrToHtml(v) + '>' + v.value + '</li>';
				}
			}.bind(this));
			fiveHtml += '<li style="height: ' + this.options.itemHeight +this.options.cssUnit +  '; line-height: ' + this.options.itemHeight +this.options.cssUnit + '"></li>';
			fiveHtml += '<li style="height: ' + this.options.itemHeight +this.options.cssUnit +  '; line-height: ' + this.options.itemHeight +this.options.cssUnit + '"></li>';
			fiveHtml += '<li style="height: ' + this.options.itemHeight +this.options.cssUnit +  '; line-height: ' + this.options.itemHeight +this.options.cssUnit + '"></li>';
			this.fiveLevelUlContainDom.innerHTML = fiveHtml;
			this.scrollFive.refresh();
			this.scrollFive.scrollToElement(':nth-child(' + (atIndex - 3) + ')', 0);

			var ddom = self.fiveLevelContainDom.querySelector('li:nth-child(' + atIndex + ')');
			ddom.classList.add('at');
			self.fiveLevelContainDom.querySelector('li:nth-child(' + (atIndex - 1) + ')').classList.add('side1');
			self.fiveLevelContainDom.querySelector('li:nth-child(' + (atIndex - 2) + ')').classList.add('side2');
			self.fiveLevelContainDom.querySelector('li:nth-child(' + (atIndex + 1) + ')').classList.add('side1');
			self.fiveLevelContainDom.querySelector('li:nth-child(' + (atIndex + 2) + ')').classList.add('side2');

			self.selectFiveObj = iosSelectUtil.attrToData(ddom, atIndex);
	    },
	    setBase: function() {
			if (this.options.cssUnit === 'rem') {
				var dltDom = document.documentElement;
				var dltStyle = window.getComputedStyle(dltDom, null);
				var dltFontSize = dltStyle.fontSize;
				try {
					this.baseSize = /\d+/.exec(dltFontSize)[0];
				}
				catch(e) {
					this.baseSize = 1;
				}
			}
			else {
				this.baseSize = 1;
			}
		}
	}
	if (typeof module != 'undefined' && module.exports) {
		module.exports = IosSelect;
	} else if (typeof define == 'function' && define.amd) {
		define(function() {
			return IosSelect;
		});
	} else {
		window.IosSelect = IosSelect;
	}
})();