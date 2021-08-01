'use strict';

/* please note that the weather API using is using zipcode and the default country is US so try us codes like 10001 for new york or 98101 for Seattle and so on.
*/
const portNum = 3000;
let keyNumber = 0;
const fetch = require('node-fetch');
const express = require('express');
const cors = require('cors');
const bdyparser = require('body-parser');
const wthrUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const API_KEY = 'YOUR_API_KEY_HERE';
const projectData = {}; // Object as an End-Point
const app = express();

app.use(cors());
app.use(express.static('website'));
app.use(bdyparser.json());
app.use(bdyparser.urlencoded({ extended: false }));
app.listen(portNum,() => {
	console.log(`Server is up and running on port ${portNum}\n`);
});

app.get('/feelings',(req, res) => {res.send(JSON.stringify(projectData));res.end();console.log('responding to the get request done\n');});

app.post('/', async (req, res) => {
	const zipcode = req.body.zip;
	const felng = req.body.feeling;
	projectData['key'+keyNumber] = felng;
	keyNumber++;
	try {
	(await fetch(
	wthrUrl + zipcode + '&units=imperial' +'&appid=' + API_KEY
	)).json().then
	(
		(ftched) =>
		{
		if(ftched.cod != '404')
			{
			res.send(ftched);
			res.end();			
			console.log('Weather data fetched and send to the client\n');
			}
		else
			{
				console.log('Error with data format from: "' + wthrUrl + zipcode +'&appid=' + API_KEY + '" probably because incorrect input from user\n');
				res.end();
			}
		}
	)
	}
	catch(error)
	{
		console.log('Error fetching data from weather server, are you offline\?\n');
	}
	
});
