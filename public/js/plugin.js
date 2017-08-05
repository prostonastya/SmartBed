var select = document.getElementById('heating');
var val = select.options[select.selectedIndex].value; 
var buttonTemp = document.getElementById('SaveTemp');


var imgTerm = document.querySelector('.term');


buttonTemp.addEventListener('click', ChangeTempMode);

function ChangeTempMode(){
	var val = select.options[select.selectedIndex].value; 

	let mode = {};

    mode['heat'] = val;
    console.log(mode);

    let data = JSON.stringify(mode);


    fetch('/mode', {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        method : 'POST',
        body: JSON.stringify(mode)
      	}).then(function(res){      	
        return res.json()        
    	}). then(function (data) {  
    	console.log('Request succeeded with JSON response', data); 
    	ChangePictureClass(data);



    	}).catch(function(error) {  
    	console.log('Request failed', error);  
  	});

}

function ChangePictureClass(data){
	switch (data.heat) {
			case '1': 
			imgTerm.classList.remove('Op-2');
			imgTerm.classList.remove('Op-3');
			imgTerm.classList.add('Op-1'); break;

		    case '2': 
		    imgTerm.classList.remove('Op-1');
		    imgTerm.classList.remove('Op-3');
		    imgTerm.classList.add('Op-2'); break;

		    case '3': 
		    imgTerm.classList.remove('Op-1');
		    imgTerm.classList.remove('Op-2');
		    imgTerm.classList.add('Op-3'); break;
		}
}

// switch (select.options[select.selectedIndex].value) {
// 	case '1': 
// 	imgTerm.classList.remove('Op-2');
// 	imgTerm.classList.remove('Op-3');
// 	imgTerm.classList.add('Op-1'); break;

//     case '2': 
//     imgTerm.classList.remove('Op-1');
//     imgTerm.classList.remove('Op-3');
//     imgTerm.classList.add('Op-2'); break;

//     case '3': 
//     imgTerm.classList.remove('Op-1');
//     imgTerm.classList.remove('Op-2');
//     imgTerm.classList.add('Op-3'); break;
// }

