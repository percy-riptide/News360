# Project 

*News360: Connecting you to the world's news, delivering personalized content from a diverse range of sources, keeping you informed and engaged.* 

* Date Created: 18 June 2023
* Last Modification Date: 10 August 2023
* Application frontend URL: https://g17csci5709a3.netlify.app/
* Application backendURL: https://g17csci5709a3.onrender.com/
* Git URL: https://git.cs.dal.ca/jagbir/web-group-project-5709

## Authors

*Group Submission*

* [Jagbir Singh](jg581261@dal.ca) - (Full Stack Developer)
* [Navaneeth Manikyal](v339180@dal.ca ) - (Full Stack Developer)
* [Pratik Patil](pr717348@dal.ca) - (Full Stack Developer)
* [Riya Mistry](riya.mistry@dal.ca) - (Full Stack Developer)
* [Sreya Gajjarapu](sr228618@dal.ca ) - (Full Stack Developer)


## Testing
 1. Tested the individual components of the pages such as home, login, FAQ and contact us. They are working as expected. 
    For login page, the input fields accept and are validating input correctly, and the submit button is triggering the expected function. 
 2. Tested if the components are integrated properly. They are working well together.
 3. Performed testing to make sure the UI is working well across multiple devices.
 4. We have done manual testing for user management module; as of now. we first developed my front which is UI with dummy data we have checked for its responsiveness using developer tools on google chrome. we have checked the wepage's UI by checking its front-end validation by making sure that every case is covered like format for email, and requirements for password. we have checked the robustness of UI by passing null values and missing values as dummy input and checked if ui is capable to handle those values without breaking the webpage. we have then Started making API's using Express and have tested them using postman by seeing if data recieved is associated to the data requested. After checking the functionality of API's I have integrated backend and fronend using AXIOS library which is a JS library to make rest-api calls from front-end. we have also ensured that user is notified with appropriate messages in case of invalid requests like wrong username/password, singnup with existing email, and weak password.
 5. We have verified that the correct API calls are being made with the correct methods and parameters.
Test steps:
    i. Open the application in browser and navigate to browser's developer tools in the Network tab.
    ii. Perform an operation, for example: incrementing the upvote.
    iii. Verify that the correct API call is being made with the correct methods and parameters.
6. We have ensured that the number of upvotes displayed on the frontend matches the number from the backend API.
Test steps :
    i. Using Postman, get the number of upvotes from the API for an article [1].
    ii. Open the website in a browser and check the number of upvotes displayed.
    iii. Verify that the number matches the number from the API.
7. We have ensured that guest users and authenticated users are experiencing different behaviour according to the system's design i.e. only authenticated users might be able to upvote.
8. We also fetch the users from different apis and check wether we are not able to store it or not and confirmed it's working fine.
9. For the summarisation feature, we imported sample data from the internet and ran it on multiple times to check for consistency over different sentences of summary levels
10. For the translation feature, We added sample text from the internet and tried changing it into multiple languages before trying it on larger text to see if it works well with huge amount of data.

### Break down into end to end tests

Summarisation:
1) Get data
2) Choose summary sentences level
3) Check if data was summarized without errors

```
var summary = in_a.nutshell(paragraphString,5);
console.log(summary);
```

In the above example paragraphString has the data from the news article that needs to be summarized

Translation:
1) Get data
2) Choose languange
3) Store output
```
    for (const doc of documents) {
      spanishContent = await translate(doc.content, { to: 'es' });
      console.log(spanishContent);
      frenchContent = await translate(doc.content, { to: 'fr' });
      console.log(frenchContent);
      const filter = { _id: doc._id };
      const update = {
        $set: {
          content_es: spanishContent,
          content_fr: frenchContent,
        },
      };
```

In the above example, doc is one of the articles that is being stored in a collection in a mongoDB database. we are getting the content of that particular article to change the languange of the article. Once the languages are changed we are storing them in two new fileds inside the collection that match the language of the content

## Payload Testing
`RegistrationPage.js`

When user tries to register user needs to fill the regestration form and data needs to pass front-end validations inorder for user to click on the signup button. Once sign up button is clicked a payload similar to below is sent to "/register" endpoint which checks if a entity with same email id already exist if they exist error is returned saying email already in use.

```
{ 
"firstName":"navaneeth",
 "lastName":"nanda",
 "email":"nanda9@gmail.com", 
 "password":"Nanda@123" 
}
```
I the case of successfull regestration user will be navigated to login page for the user to login.




`login.js`

When user tries to register user needs to fill the login form and data needs to pass front-end validations inorder for user to click on the login button. Once login button is clicked a payload similar to below is sent to "/login" endpoint which checks if a entity if the password is associated with the username and if correct signal:0 is sent in that case user is forwarded to home page. If any other signal other than 0 is recieved then user is notified of the error.

```
{
    "email":"nanda6@gmail.com",
    "password":"Nanda@123"
}
```


`PofilePage.js`

When a user hits on edit option present in profile page user will be given access to edit the input feilds in profile page. Once user hits save then a payload similar to below payload is sent with all the values present and the values associated with the email id are updated in database. User wont be given chance to update email id.

```
{
"firstName":"navaneeth",
 "lastName":"nanda", "email":"nanda5@gmail.com", 
 "bio":"this is hi how are you",
 "linkedIn":"https://www.linkedin.com",
 "twitter":"https://twitter.com" 
    
}
```


`ChangePassword.js`

When user hits on change password in profile page user will be redirected to ChangePassword page which will have column for current_password, new_password and confirm_new_password. Upon hitting on update a payload similar to below will be sent to backend. Backend checks if password submitted is same as user's current password if user will be notified that password is updated if no user will be updated about the error.


```
{
      "email": "nanda@gmail.com", 
      "currentPassword": "Nanda@123",
      "newPassword": "newPassword"
}
```


## Deployment
The application frontend is deployed using Netlify. 
The build command used to deploy is as follows:
`npm run build`

The Application backend is deployed using render.
The build commands used are `npm install` to install packages and `node server.js` to start the server



## Sources Used


1. To learn how to implement and customize components like accordions, alerts, buttons, the offcanvas component, navbars, modals, list groups, images, and forms.
https://react-bootstrap.github.io/docs/components/accordion,
https://react-bootstrap.github.io/docs/components/alerts,
https://react-bootstrap.github.io/docs/components/button-group,
https://react-bootstrap.github.io/docs/components/buttons,
https://react-bootstrap.github.io/docs/components/navbar,
https://react-bootstrap.github.io/docs/components/modal,
https://react-bootstrap.github.io/docs/components/list-group,
https://react-bootstrap.github.io/docs/components/images

2. To learn how to use the React International Phone library. This library provides a phone input field that includes the international dialing code.
https://react-international-phone-docs.vercel.app/

3. To learn about  component guide and using one of the libraries mentioned in the other links.
https://www.youtube.com/watch?v=FdrEjwymzdY

4. To add animations and transitions to the applications.
https://www.npmjs.com/package/framer-motion

5. for installation of Bootstrap with React.
https://www.npmjs.com/package/react-bootstrap

6. To get the original Bootstrap CSS and JS files and learn more about its components, and explore its documentation.
https://getbootstrap.com/

7. To create graphics in your web applications to improve aesthetics and user experience.
http://undraw.co

8. To create a password checklist that provides validation according to the set rules. https://www.npmjs.com/package/react-password-checklist

9. *Tutorial*:  Adding a loading spinner to the web page while waiting for API responses. <https://www.youtube.com/watch?v=xMm5f7Ec7Ws>



### ContactUs.js (Lines 16,55,84-89)
```
import { PhoneInput, usePhoneValidation } from "react-international-phone";
import "react-international-phone/style.css";
const phoneValidation = usePhoneValidation(telephone);
<Col>
                  <Form.Label>Phone</Form.Label>
                  <PhoneInput
                  defaultCountry="ca"
                  value={telephone}
                  onChange={(phone) => setTelephone(phone)}
                  style={{ marginBottom: "15px" }}
                />
                </Col>

```
The code above was created by adapting the code in https://react-international-phone-docs.vercel.app/ as shown below: 
```
import { useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const App = () => {
  const [phone, setPhone] = useState('');

  return (
    <div>
      <PhoneInput
        defaultCountry="ua"
        value={phone}
        onChange={(phone) => setPhone(phone)}
      />
    </div>
  );
};
```


The author of the code is not mentioned anywhere. But the code was used to create a phone number input field. This library offers a prebuilt component, PhoneInput, which is imported at the start along with a custom hook usePhoneValidation. The hook is used to validate the entered phone number. 
The code was modified by Pratik Patil.


## Built With

* [HTML5]: It is utilized in the creation of user interface templates for the News360 website. It allows developers to structure and present content effectively, incorporating various elements and features to enhance the user experience. With HTML5, developers can define the layout, design, and functionality of the website's interface, ensuring a seamless and visually appealing browsing experience for News360 users.

* [CSS]: Employed for structuring and adjusting the aesthetics of HTML templates, allowing for the customization of layout and the overall visual presentation of the web pages. 

* [React]: Utilized for conducting client-side validations and orchestrating API calls to the server, facilitating seamless data communication and user interface interactions.

* [Bootstrap]: This framework is leveraged to create web pages that are responsive and adapt seamlessly to different screen sizes. It also offers a suite of pre-defined, consistent styles for frequently used components such as buttons and background cards.
* [ReactJS](http://https://react.dev/) - The front end library used
* [Create React App](https://create-react-app.dev/) - Boilerplate code generation
* [Node](https://nodejs.org/en) - node package manager
* [React Bootstrap](https://react-bootstrap.github.io/) - Stylized components
* [Bootstrap](https://getbootstrap.com/) - Stylized components


## Acknowledgments
We acknowledge the comprehensive documentation of React Bootstrap, which helped us learn how to implement and customize various components like accordions, alerts, buttons, offcanvas, navbars, modals, list groups, images, and forms.

* [PedroTech](https://www.youtube.com/watch?v=FdrEjwymzdY)
* [HHV Technology](https://www.youtube.com/watch?v=xMm5f7Ec7Ws)
* [Pure CSS Loaders](https://loading.io/css/)
#
### Images
* [Undraw](https://undraw.co/search)
* [Globe Icon](https://www.pngegg.com/en/png-fjlls/)
* [Unsplash](unsplash.com)

## References

[1]	"Postman desktop agent", Postman Website. Available: https://www.postman.com/downloads/. [Accessed: August 10, 2023]. 

[2]	"Create a new Web Service", Render Website. Available: https://dashboard.render.com/select-repo?type=web. [Accessed: August 10, 2023]. 

[3]	"MongoDB and Node.js Tutorial - CRUD Operations", MongoDB Website. Available: https://www.mongodb.com/developer/languages/javascript/node-crud-tutorial/?_ga=2.166927742.1333614448.1690409575-578006028.1688737396. [Accessed: August 10, 2023]. 

[4]	"Let's build from here", Github Website. Available: https://github.com/. [Accessed: August 10, 2023]. 

[5] "A Step-by-Step Guide: Deploying on Netlify", Netlify Website. Available: https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/. [Accessed: August 10, 2023].
