chrome.storage.local.get(['keywords', 'message', 'subject'], function(items){
	var message = items['message'];
	var keywords = items['keywords'].split(",");
	var subject = items['subject'];

	//checks to see if there is a bio and/or current role description - if there is, will create string mentioning keywords that exist
	//if bio/description exist, but keywords don't, keystring will remain empty
	var keystring = '';
	if(document.getElementsByClassName('module-body searchable').length>0 && document.getElementsByClassName('description searchable').length>0){
		var search_text = document.getElementsByClassName('module-body searchable')[0].innerHTML + ' ' + document.getElementsByClassName('description searchable')[0].innerHTML;
		var search_text_sub = search_text.toLowerCase();
	 
		var presentkeys = [];
		for(i=0; i<keywords.length; i++){
			if (search_text_sub.indexOf(keywords[i].toLowerCase()) > -1){
				presentkeys.push(keywords[i]);
			}else{
				console.log(keywords[i] + " not present");
			}
		}
		if(presentkeys.length > 0){
			for(i=0; i<presentkeys.length -1; i++){
				keystring = keystring + presentkeys[i] + ', ';
			}
			keystring = ". I also noticed you mentioned specific experience with " + keystring + presentkeys[presentkeys.length-1] + ' etc.';
		}
	}
	 
	 
	 
	////////////////////////////////////////////////////////////////////////
	 
	var length_of_time = '';
	if(document.getElementsByClassName('from-date').length>0){
		//splitting start date into substrings
		start_arr = document.getElementsByClassName('from-date')[0].innerHTML.split(' ');
	 
		//creating date string to parse
		date_parse = start_arr[0] + ' 1, ' + start_arr[1];
	 
		//get milliseconds from 1/1/1970 to start date
		date_then = Date.parse(date_parse);
	 
		//get milliseconds from 1/1/1970 to today's date
		today = new Date();
		date_now = Date.parse(today);
	 
		//get difference between two dates in milliseconds
		difference = date_now - date_then;
	 
		//convert to years
		stint = difference/31556900000;
	 
	 
		//define phrases that will be subbed in for period of employment
		var length_of_time;
		if(.5 > stint && stint >= 0){
			length_of_time = "a few months";
		}else if(1 > stint && stint >= .5){
			length_of_time = "almost a year";
		}else if(1.5 > stint && stint >= 1){
			length_of_time = 'a little over a year';
		}else if(2 > stint && stint >= 1.5){
			length_of_time = 'almost two years';
		}else if (2.5 > stint && stint >= 2){
			length_of_time = 'a little over two years';
		}else if (3 > stint && stint >= 2.5){
			length_of_time = 'almost three years';
		}else if (3.5 > stint && stint >= 3){
			length_of_time = 'a little over three years';
		}else if (4 > stint && stint >= 3.5){
			length_of_time = 'almost four years';
		}else if (4.5 > stint && stint >= 4){
			length_of_time = 'a little over four years';
		}else if (5 > stint && stint >= 4.5){
			length_of_time = 'almost five years';
		}else{
			length_of_time = 'a long time';
		}
	}
	//parses first name
	var str = document.getElementsByClassName('searchable')[0].innerHTML;
	var str_split = str.split(' ');
	if (str_split[0] == '<span'){
		var name_span_index = str_split[1].indexOf('</span>');
		var first = str_split[1].slice(16, name_span_index);
	}else{
		var first = str_split[0];
	}
	 
	//parses current title
	titleString = document.getElementsByClassName('title searchable')[0].innerHTML;
	title = '';
	title2 = '';
	if(document.getElementsByClassName('title searchable')[0].innerHTML.indexOf('<span') > -1){
		titleConcat = '';
		title_split = titleString.split('<span class="keyword">');
		for(i=0; i<title_split.length; i++){
			titleConcat = titleConcat + title_split[i];
		}
		title2_split = titleConcat.split('</span>');
		for(i=0; i<title2_split.length; i++){
			title2 = title2 + title2_split[i];
		}
		at_index = title2.indexOf('at');

		for (i=0; i<at_index; i++) {
			title = title + title2[i];
		}
	}else{
		title_split = document.getElementsByClassName('title searchable')[0].innerHTML.split(' ');
		at_index = title_split.indexOf('at'); //if title contains the word 'at' then there will be a problem
		for (i=0; i<at_index; i++) {
			title = title + title_split[i] + ' ';
		}
	}
	console.log(title);
	 
	 
	//parses current company
	var company = '';
	company_split = document.getElementsByClassName('title searchable')[0].innerHTML.split(' ');
	split_index = company_split.indexOf('at');
	for (i=split_index + 1; i<company_split.length; i++) {
	    if(i==title_split.length-1){
	        company = company + company_split[i] + ' ';
	    }else{
	    company = company + company_split[i] + ' ';
	    }
	}
	if(company.split(' ')[0] == '<span'){
		company_span_index = company.indexOf('</span>');
		company = company.slice(22, company_span_index) + ' ';
	}

	console.log(company);

	var varStrings = ["{first}", "{company}", "{title}", "{length_of_time}", "{keywords}"];
	var variables = [first, company, title, length_of_time, keystring];


	for(i=0; i<varStrings.length; i ++){
	    if(message.indexOf(varStrings[i]) > -1){
	    message = message.slice(0, message.indexOf(varStrings[i])) + variables[i] + message.slice(message.indexOf(varStrings[i])+varStrings[i].length, message.length);
	    }
	}

	for(i=0; i<varStrings.length; i ++){
	    if(subject.indexOf(varStrings[i]) > -1){
	    subject = subject.slice(0, subject.indexOf(varStrings[i])) + variables[i] + subject.slice(subject.indexOf(varStrings[i])+varStrings[i].length, subject.length);
	    }
	}
	 
	//clicks 'Send InMail' button on candidate profile
	document.getElementsByClassName('send-inmail')[0].click();
	 
	 
	//recursive function that inserts customized message into subject/body of the InMail once window is open
	function do_work(){
		if(document.getElementById("message-body") == null){
			setTimeout(do_work, 1000);
		}else{
			document.getElementById("message-body").value = message;
			document.getElementById("subject").value = subject;
			box = document.getElementById('contactShareable');
			box.setAttribute('checked', 'true');
	 
			//document.getElementsByClassName('primary-action')[0].click();
		}
	}

	do_work();
});