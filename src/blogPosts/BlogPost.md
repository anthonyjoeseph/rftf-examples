tldr; this blog post explores the flaws an implementation that uses `react-router`. [Click here to the post where we use `react-fp-ts-router` instead]("https://github.com/anthonyjoeseph/react-fp-ts-router/tree/master/example")

# Motivation: Type Safety

You will make a simple squirrel app the traditional way, using react-router. Then you will make the same squirrel app using react-fp-ts-router. This article aims to explore the advantages of type-safety through the latter approach.

This series is an illustration of how difficult life can be without types, even when you do everything right

# Building an App Using react-router

Your squirrel app must allow routing selection of squirrels by family and id, and show the selected squirrel's info. Additionally, you will be building many versions of this app, so that you can show your boss your progress. So the routes will look like `"/:version/:familyname/:squirrelID"`, where `version` is your current version of your website (a useless value to us), `familyname` is the squirrel's last name, and `squirrelID` is the squirrel's id.

First, you will use [create-react-app to create a project in typescript](https://create-react-app.dev/docs/adding-typescript/). It may be an unpopular decision among your teammates, who are unfamiliar with typescript, but you know from experience that strong typing catches lots of errors at compile time, [among other benefits](https://pchiusano.github.io/2016-09-15/static-vs-dynamic.html).

Since routing is important to your app, you will choose to use [`react-router`](https://reacttraining.com/react-router/web/guides/quick-start) because it is the industry standard and well documented.

First, you will build your app's routing logic & basic UI, using placeholder values. You will create these basic building blocks:

| Component | Route | Description |
|-----------|-------|-------------|
| `<FamilyList>` | `"/:version"` | Lists all squirrel families |
| `<SquirrelList>` | `"/:version/:familyName"` | Lists all of the ids of the squirrels in family `familyName` |
| `<SquirrelDetail>` | `"/:version/:familyName/:squirrelID"` | Displays data from the squirrel in family `familyName` with id `squirrelID` |
| `<BeautyContainer>` | N/A | Wraps components in a colored square, to provide visual aid |
| `<Landing>` | N/A | Our root component |

You will be uncertain where to put the `<Route>` components relative to these building blocks. Should they go inside `<Landing>`?

```tsx
const Landing = () => (
  ...
  <Route>
    <FamilyList/>
  </Route>
  ...
);
```

Or should they go inside your squirrel components?

```tsx
const FamilyList = () => (
  <Route>
    ...
  </Route>
);
```

You will decide to put them in `<Landing>`, because it's best to [encapsulate](https://stackoverflow.com/questions/18300953/why-encapsulation-is-an-important-feature-of-oop-languages) `<FamilyList>`, so that it doesn't have to concern itself with routing. Also, it's best to [encapsulate](https://stackoverflow.com/questions/18300953/why-encapsulation-is-an-important-feature-of-oop-languages) all of the routing logic in one file.

[version 1 code](https://github.com/anthonyjoeseph/rftf-examples/tree/master/src/reactRouter/v1)

[v1](http://rftr-example-site.s3-website-us-east-1.amazonaws.com/v1)

[v1/familyname](http://rftr-example-site.s3-website-us-east-1.amazonaws.com/v1/familyname)

[v1/familyname/0](http://rftr-example-site.s3-website-us-east-1.amazonaws.com/v1/familyname/0)

It will work. You will show it to your boss, who will be impressed. However, they will tell you there is a new requirement: we must log users in before they can access our squirrel data. So, now there must be a login page at `"/:version"`, and the other routes must be moved to `"/:version/loggedIn/:familyName/:squirrelID"`.

First, you must build a version to showcase your new `<LogIn>` component and update your old routes to include `loggedIn`.

[version 2 code](https://github.com/anthonyjoeseph/rftf-examples/blob/master/src/reactRouter/v2)

[v2](http://rftr-example-site.s3-website-us-east-1.amazonaws.com/v2)

[v2/loggedIn](http://rftr-example-site.s3-website-us-east-1.amazonaws.com/v2/loggedIn/familyname)

[v2/loggedIn/familyname/0](http://rftr-example-site.s3-website-us-east-1.amazonaws.com/v2/loggedIn/familyname/0)

After you publish this and send it to your boss, you will realize there is a bug. There are no squirrel ids displayed at [v2/loggedIn/familyname/0](http://rftr-example-site.s3-website-us-east-1.amazonaws.com/v2/loggedIn/familyname/0). You try [v2/loggedIn/familyname](http://rftr-example-site.s3-website-us-east-1.amazonaws.com/v2/loggedIn/familyname) and see that this doesn't work either.

Debugging, you will discover a typo:

```tsx
<Route
  path="/:version/logedIn/:familyName"
>
```

You will change `logedIn` to `loggedIn` and build a bug-free version to send to your boss.

[version 3 code](https://github.com/anthonyjoeseph/rftf-examples/blob/master/src/reactRouter/v3/Landing.tsx)

[v3/loggedIn/familyname/0](http://rftr-example-site.s3-website-us-east-1.amazonaws.com/v3/loggedIn/familyname/0)

Now you must hide the squirrel components when logging in, and hide `<Login>` once logged in.  You will not be sure exactly how to do this.

According to the [docs](https://reacttraining.com/react-router/web/api/Switch), `<Switch> renders the first child <Route> or <Redirect>` that matches the location.' and the `<Route exact>` [prop](https://reacttraining.com/react-router/web/api/Route/exact-bool) 'will only match if the path matches the location.pathname exactly.' So you will try these features out:

```tsx
<Switch>
  <Route
    exact
    path="/:version/"
  >
    <BeautyContainer backgroundColor='beige'>
      <Login />
    </BeautyContainer>
  </Route>
  <BeautyContainer backgroundColor='yellow'>
    <Route
      path="/:version/loggedIn"
    >
      <FamilyList />
    </Route>
  </BeautyContainer>
  ...
</Switch>
```

What you would expect:

| Route | Output |
|-------|--------|
| `"/:version/"` | Render `<Login>` and it's `<BeautyContainer>`. Render other `<BeautyContainers>` but not their `<Route>`s |
| `"/:version/loggedIn"` | Don't render `<Login>` or it's `<BeautyContainer>`. Render other `<BeautyContainers>` and the contents of `<FamilyList>` |

[version 4 code](https://github.com/anthonyjoeseph/rftf-examples/blob/master/src/reactRouter/v4/Landing.tsx)

[v4](http://rftr-example-site.s3-website-us-east-1.amazonaws.com/v4)

[v4/loggedIn/familyname/0](http://rftr-example-site.s3-website-us-east-1.amazonaws.com/v4/loggedIn)

What will actually happen:

| Route | Output |
|-------|--------|
| ✅ `"/:version/"` | What we expected |
| ❌ `"/:version/loggedIn"` | __Renders only the first `<BeautyContainer>`__ |

(These charts are a bit difficult to read. It's easier to understand the problem by clicking the links and actually seeing the output)

You will be puzzled by this. Why are the other `<BeautyContainer>`s not being rendered? `<Switch>` shouldn't affect components that aren't `<Routes>`. After setting breakpoints in render functions, you will be unable to find your error. This will hurt your pride.

Your boss will stop by and ask how the app is coming. You say that the new routing requirements are complicated. You boss will be surprised by this, but will believe you.

On your lunch break, you will realize that you have added trailing slashes to all of the `path` props of the `<Route>` components. You will realize that is why you're having problems with `<Switch>`. You will breathe a sigh of relief. When you get back, you will comb through your code and remove all of the trailing slashes.

[version 5 code](https://github.com/anthonyjoeseph/rftf-examples/blob/master/src/reactRouter/v5/Landing.tsx)

[v5/loggedIn/familyname/0](http://rftr-example-site.s3-website-us-east-1.amazonaws.com/v5/loggedIn/familyname/0)

This will change nothing. `<Switch>` will still behave strangely. After checking the documentation you will realize that [trailing slashes only matter when 'strict' is enabled](https://reacttraining.com/react-router/web/api/Route/strict-bool). And anyway, it never really made much sense that the trailing slashes would cause problems with `<Switch>`.

Since you will be out of other ideas, you will try an experiment. You will remove the `<BeautyContainer>`s and other `<Route>`s, and add a couple `<div>`s after the first `<Route>`.

```tsx
<Switch>
  <Route
    exact
    path="/:version/"
  >
    <BeautyContainer backgroundColor='beige'>
      <Login />
    </BeautyContainer>
  </Route>
  <div>
    render 1
  </div>
  <div>
    render 2
  </div>
</Switch>
```

[version 6 code](https://github.com/anthonyjoeseph/rftf-examples/blob/master/src/reactRouter/v6/Landing.tsx)

[v6/loggedIn](http://rftr-example-site.s3-website-us-east-1.amazonaws.com/v6/loggedIn)

Curiously, it will only display 'render 1'.

This will make no sense. You had assumed `<Switch>` only affected `<Route>`s nested within itself. Why would `<Switch>` remove unrelated `<div>` tags? And why only one of them?

You will realize how vague the documentation is when it says that `<Switch> renders the first child <Route> or <Redirect> that matches the location.` It doesn't say what it does with the rest of its children.

It will seem that `<Switch>` only renders exactly one child component after the first matching `<Route>`.

To test this theory, you will wrap both of the `<div>`s in a parent `<div>`.

```tsx
<Switch>
  <Route
    exact
    path="/:version/"
  >
    <BeautyContainer backgroundColor='beige'>
      <Login />
    </BeautyContainer>
  </Route>
  <div>
    <div>
      render 1
    </div>
    <div>
      render 2
    </div>
  </div>
</Switch>
```

[version 7 code](https://github.com/anthonyjoeseph/rftf-examples/blob/master/src/reactRouter/v7/Landing.tsx)

[v7/loggedIn](http://rftr-example-site.s3-website-us-east-1.amazonaws.com/v7/loggedIn)

Now both are rendered. This will seem to confirm your strange hypothesis. You will plug your squirrel components back in, this time wrapping them in a `<div>`.

[version 8 code](https://github.com/anthonyjoeseph/rftf-examples/blob/master/src/reactRouter/v8/Landing.tsx)

[v8/loggedIn](http://rftr-example-site.s3-website-us-east-1.amazonaws.com/v8/loggedIn)

This will render the routes properly, but they will render in a column instead of a row. The new `<div>` will have clobbered the parent `<div>`'s `flexDirection`. You will replacing the new `<div>` with a `<React.Fragment>`.

[version 9 code](https://github.com/anthonyjoeseph/rftf-examples/blob/master/src/reactRouter/v9/Landing.tsx)

[v9/loggedIn](http://rftr-example-site.s3-website-us-east-1.amazonaws.com/v9/loggedIn)

This will correctly preserve the parent `<div>`'s style.

But now you will find a strange bug at [v9/loggedIn/familyName/0](http://rftr-example-site.s3-website-us-east-1.amazonaws.com/v9/loggedIn/familyname/0). Now you will notice that `<FamilyList>` isn't rendering, but the other two squirrel components are. To test this, you will remove the other components besides `<FamilyList>`

[version 10 code](https://github.com/anthonyjoeseph/rftf-examples/blob/master/src/reactRouter/v10/Landing.tsx)

[v10/loggedIn/familyname/0](http://rftr-example-site.s3-website-us-east-1.amazonaws.com/v10/loggedIn/familyname/0)

`<FamilylName>` will still not render. You will realize that `<Switch>` behaves differently with `<React.Fragment>` than with `<div>`. In fact, it will seem like now it has the reverse behavior - rendering _everything except_ the first component after the first matching `<Route>`.

Actually, it does render that component, but it nullifies _that_ component's first child, and then renders its siblings.

You will be amazed at this discovery. You will show your `<Landing>` component to your co-worker. They will point out the typo in one of your `<Route>` path props back in Version 8:

```tsx
  <Route path="/:version/loggeIn" >
```

[version 11 code](https://github.com/anthonyjoeseph/rftf-examples/blob/master/src/reactRouter/v11/Landing.tsx)

[v11/loggedIn/familyname/0](http://rftr-example-site.s3-website-us-east-1.amazonaws.com/v11/loggedIn/familyname/0)

Now the app will completely behave as expected. But what about other the other developers on your team? Besides the person you've just shown the app to, they would have no idea why there's a `<React.Fragment>` there. And if they took it out they'd have to untangle all of this all over again. Best to use an empty `<Route>` instead, so people will understand that it has something to do with routing.

```tsx
<Switch>
  <Switch>
    <Route
      exact
      path="/:version/"
    >
      <BeautyContainer backgroundColor='beige'>
        <Login />
      </BeautyContainer>
    </Route>
    <Route>
      <BeautyContainer backgroundColor='yellow'>
        <Route path="/:version/loggeIn" >
          <FamilyList />
        </Route>
      </BeautyContainer>
      ...
    </Route>
  </Switch>
</Switch>
```

[version 12 code](https://github.com/anthonyjoeseph/rftf-examples/blob/master/src/reactRouter/v12/Landing.tsx)

[v12/loggedIn/familyname/0](http://rftr-example-site.s3-website-us-east-1.amazonaws.com/v12/loggedIn/familyname/0)

Finally, this will be the behavior you want. In fact, it will be perfect, because it won't clobber the other routes at [v12/loggedIn/familyName/0](http://rftr-example-site.s3-website-us-east-1.amazonaws.com/v12/loggedIn/familyname/0).

Actually, why doesn't it clobber those routes? It matches the empty `<Route>`, so shouldn't it nullify the `<Route>`s nested inside it? After all, the empty `<Route>` was the first `<Route>` it matched with.

But, you suppose, if you think about it, that wouldn't make any sense. If that were it's behavior, you wouldn't be able to use `<Route>` deeper than one level nested beneath a `<Switch>`.

By this point, you will have successfully routed your app. Next, you implement linking.
