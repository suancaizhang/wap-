
var comment = comment || {};

comment.base = {

	errBox: function(msg){
		//提示弹框
		var error = function(){
			//如果已经弹出了错误提示，再次点击不要重复弹出错误提示
			if($('#error').length > 0){
				return;
			}

			$(document.body).append('<div id="error">' + msg + '</div>');
			var winH = document.documentElement.clientHeight;
	        var winW = document.documentElement.clientWidth;
	        var boxL = winW / 2 - $("#error").width() / 2;
	        var boxT = (winH / 2 - $("#error").height() / 2);
	        $('#error').css({'top':boxT + 'px','left':boxL + 'px'});
			setTimeout(function(){
				$('#error').remove();
			}, 2000);
		}
		setTimeout(error,500);
	},
	showText: function(){
		//输入评论 提交高亮
		$('.comment-wrap .textarea')[0].oninput = function(){
			var _this = $(this);
			var _length = _this.val().length;
			_this.parent().siblings().text(_length + '/500');
			if (_length == 0) {
				$('.submit').removeClass('submit-c');
			}else{
				$('.submit').addClass('submit-c');
			};
		}
	},
	impression: function(){
		//我的印象 添加样式
		$('.impression li:not(.del-border)').each(function(){
			var _this = $(this);
			_this.click(function(){
				if (!_this.hasClass('impression-border') && $('.impression .impression-border').length == 5) {
					comment.base.errBox('我的印象不能超过五个!');
				}else{
					_this.toggleClass('impression-border');
				};
			})
		})
	},
	delPic: function(){
		//删除图片
		$('.load-pic .del').each(function(){
			var _this = $(this);
			_this.click(function(){
				_this.parent().remove();
			})
		})
	},
	starPic: function(){
		//满意度 星级
		$('.satisfy-item li').click(function(){
			var _this = $(this);
			var index = _this.index();
			_this.parent().find('li').each(function(i,n){
				if ( i < index ) {
					$(n).addClass('check-star');
				}else if ( i > index ){
					$(n).removeClass('check-star');
				}else{
					$(n).toggleClass('check-star');
				};
			})
		})
	},
	init: function(){
		comment.base.showText();
		comment.base.impression();
		comment.base.delPic();
		comment.base.starPic();
	}
}

$(function(){
	comment.base.init();
})
