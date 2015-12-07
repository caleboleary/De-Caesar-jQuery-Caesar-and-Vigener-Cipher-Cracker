//input str - string - to be encoded
//input shift - integer - to shift by
//return - encoded string
function enCaesar(str,shift) {
	//str - string to be encrypted
	//shift - number 1 - 25 to shift letters to show encoded message
	String.prototype.replaceAt=function(index, character) {
	    return this.substr(0, index) + character + this.substr(index+character.length);
	}
	for (var i = 0, len = str.length; i < len; i++) {
		for (var j = 0, len2 = shift; j < len2; j++) {
			if (str[i].match(/^[a-yA-Y]*$/gi) != null  ) {
				str = str.replaceAt(i, String.fromCharCode(str[i].charCodeAt(0) + 1));
			}
			else if (str[i] == 'z') {
				str = str.replaceAt(i, 'a');
			}
			else if (str[i] == 'Z') {
				str = str.replaceAt(i, 'A');
			}
		}
	}
	return str;
}

//input str - string - to be decoded
//input shift - integer - to shift by
//return - string - decoded string
function deCaesar(str,shift) {
	//str - string to be decrypted
	//shift - number 1 - 25 to shift letters to show decoded message
	String.prototype.replaceAt=function(index, character) {
	    return this.substr(0, index) + character + this.substr(index+character.length);
	}
	for (var i = 0, len = str.length; i < len; i++) {
		for (var j = 0, len2 = shift; j < len2; j++) {
			if (str[i].match(/^[b-zB-Z]*$/gi) != null  ) {
				str = str.replaceAt(i, String.fromCharCode(str[i].charCodeAt(0) - 1));
			}
			else if (str[i] == 'a') {
				str = str.replaceAt(i, 'z');
			}
			else if (str[i] == 'A') {
				str = str.replaceAt(i, 'Z');
			}
		}
	}
	return str;
}

//input str - string - to be cracked
//return - string - of best guess based on freq analysis compared to english
function crackCaesar(str) {
	str = str.toLowerCase();
	var j = 0;
	var vcount = 1;
	var allAnswers = [];
	var answerVowels = [];
	var allCharFreq = [];
	var charCount = str.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '').length;
	var baseCharFreq = [charCount*.08,charCount*.015,charCount*.025,charCount*.044,charCount*.126,charCount*.024,charCount*.02,charCount*.063,charCount*.07,charCount*.0014,charCount*.0074,charCount*.04,charCount*.025,charCount*.07,charCount*.076,charCount*.018,charCount*.001,charCount*.06,charCount*.063,charCount*.08,charCount*.028,charCount*.009,charCount*.02,charCount*.0017,charCount*.02,charCount*.0008,];
	while (j<=25) {
		var charFreq = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		var array = []
		for (var i = 0, len = str.length; i < len; i++) {
			if (str[i] == 'z') {
				array.push('a');
			}
			else if (str[i] == ' ' || str[i] == '.' || str[i] == ',' || str[i] == '!' || str[i] == '?' || str[i] == ':' || str[i] == '"' ) {
				array.push(str[i]);
			}
			else {
		  		array.push(String.fromCharCode(str[i].charCodeAt(0) + 1));
		 	}
		  	if (str[i] == 'a' || str[i] == 'e' || str[i] == 'i' || str[i] == 'o' || str[i] == 'u') {
		 		vcount++;
		 	 }
		 	if (str[i].match(/[a-y]/i)) {
		  		if (str[i].charCodeAt(0)-96 != NaN ) {
		  			charFreq[str[i].charCodeAt(0)-96]++;
		  		}
		  	}
		  	else if (str[i] == 'z') {
		  		charFreq[0]++;
		  	}
		}
		str = array.join("");
		allAnswers.push(str);
		if (j != 0) {
			answerVowels.push(vcount);
		}	
		j++;
		vcount = 0;
		allCharFreq.push(charFreq);
	}
	var resultCharFreq = [];
	for (var k = 0, len = allCharFreq.length; k < len; k++) {
		var indResultCharFreq = [];
		for (var l = 0, len = allCharFreq[k].length; l < len; l++) {
			indResultCharFreq[l] =  Math.abs(allCharFreq[k][l] - baseCharFreq[l]);
		}
		resultCharFreq.push(eval(indResultCharFreq.join('+')));
	}

	return 26-((resultCharFreq.indexOf(Math.min.apply(Math,resultCharFreq)))+1);
}

//input str - string - to be encoded
//input shift - string - to shift by
//return - string - encoded string
function enVigenere(str,key) {
	String.prototype.replaceAt=function(index, character) {
	    return this.substr(0, index) + character + this.substr(index+character.length);
	}
	key = key.toLowerCase();
	while (key.length < str.length) {
		key = key + key;
	}
	for (var i = 0, len = str.length; i < len; i++) {
		if (str[i].match(/^[a-zA-Z]*$/gi) == null  ) {
			key = key.substr(0, i) + ' ' + key.substr(i);
		}
		var shift = key[i].charCodeAt(0)-96;
		for (var j = 0, len2 = shift; j < len2; j++) {
			if (str[i].match(/^[a-yA-Y]*$/gi) != null  ) {
				str = str.replaceAt(i, String.fromCharCode(str[i].charCodeAt(0) + 1));
			}
			else if (str[i] == 'z') {
				str = str.replaceAt(i, 'a');
			}
			else if (str[i] == 'Z') {
				str = str.replaceAt(i, 'A');
			}
		}
	}
	return str;
}

//input str - string - to be decoded
//input shift - string - to shift by
//return - string - decoded string
function deVigenere(str,key) {
	String.prototype.replaceAt=function(index, character) {
	    return this.substr(0, index) + character + this.substr(index+character.length);
	}
	key = key.toLowerCase();
	while (key.length < str.length) {
		key = key + key;
	}
	for (var i = 0, len = str.length; i < len; i++) {
		if (str[i].match(/^[a-zA-Z]*$/gi) == null  ) {
			key = key.substr(0, i) + ' ' + key.substr(i);
		}
		var shift = key[i].charCodeAt(0)-96;
		for (var j = 0, len2 = shift; j < len2; j++) {
			if (str[i].match(/^[b-zB-Z]*$/gi) != null  ) {
				str = str.replaceAt(i, String.fromCharCode(str[i].charCodeAt(0) - 1));
			}
			else if (str[i] == 'a') {
				str = str.replaceAt(i, 'z');
			}
			else if (str[i] == 'A') {
				str = str.replaceAt(i, 'Z');
			}
		}
	}
	return str;
}

//input str - string - to be cracked
//input keyLen - integer - length of key (no spaces or spec char) 
//return - string - best guess at the key based on freq analysis
function keyLenVigenere(str,keyLen) {
	var arr = [];
	var i = 0;
	var str = str.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '');
	while (i < keyLen) {
		var j = 0 + i;
		while (j < str.length) {
			if (arr[i] != undefined) {
				arr[i] = arr[i] + str[j];
			}
			else {
				arr[i] = str[j];
			}
			j=j+keyLen;
		}
	i++;
	}
	var results = [];
	for (var k = 0, len = arr.length; k < len; k++) {
		results[k] = String.fromCharCode(crackCaesar(arr[k])+96);
	}
	return results.join('');
}

//input str - string - to be cracked
//return - array of integers - guesses at keylength arranged lowest to highest, to be used with @keyLenVigenere (loop through results of crackVigenere and perform keyLenVigenere on desired number of them)
function crackVigenere(str) {
	function occurrences(string, subString, allowOverlapping){

	    string+=""; subString+="";
	    if(subString.length<=0) return string.length+1;

	    var n=0, pos=0;
	    var step=(allowOverlapping)?(1):(subString.length);

	    while(true){
	        pos=string.indexOf(subString,pos);
	        if(pos>=0){ n++; pos+=step; } else break;
	    }
	    return(n);
	}

	function getMatchIndexes(str, toMatch) {
	    var toMatchLength = toMatch.length,
	        indexMatches = [], match,
	        i = 0;

	    while ((match = str.indexOf(toMatch, i)) > -1) {
	        indexMatches.push(match);
	        i = match + toMatchLength;
	    }

	    return indexMatches;
	}

	var repeated = [];
	var justLetters = str.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '')
	for (var j = 4, len = 100; j < len; j++) {
		for (var i = 0, len2 = justLetters.length; i < len2; i++) {
			if (occurrences(justLetters,justLetters.substring(i,i+j),0) > 1 && i+j < justLetters.length) {
				if (jQuery.inArray(justLetters.substring(i,i+j),repeated) === -1) {
					repeated.push(justLetters.substring(i,i+j));
				}
			}
		}
	}

	var k = 0;
	var len3 = repeated.length;
	var differences = [];
	while (k < len3) {
		differences.push(getMatchIndexes(justLetters,repeated[repeated.length-1])[1]-getMatchIndexes(justLetters,repeated[repeated.length-1])[0]);
		repeated.pop();
		k++;
	}

	var uniqueDifferences = [];
	$.each(differences, function(i, el){
	    if($.inArray(el, uniqueDifferences) === -1) uniqueDifferences.push(el);
	});

	for (var l = 0, len = uniqueDifferences.length; l < len; l++) {
		for (var m = 2 ; m < 11; m++) {
			if(uniqueDifferences[l] % m == 0 && uniqueDifferences[l]/m > 1) {
				uniqueDifferences.push(uniqueDifferences[l]/m)
			}
		}
	}

	var uniqueDifferences2 = [];
	$.each(uniqueDifferences, function(i, el){
	    if($.inArray(el, uniqueDifferences2) === -1) uniqueDifferences2.push(el);
	});


	uniqueDifferences2.sort(function(a, b){return a-b});
	return uniqueDifferences2;
}

//input arr - array of strings - to be analyzed
//return - array of floats - ordered the same as input array, lower numbers are closer to english
function frequencyAnalyze(arr) {
	var results = [];
	for (var i = 0, len = arr.length; i < len; i++) {
		var str = String(arr[i]);
		str = str.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '').toLowerCase();
		var charFreq = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		var charCount = str.length;
		var baseCharFreq = [charCount*.08,charCount*.015,charCount*.025,charCount*.044,charCount*.126,charCount*.024,charCount*.02,charCount*.063,charCount*.07,charCount*.0014,charCount*.0074,charCount*.04,charCount*.025,charCount*.07,charCount*.076,charCount*.018,charCount*.001,charCount*.06,charCount*.063,charCount*.08,charCount*.028,charCount*.009,charCount*.02,charCount*.0017,charCount*.02,charCount*.0008,];
		for (var j = 0, len2 = str.length; j < len2; j++) {
			if (str[j].match(/[a-y]/i)) {
		  		if (str[j].charCodeAt(0)-96 != NaN ) {
		  			charFreq[str[j].charCodeAt(0)-96]++;
		  		}
		  	}
		  	else if (str[j] == 'z') {
		  		charFreq[0]++;
		  	}
		}
		var resultCharFreq = [];
		for (var k = 0, len3 = charFreq.length; k < len3; k++) {
			resultCharFreq[k] =  Math.abs(charFreq[k] - baseCharFreq[k]);
		}
		results.push(eval(resultCharFreq.join('+')));
	}
	return results;
}

//input str - string - to look for words
//return - integer - number of words matched in string
function wordMatchr(str) {
	var mostCommon = ['the','of','to','and','a','in','is','it','you','that','he','was','for','on','are','with','as','I','his','they','be','at','one','have','this','from','or','had','by','hot','word','but','what','some','we','can','out','other','were','all','there','when','up','use','your','how','said','an','each','she','which','do','their','time','if','will','way','about','many','then','them','write','would','like','so','these','her','long','make','thing','see','him','two','has','look','more','day','could','go','come','did','number','sound','no','most','people','my','over','know','water','than','call','first','who','may','down','side','been','now','find','any','new','work','part','take','get','place','made','live','where','after','back','little','only','round','man','year','came','show','every','good','me','give','our','under','name','very','through','just','form','sentence','great','think','say','help','low','line','differ','turn','cause','much','mean','before','move','right','boy','old','too','same','tell','does','set','three','want','air','well','also','play','small','end','put','home','read','hand','port','large','spell','add','even','land','here','must','big','high','such','follow','act','why','ask','men','change','went','light','kind','off','need','house','picture','try','us','again','animal','point','mother','world','near','build','self','earth','father','head','stand','own','page','should','country','found','answer','school','grow','study','still','learn','plant','cover','food','sun','four','between','state','keep','eye','never','last','let','thought','city','tree','cross','farm','hard','start','might','story','saw','far','sea','draw','left','late','run','dont','while','press','close','night','real','life','few','north','open','seem','together','next','white','children','begin','got','walk','example','ease','paper','group','always','music','those','both','mark','often','letter','until','mile','river','car','feet','care','second','book','carry','took','science','eat','room','friend','began','idea','fish','mountain','stop','once','base','hear','horse','cut','sure','watch','color','face','wood','main','enough','plain','girl','usual','young','ready','above','ever','red','list','though','feel','talk','bird','soon','body','dog','family','direct','pose','leave','song','measure','door','product','black','short','numeral','class','wind','question','happen','complete','ship','area','half','rock','order','fire','south','problem','piece','told','knew','pass','since','top','whole','king','space','heard','best','hour','better','true .','during','hundred','five','remember','step','early','hold','west','ground','interest','reach','fast','verb','sing','listen','six','table','travel','less','morning','ten','simple','several','vowel','toward','war','lay','against','pattern','slow','center','love','person','money','serve','appear','road','map','rain','rule','govern','pull','cold','notice','voice','unit','power','town','fine','certain','fly','fall','lead','cry','dark','machine','note','wait','plan','figure','star','box','noun','field','rest','correct','able','pound','done','beauty','drive','stood','contain','front','teach','week','final','gave','green','oh','quick','develop','ocean','warm','free','minute','strong','special','mind','behind','clear','tail','produce','fact','street','inch','multiply','nothing','course','stay','wheel','full','force','blue','object','decide','surface','deep','moon','island','foot','system','busy','test','record','boat','common','gold','possible','plane','stead','dry','wonder','laugh','thousand','ago','ran','check','game','shape','equate','hot','miss','brought','heat','snow','tire','bring','yes','distant','fill','east','paint','language','among','grand','ball','yet','wave','drop','heart','am','present','heavy','dance','engine','position','arm','wide','sail','material','size','vary','settle','speak','weight','general','ice','matter','circle','pair','include','divide','syllable','felt','perhaps','pick','sudden','count','square','reason','length','represent','art','subject','region','energy','hunt','probable','bed','brother','egg','ride','cell','believe','fraction','forest','sit','race','window','store','summer','train','sleep','prove','lone','leg','exercise','wall','catch','mount','wish','sky','board','joy','winter','sat','written','wild','instrument','kept','glass','grass','cow','job','edge','sign','visit','past','soft','fun','bright','gas','weather','month','million','bear','finish','happy','hope','flower','clothe','strange','gone','jump','baby','eight','village','meet','root','buy','raise','solve','metal','whether','push','seven','paragraph','third','shall','held','hair','describe','cook','floor','either','result','burn','hill','safe','cat','century','consider','type','law','bit','coast','copy','phrase','silent','tall','sand','soil','roll','temperature','finger','industry','value','fight','lie','beat','excite','natural','view','sense','ear','else','quite','broke','case','middle','kill','son','lake','moment','scale','loud','spring','observe','child','straight','consonant','nation','dictionary','milk','speed','method','organ','pay','age','section','dress','cloud','surprise','quiet','stone','tiny','climb','cool','design','poor','lot','experiment','bottom','key','iron','single','stick','flat','twenty','skin','smile','crease','hole','trade','melody','trip','office','receive','row','mouth','exact','symbol','die','least','trouble','shout','except','wrote','seed','tone','join','suggest','clean','break','lady','yard','rise','bad','blow','oil','blood','touch','grew','cent','mix','team','wire','cost','lost','brown','wear','garden','equal','sent','choose','fell','fit','flow','fair','bank','collect','save','control','decimal','gentle','woman','captain','practice','separate','difficult','doctor','please','protect','noon','whose','locate','ring','character','insect','caught','period','indicate','radio','spoke','atom','human','history','effect','electric','expect','crop','modern','element','hit','student','corner','party','supply','bone','rail','imagine','provide','agree','thus','capital','wont','chair','danger','fruit','rich','thick','soldier','process','operate','guess','necessary','sharp','wing','create','neighbor','wash','bat','rather','crowd','corn','compare','poem','string','bell','depend','meat','rub','tube','famous','dollar','stream','fear','sight','thin','triangle','planet','hurry','chief','colony','clock','mine','tie','enter','major','fresh','search','send','yellow','gun','allow','print','dead','spot','desert','suit','current','lift','rose','continue','block','chart','hat','sell','success','company','subtract','event','particular','deal','swim','term','opposite','wife','shoe','shoulder','spread','arrange','camp','invent','cotton','born','determine','quart','nine','truck','noise','level','chance','gather','shop','stretch','throw','shine','property','column','molecule','select','wrong','gray','repeat','require','broad','prepare','salt','nose','plural','anger','claim','continent','oxygen','sugar','death','pretty','skill','women','season','solution','magnet','silver','thank','branch','match','suffix','especially','fig','afraid','huge','sister','steel','discuss','forward','similar','guide','experience','score','apple','bought','led','pitch','coat','mass','card','band','rope','slip','win','dream','evening','condition','feed','tool','total','basic','smell','valley','nor','double','seat','arrive','master','track','parent','shore','division','sheet','substance','favor','connect','post','spend','chord','fat','glad','original','share','station','dad','bread','charge','proper','bar','offer','segment','slave','duck','instant','market','degree','populate','chick','dear','enemy','reply','drink','occur','support','speech','nature','range','steam','motion','path','liquid','log','meant','quotient','teeth','shell','neck'];//from https://gist.github.com/deekayen/4148741\
	var occurrences = 0;
	for (var i = 0, len = mostCommon.length; i < len; i++) {
		if (str.indexOf(mostCommon[i]) > -1) {
			occurrences++;
		}
	}
	return occurrences;
}

