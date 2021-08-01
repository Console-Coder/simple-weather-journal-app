const mainBtn = document.getElementById('generate');

function initData(){
	const cty = document.getElementById('zip');
	const feelng = document.getElementById('feeling');
	const data = {};
	data['zip'] = cty.value;
	data['feeling'] = feelng.value;
	
	return data;	
}



async function postDataToFetch(url,data) {
	data = initData();
	dateout = document.getElementById('date');
	tempout = document.getElementById('temp');
	contentout = document.getElementById('content');
	url = 'http://localhost:3000/';
	if (data.zip == '' || data.feeling == '')
		{
			alert('You should fill all text fields');
			return;			
		}
	try{
	// post data for the server and wait for response to update UI
	(await fetch(url,
	{method: 'POST', body: JSON.stringify(data), headers: {
	'Content-Type': 'application/json'}
	})).json().then
	(
	(respnse) => {
		dateout.innerHTML = `${new Date}`;
		tempout.innerHTML = `Temprature is ${(respnse.main).temp} Fahrenheit`;
		contentout.innerHTML = `Weather is mainly  ${((respnse.weather)[0]).main}`;
	}
	);
	}
	catch
	{
		dateout.innerHTML = tempout.innerHTML = contentout.innerHTML = 'Error happened while getting data form server, check your input, or maybe the server is down!';
	}
	fetchEndPoint();	
}

async function fetchEndPoint(url){
	url = 'http://localhost:3000/feelings';
	const endout = document.getElementById('endpoint-output');
	try {
	(await fetch(url)).json().then
	(
	(res)=>	{
		endout.innerHTML = '';// we clear the endpoint to add the new request endpoint
		console.log(res);
		strs = Object.keys(res);
		for (str of strs)
	endout.innerHTML += '<br>' + res[str];// we just put the object as string
	}
	);
	}
	catch(error) 
	{
		endout.innerHTML = 'Error with get request';
	}
}

mainBtn.addEventListener('click', postDataToFetch);


