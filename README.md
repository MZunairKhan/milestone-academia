
# Milestone Academia

The Milestone Academia application is a custom Node JS based Ed-Tech solution, made for the company of the same name.

This software solution will allow students and instructors to interact and engage in educational meetings. Students can register for courses. They will then be allowed to be part of instructor lead meetings covering course material.

Students can also engage in evaluations of various kinds. Some are immidiately evaluated, others are instructor lead. Some are MCQ (multiple choice question) based, others are different format questions.

Milestone Academia application also has provisions to deal with on-site educational requirements. These include, but are not limited to, student enrollment, attendance, user management.

## Architecture

The application will be based on dockerized containers, orchestrated as a cluster.
This cluster will then be deployed to a cloud solution, which will in turn deliver this application to the web.

### Development

For development purposes, the database has been moved to containerized environment.

The other parts of applications are in code. This allows the developer(s) to modify and use them as required, with greater ease than compared to if they were containerized.

## Technologies and Concepts

- The application is stored and developed as a monorepo. The monorepo in question in the one provided by Narwal: NX Workspace. 
More information Narwhal NX: https://nx.dev/

- Docker is used to create containers. More information on Docker: https://www.docker.com/

- A container is a standard unit of software that packages up code and all its dependencies so the application runs quickly and reliably from one computing environment to another. A Docker container image is a lightweight, standalone, executable package of software that includes everything needed to run an application: code, runtime, system tools, system libraries and settings. More information on Containers: https://www.docker.com/resources/what-container/

- Angular Framework is used to create a SPA (Single Page Application) based frontend. Angular works with Typescript (a super set of Javascript). More information on Angular Framework: https://v14.angular.io/docs

- Nest JS is a backend framework, heavily inspired by Angular Framework. It is built upon Express JS, but works with Typescript. It provides a full fledged MVC architure application. This allows developers to create controllers and API endpoints, which are then used on the frontend. More information on Nest JS: https://docs.nestjs.com/v9/

## Local Development

### Commands

Here are some of the commands a developer needs to use to run the project

| Description    | Command |
| -------- | ------- |
| Start the containerized databas server  | docker-compose up     |
| Start the backend API | nx serve api     |
| Start the frontend application    | nx serve milestone    |

Once all commands are executed, then the application is available to the developer at the following URLs:


| Application    | URL |
| -------- | ------- |
| Backend (via Swagger UI)  | http://localhost:3333/api/     |
| Frontend | http://localhost:4200/     |
