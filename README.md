<h1 align="center">🕸 Add GraphQL to Svelte</h1>

## ❓ What is this?
This is an **experimental** command to run to add a GraphQL server (powered by [`graphql-helix`](https://github.com/contrawork/graphql-helix/)) to your Svelte project generated with `create-svelte`.

## 🛠 Usage
You must start with a fresh copy of the official `create-svelte` template, which is currently created by running this command. **You must say yes to TypeScript preprocessing.**
```sh
npm init svelte@next
# By the way, please listen to its warnings that SvelteKit is an alpha project
# https://svelte.dev/blog/whats-the-deal-with-sveltekit#When_can_I_start_using_it
```

Finally, run this command in your project directory to set up GraphQL:
```sh
npx use-preset babichjacob/svelte-add-graphql --no-ssh
```

After the preset runs,
* You can create a GraphQL schema in `src/routes/_graphql/schema.ts` using any library or technique you want. Additionally, you can set the `defaultQuery` that shows up when GraphiQL is loaded in the browser.

* You can query your API (with POST requests) at the `/graphql` endpoint.

* You can visit GraphiQL in the browser at the `/graphql` endpoint.

* You can see an example of how you may set up resolver-specific authorization with the `contextFactory` line in `src/routes/graphql.ts` and the `authorization` argument in `src/routes/_graphql/schema.ts`.

* The `/` route (in your `src/routes/index.svelte` file) will show an example of how to use your GraphQL API in `preload`.

* You [*cannot* use GraphQL subscriptions](https://github.com/babichjacob/svelte-add-graphql/issues/1).

## 😵 Help! I have a question
[Create an issue](https://github.com/babichjacob/svelte-add-graphql/issues/new) and I'll try to help.

## 😡 Fix! There is something that needs improvement
[Create an issue](https://github.com/babichjacob/svelte-add-graphql/issues/new) or [pull request](https://github.com/babichjacob/svelte-add-graphql/pulls) and I'll try to fix.

These are new tools, so there are likely to be problems in this project. Thank you for bringing them to my attention or fixing them for me.

## 📄 License
MIT

---

*Repository preview image generated with [GitHub Social Preview](https://social-preview.pqt.dev/)*

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
