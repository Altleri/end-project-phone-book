"use strict";

/***************************JS*************************************
// ANASTASIIA ALTSHULER 
// AND EVGENY ALTSHULER 
/************************************************************************/

//our array with contact information
let contacts = [
  {
    id: 1,
    name: 'Bertie Yates',
    address: "Haifa",
    phone: "054999000",
    age: '25',
    imageUrl: "./image/contact1.png",
    id: 7
  },
  {
    id: 2,
    name: 'Hester Hogan',
    address: "Haifa",
    phone: "054996669",
    age: '25',
    imageUrl: "./image/contact2.png"
  },
  {
    id: 3,
    name: 'Larry Little',
    address: "Haifa",
    phone: "054966699",
    age: '25',
    imageUrl: "./image/contact3.png"
  },
  {
    id: 4,
    name: 'Sean Walsh',
    address: "Haifa",
    phone: "054555999",
    age: '25',
    imageUrl: "./image/seanWalsh.png"
  },
  {
    id: 5,
    name: 'Carry Jonh',
    address: "Haifa",
    phone: "054555999",
    age: '25',
    imageUrl: "./image/carryJonh.png"
  },
]

///////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////ADD HTML ELEMENT INTO UL///////////////////////////////////////////
//Chosed UL for add into it all info about contacts
const contactsListElement = document.querySelector('.user-list');
const countOfContact = document.getElementById('count-people')

//Function for upload to the page all exist objects.
//contact is our Array with objects
function showContactsList() {
  contactsListElement.replaceChildren(); //In beginning we delete all content of our ul
  //Created function forEach that will upload all elementson the page
  contacts.forEach((contact) => {
    //Created new element into html, by using insertAdjacentHTML command
    //+ We use function createContacthtml that returned content of li. 
    contactsListElement.insertAdjacentHTML('beforeend', createContacthtml(contact));//Added new contect into UL (html)
  })
  showContactsCount();//Use function that count leght of our Array
}

 //Get element from contacts.forEach function in  showContactsList function
function createContacthtml(contact) {
  return ` <li class="user-items" data-id="${contact.id}" data-name="${contact.name.toLowerCase()}" data-phone="${contact.phone}">
            <div class="user-info">
            <img src="${contact.imageUrl}" alt="contact1" title="${contact.name}" class="avatar">
            <span class="user-name" >${contact.name}</span>
          </div>
          <div class="user-actions">
            <i class="info action-icon"><img src="./image/infoicon.png" alt="infoicon" title="info"></i>
            <i class="edit action-icon"><img src="./image/linepenpencilicon.png" alt="penicon" title="edit"></i>
            <i class="delete action-icon"><img class="delete-img" src="./image/trashbasketdeleteremoveicon2.png" alt="trashbasket2"
                title="delete"></i>
          </div>
          </li>`
}

showContactsList();//Use function that count leght of our Array
/////////////////////////////////////////////////END/////////////////////////////////////////////////

contactsListElement.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-img')) {
    const contactEL = e.target.closest('.user-items');
    const contactID = +contactEL.getAttribute('data-id');
    contacts = contacts
      .filter((elem) => elem.id !== contactID)
      .map((elem) => {
        if (elem.id < contactID) {
          return elem;
        }
        return { ...elem, id: elem.id - 1 }
      })

    showContactsList();
  }
})

const removeAllBTN = document.querySelector('.remove-all-btn')
removeAllBTN.addEventListener('click', () => {
  contacts.length = 0;
  showContactsList();
})

/////////////////////////////////////////Search INPUT/////////////////////////////////////////////
//////////////////////////////////////////Search CONTACT//////////////////////////////////
//Choses all needed variables. 
let searchInput = document.getElementById('searchInput')//Search area
// Function that reacts to keyboard actions
searchInput.addEventListener('input', () => {
  //New variable that take value of input search
  const filter = searchInput.value.toLowerCase();
  //Get LI content from UL that we added above
  const searchContactList = contactsListElement.querySelectorAll('.user-items');

  //Function that checked all elements with class .user-items (our LI)
  searchContactList.forEach(contact => {
    //New Variable that take value from .user-items (our LI)
    const name = contact.getAttribute('data-name');
    const phone = contact.getAttribute('data-phone');

    //If element contain printed text on input area it removed class with style display: none;
    if (name.includes(filter) || phone.includes(filter)) {
      contact.classList.remove('displayNone')
    }
    else {
      contact.classList.add('displayNone')
    }
  })
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////Popup////////// button info/////////////////////////////////
//Choses all needed variables.
const infoButton = document.querySelectorAll('.info')
let infoPopup = document.getElementById('infoPopup');
const closePopup = document.querySelectorAll('.close');
//if click on X close the popup
closePopup.forEach(elem => {
  elem.addEventListener('click', () => {
    infoPopup.style.display = 'none'
  })
})
//////////////////////////////////////////////////////////////////////////////////////////////////////

//Function that fill all span of info popup
function showContactInfo(contact) {
  document.querySelector('.current-user-name').textContent = contact.name;
  document.querySelector('.current-user-phone').textContent = contact.phone;
  document.querySelector('.current-user-age').textContent = contact.age;
  document.querySelector('.current-user-address').textContent = contact.address;
  infoPopup.style.display = 'block';
}

//Choose created LI with all contact data ( our array). Choose elem and index  
const userInfo = document.querySelectorAll('.user-items').forEach((elem, index) => {
  const infoBtn = elem.querySelector('.info');//choose elem with class info
  infoBtn.addEventListener('click', () => {//added event
    showContactInfo(contacts[index]);//Call the function  
  });
})


///////////////////////////////////////Popup////////// button AddPerson/////////////////////////////////

//Choses all needed variables.
const addButton = document.getElementById('addPerson')
let addPopup = document.getElementById('addingPopup')
//if c});lick on .addPerson popup showes information
addButton.addEventListener('click', () => {
  addPopup.style.display = 'block'
})
//if click on X close the popup
closePopup.forEach(elem => {
  elem.addEventListener('click', () => {
    addPopup.style.display = 'none'
  })
})
///////////////////////////////////////Popup////////// button AddPerson/////////////////////////////////

////////////////////////POPUP/////////////////////EDIT PERSON///////////////////////////////////////
//Choses all needed variables.
const editButton = document.querySelectorAll('.edit')
let editPopup = document.getElementById('editPopup')
//if click on X close the popup
closePopup.forEach(elem => {
  elem.addEventListener('click', () => {
    editPopup.style.display = 'none'
  })
})
////////////////////////POPUP/////////////////////EDIT PERSON///////////////////////////////////////
let indexOfContact = null;
//Function that fill all span of edit popup
function editPersonalInfo(contact) {
  document.querySelector('.edit-user-name').value = contact.name;
  document.querySelector('.edit-user-phone').value = contact.phone;
  document.querySelector('.edit-user-address').value = contact.address;
  document.querySelector('.edit-user-age').value = contact.age;
  document.querySelector('.edit-user-image').value = contact.imageUrl;
  editPopup.style.display = 'block';
}
//if click on .edit popup showes information
const editInfo = document.querySelectorAll('.user-items').forEach((elem, index) => {
  const editBtn = elem.querySelector('.edit')//choose elem with class edit
  editBtn.addEventListener('click', () => {//added event
    indexOfContact = index;//Variable for save position of the contact
    editPersonalInfo(contacts[index])//Call the function
  })
})

//Choose botton that save provided edit information
const editSaveBottom = document.getElementById('editSaveBottom')
//Added event click. 
editSaveBottom.addEventListener('click', (e) => {
  e.preventDefault();//for inputs
  //Conacts that we choosed in function that opened edit popup
  //Saved new provided information
  contacts[indexOfContact].name = document.querySelector('.edit-user-name').value;
  contacts[indexOfContact].phone = document.querySelector('.edit-user-phone').value;
  contacts[indexOfContact].address = document.querySelector('.edit-user-address').value;
  contacts[indexOfContact].age = document.querySelector('.edit-user-age').value;
  //Changed user name on main page
  const spanName = document.querySelectorAll('.user-items')[indexOfContact];
  spanName.querySelector('.user-name').textContent = contacts[indexOfContact].name
  alert("Saved")

})




/////////////////////////////////////////////Save//button/////////////////////////////////////////////
////////////////////////////////////////////ADD NEW CONTACT/////////////////////////////
//Choses save button to add new contact
const addSaveButton = document.getElementById('addSaveButton')


//Choses variables that will be provided by owner. From ADD POPUP
const newContactName = document.querySelector('.new-user-name');
const newContactPhone = document.querySelector('.new-user-phone');
const newContactAddress = document.querySelector('.new-user-address');
const newContactAge = document.querySelector('.new-user-age');
const newContactImageURL = document.querySelector('.new-user-image');

//Additional function to reset the provided data
//this function needed to reset the value for future data
const resetData = () => {
  newContactName.value = ""
  newContactPhone.value = ""
  newContactAddress.value = ""
  newContactAge.value = ""
  newContactImageURL.value = ""
}

//Created function that save the provided data
const addSendData = (e) => {/***************OPEN FUNCTION***************/
  e.preventDefault();//Use event to stop the page updating

  /************************************************************ */
  //Added variables for save provided value in input area.
  //Saved the providede data
  const inputName = newContactName.value;
  const inputPhone = newContactPhone.value;
  const inputAddress = newContactAddress.value;
  const inputAge = newContactAge.value;
  const inputImageURL = newContactImageURL.value;
  /********************************************************** */

  //Check If there some input is empty -> display the message
  if (!inputName.trim() || !inputPhone.trim() || !inputAddress.trim() || !inputAge.trim() || !inputImageURL.trim()) {
    alert("All fields required!")
  } else { //If all good we save object
    //We call resert function that reset all provided data

    // /************************CREATE NEW CONTACT AREA INTO THE FUNCTION******************************/
    //Created new Object
    const newObj = {
      id: contacts.length + 1,
      name: inputName,
      address: inputAddress,
      phone: inputPhone,
      imageUrl: inputImageURL
    }
    //Added new LI to UL on HTML page
    // contactsListElement.appendChild(liLisNewt);
    //Added new Object to our Array 
    resetData();
    contacts.push(newObj);
    //Updated count of contact  
    addPopup.style.display = 'none'
    showContactsList();
  }
}/***************CLOSE FUNCTION***************/

/**********************************************************************/
//Variable. This our button with event click. 
// When the button is clicked, we call the function above (sendData).
addSaveButton.addEventListener('click', addSendData)
addSaveButton.addEventListener('click', (e) => {
  e.preventDefault()
})
/**********************************************************************/
//////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////Sum of Contact Count on top of site page//////////////////
function showContactsCount() {
  countOfContact.textContent = contacts.length + " people";
}
////////////////////////////////////////////////////////////////////////////////
