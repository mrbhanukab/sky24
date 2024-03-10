# Sky24 Astronomy Quiz Website

Welcome to the Sky24 GitHub repository! This project is developed for the Astronomy Quiz "SKY24" organized by ICAS. It's designed to provide a seamless experience for users to register for the event, check its status, and view the results.

## Description

Sky24 is a website developed for the Astronomy Quiz "SKY24" organized by ICAS. It allows users to register themselves, check the status of the event, and view results.


## New Updates

In this latest update, we've introduced several enhancements to improve the user experience:

- **Loading Page**: A dedicated loading page ensures smoother transitions and a better user experience.
- **Custom 404 Page**: We've added a custom 404 page for a more polished and professional appearance.
- **Optimization**: We've minimized the number of CSS and JavaScript files, removed unused CSS styles, and optimized the overall performance of the website.
- **React Dynamic Route**: Implemented React Dynamic Route for the Round page, enhancing flexibility and efficiency.
- **Preloading Resources**: Images and markdown files are now downloaded first while loading the homepage and rules page, respectively, ensuring faster load times.
- **Footer Component**: Added a footer component for improved navigation and accessibility.
- **Smoother Loading Effect**: Implemented a smoother loading effect for a more seamless user experience.

## Setup Instructions

To get started with Sky24, follow these simple steps:

1. **Download and Install GitHub CLI**: Login with [GitHub CLI](https://cli.github.com) and clone the repository using the command `gh repo clone mrbhanukab/sky24`.
2. **Install Node.js LTS**: Make sure you have Node.js LTS installed on your system. You can download it from [here](https://nodejs.org/en) for Windows and Mac, or follow the instructions [here](https://github.com/nvm-sh/nvm) for Linux.
3. **Install Dependencies**: Navigate to the project directory and install dependencies using `npm install`.
4. **Install Firebase CLI**: Install the Firebase CLI globally using `npm install -g firebase-tools`.
5. **Login to Firebase**: Log into Firebase using your Google account with the command `firebase login`.
6. **Run Test Environment**: Launch the test environment by running `npm run dev`.
7. **Make Your Changes**: Feel free to make any changes or modifications you require.
8. **Build Site**: Once you're done, build the site using `npm run build`.
9. **Host Site**: Deploy the site using Firebase hosting with the command `firebase deploy --only hosting:sky24-icas`.
10. **Don't Forget to Commit Your Changes**! 🥲

## Features to Implement Next

Here are some features we plan to implement in future updates:

- **Round Information**: Create a new document on Firebase to store round information and integrate it into the round page for easier management.
- **Search Input with Select**: Implement a search input with select functionality using React Select to streamline the process of selecting schools and improve database querying.
- **Database Optimization**: Optimize the database and Firebase rules for better performance and security.
- **Firebase Information Encryption**: Encrypt Firebase information in Firebase.js to enhance security measures.