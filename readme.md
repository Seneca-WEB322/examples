## TODO

maybe a short description of each weekly examples and what it does and how it works.
how to change package.json for Heroku and how to push to heroku

# Web 322 examples

The repo contains examples for the WEB 322 course for Seneca College.

## Contents

* [Requirements](#a0)
* [Cloning the repo](#a1)
* [Running the examples locally](#a2)
* [Running the examples on Heroku](#a3)
* [Submitting corrections or updates](#a4)

<a name="a0"></a>
## Requirements

The examples require some preparation ahead of time to be able to pull them down and run them. The first thing you will need is Git on your computer. Windows users can download [Git for Windows (msysgit)](https://git-for-windows.github.io/) and Mac users will need [Git for Mac](https://git-scm.com/download/mac)

After installing Git you will be able to clone this repository.

You will need to also install other applications to run the examples once the repository is cloned.
* [node.js](https://nodejs.org/en/download/) Get the 64 bit version.
* [Mongo DB](https://www.mongodb.com/download-center?jmp=nav#community) Get the 64 bit version.

<a name="a1"></a>
## Cloning the repo

The command to clone the repo is:
> `git clone https://github.com/Seneca-WEB322/examples.git`.

You will want to already be in the folder where you want the repo to be cloned and stored. A good place is c:\gitrepos on windows or /gitrepos on mac. A gitrepos folder right in your root of your main drive. You can put it anywhere you want though.

<a name="a2"></a>
## Running the examples locally

One you have cloned the repo you will want to make sure you are in the main folder and you can set up the examples.

The main step is to run npm install in the repo to install all the packages that the examples are dependant on.
> `npm install`

The week 8 example requires MongoDB to be running as well. See the class notes for instructions on that.

When you want to deploy one of the examples to Heroku you will need to edit the package.json file for the `start` property uder scripts. Change the command to the example you want Heroku to run.

For example to run the week 2 example on Heroku, make the following changes in package.json:
```
"scripts": {
  "start": "node week2.js"
},
```

<a name="a3"></a>
## Running the examples on Heroku

<a name="a4"></a>
## Submitting corrections or updates

You can submit a correction or update to the code if you find it is necessary. Examples are bug fixes, package updates, updates for Heroku requirements, readme.md fixes, etc.

Speak to your professor about forking the repo, creating a patch, and submitting a pull request for the changes. You may need permission to create an issue or pull request on this repository.