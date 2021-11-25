# Viewing the TZ Interview project

You can view this project live online at [https://jamesfinn180.github.io/pointillism/](https://jamesfinn180.github.io/pointillism/).

You can view the non-built/undeployed code on the **initialize** branch. The important code is in **App.js** inside the **src** folder [https://github.com/jamesfinn180/pointillism/tree/initialize/src](https://github.com/jamesfinn180/pointillism/tree/initialize/src)

## Features

The project was built using create-react-app with JavaScript and CSS. Aside from React itself there were no external libraries used. The project features:
* Connection to the GitHub gists API (https://docs.github.com/en/rest/reference/gists#list-all-public-gists).
* Paged-infinite scrolling list featuring owner avatars and file names of gists.
* Fade in and out of owner avatar when gist is clicked from the list.

## Breakdown

For ease of reviewing the project, the components were not split into separate external modules. Instead all 5 of them appear in the main App.js file. They include one class component and 4 functional components for ease of maintenance and reusability.
* __App__ component contains state which handles fetching data from the GitHub API and storing it. Some basic throttling was used here in the getGists() function to prevent multiple calls to the API triggered by the scrolling event.
* __List__ component contains the scrollList() function that keeps track of the user's scroll position on the site and calls getGists() from its parent when appropriate. React hooks are used here to show and hide the main avatar image when a ListItem is clicked.
* __ListItem__ component is created for each gist that is fetched from the API. The file names and owner avatar are fed to this component from List.
* __ListItemLoading__ is a simple pure functional component that renders a loading icon only when __App__ is fetching from GitHub.
* __Avatar__ is a fixed centered image of the owner's avatar which appears when a user clicks a ListItem. 

## Launching the project locally

Navigate to the project folder using Command Prompt (Windows) or Terminal (Mac).

Run `npm install` to download all of the project dependencies.

Run `yarn start` to launch the app in development mode. After a few moments this should load up [http://localhost:3000](http://localhost:3000) in your browser where you can view the project.

*This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).*
