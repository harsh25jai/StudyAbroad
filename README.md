# StudyAbroad
# Getting Started with Docker
Container Name: StudyAbroadDocker
Docker Container consists of image with Java Spring Boot backend project for storing data, with postgresSQL as database.

Install and Setup
List any prerequisities, setup options and configuation details.
[Install Docker on your machine.](https://docs.docker.com/get-docker/)

Clone the repository
```bash
git  clone  https://github.com/harsh25jai/StudyAbroad.git
```
Go to the project directory
```bash
cd  ./StudyAbroad
```

making sure docker is successfully installed and running
```bash
docker
```

Load docker image from tar file
```bash
docker load < studyabroaddocker.tar
```

Check docker images
```bash
docker images
```

Run docker image
```bash
docker container run studyabroaddocker
```

To test the mobile app

install the `StudyAbroadApp.apk` on any Android device.
>**Note**: The API domain configure in this apk is `192.168.0.195`, you can change this easily by going inside codebase/StudyAbroadApp/src/core/index.ts API_URL.base. After change it will require for new build generation for which follow steps to setup React Native Project.

# Postman API Documentation
[Documentation](https://documenter.getpostman.com/view/15181770/2sA2xjzBPg)

[Walkthrough Video](https://drive.google.com/file/d/1rYugwXflpDYa6McuahBWmSIicGSl6sd4/view?usp=sharing)

# Getting Started with Spring Boot

## Requirements
For building and running the application you need:
- [Spring Boot](https://spring.io/)
- [JDK 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- [Maven 3](https://maven.apache.org)

## Running the application locally

There are several ways to run a Spring Boot application on your local machine. One way is to execute the `main` method in the `com.example.studyabroad.StudyabroadApplication` class from your IDE.

Alternatively you can use the [Spring Boot Maven plugin](https://docs.spring.io/spring-boot/docs/current/reference/html/build-tool-plugins-maven-plugin.html) like so:

```
mvn spring-boot:run
```

OR
You can use the [VS Code Spring Boot Dashboard](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-boot-dashboard)

And goto  `com.example.studyabroad.StudyabroadApplication` class to configure running.

# Getting Started with React Native
This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Prerequisites
- [Node.js > 12](https://nodejs.org) and npm (Recommended: Use [nvm](https://github.com/nvm-sh/nvm))

- [Watchman](https://facebook.github.io/watchman)

- [Xcode 12](https://developer.apple.com/xcode) iOS Only

- [Cocoapods 1.10.1](https://cocoapods.org) iOS Only

- [JDK > 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)

- [Android Studio and Android SDK](https://developer.android.com/studio)

## Folder structure
This template follows a very simple project structure:
-  `src`: This folder is the main container of all the code inside your application.

-  `assets`: Asset folder to store all fonts, images, vectors, etc.

Filename strategy PascalCase for example NewImage.png, NewFont.ttf

-  `components`: Folder to store any common component that you use through your app (such as a generic button)

Filename strategy FileName PascalCase for example AppButton.tsx, create sepearte style file only when component is exceeding over 500 lines of code.

-  `core`: Folder to store any kind of constant that you have.

-  `routes`: Folder to store the navigators.

-  `screens`: Folder that contains all your application screens/features.

-  `test-utils`: Folder to store tests-related utilities and components.

-  `App.tsx`: Main component that starts your whole app.

-  `index.js`: Entry point of your application as per React-Native standards.

-  `package.json`: Metadata file in a Node.js project that contains information about the project.

  

## Run Locally
Clone the project
```bash
git  clone  https://github.com/harsh25jai/StudyAbroad.git
```
Go to the project directory
```bash
cd  codebase/StudyAbroadApp
```
Install dependencies

```bash
# using npm
npm  install

# OR using Yarn
yarn  install
```

## Step 1: Start the Metro Server (optional)
First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm  start

# OR using Yarn
yarn  start
```

## Step 2: Start App
Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

 
### For Android
```bash
# using npm
npm  run  android

# OR using Yarn
yarn  android
```

  
Check -`src/core/index.ts`, API_URL.base = IP Address of the machine running backend

  
#### Local Testing

For **Android**

```bash
npm  run  android  --  --mode="release"
```
 