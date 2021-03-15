'use strict';

const image_name_Ext =[['bag','jpg'],['banana','jpg'],['bathroom','jpg'],['boots','jpg'],['breakfast','jpg'],['bubblegum','jpg'],
  ['chair','jpg'],['cthulhu','jpg'],['dog-duck','jpg'],['dragon','jpg'],['pen','jpg'],['pet-sweep','jpg'],['scissors','jpg'],
  ['shark','jpg'],['sweep','png'],['tauntaun','jpg'],['unicorn','jpg'],['usb','gif'],['water-can','jpg'],['wine-glass','jpg']];

let number_of_section=[]; //// for creating element's

let pargh=document.getElementById('paragraph_counter');

for(let i=0;i<3;i++){
  number_of_section[i]=document.createElement('img');
  document.body.appendChild(number_of_section[i]);
  number_of_section[i].setAttribute('id',`imgID${i}`);
}

function Product(name,imgExt){
  this.name=name;
  this.views=0;
  this.votes=0;
  this.path=`./assets/${name}.${imgExt}`;//it will take the name of url from the array which we made before depend on the name in it's own url
  Product.all.push(this); ///instead of put one by one , using this do all process ..... cute hmm..
}
Product.all=[];
for(let i=0;i<image_name_Ext.length;i++){
  new Product(image_name_Ext[i][0],image_name_Ext[i][1]);
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let uniqueIndexArray=[];
let iteration=0;
function render(){////////////////////////////////for creating img's with hint name in web page
  for(let i=0;i<3;i++){
    const index=randomNumber(0,Product.all.length-1);
    let uniqueIndex=unique(index);
    number_of_section[i].src=Product.all[uniqueIndex].path;
    number_of_section[i].title=Product.all[uniqueIndex].name;
  }
  iteration++;
  if(iteration>=2)
  {uniqueIndexArray.splice(0,3);
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

function createChart(){///////////////////////////////////////for chartJS
  let context = document.getElementById('myChart').getContext('2d');
  let productViews=[];
  let productVotes=[];
  let productNames=[];

  for(let i=0;i<Product.all.length;i++){
    productNames.push(Product.all[i].name);
    productViews.push(Product.all[i].views);
    productVotes.push(Product.all[i].votes);
  }

  //////////////////////////////////////////////////////////////Creating Chart using ChartJS Amazing Part
  let chartObject={
    type: 'bar',
    data: {
      labels:productNames,
      datasets: [{//////////////////////////have two type of dataset's one for Voting and other for View's , if u want to add anything to additional just use array for example multiColor's
        label: 'Product Voting results',
        backgroundColor: 'rgba(216, 27, 96, 0.6)',
        borderColor: 'rgba(216, 27, 96, 1.5)' ,
        data:productVotes
      }
      ,{
        label: 'Product Views results',
        backgroundColor: 'rgba(26, 217, 96, 0.6)',
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
////////////////////////////////////////////////////////////////////////////the Result Section
let counter=0;
function showData(event){
  for(let j=0 ;j<3;j++){
    if(event.target.id===number_of_section[j].id){
      for(let i=0;i<Product.all.length;i++){
        if (Product.all[i].name === event.target.title){
          Product.all[i].votes++;
          Product.all[i].views++;
        }
      }
    }
    else {
      for(let i=0;i<Product.all.length;i++)
        if (Product.all[i].name === number_of_section[j].title){
          Product.all[i].views++;
        }
    }
  }
  counter++;
  render();
  pargh.innerHTML=counter;
  if(counter===25){
    for(let i=0; i<3;i++){
      number_of_section[i].removeEventListener('click',showData); }
    createChart();
  }

}
for(let i=0; i<3;i++){
  number_of_section[i].addEventListener('click',showData);
}
///////////////////////////////////////////////////////////////////////////////////////////////render for seeing the first iteration of 3 Pic's
render();


