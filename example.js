$(document).ready(function(){
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
				var keyy = keyLenVigenere(toCrack,passedKeyLen);
				$('.slide2 div').append('My best guess:<br><hr>');
				$('.slide2 div').append('<strong>Key:</strong> ' + keyy +' / ' + enCaesar(keyy,1));
				$('.slide2 div').append('<br><strong>Message:</strong> ' + deVigenere(toCrack,keyy));
			}
			else {
				$('.slide2 div').html(' ');
				var toCrack = $('.slide2 textarea').val();
				var crack = crackVigenere(toCrack);
				var toDisplay = [];
				var wrdMtch = [];
				if (crack.length < 20) {
					var repeats = crack.length;
				}
				else {
					var repeats = 20;
				}
				for (var z = 0; z < repeats; z++) {
					var keyy = keyLenVigenere(toCrack,crack[z]);
					var thisMsg = deVigenere(toCrack,keyy);
					toDisplay.push('<p class="addtl addtl'+z+'"><strong>Key:</strong> ' + keyy +' / ' + enCaesar(keyy,1) + ' (a=1 / a=0) <br><strong>Message:</strong> ' + thisMsg + '<br><hr></p>'); 
					// $('.slide2 div').append('<strong>Key:</strong> ' + keyy +' / ' + enCaesar(keyy,1));
					// $('.slide2 div').append('<br><strong>Message:</strong> ' + thisMsg);
					// $('.slide2 div').append('<hr>');
					wrdMtch.push(wordMatchr(thisMsg));
					console.log('------ trying key '+z+'----------------');
				}
				$('.slide2 div').append('My best guess is:');
				var mostMatches = wrdMtch.indexOf(Math.max.apply(Math, wrdMtch));
				$('.slide2 div').append(toDisplay[mostMatches]);
				wrdMtch[mostMatches] = 0;
				$('.slide2 div').append('<hr><br><button class="seeMore">See more results</button><br>');
				for (var p = 0; p < 10; p++) {
					mostMatches = wrdMtch.indexOf(Math.max.apply(Math, wrdMtch));
					$('.slide2 div').append(toDisplay[mostMatches]);
					wrdMtch[mostMatches] = 0;			
				}
				$('.seeMore').click(function(e){
					$('.seeMore').hide();
					e.preventDefault();
					console.log('test');
					$('.addtl').slideDown();
				});						
			}
		}		
	});
});