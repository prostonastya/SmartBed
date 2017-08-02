var select = document.getElementById('heating');
var val = select.options[select.selectedIndex].value; 


var imgTerm = document.querySelector('.term');


// if (val == 1){
// 	select.options[0].setAttribute('selected', '')
// } else {
// 	if (val == 2){
// 		select.options[1].setAttribute('selected', '')
// 	} else {
// 		select.options[2].setAttribute('selected', '')
// 	}
// }

// -----------------------
// for(let i=0; i<select.options.length; i++){

//     if(select.options[i].selected){
//       select.options[i].setAttribute('selected', '');
//     }
//     else{
//       select.options[i].removeAttribute('selected', '');
//     }
//   }

// ------------------------------
  // if(select.options[0].selected){
  //     select.options[0].setAttribute('selected', '') && select.options[1].removeAttribute('selected', '') && select.options[2].removeAttribute('selected', '');
  //   }
  //   else{ if (select.options[1].selected){ 

  //     		select.options[1].setAttribute('selected', '') && select.options[0].removeAttribute('selected', '') && select.options[2].removeAttribute('selected', '');
  //   		} else {
  //   			select.options[2].setAttribute('selected', '') && select.options[1].removeAttribute('selected', '') && select.options[0].removeAttribute('selected', '')
  //   		}
  //   } 