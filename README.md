# slot-spike

A spike for Fluent UI vNext slots

The goal is to compare the capabilities of two approaches:

- The existing Fluent UI vNext attribute-based slots
  = Using props.children to provide slots

## Stories

### Capabilities

- I can read the props of slotted content.
- I can add/modify the props of slotted content.
- I can add/modify the classes of slotted content.
- I can subscribe to an event from slotted content.
- I can wrap an event from slotted content.

### Types of slot content

- I can slot primitive values.
- I can slot HTML elements.
- I can slot JSX.
- I can slot render functions.
- I can slot props //applies only to the attributes approach

### Types of children

- I can slot a single child as content.
- I can slot a list of children as content.
- I can slot a hiearchy of children.

## Appendix: props.children format

### When slotted content is a primitie

```ts
children: <value of primitive>
```

### When slotted content is an HTML element

```ts
children: {
  $$typeof: Symbol(react.element)
  props: {
    children: <value within the element>
  }
  type: <element type (like div or label)>
}
```

### When slotted content is a single component child

```ts
children: {
  $$typeof: Symbol(react.element)
  props: {
    children: <value within the component>
  }
  type: props => {...}
    displayName: <ComponentName>
    name: <ComponentName>
}
```

### When slotted content is a multiple HTML elements

```ts
children: [
  {
    $$typeof: Symbol(react.element),
    type: <element type (like div or label)>
    key: <value of key attribute>,
    ref: <reference if any>
    props: {
      children: <value within the element>
    }
  }
]
```
