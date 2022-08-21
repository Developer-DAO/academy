## Developer DAO - School of Code

&quot;School of Code&quot; is an open-source education platform created by the
Developer DAO.

## How do I get started?

Please read our [CONTRIBUTING Guide](CONTRIBUTING.md) to get started.

## Project Setup

**Prerequisites:**

    node --version 16.x

Refer to the `node` and `npm` installation with `nvm` guide in Lesson 2. A link
to the guide can be found
[here](https://www.notion.so/How-to-install-node-js-and-npm-67b2ab1f76f148f49f547b9156aeaf28):

**Fork this repo, clone forked repo locally and `cd` into the repo:**

    git clone https://github.com/[YOUR GITHUB HANDLE HERE]/school-of-code.git
    cd school-of-code/

**Installation and run:**

    yarn install
    yarn dev

This will create a local instance of the app running and can be viewed at
`http://localhost:3000` in your browser.

Also it's handy to install the Prettier plugin for your browser. You can then
use it to automatically format files. It helps keep the code base tiday, for
Typescript, MDX and Markdown files.

## Grabbing latest version of the code

**Since this is a work in progress, your local version of the app can be updated
with the following commands:**

Stop the locally running app with:

    Ctrl + C

Use `git pull` for the most up-to-date version:

    git pull

Reinstall with `yarn`:

    yarn install

Run the updated app:

    yarn dev

## Submit your changes and create a Pull Request

Before pushing your branch to GitHub and opening a PR:

- Run `yarn confirm` which will make sure your files are consistently formatted,
  lint the code base looking for problems and then actually building the site
  locally to ensure no build problems
- If you see warnings or errors please fix.
- Also, this step runs Prettier so some files may have changed and need to be
  checked in.

Now everything should be ready-to-go. You may have to run this process several
times.

Just push your branch and open a PR, and send a quick note on Discord to let the
team know you're looking for a review.

Thank you for your contribution!

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out
[the Next.js GitHub repository](https://github.com/vercel/next.js/) - your
feedback and contributions are welcome!

## Storybook

This project uses [Storybook](https://storybook.js.org/). Storybook allows us to
develop components in isolation from our app.

Stories are loaded from `*.stories.(mdx|js|jsx|ts|tsx)` files in any directory.

To use Storybook, run the `storybook` script:

```bash
yarn storybook
```

To learn more about how to write Storybook stories, check out the official
[Intro to Storybook](https://storybook.js.org/tutorials/intro-to-storybook/)
tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the
[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our
[Next.js deployment documentation](https://nextjs.org/docs/deployment) for more
details.
