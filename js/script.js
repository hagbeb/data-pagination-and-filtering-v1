/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

// store the number of items per page that we want
const itemsPerPage = 9;

// create a parent container for a search box to add to the page, and add it's innerHTML
const searchParent = document.createElement('form');
searchParent.innerHTML = `
   <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="submit"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
`;
// get the header, and insert the search box to it
header = document.querySelector('header');
header.appendChild(searchParent);

// create a variable for the list parent element. Do this globally so it can be used by 2 functions 
let listParent = document.querySelector('ul.student-list');
// get the parent element of the page buttons (globally, so can be used by 2 functions)
let buttonsParent = document.querySelector('ul.link-list');

// get the search input and the search button
const searchInput = document.querySelector('#search');

// create an event handler for when users use the search box
function handleSearches(e) {
   // create an array to contain the list of students filtered by the search term
   const filteredList = [];
   // get what the user typed in the keyup event
   const userInput = searchInput.value.toLowerCase();
   // loop through original list, compare to user input
   for (i = 0; i < data.length; i++) {
      // convert the current (original) item being checked to lower case
      const studentName = `${data[i].name.first} ${data[i].name.last}`.toLowerCase();
      // check if the name includes the search term. If so, push to filtered array
      if (studentName.includes(userInput)) {
         filteredList.push(data[i]);
      }
   }
   // if the search term matches more than one item, run the functions, passing in the new list
   if (filteredList.length > 0) {
      addPagination(filteredList);
      showPage(filteredList, 1);
   // if there are no matches, add a message and empty the buttons area
   } else {
      listParent.innerHTML = '<h3>No results found</h3>';
      buttonsParent.innerHTML = '';
   }
}

// add event listener for the search box
searchInput.addEventListener('keyup', handleSearches);
// also listen for submit event ie enter being pressed or button being clicked
searchParent.addEventListener('submit', (e) => {
   // prevent page refresh, then run handleSearches handler to filter list by search term
   e.preventDefault();
   handleSearches(e);
});

/*
Create the `showPage` function
This will create and insert/append the elements needed to display a "page" of items from the ...
... 'data' array, with the number on each page being the itemsPerPage that we set above
*/

function showPage(list, page) {
   // create variables for the start and end index numbers for the items to be shown on the page
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = (page * itemsPerPage);
   // set the list parent element to an empty string to clear previous
   listParent.innerHTML = '';
   // loop over list of students
   for (i = 0; i < list.length; i++) {
      // if the student index number is between the desired start and end
      if (i >= startIndex && i < endIndex ) {
         // create student
         const student = `
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${list[i].picture.thumbnail}" alt="Profile Picture">
                  <h3>${list[i].name.title} ${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li>
         `;
         // add the student to the parent on the page
         listParent.insertAdjacentHTML('beforeend', student);
      }
   }
}


/*
Create the `addPagination` function
This will create and insert/append the pagination buttons, + listen for a button being clicked ...
... then calling the showPage function again when a button is clicked
*/
function addPagination(list) {
   // calculate the number of pages needed; divide itemsPerPage from total no of items & round up
   const pagesNeeded = Math.ceil(list.length / itemsPerPage);
   // get the parent element of the page buttons, and empty it of previous
   buttonsParent.innerHTML = '';
   // loop through the number of pages we need. Start at 1 because page numbers are 1-indexed
   for (i = 1; i <= pagesNeeded; i++) {
      // create a button element for each of the pages
      const button = `
         <li>
            <button type="button">${i}</button>
         </li>
      `;
      // add the buttons to the parent element
      buttonsParent.insertAdjacentHTML('beforeEnd', button);
   }
   // create a variable to store the currently active button. Set this to the first button at start
   let activeButton = buttonsParent.querySelector('button');
   // give the first button the class of active
   activeButton.classList.add('active');
   // listen for the buttonsParent element, being clicked, pass in the event object
   buttonsParent.addEventListener('click', (e) => {
      // check if the clicked element was a button
      if(e.target.tagName === 'BUTTON') {
         // remove the 'active' class from previous pagination button
         activeButton.classList.remove('active');
         // add the 'active' classname to the clicked button 
         e.target.classList.add('active');
         // set the activeButton to the current target
         activeButton = e.target;
         // call the showPage function, passing in the data and the page number clicked
         showPage(list, e.target.textContent);
      }
   });
}

// Call functions
showPage(data, 1);
addPagination(data);
