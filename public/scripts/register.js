$(document).ready(function(){
	$('#registerButton').on('click', function(e){
		console.log("button clicked");
		$('#registerError').css('visibility', 'hidden');
		e.preventDefault();
		var username = $('#registerUsername').val();
		var password = $('#registerPassword').val();
		console.log('username and password variables set');
		$.post('/register', {
			username: username, password: password
		}, function(data){
			if(data.status == "fail" || data.status == "err"){
				console.log("cant register");
				$('#registerError').css('visibility', 'visible');
				$('#registerError').text(data.message);
			} else {
				console.log('register info works!!!');
				$.post('/register',{
					username: username, password: password
				});
				$.get('/login',{
					username: username, password: password
				});
				location.reload();
			}
		});
	});
});