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
});


$('#beginRound').on('click', function(e){
	e.preventDefault();
	var table = '<tr><th>Current Score<br><span id="topar">(to par)</span</th><th>Player</th><th colspan="3">Hole <span id="holenumber">1</span> Score</th></tr>';
	var rows = $('#playerCountVal').val();
	var cols = 5;
	for(var r = 1; r <= rows; r++){
		if($('#player' + r).val() === ''){
			// return alert("Please fill in names of all players!");
			return $('#errors').show();
		} else {
			table += '<tr>';
			table += '<td class="totalScore">0</td>';
			table += '<td>' + $('#player' + r).val() + '</td>';
			table += '<td class="subtract"><button class="button">-</button></td>';
			table += '<td class="par" id="player' + r + 'Score"' + '>' + parseInt($('#hole1').val(), 10) + '</td>';
			table += '<td class="add"><button class="button">+</button></td>';
			table += '</tr>';
		}
		$('#errors').hide();
	}
	table += '<tr><td colspan="5"><button class="button" id="nextHole">Next Hole</button></td></tr>';
	$('.byline').text("Shake hands and let's begin! Enter scores after each hole!");
	$('#holeScore').html(table);
	$('#scorecardSetup').css('display', 'none');
	// $('#holeScorecard').css('display', '');
});

var hole = 1;

$(document).on('click', '.add', function(){
	var $row = $(this).parents('tr');
	var holeScore = parseInt($row.find('td[class="par"]').text(), 10);
	var totalScore = parseInt($row.find('td[class="totalScore"]').text(), 10);
	$row.find('td[class="totalScore"]').text(totalScore + 1);
	$row.find('td[class="par"]').text(holeScore + 1);
});

$(document).on('click', '.subtract', function(){
	var $row = $(this).parents('tr');
	var holeScore = parseInt($row.find('td[class="par"]').text(), 10);
	var totalScore = parseInt($row.find('td[class="totalScore"]').text(), 10);
	if(holeScore > 1){
		$row.find('td[class="totalScore"]').text(totalScore - 1);
		$row.find('td[class="par"]').text(holeScore - 1);	
	}
});

$(document).on('click', '#nextHole', function(){
		hole++;
		if(hole === 18){
			$('#holenumber').text(hole);
			$('.par').text(parseInt($('#hole' + hole).val(), 10));
			$('.byline').text("Shake hands!! GOOD ROUND EVERYONE!!")
		} else if (hole === 19){
			hole = 1;
			$('#nextHole').css('display', 'none');
			$('#scorecardSetup').css('display', '');
			$('.byline').text("Good Round! Ready for another?");
			$('.add').click(false);
			$('.subtract').click(false);
		} else {
			$('#holenumber').text(hole);
			$('.par').text(parseInt($('#hole' + hole).val(), 10));
			$('.byline').text("On to the next!! It's a great day to throw some plastic!")
		}
	// $('.byline').text("GOOD ROUND! Play another one?");
});