This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

This is the frontend application for Pomodoro Timer app


## Getting started with this project


### `Clone this repo`

```
git clone https://github.com/naveenreddyin/pomodoro-frontend.git
```

Than,
```
cd pomodoro-frontent
```

### `Install packages`

Run the following command:
```
yarn install
```

### `Run project on development mode`

```
yarn start
```

* This also means you have setup the backend on localhost, or setup a proxy. You can change api url in config/ApiConfig.js
* Production backend runs on https://pomodorobackend.herokuapp.com/api/

### `Run tests`

```
yarn test
```

### `Production build`

``` 
yarn build
```

## Comments

* This project depends on the backend server which is for api purposes. 
* This project doesnt store anything, only backend does that. 
* At the moment only one task could be started with Pomodoro but could be altered later on to do background counter.
* Task can not be put into done column as that functionality could be implemented later.
