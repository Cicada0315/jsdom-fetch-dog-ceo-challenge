document.addEventListener('DOMContentLoaded', () => {
  getimages();
  getbreed();
});

//load imgages
function getimages(){
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  return fetch(imgUrl)
    .then(resp => resp.json())
    .then(json => json.message.forEach(myFunction)); 
}
  
function myFunction(item, index) {
    const list=document.getElementById("dog-image-container");
    let img = document.createElement("img");
    img.src = item;
    list.append(img)
} 

//loadbreed
function getbreed(){
  let breed=[];
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  return fetch(breedUrl)
    .then(resp => resp.json())
    .then(json => {
      for(const key in json.message){
        breed.push(key);
      }
      myBreed(breed);
      breedDropdown(breed);
    });
} 

function myBreed(arr) {
  const breed_list=document.getElementById("dog-breeds");
  //empty out
  breed_list.innerHTML="";
  for(let i=0; i<arr.length; i++){
    let li_tag = document.createElement("li");
    li_tag.innerText = arr[i];
    breed_list.append(li_tag);
    li_tag.addEventListener("click", (event) => {
      event.target.style.color ="blue";
    })  
  }
}

function breedDropdown(breed){
  let filtered_breed=[];
  const breeddropdown=document.getElementById("breed-dropdown");
  breeddropdown.addEventListener('change', (event) => {
    const letter=event.target.value;
    for(let i=0; i<breed.length; i++){
      if (breed[i].startsWith(letter)) {
        filtered_breed.push(breed[i]);
      }
    }
    myBreed(filtered_breed);
    filtered_breed=[];
  })
}