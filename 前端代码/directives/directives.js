bApp.directive('accountTitle', function(){
	return {
		restrict: 'E',
		scope: false,
		replace: true,
		templateUrl: 'directives/components/account/accountTitle.html'
	};
});;bApp.directive('loginAccountInput', function(){
	return {
		restrict: 'E',
		scope: false,
		replace: true,
		templateUrl: 'directives/components/account/loginAccountInput.html'
	};
});;bApp.directive('loginPassInput', function(){
	return {
		restrict: 'E',
		scope: false,
		replace: true,
		templateUrl: 'directives/components/account/loginPassInput.html'
	};
});;bApp.directive('cardService', ['registerInfo', '$state', function(info, $state){
	var card = {
		icon: 'payment',
		title: '实体卡服务',
		des: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		url: 'error.coding'
	};

	var nocard = {
		icon: 'smartphone',
		title: '虚拟卡服务',
		des: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		url: 'account.register'
	};

	var linkFunc = function(scope, element, attrs){
		if(attrs.content == 'card'){
			scope.con = card;
			element.addClass('service-card');
		}else if(attrs.content == 'nocard'){
			scope.con = nocard;
			element.addClass('service-nocard');
		}

		scope.choseService = function(){
			if(attrs.content == 'card'){
				cardService();
			}else if(attrs.content == 'nocard'){
				noCardService();
			}
		};

		scope.goRegister = function(){
			if( attrs.content == 'card'){
				info.service_type = 2;
				$state.go('error.coding');
			}else if( attrs.content == 'nocard'){
				info.service_type = 1;
				$state.go('account.register');
			}
		};
	};

	var cardService = function(){
			add('service-card');
			cancel('service-nocard');
		};

	var noCardService = function(){
		add('service-nocard');
		cancel('service-card');
	};

	var add = function(type){
		var tar = angular.element(document.getElementsByClassName(type)[0]);
		tar.find('.card-area').addClass('chosen');
		tar.find('.btn-area').addClass('show');
	};

	var cancel = function(type){
		var tar = angular.element(document.getElementsByClassName(type)[0]);
		tar.find('.card-area').removeClass('chosen');
		tar.find('.btn-area').removeClass('show');
	};

	return {
		restrict: 'E',
		replace: true,
		scope: {},
		templateUrl: 'directives/components/account/cardService.html',
		link: linkFunc
	};
}]);;bApp.directive('homeTitle', function($window){
	return {
		restrict: 'E',
		scope: {},
		replace: true,
		templateUrl: 'directives/components/home/homeTitle.html',
		link: function(scope){
			var store = JSON.parse($window.localStorage['store']);
			scope.owner = store.owner_name;
		}
	};
});;bApp.directive('sidebar', function(){
	return {
		restrict: 'E',
		scope: false,
		replace: true,
		templateUrl: 'directives/components/home/sidebar.html'
	};
});;bApp.directive('clipBox', ['$state', function($state){

	var ClipTool = function(id){

		var $box = document.getElementById('clip-box'),
			$clipArea = $box.getElementsByClassName('clip-area')[0],
			$point = $clipArea.getElementsByClassName('point');

		var _image = new Image(),
			_canvas = document.getElementById('clip-canvas'),
			_ctx = _canvas.getContext('2d'),
			_imageX = 0,
			_imageY = 0,
			_imageW = 600,
			_imageH = 400,
			_scale,
			_imageData,
			_clipData;

		var _preCanvas = document.getElementById('preview'),
			_preCtx = _preCanvas.getContext('2d');

		var _init = function(){
			//根据id, 绑定用户的input[type=file]
			var $input = document.getElementById(id);
			var file = null;

			//绑定change事件来及时读取文件
			$input.addEventListener('change', function(){
				file = this.files[0];

				var reader = new FileReader();

				_image.onload = function(){
					_initImage();
					_initClipArea();
				};

				reader.onload = function(){
					_image.src = this.result;
				};

				reader.readAsDataURL(file);
			});
		};

		//初始化上传图像图像
		var _initImage = function(){
			var scale = (_image.width/600 > _image.height/400) ? _image.width/600 : _image.height/400;
			_scale = scale;

			_imageW = Math.ceil(_image.width/scale);
			_imageH = Math.ceil(_image.height/scale);

			if(_imageW < 600){
				_imageY = 0;
				_imageX = (600 - _imageW)/2;
			}else if(_imageH < 400){
				_imageX = 0;
				_imageY = (400 - _imageH)/2;
			}

			_ctx.clearRect(0, 0, 600, 400);
			_ctx.drawImage(_image, _imageX, _imageY, _imageW, _imageH);
			_imageData = _ctx.getImageData(_imageX, _imageY, _imageW, _imageH);
			_clipData = _ctx.getImageData(200, 100, 200, 200);	
			_grayRect();
			_ctx.putImageData(_clipData, 200, 100);
			_drawPre(200, 100, 200, 200);
		};

		//表示未选择区域
		var _grayRect = function(){
			_ctx.beginPath();
			// _ctx.rect(_imageX, _imageY, _imageW, _imageH);
			_ctx.rect(0, 0, 600, 400);
			_ctx.fillStyle = 'rgba(60, 60, 60, 0.6)';
			_ctx.fill();
		};

		//绘制预览区域
		var _drawPre = function(x, y, width, height){
			x = x - _imageX;
			y = y - _imageY;
			console.log(x, y, width, height);
			x *= _scale;
			y *= _scale;
			width *= _scale;
			height *= _scale;
			_preCtx.drawImage(_image, x, y, width, height, 0, 0, 200, 200);
		};

		//初始化剪裁框
		var _initClipArea = function(){
			$clipArea.style.top = 100 + 'px';
			$clipArea.style.left = 200 + 'px';
			$clipArea.style.width = 198 + 'px';
			$clipArea.style.height = 198 + 'px';

			_drag();
		};

		var _drag = function(){
			var isDrag = false,
				isLT = false,
				isRT = false,
				isRB = false,
				isLB = false,
				beginX = 0,
				beginY = 0,
				moveX = 0,
				moveY = 0;

			$clipArea.addEventListener('mousedown', function(e){
				isDrag = true;

				beginX = e.clientX;
				beginY = e.clientY;
			});

			$point[0].addEventListener('mousedown', function(e){
				e.stopPropagation();

				isLT = true;
				
				beginX = e.clientX;
				beginY = e.clientY;
			});

			$point[1].addEventListener('mousedown', function(e){
				e.stopPropagation();
				
				isRT = true;
				
				beginX = e.clientX;
				beginY = e.clientY;
			});

			$point[2].addEventListener('mousedown', function(e){
				e.stopPropagation();
				
				isRB = true;

				beginX = e.clientX;
				beginY = e.clientY;
			});

			$point[3].addEventListener('mousedown', function(e){
				e.stopPropagation();
				
				isLB = true;

				beginX = e.clientX;
				beginY = e.clientY;
			});

			$box.addEventListener('mousemove', function(e){

				moveX = e.clientX - beginX;
				moveY = e.clientY - beginY;

				beginX = e.clientX;
				beginY = e.clientY;

				if(!isDrag){
					if(isLT){
						_dragPoint('lt', moveX, moveY);
					}else if(isRT){
						_dragPoint('rt', moveX, moveY);
					}else if(isRB){
						_dragPoint('rb', moveX, moveY);
					}else if(isLB){
						_dragPoint('lb', moveX, moveY);
					}else{
						return;
					}
				}else{
					_dragClipArea(moveX, moveY);
				}
			});

			document.addEventListener('mouseup', function(){
				isDrag = false;
				isLT = false;
				isRT = false;
				isRB = false;
				isLB = false;
			});
		};

		var _dragClipArea = function(moveX, moveY){
			var left = 0,
				top = 0,
				minX = _imageX,
				minY = _imageY,
				maxX = _imageX + _imageW,
				maxY = _imageY + _imageH,
				cWidth = $clipArea.offsetWidth,
				cHeight = $clipArea.offsetHeight;

			top = $clipArea.offsetTop + moveY;
			left = $clipArea.offsetLeft + moveX;

			top = Math.min( maxY - cHeight, Math.max(minY, top));
			left = Math.min( maxX - cWidth, Math.max(minX, left));

			$clipArea.style.top = top + 'px';
			$clipArea.style.left = left + 'px';

			_reDraw(left, top, cWidth-2, cHeight-2);

		};

		var _dragPoint = function(position, moveX, moveY){
			var border = 2,
				minX = _imageX,
				minY = _imageY,
				maxX = _imageX + _imageW,
				maxY = _imageY + _imageH,
				cWidth = $clipArea.offsetWidth,
				cHeight = $clipArea.offsetHeight,
				cTop = $clipArea.offsetTop,
				cLeft = $clipArea.offsetLeft,
				width = cWidth,
				height = cHeight,
				left =  cLeft,
				top = cTop;

			var move = moveX;
			console.log(cWidth, cHeight, cLeft, cTop);
			if(position == 'lt'){
				if( (cTop > minY) && (cLeft > minX)){
					width = cWidth - move;
					height = cHeight - move;
					left = cLeft + move;
					top = cTop + move;
				}
			}else if(position == 'rt'){
				if((cTop > minY) && (cLeft < (maxX - cWidth + border))){
					width = cWidth + move;
					height = cHeight + move;
					left =  cLeft;
					top = cTop - move;
				}
			}else if(position == 'rb'){
				if((cLeft < (maxX - cWidth + border))&&(cLeft < (maxX - cWidth + border))){
					width = cWidth + move;
					height = cHeight + move;
					left =  cLeft;
					top = cTop;
				}		
			}else if(position == 'lb'){
				if((cTop < (maxY - cHeight + border))&&(cLeft > minX)){
					width = cWidth - move;
					height = cHeight - move;
					left =  cLeft + move;
					top = cTop;
				}
				
			}


			$clipArea.style.left = left + 'px';
			$clipArea.style.top = top + 'px';
			$clipArea.style.width = width + 'px';
			$clipArea.style.height = height + 'px';

			_reDraw(left, top, width, height);
		};

		var _reDraw = function(clipX, clipY, clipW, clipH){
			_ctx.clearRect(0, 0, 600, 400);

			_ctx.putImageData(_imageData, _imageX, _imageY);
			_clipData = _ctx.getImageData(clipX, clipY, clipW, clipH);
			_grayRect();
			_ctx.putImageData(_clipData, clipX, clipY);
			_drawPre(clipX, clipY, clipW, clipH);
		};

		_init();
	};

	// Runs during compile
	return {
		restrict: 'E', 
		scope: false,
		templateUrl: 'directives/components/home/clipBox.html',
		replace: true,
		link: function(scope, element){
			var clipTool = new ClipTool('logo-file');
		}
	};
}]);;bApp.directive('memberClassify', function(){
	return {
		restrict: 'E',
		scope: false,
		replace: true,
		templateUrl: 'directives/components/home/memberClassify.html',
		link: function(scope, element){
			$(element).find('.collapsible').collapsible();
		}
	};
});;bApp.directive('memberChart', ['memberFactory', function($member){
	// Runs during compile
	return {
		restrict: 'E',
		scope: false,
		replace: true,
		templateUrl: 'directives/components/home/memberChart.html',
		link: function($scope, iElm) {
			$member.initChart();
		}
	};
}]);;bApp.directive('moneyChart', ['moneyChartFactory', function($money){
	return {
		restrict: 'E',
		scope: false,
		replace: true,
		templateUrl: 'directives/components/home/moneyChart.html',
		link: function($scope, iElm){
			$money.initChart();
		}
	};
}]);;bApp.directive('moneyOriginChart', ['moneyOriginChartFactory', function($moneyOrigin){
	return {
		restrict: 'E',
		scope: false,
		replace: true,
		templateUrl: 'directives/components/home/moneyOriginChart.html',
		link: function(){
			$moneyOrigin.initChart();
		}
	};
}]);;bApp.directive('formUpload', ['$http', function($http){
	// Runs during compile
	return {
		restrict: 'A',
		scope: false,
		link: function($scope, iElm, iAttrs, controller) {
			var file = null;
			var url = 'http://115.159.45.39/api/upload';

			iElm.bind('change', function(e){
				var fd = new FormData();
				file = (e.srcElement || e.target).files[0];
				console.log(file);

				fd.append('file', file);
				$http.post(url, fd, {
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
				}).success(function(data){
					console.log(data);
					$scope.pic = data;
				}).error(function(err, status){
					console.log(err, status);
				});
			});
		}
	};
}]); 