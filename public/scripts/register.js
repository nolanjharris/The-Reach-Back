$(document).ready(function(){
	$('#registerButton').on('click', function(e){
		$('#registerError').css('visibility', 'hidden');
		e.preventDefault();
		var username = $('#registerUsername').val();
		var password = $('#registerPassword').val();
		$.post('/register', {
			username: username, password: password
		}, function(data){
			if(data.status == "fail" || data.status == "err"){
				$('#registerError').css('visibility', 'visible');
				$('#registerError').text(data.message);
			} else {
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