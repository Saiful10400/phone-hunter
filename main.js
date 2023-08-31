let fetchData = async (text, moreButton) => {
  let response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${text}`
  );
  let StringData = await response.json();
  displayPhone(StringData, moreButton);
};

// display phone  for initial phone display.
let parentContainer = document.getElementById("body");
let ShowAllBtn = document.getElementById("ShowAllBtn");

const displayPhone = (data, moreButton) => {
  let dataArray = data.data;

  // console.log("tis is the valu of more btn",moreButton)

  let sliceArray = dataArray.slice(0, 12);

  if (dataArray.length > 12) {
    ShowAllBtn.classList.remove("hidden");
  } else {
    ShowAllBtn.classList.add("hidden");
  }

  if (moreButton) {
    sliceArray = dataArray;
    ShowAllBtn.classList.add("hidden");
  }

  // getting paretn div for the phone card.

  sliceArray.forEach((element) => {
    let card = document.createElement("div");
    card.classList = "card pt-5 bg-base-100 shadow-xl";
    card.innerHTML = `
        
        <figure><img src="${element.image}" /></figure>
        <div class="card-body">
          <h2 class="card-title">${element.phone_name}</h2>
          <p> ${element.slug}</p>
          <div class="card-actions justify-end">
            <button onclick="my_modal_4.showModal(),singlephoneLoad('${element.slug}')" class="btn btn-primary">details...</button>
          </div>
        </div>

        `;
    spinner(false);
    parentContainer.appendChild(card);
  });
};

function btnClicked(moreButton) {
  parentContainer.innerHTML = "";
  spinner(true);
  let inputvalu = document.getElementById("inputFild").value;
  fetchData(inputvalu, moreButton);
}

function spinner(shouldSpeen) {
  let spinner = document.getElementById("Spinner");

  if (shouldSpeen) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
}

// show all btn.

let showall = () => {
  btnClicked(true);
};

let singlephoneLoad = async (id) => {
  let res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  let dataofSinglePhone = await res.json();
  let singlePhoneData = dataofSinglePhone.data;
  singlePhoneModalDisplay(singlePhoneData);
};

let singleContainer = document.getElementById("singlePhoneDataContainer");

let singlePhoneModalDisplay = (data) => {
  singleContainer.innerHTML = `
  <div class="text-center">
  
  <img class="text-center inline-block" src="${data.image}" alt="">
    <h4 class="text-3xl my-6 font-bold" >${data.name}</h4>

    <table class=" w-full" >
    <tr>
      <td class="border-2 border-black text-start text-xl ">Brand</td>
      <td class="border-2 border-black text-start text-xl  ">${data.brand}</td>
    </tr>
    <tr>
      <td class="border-2 border-black text-start text-xl ">Release Date</td>
      <td class="border-2 border-black text-start text-xl  ">${data.releaseDate}</td>
    </tr>
    <tr>
      <td class="border-2 border-black text-start text-xl ">Processor</td>
      <td class="border-2 border-black text-start text-xl  ">${data.mainFeatures.chipSet}</td>
    </tr>
    <tr>
      <td class="border-2 border-black text-start text-xl ">Memory</td>
      <td class="border-2 border-black text-start text-xl  ">${data.mainFeatures.memory}</td>
    </tr>
    <tr>
      <td class="border-2 border-black text-start text-xl ">Display</td>
      <td class="border-2 border-black text-start text-xl  ">${data.mainFeatures.displaySize}</td>
    </tr>
    </table>

  </div>
    `;
};





// let validation=()=>{
  
//   if(document.getElementById("inputFild").value=null){
//   document.getElementById("searchButton").removeAttribute("disabled")
// }
// }