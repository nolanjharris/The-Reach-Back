$(document).ready(function(){
	$('#loginButton').on('click', function(e){
		$('#loginError').css('visibility', 'hidden');
		e.preventDefault();
		var username = $('#username').val();
		var password = $('#password').val();
		$.get('/login/auth', {
			username: username, password: password
		}, function(data){
			if(data.status == "fail"){
				console.log("cant login");
				$('#loginError').css('visibility', 'visible');
				$('#loginError').text(data.message);
			} else {
				console.log('login info correctamundo!!!');
				$.get('/login',{
					username: username, password: password
				});
				location.reload();
			}
		});
	});
});