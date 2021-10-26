/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/


// Storing all sections in an array to be used to build the navbar
const sections = document.querySelectorAll('section'); // Sections is used to store all the sections in the document to help build the nav bar.
let navbar = document.querySelector('#navbar__list'); // Selecting the navbar ul to be modified by adding the an li for each section.

let currentActiveSection = 0; // A variable to maintain the index of the active section in the document. 

let observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {
                let newActiveSection = sectionIDToNumber(entry.target.id) - 1;

                sections[currentActiveSection].classList.remove('your-active-class'); // Add the active class to the new section.
                sections[newActiveSection].classList.add('your-active-class'); // remove the active class from old section.

                // Editing the nav bar button styling to coresspond to the active section.
                document.getElementById('navbar__list').getElementsByTagName('a')[currentActiveSection].className = document.getElementById('navbar__list').getElementsByTagName('a')[currentActiveSection].className.replace(" active", "");
                document.getElementById('navbar__list').getElementsByTagName('a')[newActiveSection].className += " active";

                currentActiveSection = newActiveSection;   // Update the index of the current active section.
            }
        });
    },
    { rootMargin: "0px 0px 0px 0px", threshold: 0.6 });



/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// A method used to extract the number of the section from the section ID by removing the string 'section'
function sectionIDToNumber(sectionID) {
    return sectionID.substring(7, sectionID.length);
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

function buildNavBar() {
    for (let i = 0; i < sections.length; i++) {
        const newLinkItem = document.createElement('a'); // create a brand new anchor element
        newLinkItem.textContent = sections[i].dataset.nav; // Modify the content to be the name of the section.
        // newLinkItem.setAttribute('href', "http://www.msn.com");
        newLinkItem.setAttribute('id', `${sections[i].id}_btn`); // Adding an id for each nav bar button
        newLinkItem.setAttribute('id', `${sections[i].id}_btn`); // Adding an id for each nav bar button
        newLinkItem.setAttribute('class', 'menu__link'); // Adding the class type to get the styling from CSS to work.
        if (i === 0) {
            newLinkItem.setAttribute('class', 'menu__link active'); // Adding the class type to get the styling from CSS to work.
        }
        newLinkItem.setAttribute('href', '#'); // Adding the hyperlink to point at #, but we will supress this action later
        const newListItem = document.createElement('li'); // create a brand new li element
        newListItem.appendChild(newLinkItem);
        navbar.appendChild(newListItem);
    }
};


// A function to detect the button of the nav bar that was clicked //

function respondToTheClick(evt) {

    evt.preventDefault(); // Preventing the default action (which is for the button to jump to itself based on href='#') - Is there a better way to do that?

    const clickedBtnID = evt.target.id; // Extracting the id of the button clicked.
    const idOfElementToScrollTo = clickedBtnID.substring(0, clickedBtnID.length - 4); // removing the '_btn' from the id to get the section id we need to navigate to and make "active".

    scrollToTarget(idOfElementToScrollTo); // Scroll to target identified by the id.
}


// Scroll to anchor ID using scrollTO event
function scrollToTarget(idOfElementToScrollTo) {
    var element = document.querySelector(`#${idOfElementToScrollTo}`); // selecting the section we want to navigate to.

    // smooth scroll to element and align it at the center
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
// Building the nav bar after making sure the DOM content has loaded successfully.
document.addEventListener('DOMContentLoaded', function () {
    buildNavBar();

});

// Set sections as active
document.querySelectorAll('section').forEach(section => { observer.observe(section) });

// Event Listener for the NavBar click
document.querySelector('#navbar__list').addEventListener('click', respondToTheClick);
