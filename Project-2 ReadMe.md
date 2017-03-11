# Project-2

<h1> Rockstagram </h1>
<h2> GA WDI London, Project 2, Mar 2017.</h2>

Rockstagram is a full stack web app built in Express. It is based on Instragram, and intended as a photo sharing app, for Geologists to share photographs of rocks and to leave comments. The google autocomplete and maps APIs have been integrated so that the locations of the photos can be input by the user and then displayed on a map.

The app uses two database collections, Users and Rocks. These are referenced, a third model Comments, is embedded within the Rocks collection. The app is fully RESTful and performs all of the CRUD actions. The app is based around the ability of users to upload images, image upload was implemented using AWS. OAuth using GitHub and Facebook has been added. 

<h3> Technologies used;</h3>

* The app is built in Node JS with Express. 
* A mongo database was used to store the data, with mongoose used to create models within express. 
* Views are rendered in EJS.
* Pictures are uploaded to the AWS S3 service. 
* The app requires user authentication and uses secure sessions.
* OAuth using Github and Facebook has been added.
* Google's autocomplete and maps APIs were consumed in order to display the locations of the pictures.
* Styles were written in Sass with Gulp used as task runner. The CSS framework 'Bootstrap' was used for styling.
* The google web fonts 'Lato' and 'Shrikhand' were used to style the app, font-awesome was used to supply logos, and the Jquery plug in 'Validate.js' was used for form validation.
* A high resolution image for the homepage was from Unsplash.com.
* Babel is used minify and convert the Javascript to ES5.
* The app is deployed via Heroku. (https://polar-hollows-80952.herokuapp.com/)



<h3> Wireframes</h3>
Wire framing was done in Balsamiq; 

![](/Users/sarahmiller/Desktop/Project 2 Pics/Wireframes.png)

Planning the pages necessary was an essential step in the process of building the app, and I revisited these plans on a daily basis. In order to build the app by the project deadline pages that were not in the original plan were added, these had been intended as an interim step in the build process but the timeframe meant that there was no time to remove these. 

In addition to wire framing, planning each of the tasks was done in Trello, the eleGantt plug in was also utilised in order to keep track of project timings.

![](/Users/sarahmiller/Desktop/Project 2 Pics/trello.png)


<h3> Site Functionality</h3>
The user flow through the site is as follows;

The homepage is a Login page.

![](/Users/sarahmiller/Desktop/Project 2 Pics/login page.png)

Once logged in, or registered the the user is redirected to the rocks index page, here they can see all of the pictures uploaded to the site and the map with the locations the pictures were taken. Navigation through the site is principally via the navigation bar.

![](/Users/sarahmiller/Desktop/Project 2 Pics/rocks index.png)

Clicking on the pictures redirects to the rocks show page, where the owner of the record can delete the picture and all users can leave comments. Only the owner of the comments can edit or delete these. Additionally a user can see all of the other registered users of the site on the user index page,

![](/Users/sarahmiller/Desktop/Project 2 Pics/users index.png)


Clicking on the user profile pictures redirects to the user show page, here the user can edit or delete their profiles. 

Logout on the Navigation bar regenerates the session, effectively logging the user out.  

<h3>Unsolved Problems </h3> 
* At the current time the "created by" attribute of each record does not display, this piece of functionality would allow the users to see who had uploaded each picture, and provide a link to that users profile page. 

* The styling is not fully complete, and the overall style of the site is not fully implemented. More time will be needed to resolve both of these issues. 

* I would  like to revisit some of the functionality, as some of the page redirects, for example having a separate show page for each of the rocks records could be unnecessary if the functionality were to be better incorporated in the index page. 

* I would also like to implement a filter for the rocks records, so that they could be viewed according to their category.  


<h3>Challenges </h3> 
The app uses three models, two are reference and one embedded. This adds to the complexity of the site, and ensuring these all functioned correctly was challenging. The main blocker for this project was time, implementing image upload and utilising the data from the APIs in a week was challenging. The user flow of the site could be improved by removing the additional pages that had been built as interim steps, as could the general design aesthetic. 



