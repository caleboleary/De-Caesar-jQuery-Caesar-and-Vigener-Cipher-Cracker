$(document).ready(function(){
	// ------------------------------------- JQUERY STUFF TO RUN DEMO ------------------------------------- //

	$('.type').change(function(){
		$('.key').val('');
		if ($(this).find('option:selected').val() == 'caesar') {
			$('.slide1').show();
			$('.slide2').hide();
		}
		else {
			$('.slide2').show();
			$('.slide1').hide();
		}

		if ($('.function').find('option:selected').val() == 'crack' && $(this).find('option:selected').val() == 'vigenere') {
			$('.len').show();
			$('.lenlabel').show();
		}
		else {
			$('.len').hide();
			$('.lenlabel').hide();
		}
	});

	$('.function').change(function(){
		$('.key').val('');
		if ($(this).find('option:selected').val() == 'encode' || $(this).find('option:selected').val() == 'decode') {
			$('.key').show();
			$('.keylabel').show();
		}
		else {
			$('.key').hide();
			$('.keylabel').hide();
		}

		if ($(this).find('option:selected').val() == 'crack' && $('.type').find('option:selected').val() == 'vigenere') {
			$('.len').show();
			$('.lenlabel').show();
		}
		else {
			$('.len').hide();
			$('.lenlabel').hide();
		}
	});

	$('.slide1 .decode').click(function(){

		if ($('.function').find('option:selected').val() == 'encode') {
			var shift = $('.slide1 .key').val();
			$('.slide1 div').html(enCaesar($('.slide1 textarea').val(),shift));
		}
		else if ($('.function').find('option:selected').val() == 'decode') {
			var shift = $('.slide1 .key').val();
			$('.slide1 div').html(deCaesar($('.slide1 textarea').val(),shift));
		}
		else {
			var shift = crackCaesar($('.slide1 textarea').val());
			$('.slide1 div').html('<span style="color:#666">I think the decoded message is:</span><br><br> '+deCaesar($('.slide1 textarea').val(),shift) + ' <br><br><span style="color:#666">with a shift of</span> ' + shift);
		}		
	});

	$('.slide2 .decode').click(function(){
		if ($('.function').find('option:selected').val() == 'encode') {
			var shift = $('.slide2 .key').val();
			$('.slide2 div').html(enVigenere($('.slide2 textarea').val(),shift));
		}
		else if ($('.function').find('option:selected').val() == 'decode') {
			var shift = $('.slide2 .key').val();
			$('.slide2 div').html(deVigenere($('.slide2 textarea').val(),shift));
		}
		else {
			if ($('.len').val()) {
				$('.slide2 div').html(' ');
				var toCrack = $('.slide2 textarea').val();
				var passedKeyLen = parseInt($('.len').val());
				var keyy = keyLenVigenere(toCrack,passedKeyLen)[0];
				$('.slide2 div').append('My best guess:<br><hr>');
				$('.slide2 div').append('<strong>Key:</strong> ' + keyy +' / ' + enCaesar(keyy,1));
				$('.slide2 div').append('<br><strong>Message:</strong> ' + deVigenere(toCrack,keyy));
			}
			else {
				$('.slide2 div').html(' ');
				var toCrack = $('.slide2 textarea').val();
				var crack = crackVigenere(toCrack);
				
				$('.slide2 div').append('My best guess is:');
				$('.slide2 div').append('<p class="addtl"><strong>Key:</strong> ' + crack[0].key +' / ' + enCaesar(crack[0].key,1) + ' (a=1 / a=0)<br><strong>Index of Coincidence:</strong>' +crack[0].ic+'<br><strong>Top 1000 words found:</strong>'+crack[0].wordmatches+'<br><strong>Message:</strong> ' + crack[0].message + '<br><hr></p>');
				$('.slide2 div').append('<hr><br><button class="seeMore">See more results</button><br>');
				if ( crack.length < 10) {
					var numToDisplay = crack.length;
				}
				else {
					var numToDisplay = 10;
				}
				for (var p = 1; p < numToDisplay; p++) {
					$('.slide2 div').append('<p class="addtl"><strong>Key:</strong> ' + crack[p].key +' / ' + enCaesar(crack[p].key,1) + ' (a=1 / a=0)<br><strong>Index of Coincidence:</strong>' +crack[p].ic+'<br><strong>Top 1000 words found:</strong>'+crack[p].wordmatches+'<br><strong>Message:</strong> ' + crack[p].message + '<br><hr></p>');
				}
				$('.seeMore').click(function(e){
					$('.seeMore').hide();
					e.preventDefault();
					$('.addtl').slideDown();
				});						
			}
		}		
	});
});