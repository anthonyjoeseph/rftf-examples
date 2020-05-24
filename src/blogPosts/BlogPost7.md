# Rant

## This is all true

While our squirrel example may have seemed contrived, [this all actually happened](https://en.wikipedia.org/wiki/Secret_Squirrel).

Kidding aside, the pitfalls of the squirrel app closely resemble problems I encountered while working on large project for a couple years. This series is torn from the chest and written in blood.

## Why dwell on flaws?

It may seem self-congratulatory to write such a long post bragging about the advantages of my library (ok, it is), and mean spirited to write a sarcastic tutorial for the library it aims to replace (granted).

Here's my reasoning. First of all, it's fun. Second, `react-fp-ts-router` enforces global state and encourages functional patterns. It's kind of an entire functional web framework. That justifies it's length.

But why prosecute `react-router`? Wouldn't it be better to talk about `react-fp-ts-router`'s advantages?

Especially since it's so small (2 HOCs and an handful of types), it's hard to easily understand the scope of `react-fp-ts-router`, or functional paradigms in general, for that matter. It's easier to see the size of the risk imperative paradigms impose. Happily for our cause, `react-router` happens to be an easy target. It has widespread use and, though it's clearly useful, and in some ways is really quite clever, it has many flaws.

## The biggie

Probably the most obvious problem with `react-router`'s approach is the willy-nilly dispersal of routing logic across `<Route>`s through the dreaded `path` prop.

The `path` prop is not only completely unprotected from the elements - it's just a string, you could put anything in there - it _requires_ copying elements of routing logic all over your app! All that copying of redundant information is just begging for typos. And if you have to change a literal in a route high up the component tree, good luck remembering where all of the affected `<Route>`s live. It's the opposite of DRY - it's a wetsuit!

When they're nested, there is no guarantee that the component lower on the chain will have a compatible prop that would ever allow it to be rendered. In the docs, it vaguely hints that you're supposed to use `match.path` to propogate nested routes, but this isn't enforced anywhere. It's the kind of information you stumble on accidentally, and by then it's such a pain to re-wire all those match props through your component tree that you try to forget you ever saw it.

`react-fp-ts-router` localizes route parsing at the root level, where it naturally belongs. It hands the parsing responsibility off to `fp-ts-routing`, which of course offers type safety and the power of an applicative functor.

## Subtler Problems

While `react-fp-ts-router` can seem difficult and unintuitive at fist, and while `react-router` is simple to use for naive implementations, we have proven here that the latter library requires heaps of knowledge and research (5 blog posts worth!) to use safely. And I believe it would be easier to explain `react-fp-ts-router` to an alien than `react-router`.

There are obvious advantages to the type-safety of `react-fp-ts-router`'s approach. Handling edge cases is enforced by the compiler, proper error handling is encouraged and streamlined, and functionality is easily abstracted, making code DRY-er and defending against the ever-present barrage of human error that is the typo (I shiver). But there are less obvious advantages that comparisons to `react-router` can hopefully illuminate. 

## Inextricably Tied to React's Underbelly

In part 5, a search for the best implementation of a simple componentDidMount callback causes a mysterious dreaded hook compiler warning, which leads us to impelment a custom react hook in order to surpress it. Worse than this encounter with the supernatural, we must contend with the component lifecycle to set up our global route initializers. We must juggle many problems in our head, without any way of tracking them at compile time - will the state be initialized by now? Will this cause a [FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content)? Are we causing an infinite render loop?

`react-fp-ts-router` is a glove to help you reach into the bog of the react lifecycle, formalizing these problems and demanding solutions - with the default state function, and by requiring initializers to return a Task.

## Human-Language Documentation is a Liability

In part 5, we encounter ['Using the Effect Hook'](https://reactjs.org/docs/hooks-effect.html), a formidable document. All throughout, we have had to devour manuals, forums, issue trackers and blogs in order to understand how `react-router` behaves and how best to use it.

`react-fp-ts-router`'s approach is minimal and littered with self-documenting types. Hopefully, investigating the problems it poses will teach you more about the [nature of the universe](https://youtu.be/IOiZatlZtGU?t=1871) than about the [output of `path-to-regexp`](https://github.com/pillarjs/path-to-regexp) (I shiver).

## Many Possible Solutions to the Same Problem

An even slipperier problem with `react-router` is that it often offers many apparently equivalent solutions to the same problem. In part 2, we wonder how best to access the current browser location, and how best to imperatively link. In part 3, it is unclear where or how best to fetch data used by routed components. Right at the beginning of part 1, we wonder where exactly to place `<Route>` components. 

This problem may be caused by `react-router`'s bloated size: eleven components, four hooks and one HOC.

Hopefully, the earlier parts help you see that at best, this causes confusion ("surely I must be offered these choices for a reason"), often, this causes poor design (the Valet component), and at worst, these multiple sources of truth cause runtime errors (conflicting path props, route initialization).

`react-router` attempts to offer a single and canonical solution to each of these problems - browser location is given to initializers, updateState is the only way to imperatively link, and `withNarrowerAppState` offers its guidance for the clearly defined use cases when you need it.

## Unenforced Design

We are torn between [encapsulation](https://reactjs.org/docs/thinking-in-react.html#step-1-break-the-ui-into-a-component-hierarchy) and [lifting state up](https://reactjs.org/docs/lifting-state-up.html). We want to like the [null object pattern](https://dev.to/jamesmh/unhealthy-code-null-checks-everywhere-2720), but it causes errors, as we saw with the backend delay error in part 4. And we badly want to use react hooks, but we don't understand their ways.

`react-router` brings out the worst of these problems. It uses react hooks, as we saw in part 5 with the promising useHistory that is ends up being useless to us. The unholy mix of JSX and logic would seem to imply that the developers favor encapsulating data - why else would a component be able to define it's own routing path?

Not only does `react-fp-ts-router` avoid these problems, it actively proposes solutions. State is forcably lifted up to the top level. `withNarrowerAppState`'s explicit purpose is to require data to exist when it's being used. And it encourages breezy functional error handling by using Options, Eithers or Validations in app state.

## JSX as Logic - `<Switch>`

Maybe part 1 seems like a cheap shot. A hit post against `<Switch>`. Pages and pages dedicated to a seemingly small bug, a minor slip up from the [ReactTraining](https://reacttraining.com/) team. While yes, at time of publication, `<Switch>` is broken, and yes, it is poorly named (does it swap two things? Does it turn something on?), there is something deeper and more insidious than poor implementation going on here. `<Switch>` has (is?) a poor interface.

react-router is 'declarative' in the sense that it puts logic into jsx. In this way, it poses as a functional library. However, lambda calculus requires input and output. Since it has neither, `<Switch>` is best described as a side effect. It is impossible to predict at compile time what affect it will have. Since it has no compile-time output, we don't know what it's expected behavior is until runtime. Since it has no types, it lacks self-documentation. Since it's written documentation is vague, it's unclear what its expected behavior is even _at_ runtime. It has likely remained broken in production because the developers are unaware that it is. Possibly, they have forgotten what it's supposed to do. That sounds more insulting than it is - it is very difficult to describe exactly what a properly functioning `<Switch>` _should_ do (though we will try in a moment). `<Switch>` could do anything at any moment. It is untamed, feral. Unbroken, yet broken. It represents the confluence of nearly every possible problem with non-functional design.

`react-fp-ts-router` really has no obvious equivalent of `<Switch>`. If `<Switch>` is best defined as a runtime reducer of an array of child components governed by potential regex matches of _those_ components's arbitrarily defined routing data, it's strange to think what that would look like. I suppose it would be a parent component that wraps each of its chilren in `withNarrowerAppState`, each with a conditional that depends on a graph traversal of _its_ children that finds all components that accept a 'path' prop, and this conditional is constructed in a way that only the first component listed that satisfies its own condition or that contains a descendant that satisfies _its_ own condition can render.

It's hard to imagine a common use case for this. The advantage of `react-fp-ts-router` is that it uses `fp-ts-routing`'s typed output to wrangle routing logic, and forces render logic to depend on that typed output, so that routing and render concerns are separated, well documented, and simplified.

## JSX as Logic - Rendering ?= Routing

Placing routing logic into jsx creates strange incentives. In part 4, we saw how it became easier to render our `<Valet>` component as a sibling to the `<SquirrelDetail>` component, even though it's meant to appear somewhere competely different on the screen. This led to the humorous result of rendering it where it shouldn't go, and using `position: 'absolute'` as DOM spackle.

## JSX as Logic - Why?

Charitably, `react-router` solves the problem of null-checking components against routes. In theory, parsed routes represent a tree structure. Since in many cases an app's jsx is a related tree structure (our `<Valet>` being an exception), it makes sense to define our app's jsx in terms of our computed route's tree. I think it's clever to abstract that functionality into `<Route>`, and that idea inspired `withNarrowerAppState`. Ok, you caught me. I stole it. But I also think it's hamfisted to shove all that parsing routing into jsx, and careless in its implementation.

After all, lots of things can go wrong in the conversion from a route's string to it's tree. And that problem is solved by string parsing. Which, even this early in the computing game, we have good solutions for. And it's a problem that naturally lends itself to type safety and rigor, input and output.

## Stray Thoughts

### Scope of use

Exactly how widespread is react-router? According to npm it has three million weekly downloads. `react` has eight million. That means that, at the time of publication, roughly 37 percent of `react` users choose `react-router`.

### Response to Anticipated Criticism

You might say stringing `appState` and `updateState` through so many components is [prop drilling](https://kentcdodds.com/blog/prop-drilling/). This is only half-true. If a component or it's child needs to access global state, it would need a prop threaded through it anyway. And while you are welcome to use [React context](https://reactjs.org/docs/context.html) to avoid some of this boilerplate, I prefer to think of those props as marking those components as needing global state, and/or having the power to change it. In this way, my jsx becomes more explicitly self-documenting.

### Criticism of `react-fp-ts-router`

`withNarrowerAppState` is dangerous because type predicates can be used as type casts.

It's not immediately clear from the function definition of `withCallbackRoutes` whether `newStateFromRoute` is called on the initial render (it is), or whether it's called before the component mount or after (after).

It's similarly unclear why newStateFromRoute returns a Task instead of a promise (promises can have errors. Since we can guarantee that `withNarrowerAppState` won't be able to handle any errors, we force the callback itself to handle errors through changes to global state).

Please let me know if you have ideas that solve these problems, or any criticism of your own.

### Barely related: Redux is Overused

I kept seeing articles about it while I was researching this. Isn't it just the [command pattern](https://alvinalexander.com/java/java-command-design-pattern-in-java-examples/) for component state? How often is that [useful](https://en.wikipedia.org/wiki/Command_pattern#Uses) for frontends? Are people creating lots of apps with universal undo features?

Redux poses as a [functional](https://redux.js.org/recipes/using-immutablejs-with-redux) solution to global state. That would make it a cousin to `react-fp-ts-router`. But really, it solves a very specific and unique set of problems.
