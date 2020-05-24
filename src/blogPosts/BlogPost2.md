First, you define a mock state object to represent the state of your app.

```ts
export interface SquirrelInfo {
  id: number;
  firstName: string;
  favoriteColor: string;
}

export interface SquirrelFamily {
  lastName: string;
  members: SquirrelInfo[];
}

export const allFamilies: SquirrelFamily[] = ...;
```

[Full logic/SquirrelData.ts](https://github.com/anthonyjoeseph/rftf-examples/blob/master/src/reactRouter/v13/logic/SquirrelData.ts)

Next, you upgrade `<FamilyList>` to use squirrel data. The `allFamilies` object contains far more information than your `<FamilyList>` actually needs. You decide to give it the most specific input possible: only squirrel family names. `<FamilyList>` should only depend on data that directly affects it. It should be be [dumb](https://alligator.io/react/smart-dumb-components/).

```tsx
const FamilyList = ({
  squirrelFamilyNames,
}: {
  squirrelFamilyNames: string[];
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div>Family list:</div>
    {squirrelFamilyNames.map((squirrelFamilyName) => (
      <Link
        key={squirrelFamilyName}
        to={...}
      >
        {squirrelFamilyName}
      </Link>
    ))}
  </div>
);
```

A problem has arisen. The `to` prop wants to look like this:

```tsx
to={`${appVersion}/loggedIn/${squirrelFamilyName}`}
```

But you don't want to pass in `appVersion` through props. That information shouldn't determine how `<FamilyList>` renders. And that sets and ugly precedent for all the other links in the app. 

Could you make `appVersion` a global constant inside some file `logic/Constants.ts`? No, you decide, because then each new version of the app would need a new `logic/Constants.ts` file, and you'd need to create a new `FamilyList.tsx` every time to update its node `require`. For the same reason, you shouldn't put `appVersion` inside the `allFamilies` data, although both do represent the state of your app.

You decide that the naive implementation is best. You will define `appVersion` as a `const` inside `Landing.tsx`, since `Landing.tsx` seems to change across all versions anyway, and pass it into [`<FamilyList>`](https://github.com/anthonyjoeseph/rftf-examples/blob/master/src/reactRouter/v13/components/FamilyList.tsx) as a prop.

```ts
// Landing.tsx

const appVersion = 'v13';
```

```tsx
// FamilyList.tsx

const FamilyList = ({
  appVersion,
  squirrelFamilyNames,
}: {
  appVersion: string;
  squirrelFamilyNames: string[];
}) => (
  ...
```

You don't feel great about it, but you don't have any other options. Similarly, `<SquirrelList>` requires a `familyName` prop to help with linking:

```tsx
const SquirrelList = ({
  appVersion,
  familyName,
  squirrelIDs,
}: {
  appVersion: string;
  familyName: string;
  squirrelIDs: number[];
}) => (
  ...
```

It compiles. You must now pass the proper data into it.

```tsx
// Landing.tsx

<Route
  path="/:version/loggedIn/:familyName"
>
  <SquirrelList
    appVersion={appVersion}
    familyName={...}
    squirrelIDs={...}
  />
</Route>
```

You must pull the `familyName` from the current route parameters and use it to search `allFamilies` for matches. But you're not sure the best way to get route parameters.

You know there's a `component` prop which will automatically pass those values into `<SquirrelList>` as props

```tsx
<Route path="/:version/loggedIn/:familyName" component={SquirrelList} />
```

It's attractively simple, but you can't use that because you have to pass in the `appVersion`.

You remember that one time on a project you used a `render` prop on a route, which gave you access to route parameters through a callback function, but that was a while ago. By now, you know that you're supposed to use a [child function](https://reactjs.org/docs/render-props.html#using-props-other-than-render) for the same thing, like [react context](https://reactjs.org/docs/context.html#contextconsumer) does. It's declarative!

```tsx
<Route>
  (routeInfo) => (
    ...
  )
</Route>
```

Hmm, wait, you can't find this anywhere in the [`<Route>` docs](https://reacttraining.com/react-router/web/api/Route). Why did you think you had seen that somewhere? Anyway, it's best to avoid the `render` prop. [Callbacks are imperative](https://blog.jcoglan.com/2013/03/30/callbacks-are-imperative-promises-are-functional-nodes-biggest-missed-opportunity/), so the industry is moving away from them. And rightly so! You want to be functional. You're using Typescript because it's the closest thing you can get to functional programming at work.

Searching through the `react-router` docs, you find a few [hooks](https://reacttraining.com/react-router/web/api/Hooks) that solve this problem. There's `useHistory`, `useLocation`, `useParams`, and `useRouteMatch`. But you aren't an experienced enough programmer to know the difference between them. Which one is appropriate for this case?

According to the docs, `The 'useHistory' hook gives you access to the history instance that you may use to navigate.` What is the history instance?

You find the repo for [`history` on github](https://github.com/ReactTraining/history). Oh, it's made by [React Training](https://reacttraining.com/), the same people who made `react-router`! Wait a minute, what is React Training?

On their website, you discover they're a company that teaches people react. Oh, they do [corporate training](https://reacttraining.com/training/). That's cool, spreading the good word.

Looks like they offer a [course on react hooks](https://reacttraining.com/learn-hooks/) for $250.

Oh jesus, are hooks that hard to use? You thought you understood them. Aren't they just a way to use [react state and lifecycle features](https://reactjs.org/docs/hooks-overview.html#but-what-is-a-hook) in [function components](https://medium.com/@Zwenza/functional-vs-class-components-in-react-231e3fbd7108)?

Anyway, back to the [history repo](https://github.com/ReactTraining/history). As a good typescript developer, your first inclination is to poke through the code, looking for the type definition for `history`.

You don't see an obvious `src` folder, but you do see `docs`, `es` and `modules`. You suppose that `es` must be short for `es6` (which is in turn short for `ECMAScript 6` which is in turn short for ` European Computer Manufacturers Association Script Version 6`. So `es` means `European Script`.), which by definition has no types, so you look in `modules`. 

Hm, [`modules`](https://github.com/ReactTraining/history/tree/master/modules) just has a bunch of `.js` files. And, unsurprisingly so does [`es`](https://github.com/ReactTraining/history/tree/master/es). You figure this must be one of those libraries where you have to `yarn add @types/history`. Unless it's completely untyped. But that would be crazy.

You google `@types/history`, and sure enough, you find an [npm package](https://www.npmjs.com/package/@types/history) (you breathe a sigh of relief). You click on it's [github repo link](https://github.com/DefinitelyTyped/DefinitelyTyped). Of course, it takes you to the [Definitely Typed](https://github.com/DefinitelyTyped/DefinitelyTyped) github repo. Like it always does. This always happens, but you always forget that it's going to happen. It's impossible to find your type declaration file from here (?).

Well, you could start coding in vscode and try to use the `Go to Definition` feature, but this seems hacky. Anyway, just looking at a type definition won't give you the full picture of _why_ you might choose the `useHistory` hook over the other hooks. You begrudgingly resort to the [history docs](https://github.com/ReactTraining/history/tree/master/docs). You hate reading through documentation, but it's the responsible thing to do.

```
Welcome to the history docs! The library isn't huge, so there are really just a few files here for you to browse.

If this is your first time here, I'd recommend you first install the library and then read both:
```
- [Getting Started](https://github.com/ReactTraining/history/blob/master/docs/GettingStarted.md)
- [Navigation](https://github.com/ReactTraining/history/blob/master/docs/Navigation.md)
```
For more advanced usage, check out:
```
- [Blocking](https://github.com/ReactTraining/history/blob/master/docs/Blocking.md) - Details about how to block navigation attempts
- [Misc](https://github.com/ReactTraining/history/blob/master/docs/Misc.md) - Miscellaneous topics about several API details

You are glad to hear the that library isn't huge. You don't have all day, so you click on [`Navigation`](https://github.com/ReactTraining/history/blob/master/docs/Navigation.md).

Hmm. Looks like `history` objects have lots of support for different ways of imperatively linking, but you don't see anything here that refers to getting the current browser location. You notice the section

```
When using push or replace you can either specify both the URL path and state as separate arguments or include everything in a single location-like object as the first argument.

1. A URL path or
2. A location-like object with { pathname, search, hash, state }
```

Ok, so `location-like object`s must exist somewhere. `pathname` sounds like what you're looking for, or maybe `state`.

Suddenly, disaster strikes. You see this at the bottom of the document:

```
Note: Location state is only supported in 'createBrowserHistory' and 'createMemoryHistory'.
```

You begin to sweat. Do you need to use `createBrowserHistory` _and_ `createMemoryHistory` to be able to access location state? Location state is exactly what I want, right? Is it just the `{ state }` part that got destructured earlier? What do `createBrowserHistory` and `createMemoryHistory` do? Are they functions? Objects? Where do they go?

You assume that the `useHistory` hook must take care of this for you. (Whatever "this" is). After all, you are off in the weeds here, trying to figure out the _best_ way to get route parameters. Most people would have compromised their ideals by now and used the `render` prop.

You go to the [Getting Started](https://github.com/ReactTraining/history/blob/master/docs/GettingStarted.md) section. That sounds less scary.

It's longer than you want it to be. You have to remind youself - why are you here again? What problem are you solving? Oh yeah, you're wondering what the `history` instance is and whether you can use it to find the render params. Or rather, by now you have learned that it's called 'location state'.

Eventually, you find it, under the [Properties](https://github.com/ReactTraining/history/blob/master/docs/GettingStarted.md#properties) section.

```
Each history object has the following properties:

history.length - The number of entries in the history stack
history.location - The current location (see below)
history.action - The current navigation action (see below)
```

Ok, it sounds like `history.location` might have what you're looking for. Below, there are only two sections, `Listening` and `Cleaning up`. You are skeptical of `Listening`, because it sounds like a callback, but you decide that it sounds closer to what you're interested in than `Cleaning up`. In fact, why would you ever read a section about cleaning up? Who likes cleaning up? You have hated cleaning since you were a small child. 

```
Listening
You can listen for changes to the current location using history.listen:
```

As you feared, `history.listen` is a [callback](https://blog.jcoglan.com/2013/03/30/callbacks-are-imperative-promises-are-functional-nodes-biggest-missed-opportunity/).

However, later in the section you find this:

```
The location object implements a subset of the window.location interface, including:

location.pathname - The path of the URL
location.search - The URL query string
location.hash - The URL hash fragment
```

Sweet, sweet clarity! You don't know what 'URL query strings' or 'URL hash fragments' are, but you know that `history.location.pathname` must be what you're looking for.

Hm. That implies that the `useHistory` hook won't parse your route for you. It will only get you the full pathname, without splitting it into useful route parameters. If that was all you wanted, what was the point of delineating them all in our `<Route>`'s `path` props?

It seems that `useHistory` is not the hook you want to use.

What were your other options again? You have forgotten. You nagivate back to the [`react-router` docs](https://reacttraining.com/react-router/web/api/Hooks).

There are three remaining options: `useLocation`, `useParams`, and `useRouteMatch`.

You are able to make an educated guess that `useLocation` would output `history.location`, which is equally unuseful. Good thing we went through all of those docs!

You are left with `useParams` and `useRouteMatch`. `useParams` sounds like what you're looking for, since you remember that those things you're looking for are called 'route parameters', so you [look at it first](https://reacttraining.com/react-router/web/api/Hooks/useparams).

```
useParams returns an object of key/value pairs of URL parameters.
```

That sounds like just what you're looking for! But what is `useRouteMatch`? Why would someone ever want something besides `useParams`? Are you overlooking something? Best to be exhaustive. You [look at the docs](https://reacttraining.com/react-router/web/api/Hooks/useroutematch). You see this usage:

```tsx
function BlogPost() {
  let match = useRouteMatch("/blog/:slug");

  // Do whatever you want with the match...
  return <div />;
}
```

Woah, that's so cool! We don't need to use `<Route>` path anymore. That's much better, because now you can use route params right next to their definition, in the same file. You don't have information spread out all across you app. With `useRouteMatch`, now your component becomes a [single source of truth](https://medium.com/@edunceputans/single-source-of-truth-and-problems-with-implication-in-an-organisation-588883492133).

But what exactly does `useRouteMatch` return? The [docs don't explicitly say](https://reacttraining.com/react-router/web/api/Hooks/useroutematch), but there is a link in it's documentation implying that it returns a [`match`](https://reacttraining.com/react-router/web/api/match) object. That sounds right, since 'match' is built right into the name `useRouteMatch`. You look at the [docs](https://reacttraining.com/react-router/web/api/match):

```
match objects contain the following properties:

params - (object) Key/value pairs parsed from the URL corresponding to the dynamic segments of the path
isExact - (boolean) true if the entire URL was matched (no trailing characters)
path - (string) The path pattern used to match. Useful for building nested <Route>s
url - (string) The matched portion of the URL. Useful for building nested <Link>s
```

`params` sounds right - and it must be the same output as `useParams`. Later on in the docs, you see:

```
You’ll have access to match objects in various places:

Route component as this.props.match
Route render as ({ match }) => ()
Route children as ({ match }) => ()
withRouter as this.props.match
matchPath as the return value
```

Wait

So `<Route>` _does_ accept a child function??

You go back to the `<Route>` documentation. You realize that the [`children` prop](https://reacttraining.com/react-router/web/api/Route/children-func) _is_ a child function, since [children are passed into react props through the children prop](https://reactjs.org/docs/composition-vs-inheritance.html#containment).

Now you wonder if there's any benefit of getting match from the `useRouteMatch`, instead of from the `<Route>` child function. They seem equivalent, but hooks seem trendier. It costs $250 to learn about them, after all.

At last, you have decided on `useRouteMatch`. Here is your new `<SquirrelList>`:

```tsx
const SquirrelList = ({
  appVersion,
  squirrelIDs,
}: {
  appVersion: string;
  squirrelIDs: number[];
}) => {
  const { params } = useRouteMatch("/:version/loggedIn/:familyName");
  ...
```

Looking at this, you becomde skeptical.

It would be better to keep all of the routing logic in `<Landing>`. That would allow you to keep `<Landing>` as a [single source of truth](https://medium.com/@edunceputans/single-source-of-truth-and-problems-with-implication-in-an-organisation-588883492133).

Also, this sets a huge precedent throughout your project. If you use `useRouteMatch` here, you should use it in all of your components, for consistency. You'd better be really sure this is the right answer.

Does this mean you have to get rid of all of your `<Route>`s? The example in the [documentation](https://reacttraining.com/react-router/web/api/Hooks/useroutematch) seems to completely replace its `<Route>` with `useRouteMatch`. Can hooks determine whether their components are rendered? How powerful are hooks? How do they work? What _are_ they?

How would this work with our `<Login>` component? The `<Route>` surrounding our `<Login>` needs to have an `exact` prop. There doesn't seem to be a way to specify `exact` in `useRouteMatch`.

You decide that even after all of this research, it's best to use a child function. 

```tsx
// Landing.tsx

<Route
  path="/:version/loggedIn/:familyName"
>
  (routeParams) => (

  )
</Route>
```

At the time of publication, VScode does not give type information for child functions.

You decide to use `children` as a prop instead.

```tsx
<Route
  path="/:version/loggedIn/:familyName"
  children={(routeParams) => (

  )}
/>
```

You realize that this is looks just like the `render` prop. Since you suppose that surely [React Training](https://reacttraining.com/) wouldn't offer two props that do the exact same thing, you take a closer look at the [`children` prop documentation](https://reacttraining.com/react-router/web/api/Route/children-func). You see the following confusing sentence:

```
It works exactly like render except that it gets called whether there is a match or not.
```

This seems patently false. You have _been_ using the `children` prop without realizing it since the very beginning, with the pattern:

```tsx
<Route>
  ...
</Route>
```

This bit of documentation implies that the the contents between these two tags is always rendered, no matter what. But we know this to be untrue - different routes in our application have caused some `<Routes>` to render and restrict others. We saw that time and again in the first post.

A possible explanation is that the child function is always called, but only conditionally rendered. That seems like strange functionality.

It would be difficult to find out exactly what behavior the `children` prop has, so you decide to use the `render` prop.

```tsx
<Route
  path="/:version/loggedIn/:familyName"
  render={(routeParams) => (
    <SquirrelList
      appVersion={appVersion}
      familyName={...}
      squirrelIDs={...}
    />
  )}
/>
```

Now to find the parameters you're looking for. You [destructure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) `routeParams` to access `familyName`:

```tsx
<Route
  path="/:version/loggedIn/:familyName"
  render={({
    match: {
      params: {
        familyName,
      },
    }
  }) => (
    ...
```

`familyName` has type `any`. As a good Typescript developer, you know that this leads to trouble. Why go through all of the trouble of compiling static types if you don't even use them?

You find a [guide](https://www.pluralsight.com/guides/react-router-typescript) to solve this problem. You define a route type:

```tsx
interface SquirrelRouteType {
  familyName?: string;
  squirrelID?: string;
}
```

And you use it to access `familyName`:

```tsx
<Route
  path="/:version/loggedIn/:familyName"
  render={({
    match: {
      params: {
        familyName,
      },
    }
  }: RouteComponentProps<SquirrelRouteType>) => (
    ...
```

Great! Now `familyName` has a type. Now all you have to do is filter your `allFamilies` data to provide the exact props you need.

```tsx
<Route
  path="/:version/loggedIn/:familyName"
  render={({
    match: {
      params: {
        familyName,
      },
    }
  }: RouteComponentProps<SquirrelRouteType>) => (
    <SquirrelList
      appVersion={appVersion}
      familyName={familyName || ''}
      squirrelIDs={allFamilies.find(
        squirrelFamily => squirrelFamily.lastName === familyName
      ).members.map(
        squirrel => squirrel.id
      )}
    />
  )}
>
```

Uh oh, Typescript is throwing an error. `allFamilies.find()` is possibly `undefined`. Simple enough, we'll just use [optional chaining](https://www.infoworld.com/article/3443039/typescript-37-arrives-with-optional-chaining.html), which is a typescript feature borrowed [from the functional world](https://en.wikibooks.org/wiki/Haskell/Understanding_monads/Maybe)! Well, actually it's an [es6 feature](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) somehow.

```tsx
squirrelIDs={allFamilies.find(
  squirrelFamily => squirrelFamily.lastName === familyName
)?.members.map(
  squirrel => squirrel.id
)}
```

Now you get another compiler error. `squirrelIDs` can't accept an optional value. Again, this is simple to solve with [short circuit evaluation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators)

```tsx
squirrelIDs={allFamilies.find(
  squirrelFamily => squirrelFamily.lastName === familyName
)?.members.map(
  squirrel => squirrel.id
) || []}
```

This code is beautiful. Readable, terse, and everything happens in jsx. And everything is type safe. You are grateful for your knowledge of optional values in Typescript. You are feeling pretty smart!

You use similar methods to handle the `<SquirrelDetail>` route:

```tsx
// Landing.tsx

<Route
  path="/:version/loggedIn/:familyName/:squirrelID"
  render={({
    match: {
      params: {
        familyName,
        squirrelID,
      },
    }
  }: RouteComponentProps<SquirrelRouteType>) => {
    const currentSquirrel = allFamilies.find(
      squirrelFamily => squirrelFamily.lastName === familyName
    )?.members.find(
      squirrel => squirrel.id === Number.parseInt(squirrelID || '', 10)
    );
    return (
      <SquirrelDetail
        firstName={currentSquirrel?.firstName || ''}
        favoriteColor={currentSquirrel?.favoriteColor || ''}
      />
    )
  }}
>
```

`<Login>` poses a strange problem: the `submit` button must link to `/loggedIn`, but your specifications require that the login page uses an html5 `<input />` tag. Everything else has been able to use the `<Link>` component, but now you are forced to put imperative linking code inside `<input onClick />`.

Or are you? You try an experiment:

```tsx
<Link to={`${appVersion}/loggedIn`}>
  <input type="button" value="submit" />
</Link>
```

The code looks a little funny, since you wouldn't normally wrap an `<input>` tag with an `<a>` tag, but it compiles, at least. You are finally able to release your next version:

[Version 13 code](https://github.com/anthonyjoeseph/rftf-examples/tree/master/src/reactRouter/v13)

[v13](http://rftr-example-site.s3-website-us-east-1.amazonaws.com/v13)

The `<Login>` component works exactly like you want it to!

However, clicking on the `Squirrel` family link from `<FamilyList>` causes strange behavior. The browser route is set to `v13/v13/loggedIn/Squirrel`. Why is `v13` in there twice? It's preventing anthing from rendering, since `loggedIn` is supposed to go there.

You set a breakpoint inside family list, and you are unable to find any error with string manipulation. You double check that `appVersion` is being set properly, and it is. 

Without alternatives, you turn to [the docs](https://reacttraining.com/react-router/web/guides/quick-start/2nd-example-nested-routing).

```tsx
// (from the react-router docs)
function Topics() {
  let match = useRouteMatch();
  ...
```

Hmm it looks like they're using `useRouteMatch`. You'll have to take that into consideration.

```tsx
// (from the react-router docs)
<Link to={`${match.url}/components`}>Components</Link>
```

That's interesting. They're building the new route dynamically, using the existing url. Oh, this could solve your appVersion problem! But what's this you see later in the doc:

```tsx
<Route path={`${match.path}/:topicId`}>
```

So there's match.path and match.url? They sound like the same thing. That's puzzling. What could the difference be? You take another look at the [`match` docs](https://reacttraining.com/react-router/web/api/match).

```
path - (string) The path pattern used to match. Useful for building nested <Route>s
url - (string) The matched portion of the URL. Useful for building nested <Link>s
```

| Parameter | Example |
|-----------|---------|
| `path` | `/:version/loggedIn/:familyName/:id` |
| `url` | `/v13/loggedIn/McSquirrel/5` |

So using `path` to build nested `<Route>`s and `url` to build nested `<Link>`s ensures consistency in your routing logic. How useful. It's a good thing you read this document, and early on. Imagine how many typos all that string duplication could have caused!

Let's try this approach with our `<FamilyList>`.

```tsx
// FamilyList.tsx
to={`${url}/${squirrelFamilyName}`}
```

Linking now works properly. You apply the same changes to your other squirrel components. 

[Version 14 code](https://github.com/anthonyjoeseph/rftf-examples/tree/master/src/reactRouter/v14)

[v14](http://rftr-example-site.s3-website-us-east-1.amazonaws.com/v14)

Your boss points out a major bug. Well, they seem to think it's major anyway. When you route to [`/v14/loggedIn/Tucker`](http://rftr-example-site.s3-website-us-east-1.amazonaws.com/v14/loggedIn/Tucker), the `<SquirrelList>` component still displays the text `Squirrel list by id:` even though there is no squirrel family named 'Tucker' registered with your product.

Your boss explains that the [Tuckers](https://en.wikipedia.org/wiki/Tommy_Tucker_(squirrel)) (obviously a major potential client) had wanted to use your service until they typed that url into their browser. They saw that output and assumed that they another Tucker family had already signed up. They decided to partner with [squirrelsandmore.com](https://www.squirrelsandmore.com/) (your number one competitor) instead. Your boss will not reveal how they got this information, but you know from their quavering voice that it is true.

Your boss asks you to add an error page, so that this will never happen again. If a user tries to route to a squirrel family that doesn't exist, your app should redirect them to `/loggedIn/error`, which should render a static error message.

Simple enough. You add a new route to the same `<BeautyContainer>`, using the `exact` prop to prevent `<FamilyError>` from being rendered at any route:

```tsx
<BeautyContainer backgroundColor='green'>
  <Route
    exact
    path="/:version/loggedIn/error"
    component={FamilyError}
  >
  <Route
    path="/:version/loggedIn/:familyName"
    ...
```

[Version 15 code](https://github.com/anthonyjoeseph/rftf-examples/tree/master/src/reactRouter/v15)

[v15/loggedIn/error](http://rftr-example-site.s3-website-us-east-1.amazonaws.com/v15/loggedIn/error)

This behavior is incorrect. It outputs the desired error message, but after that it also prints out 'Squirrel list by id:'. The `exact` prop was an incorrect solution, because it doesn't prevent `<SquirrelList>` from rendering. In fact, it adds no functionality. Why did you think that it would help?

It gradually dawns on you that the proper solution here would be to wrap both `<Route>`s in a `<Switch>` statement. You are hesitant to do this. `<Switch>` frightens you.

No one's stopping you from creating your own routing logic. You remove the error `<Route>` and modify the existing `<Route>`'s render prop:

```tsx
render={(...) => familyName !== 'error'
  ? (
    <SquirrelList
      ...
    />
  )
  : <FamilyError />
}
```

[Version 16 code](https://github.com/anthonyjoeseph/rftf-examples/tree/master/src/reactRouter/v16)

[v16/loggedIn/error](http://rftr-example-site.s3-website-us-east-1.amazonaws.com/v16/loggedIn/error)

This behaves as expected. Now you need to redirect the browser to `v16/loggedIn/error` when a `familyName` can't be found.

How are you supposed to navigate without using a `<Link>`, from within your app? You remember from earlier today when you were learning about the `history` instance. Wasn't there an entire page on [navigation](https://github.com/ReactTraining/history/blob/master/docs/Navigation.md)



This seems too imperative and freaky, so you google 'react router navigation'. You find this [article](https://tylermcginnis.com/react-router-programmatically-navigate/) with a [video](https://youtu.be/hHwra0Dvt1E?t=160) that recommends rendering a `<Redirect>` component


- `<Redirect>` or history.push?
- Now all the null checking going on inside the props you pass to `<SquirrelList>` is starting to bother you. It should never be called unless those routes are correct.
- error at `v17/loggedIn/error/5` - still displaying `<SquirrelDetail>`, should redirect to `/v17/loggedIn/error`

Now login doesn't ever show and linking still doesn't work
  - google it
  - https://github.com/reactjs/react-router-redux/issues/203
  - wait there's useRouterHistory?
  - well, no. kind of. https://github.com/ReactTraining/react-router/issues/2814
  - useHistory has no basename https://reacttraining.com/react-router/web/api/Hooks/usehistory
  - oh there's [basename](https://github.com/ReactTraining/history/blob/master/docs/Misc.md)!
  - If we were disciplined enough to read through all of the history docs in the first place, we wouldn't be in this mess 
  - but browserrouter does https://reacttraining.com/react-router/web/api/BrowserRouter
  - doesn't work
  - wait a minute, back to https://github.com/reactjs/react-router-redux/issues/203
  - do we just need a leading slash? Would that have prevented this entire headache?
  - yup

Next up, we add fetching.