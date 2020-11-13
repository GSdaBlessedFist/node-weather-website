 //Fetch weather//


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');

weatherForm.addEventListener('submit',(e)=>{
	e.preventDefault();
	const location = search.value;
	
	messageOne.textContent = "Loading....";
	messageTwo.textContent = "";

	const weatherURL = `/weather?address=${location}`;

	fetch(weatherURL)
	.then(response => response.json())
	.then(data => {
		if(data.error){
			messageOne.textContent = data.error;
		}else{
			messageOne.textContent = data.location;
			messageTwo.textContent = `Today's forecast calls for ${data.weatherDescription} weather.`;
			messageThree.textContent = `precipitation: ${data.precipitation}\%`;
			}
			
		});
	});


