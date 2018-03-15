var coursePar = $('#holePar select').on('change', function() {
 					$('#coursePar').text(function(){
						var par = 0;
						for(var i = 01; i <= 18; i++){
							par += parseInt($('#hole' + i).val(), 10);
						}
						return par;
					});
				});


var n = 8;
$('#playerCount select').on('change', function(){
	var playerCountValue = $('#playerCountVal').val();
	while(playerCountValue < n){
		$('#player' + n).css('display', 'none');
		n--;
	}
	while(playerCountValue > n){
		n++;
		$('#player' + n).css('display', 'true');
	}
console.log(playerCountValue);
});



$('#beginRound').on('click', function(){
	var table = '<tr><th>Current Score<br><span id="topar">(to par)</span</th><th>Player</th><th colspan="3">Hole Score</th></tr>';
	var rows = $('#playerCountVal').val();
	var cols = 5;
	for(var r = 1; r <= rows; r++){
		if($('#player' + r).val() === ''){
			return alert("Please fill in names of all players!");

		} else {
			table += '<tr>';
			table += '<td>0</td>';
			table += '<td>' + $('#player' + r).val() + '</td>';
			table += '<td><button class="button" id="subtract">-</button></td>';
			table += '<td class="par">3</td>';
			table += '<td><button class="button" id="add">+</button></td>';
			table += '</tr>';
		}
		
	}
	$('.byline').text("Let's begin! Enter scores after each hole!")
	$('#holeScore').html(table);
	$('#scorecardSetup').css('display', 'none');
	// $('#holeScorecard').css('display', '');
});