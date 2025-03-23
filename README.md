This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npx next dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Use prediction package

To be able to use the [papperlapapp prediction package](https://github.com/PapperlapappYT/papperlapapp-coffee-prediction), you have to create a Github Token with at least packages read scope.

We use direnv to manange our env here. Please `brew install direnv` and `direnv allow` in the root of this project.
Then `cp .envrc.sample .envrc` and add your token to the `.envrc` file.
Then `direnv allow` again.
Finally you can run `npm i`
The tinkering with direnv is one time only. You might only have to do this again if you add new env variables.

