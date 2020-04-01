Linking

First, you define a mock state object to represent the state of your app.



Input button as link
  - also he wants an input button, but you can wrap that no problem

Many ways to get the pathname - expound - write _the_ canonical doc on this

senseless and random null checking
  - implement it
  - then realize implementation does not handle errors (conveniently forget to address parseint)
  - tyler mcginnis error handling solution (sooo whack) https://tylermcginnis.com/react-router-programmatically-navigate/

drill the appVersion into routes for linking

first actual test run of code, realize that the links are repeating the basename
  - first, read https://reacttraining.com/react-router/web/guides/quick-start/2nd-example-nested-routing
  - (?) note the use of `<Switch>` for error handling, re-implement earlier error handling with `<Switch>`
  - wonder about the difference btwn 'path' and 'url' https://reacttraining.com/react-router/web/api/match
  - use them, doesn't help
  - oh is it cause we have :version in our routes?
  - remove version from routes & links
  - whoops you missed one

Now login doesn't ever show and linking still doesn't work
  - google it
  - https://github.com/reactjs/react-router-redux/issues/203
  - wait there's useRouterHistory?
  - well, no. kind of. https://github.com/ReactTraining/react-router/issues/2814
  - useHistory has no basename https://reacttraining.com/react-router/web/api/Hooks/usehistory
  - but browserrouter does https://reacttraining.com/react-router/web/api/BrowserRouter
  - doesn't work
  - wait a minute, back to https://github.com/reactjs/react-router-redux/issues/203
  - do we just need a leading slash? Would that have prevented this entire headache?
  - yup

Boss wants to add 'enter' keystroke routing to login page
  - (?)can we set history.location?
  - wait nope it says not to on the docs cause it's mutable
  - what's up with 'history'? 7 months old? But used by 706k. ok i guess
  - oh there's createBrowserHistory
  - gotta use history.push()
  - how to get history? useHistory() or route props?

Next up, we add fetching.