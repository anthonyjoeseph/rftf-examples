Usage

I commend you for finishing this project. Most people would have accepted errors in their code, or would have simply followed the first tutorial to pop up on google and accept its word as gospel. This series has emulated many worst case scenarios, all while assuming a best case programmer - you. And you made many great decisions along the way - you used typescript, you tried to encapsulate your data, you learned about the null object pattern. But you shouldn't have to be this smart or dedicated to write a simple squirrel app.

Now we present an alternate universe in which you decide to use react-fp-ts-router from the very beginning. We will walk through all of the same changing requirements and backend output, but from this new perspective.

(all along the way, millions of compile time errors and frustrations. Checking where types are defined. Why is Parser generic? That doesn't make any sense. And what is a Task? Gdammit, it's just a promise? Why do I have to describe default state right from the beginning? Can't I get a little further before I have to answer that? I don't know how I want my app to handle itself before it's first render. Boss gets worried that it's taking so long to release the first version. Constantly questioning whether you should have used something simple like `react-router`)

(Isn't there at least a blog post somewhere about how to use this thing?)

Create the same app in react-fp-ts-router in 10 versions
  - Simple Routing Logic
  - add login
  - add mocked data
  - add fetches & error handling & initializers
  - handle parseint url error
  - add Valet
  - add mutable Squirrel state
  - add custom Valet greeting
  - handle 5 sec delay error
  - handle backslash family name error