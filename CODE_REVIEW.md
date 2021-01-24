### Code Smells ###
- books.effects.ts contains a godline. 
	- Likely could be broken up into multiple methods
- reading-list.effects.ts contains many long methods and godlines
- total-count.component.ts is one of many lazy classes
- State is contained within the reducer file.
	- State should be self-contained
	- Including it with the reducer muddies the distinct hierarchy of NgRx

### Lighthouse ###
- Buttons do not have an accessible name (search button)
- Background and foreground colors do not have a sufficient contrast ratio. ('Reading List' and recommnended search)