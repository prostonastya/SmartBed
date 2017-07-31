var select = document.getElementById('heating');
var val = select.options[select.selectedIndex].value; 
// var ind = select.selectedIndex;

var imgHeating = document.querySelector('.heat_photo');

if (val == 1){
	imgHeating.classList.add('Op_1')
} else {
	if (val == 2){
		imgHeating.classList.add('Op_2')
	} else {
		imgHeating.classList.add('Op_3')
	}
}