tldr; here's the react-fp-ts-router [example project]("https://github.com/anthonyjoeseph/react-fp-ts-router/tree/master/example")

## Motivation: Type Safety

You will make a simple squirrel app the traditional way, using react-router. Then you will make the same squirrel app using react-fp-ts-router. This article aims to explore the advantages of type-safety through the latter approach.

## Squirrel App with react-router

First, you will use [create-react-app to create a project in typescript](https://create-react-app.dev/docs/adding-typescript/). It may be an unpopular decision among your teammates, who are unfamiliar with typescript, but you know from experience that strong typing prevents a lot of errors at compile time.

Your squirrel app must allow selection of squirrels by family and id, and show the selected squirrel's info. Routes must look like "/:familyname/:id", where "familyname" is the squirrel's last name, and "id" is the squirrel's id.

You must use the following rest api to access your squirrel data:

You will start by implementing a simple outline of the app that makes no use of the backend. It simply initializes your squirrel states to null.

Version 1.0:


