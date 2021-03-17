'use strict';

const image_name_Ext =[['bag','jpg'],['banana','jpg'],['bathroom','jpg'],['boots','jpg'],['breakfast','jpg'],['bubblegum','jpg'],
  ['chair','jpg'],['cthulhu','jpg'],['dog-duck','jpg'],['dragon','jpg'],['pen','jpg'],['pet-sweep','jpg'],['scissors','jpg'],
  ['shark','jpg'],['sweep','png'],['tauntaun','jpg'],['unicorn','jpg'],['usb','gif'],['water-can','jpg'],['wine-glass','jpg']];

let number_of_section=[]; //// for creating img's tag , and each img need ID ,;)

let pargh=document.getElementById('paragraph_counter');////// p tag for counter place in the screen

for(let i=0;i<3;i++){
  number_of_section[i]=document.createElement('img');
  document.body.appendChild(number_of_section[i]);/////the img creation depend on the whole on js just no need to html page 
  number_of_section[i].setAttribute('id',`imgID${i}`);/////the Id for the img
}

function Product(name,imgExt,votes){ ////// constructor
  this.name=name;
  this.views=0;
  this.votes=votes; //////for localStorage, by defult the value of it zero ,, look below {to the for loop}
  this.path=`./assets/${name}.${imgExt}`;//it will take the name of url from the array which we made before depend on the name in it's own url
  Product.all.push(this); ///instead of put one by one , using this do all process ..... cute hmm..
}
Product.all=[];

for(let i=0;i<image_name_Ext.length;i++){
  let votes=0;
  if(localStorage.getItem('Product')!==null){
    votes=JSON.parse(localStorage.getItem('Product'))[i].votes; //console.log('not null');///json.parse ,retrevie object , the object consist of [array's] for each img depened on {the constructor function},
    //and each array have number of proparity{name,views,votes,path} so , just take the the votes of specific array /constructor in sequential way ^-^
  }

  new Product(image_name_Ext[i][0],image_name_Ext[i][1] , votes);////each i (array) have it's own votes to refer
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let uniqueIndexArray=[];
let iteration=0;
function render(){////////////////////////////////for creating img's with hint name in web page and show img's ^-^ for course we need the src
  for(let i=0;i<3;i++){
    const index=randomNumber(0,Product.all.length-1);
    let uniqueIndex=unique(index);
    number_of_section[i].src=Product.all[uniqueIndex].path;
    number_of_section[i].title=Product.all[uniqueIndex].name;
  }
  iteration++;
  if(iteration>=2)
  {uniqueIndexArray.splice(0,3); ////for prevent duplication, in this way , splice will remove 3 element's starting from the index 0
  //  console.log(uniqueIndexArray);
  }
}
///////////////////////////////////////////////////////////////////make a unique index by #of iteration's

function unique(indx){
  while(uniqueIndexArray.includes(indx) ){
    indx=randomNumber(0,Product.all.length-1);
  }
  uniqueIndexArray.push(indx);
  return indx;
}
/////////////////////////////////////////////////////////////////////// local Storage , Function for saving Votes
function localStorageProduct(){
  let localProduct=JSON.stringify(Product.all);
  localStorage.setItem('Product',localProduct);
}
////////////////////////////////////////////////////////////////////////////the Result Section
let counter=0;/// for count how many iteration(Round), here we want 25 ,and it could be changable
function showData(event){
  for(let j=0 ;j<3;j++){
    if(event.target.id===number_of_section[j].id){
      //console.log(number_of_section[j].id); if want to see which event we took, for assurance
      for(let i=0;i<Product.all.length;i++){
        if (Product.all[i].name === event.target.title){////will count votes and view's for each selected img ,,,, and if we use number_of_section[].title here instead of event.target.id , it's okay^-^
          Product.all[i].votes++;
          Product.all[i].views++;
        }
      }
    }
    else {
      for(let i=0;i<Product.all.length;i++)////for unselected img's and it appeare on the page it must br countable $-$,
        if (Product.all[i].name === number_of_section[j].title){/////we use event.target.title in previous section , cuz it the selected ,,, here the ignoring pic :(, there is loop so that it will visit all img's ;)
          Product.all[i].views++;
        }
    }
    localStorageProduct();

  }
  counter++;
  render();
  pargh.innerHTML=counter;////for present counter in web page
  if(counter===25){
    for(let i=0; i<3;i++){
      number_of_section[i].removeEventListener('click',showData); } ////this will stop img's from change and stay stable
    createChart();
  }

}
for(let i=0; i<3;i++){
  number_of_section[i].addEventListener('click',showData);
}
///////////////////////////////////////////////////////////////////////////////////////////////render for seeing the first iteration of 3 Pic's
render(); ////calling the 3 img's for the first time , and the game will start after that -_- ,the starter point for the rest

//////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////chart js
function createChart(){
  let context = document.getElementById('myChart').getContext('2d');
  let productViews=[]; /// creating array's for saving data in each iteration so that present it at the final in the chart
  let productVotes=[];
  let productNames=[];

  for(let i=0;i<Product.all.length;i++){
    productNames.push(Product.all[i].name);
    productViews.push(Product.all[i].views);
    productVotes.push(Product.all[i].votes); ////becuase we use local storage the votes will be increment depend on the previous votes
  }


  let chartObject ={
    type: 'bar',
    data: {
      labels:productNames,
      datasets: [{//////////////////////////have two type of dataset's one for Voting and other for View's , if u want to add anything to additional just use array for example multiColor's
        label: 'Product Voting results depend on custmor opinion in previous day\'s',
        backgroundColor: [
          'rgba(255, 99, 132, 0.4)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(255, 206, 86, 0.4)',
          'rgba(75, 192, 192, 0.4)',
          'rgba(153, 102, 255, 0.4)',
          'rgba(255, 159, 64, 0.4)',
          'rgba(255, 99, 132, 0.4)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(255, 206, 86, 0.4)',
          'rgba(75, 192, 192, 0.4)',
          'rgba(153, 102, 255, 0.4)',
          'rgba(255, 159, 64, 0.4)',
          'rgba(255, 99, 132, 0.4)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(255, 206, 86, 0.4)',
          'rgba(75, 192, 192, 0.4)',
          'rgba(153, 102, 255, 0.4)',
          'rgba(255, 159, 64, 0.4)',
          'rgba(153, 102, 255, 0.4)',
          'rgba(255, 159, 64, 0.4)',
        ],
        borderColor: 'rgba(216, 27, 96, 1.5)' ,
        data:productVotes
      }
      ,{
        label: 'Product Views results in this moment',
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: 'rgba(26, 217, 96, 1.5)',
        data: productViews
      },
      ],borderWidth: 1
    },
    options: {
      scales: {
        xAxes: [{
          barPercentage: 1
        }],
        yAxes: [{
          barPercentage: 1
        }],
      },
      legend: {
        display: true
      },
      title: {
        display: true,
        text: 'BusMall Product\'s Depend On Custmer\'s Opinion ',
        position: 'top',
        fontSize: 16,
        padding: 20
      },
    }
  };
  let chart = new Chart(context,chartObject);
}

