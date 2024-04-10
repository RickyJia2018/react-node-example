# Introduction

Hello 👋,

Thanks for taking the time to complete this brief take-home assignment. Feel free to take as long as you need up to the deadline provided.

The goal of this exercise is to evaluate your skills in developing a basic full-stack application in TypeScript (React, Node, Express, 3rd-party integration). Feel free to make any assumptions, simplifications, or other changes to the problems - though please state those in your write up when you submit this assignment. Please use as many libraries as is reasonable - there is no sense in rebuilding what has been built. Feel at liberty to structure the project in a way that satisfies you.

Before getting started, please read this document carefully.

**Good luck 🙃**

# Directions

📓 Document all design decisions in `DESIGN_EXPLANATION.md`

**Backend**: Using Node and Express, you will create a single **REST** endpoint to retrieve a list of Magic cards from the Scryfall API based on a provided search string from the client. The endpoint should:

- Structure the backend the way you would for a Production ready endpoint utilizing a router, controller, service, and model.
- Read the Scryfall API url from a .env file.

**Database**: For the endpoint described above, you will need to interact with a pre-populated SQLite database (included in this project at `/prisma/dev.db`). Alongside the API request to Scryfall, you will also need to query the database to find any _magicrelatedcards_ that exist for the card(s) returned from the Scryfall API. The database schema is as follows:

```sql
CREATE TABLE magiccards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  scryfallId TEXT,
  name TEXT
);

CREATE TABLE magicrelatedcards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  component TEXT,
  name TEXT,
  typeLine TEXT,
  color TEXT,
  magicCardId INTEGER,
  parentCardId INTEGER,
  UNIQUE(parentCardId, magicCardId),
  FOREIGN KEY(magicCardId) REFERENCES magiccards(id),
  FOREIGN KEY(parentCardId) REFERENCES magiccards(id)
);
```

So for example, if the Scryfall API returns a card with the name "Spirit" and a scryfallId of "0000a54c-a511-4925-92dc-01b937f9afad", you would query the database for any _magicrelatedcards_ that have a _parentCardId_ of the _magiccards_ id for "Spirit".

There can be 0 or multiple entries returned from the database for a given _parentCardId_, so the query will need to modified in such a way so that **only a max of one related card is ever returned. The one with the highest number of colors that are the same. If there is a tie between 2 different colors (like the image below), choose the one with the highest magicCardId**.

![alt text](magicrelatedcards-db-example.png)

When interacting with the database in this project, utilize the singleton that already exists in `/lib/prisma.ts` and write the query using a [Prisma raw query](https://www.prisma.io/docs/orm/prisma-client/queries/raw-database-access/raw-queries). In this way, we are leveraging Prisma for its types, but you still get to write the SQL query yourself.

**Frontend**: Using React, you will use the included _vite_ skeleton (located at `/client`) to build:

1. A search bar for the user to input a card name to search. Using the input string, make a call to your Node endpoint to lookup cards. The search should work <ins>without</ins> the user needing to click a button. And it should be impossible for a user to submit more than 1 API request per second using this search bar.

2. Display the card results to the user in the most user friendly way you can come up with. Feel free to be creative. All cards must display the following: The card's image(s), name, set name, number, and rarity.

3. When results are displayed, for each card that had a `magicrelatedcard` result found in the database, display the related card's name and color(s) in a visually distinct way.

# What counts?

- All functional requirements must be satisfied
- Clean, minimal, Production level code
- General TypeScript/ES6 knowledge
- **Bonus**: Node endpoint tested using a framework of your choice
- **Bonus**: Frontend pagination
- **Bonus**: Design aesthetically pleasing and responsive in the browser
- **Bonus**: Entire interface is styled using [Tailwindcss](https://tailwindcss.com) exclusively

# Submission

Once you're satisfied with what you've built. Invite _fated-x_ to your repo and email your recruiter to inform the dev team.

# Getting started

With the latest Node LTS installed, run the following commands:

```bash
npm install
cd ./client
npm install
```

To start the Node/React servers, from the project root just run:

```bash
npm run dev
```

You should now have:

- A Node server running on port **3001**,
- A create-react-app server running on port **3000**

## What will you find inside this boilerplate

In this boilerplate, you will find:

- The main entry file: `src/index.ts`
- A `DESIGN_EXPLANATION.md` file to document your comments and design decisions
- A `client` directory containing a clean bootstrapped copy of **vite**
- Inside the Node `package.json`, we added the following packages:

  - `express` to include our backend Node.js web application framework.
  - `@swc/core` to transpile our TypeScript (makes it an order of magnitude faster than vanilla transpileOnly)
  - `@tsconfig/node20` to have the latest base tsconfig options for Node v20.
  - `@tsconfig/node20` to have the strictest base tsconfig options.
  - `@types/express` for Express typings
  - `@typescript-eslint/eslint-plugin` to provide TypeScript lint rules
  - `@typescript-eslint/parser` to allow for ESLint to lint TypeScript source code
  - `concurrently` to allow us to run 2 npm scripts at the same time from **npm start**
  - `eslint` to enforce coding best practices
  - `eslint-config-airbnb-base` to enforce Airbnb's ESLint rules
  - `eslint-config-airbnb-typescript` to enforce Airbnb's ESLint rules with TypeScript support
  - `eslint-config-prettier` to turn off all rules conflicting with Prettier
  - `ts-node` to run TypeScript directly
  - `ts-node-dev` to auto-restart the Node server every time a change is made
  - `typescript` to allow us to write TypeScript code

# Scryfall API

### GET /cards/search

https://scryfall.com/docs/api/cards/search

Returns a List object containing Cards found using a fulltext search string.
