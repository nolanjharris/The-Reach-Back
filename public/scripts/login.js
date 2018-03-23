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

// $("#loginButton").submit(function(event)
// {
//     event.preventDefault();
//     $.ajax({
//         type: "GET",
//         datatype:"json",
//         url: "/login",
//         data:({
//             username : $('#username').val(),
//             password: $('#password').val()
//         }),
//         success: function(result)
//         {
//             if(result && result.status == "ok") // you should do your checking here
//             {
//                 window.location = 'http://www.google.com/'; //just to show that it went through
//             }
//             else
//             {
//                 $('#loginError').empty()
//                     .append('result.message');
//             }
//         }
//     });
//     console.log("errrroooorrrrrrrrr");
//     return false;
// }


// $(document).ready(function(){
// 	$("#loginButton").on('click', function(){
// 		$.getJSON("/login")
// 		.done(function(data){
// 			console.log(data);
// 			var result = data.results[0];
// 			console.log(result);
// 		})
// 		.fail(function(){
// 			console.log('User Info Error!');
// 		});
// 	});
// });
