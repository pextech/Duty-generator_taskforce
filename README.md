<!-- ![Build Status](https://github.com/pextech/DutyGenerator/workflows/Node.js%20CI/badge.svg) -->
[![Maintainability](https://api.codeclimate.com/v1/badges/914387c533a83662f9ad/maintainability)](https://codeclimate.com/github/pextech/DutyGenerator/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/pextech/DutyGenerator/badge.svg?branch=ft-api-duties)](https://coveralls.io/github/pextech/DutyGenerator?branch=ft-api-duties)
# DutyGenerator

![Design preview for the Todo app coding challenge](desktop-preview.jpg)

# API Endpoints included

### User

- **POST /signUp:** Create an account
- **POST /login:** Log into your account

### Duty (task)

- **POST /duty:** Create a new Task
- **GET /duty/:ID:** Fetch a single Task 
- **GET /duty:** Fetch all tasks
- **PATCH /duty:ID:** Update a single task
- **DELETE /duty:ID:** Delete a task


# Installation and Environment Setup

**Clone the repository from [Github](https://github.com/pextech/DutyGenerator.git).**

( You will need **Git** for this if you are running a Windows PC, Get it [HERE](https://git-scm.com/) )

```
git clone https://github.com/pextech/DutyGenerator.gitt
```

**To Install all dependencies:**

```
npm install
```

**To run the tests:**

```
npm run test 
```

**Now to start the app:**

```
npm run start
```

**To start the app in development mode:**

( You need **nodemon** installed for this, run `npm i -g nodemon` to install it )

```
npm run dev-start
```

# Tools used

- Server-Side Framework: **Node/Express**
- Testing framework: **Mocha/Chai**
- databse: **sequelize, postgres**

# More Tools

- Continuous integration: **[Travis-Ci](travis-ci.org)**
- ES6 Transpiler: **[Babel](babeljs.io)**
- Test coverage: **[nyc](https://www.npmjs.com/package/nyc)**
- Maintainability: **[Code climate](https://codeclimate.com)**
- Deployment: **[Heroku](https://www.heroku.com)** and **[Netlify](https://www.netlify.com/)**
