<h1 align="center">Welcome to bcg-weather-app 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
</p>

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
</p>


> Weather app that shows the weather for your desired locations.

## Install dependencies

```sh
yarn
```

### ⚙️ Prepare project

- Add a `.env.development` with your api key as such.
> `WEATHER_API_KEY="__APIKey__"`

## 🚀 How to run
The app is cross-platform for `Web`, `IOS`, and `Android`. 
In order to run it for each platform you could use the respective commands: 

> `yarn start` 
> `yarn ios` 
> `yarn android`
> `yarn web`

## Run tests

```sh
yarn test
```

## Author

👤 **Tomas Gonzalez**


## Explanation

> Approach

Design patterns:
* My focus while building this app was strongly tilted towards four areas: `scalability`, `mantainability`, `testability`, and `cross-compatibility`. I decided to use a design pattern called "Separation of Concern" in which we separate the state and logic of each component from the view. This pattern helps with the testability and readability of the components and, therefore, the scalability and mantainability of the app.

* For error handling I used the HOC design pattern to build an error boundary component and placed it at the top of the heriarchy. This Hoc is meant to catch any unexpected crash/error and send it to a logger service such as `sentry` and also to render a fallback screen that gives the user feedback and the opportunity to retry without having to reopen the app.
I used an npm module called `react-native-toast-message` in order to give feedback about APIs and network errors. 
Tools and frameworks:
* `Expo` was chosen as the main framework of the app, mainly because It makes It easy to create fast MVPs for cross-platform apps that can later be ejected into pure react-native apps. 
In this case, the app is available on the Web, Android, and IOS.
* For the CSS-framework `styled-components`. Mainly for its modularity and cross-platform consistancy. This library makes it really easy to maintain a consistent style guideline throughout the app, I used it to implement a `Dark theme` as an extra feature. You can experience it by changing your device's default theme.
* I have been using `Zustand` for my global state management for a while now. 
There is not much to say about it. It is minimalistic, simple, elegant, and easy to test.
* Other mentions: `.env`, `react-navigation`, `axios`.
Language:
* `Typescript`. 
This project's focus was on `scalability` over `initial development speed`, and as the app grows it becomes harder to track your types, therefore perjuring the ability to scale and debug efficiently.
> Testing
* My approach to testing was a combination of `functional tests` and `unit tests` using the React Native Testing Library. The main focus was on thoroughly testing the app's global store, as it is the core of the app.
I made sure to test most of the relevant actions as if they were whole components.
* There are also some UI tests for the `dashboard` and `details` screens to ensure that the app's core data is at least displayed.
* Note: `Snapshot` testing was purposefully left out as, in my experience, they don't contribute that much to the robustness and scalability of the app.
> Improvements/Todos 
* Section the `global-store` moving the actions into their own module. 
* Add a more structured pattern for error notifications with react-native-toast-message, as they are currently being called imperatively at API calls.
* Implement e2e with `enzyme` to test more realistic scenarios.
