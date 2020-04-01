Mutable State

Add Valet feature
  - sometimes visible at the /loggedIn/familyname/id route, at the bottom of the `<FamilyList> `<BeautyContainer>`, depending on if the individual squirrel is rich enough to afford a valet
  - he can also appear on his own, at the /loggedIn/valet route, where he can eat and do yoga (just cause he's a valet doesn't mean he doesn't have a life)

But whoops we can't work on that yet because all of a sudden now we're getting a parseint error
  - customers are furiously chirping
  - what's going wrong?
  - error in route initializer when it calls parseint 
  - oh jesus our backend started returning a squirrel id that's not a number
  - handle this case

Ok we're back 
  - where should its initializer be called?
    - can it be its own componentDidMount?
  - turns out he needs access to the squirrel's favorite parking spot, which is only gotten by squirrel id
    - and the user can change the squirrel's favorite parking spot
    - hmm he's rendered much higher up the component tree, but we want to avoid state being pushed too high up b/c of encapsulation.
    - can we render him lower, next to the squirrel w/ the id, and use position: 'absolute' to try to place it where it needs to go?

Uh oh squirrel detail is resetting to null values
  - where are the null values coming from?
  - (can this take a long time to figure out?)
  - oh it's family initializer - it sets the squirrel values to null object to avoid null checking
  - all of a sudden, the backend has a 5 sec delay, and the null objects are clobbering the actualy values from the squirrelID initializer
  - do we bring back null checking?
  - best to add conditional logic to the familly initializer