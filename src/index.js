import { render } from 'inferno';
import './index.css';
import View from './views/index';
import * as serviceWorker from './serviceWorker';

// console.log("inside plugin render function, about to append social-share plugin", document);

document.addEventListener("DOMContentLoaded", function(event) { 

   // check if an element with id="social-share-container" exists
    // else create one
    let socialShareContainer = document.getElementById('social-share-container');

    if (socialShareContainer) {

        render(<View />, socialShareContainer);
    } else {
        
        // console.log("about to create an element with id, social-share-container");
        // create element since there is no element with 'social-share-container'
        socialShareContainer = document.createElement('div');
        socialShareContainer.setAttribute("id", "social-share-container");
        
        socialShareContainer.style.position = "fixed"; 

        socialShareContainer.style.top = "50%"; 

        document.body.appendChild(socialShareContainer);

        // console.log("document.getElementById('social-share-container')", document.getElementById('social-share-container'));

        render(<View />, socialShareContainer);
    }
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
