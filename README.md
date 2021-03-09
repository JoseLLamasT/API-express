# npx create-api

it is a tool that allows making a whole basic API, using technologies such as node.js including express and koa, also mongoose or sequalize as ORM.

## HOW TO USE IT: // getting started

1. firstly you have to create a new folder where the project will be built,
2. open the terminal and move to the folder you have made, run the command npm init, as a result, the file j.son will be made.
3. in the same terminal run the command npx create-api

```
npx create-api
```

4. answer the questions regarding to the project, once you have finished the server will be installed.
5. go to the server folder and test it, it should be already working

## CONSIDERATIONS

1. A new folder called server will be made, therefore, if it already exists the process won't be executed.
2. there are some input validations, such as the port must be a number, the database as the models or collection can not be called with numbers or symbols.
3. the dependencies should be installed automatically, however, double-check that everything has been installed porperly.
