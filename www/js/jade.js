$(function() {
	$("body").on("click", ".btn1", function() {
		var user1 = $(".user1").val();
		var pass1 = $(".pass1").val();
		if(user1 == "") {
			alert("请输入用户名");
		} else if(pass1 == "") {
			alert("请输入密码");
		} else {
			$.ajax({
				url: "http://localhost:8000/user/login",
				type: "post",
				data: {
					user: user1,
					pass: pass1
				},
				success: function(e) {
					var jg = e;
					if(jg == "用户名已存在") {
						alert(jg);
					} else {
						$.ajax({
							url: "http://localhost:8000/user/zfabu",
							type: "get",
							data: {
								jg: jg
							},
							success: function(e) {
								console.log(e);
								$("body").html(e);
							},
							error: function(e) {
								console.log(e);
							}
						})
					}
				},
				error: function(e) {
					console.log(e);
				}
			})
		}
	})

	$("body").on("click", ".btn2", function() {
		var user2 = $(".user2").val();
		var pass2 = $(".pass2").val();
		if(user2 == "") {
			alert("请输入用户名");
		} else if(pass2 == "") {
			alert("请输入密码");
		} else {
			$.ajax({
				url: "http://localhost:8000/user/login1",
				type: "post",
				data: {
					user: user2,
					pass: pass2
				},
				success: function(e) {
					console.log(e);
				},
				error: function(e) {
					console.log(e);
				}
			})
		}
	})

	$("body").on("change", ".file", function() {
		var img = this.files[0];
		var images = new FormData();
		images.append("img", img);
		$.ajax({
			url: "http://localhost:8000/user/img",
			type: "post",
			data: images,
			success: function(e) {
				var str = "<img src='" + e + "'/>";
				$(".img").html(str);
				var img = e;
				$("body").on("click", ".btn", function() {
					var name = $(".name").val();
					var sex = $(".sex").val();
					var tel = $(".tel").val();
					var qq = $(".qq").val();
					var email = $(".email").val();
					var ip = $(".ip").val();
					$.ajax({
						url: "http://localhost:8000/user/zczq",
						type: "get",
						data: {
							name: name,
							sex: sex,
							tel: tel,
							qq: qq,
							email: email,
							ip: ip,
							img:img
						},
						success: function(e) {
							var str = "<img src='" + e + "'/>";
							$(".img").html(str);
						},
						error: function(e) {
							console.log(e);
						}
					})
				})
			},
			error: function(e) {
				console.log(e);
			},
			processData: false, // 不处理数据
			contentType: false // 不设置内容类型
		})
	})

	$("body").on("click", ".ul>li", function() {
		$('.ul>li').removeClass('show').eq($(this).index()).addClass('show');
		$('.ol>li').eq($(this).index()).addClass('checked').siblings().removeClass('checked');
	})
})