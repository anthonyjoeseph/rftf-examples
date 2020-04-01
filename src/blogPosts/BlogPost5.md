Refactoring

It's a miracle! We have extra time before our deadline
  - let's refactor our code to solve some things that have been bugging us

First, let's wrangle these `<Route>`s
  - our `<Landing>` component is untenably huge
  - let's finally brave the `<Switch>`!
  - Everything still works, and it's cleaner now
  - this must be how you're meant to use `react-router`

Let's set up global route initializers
  - this will help reduce duplicate code between fetches called by linking and fetches called by direct routing
  - move all squirrel state up to the root component
  - hmm we need acess to history
  - let's use history.listen from createBrowserComponent
  - let's avoid using class components. Keep simplicity - https://dev.to/dan_abramov/making-sense-of-react-hooks-2eib
  - By Dan Abramov. He, like, invented react!
  - simulate componentDidMount with useEffect
  - https://reactjs.org/docs/hooks-effect.html
  - typescript warning - dangerous to have empty array as second argument
  - let's make a useComponentDidMount hook
  - now we've got to setup the initializers with route parsing
  - what's the best library to use?

Oh no, error in prod!
  - one of the families is unable to look at details for any of their squirrels
  - we need to abandon all of our unfinished refactoring for the moment and go back to looking at code from an older version.
    - re-googling git checkout cause you forgot how it works
    - i guess you've got to put your existing changes on a branch. Damn, you should have done that earlier.
  - your old links to their squirrels work fine
  - you email the user that its working

Back to work, on your newer git branch

Best parsing library
  - path-to-regexp?
    - Woah it's super old.
    - What is it's output? And object? Array? Both I guess
  - query-string
    - only returns nullables
    - doesn't catch parseint problems 
    - foresee problems with 
  - decide on query-string
  - try running the thing

Doesn't work
  - is it a problem with our hook? no
  - react-router must somehow clobber our listen callback
  - ok let's try the useHistory hook
  - compile time error - can't put useHistory above BrowserRouter in the component tree

You get an email back from the complaining customer from earlier.
  - They're elderly and unable to figure out how to click the link, and insist that the app is broken
  - rather than directly routing, you try linking your way to the route
    - you realize that the backend has an error in it that returns the family name as 'Mc/Squirrel' - the slash is fucking up your routing
    - it still worked when you directly routed there because `<SquirrelDetails>` only needs the 'squirrelID' it gets from the route, the family name is irrelevant
    - you handle this case and email the backend team

Back to work, on your newer git branch

What was the problem?
  - is parsing working?
  - double check it, yeah, it's ok
  - Oh yeah, not getting history.listen callbacks.
  - let's try the withBrowserRouter HOC
  - compile time error - same thing
  - hmm I guess we could do it in our component's render?

Whoops we accidentally made an infinite render loop
  - we'll have to add conditionals around our setstate calls
  - but these are the same conditionals we have to call in our individual initializers
  - I guess we'll have to pull out those conditionals
  - woah they're getting pretty ugly and huge

Why are we still using `<Route>`s?
  - the output of the parser ends up in global state by definition
  - why have two sources of truth for route parsing?

Ok so we're want to get rid of our `<Route>`s and all our logic would be simpler existing outside the `<Router>`
  - we are using no part of this library
  - this leads you to implement react-fp-ts-router