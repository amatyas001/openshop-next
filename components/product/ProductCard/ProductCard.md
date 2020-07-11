### Product with single size and color

> Amount must be set to activate the _Buy_ button

```jsx noeditor
<ProductCard
  product={{
    id: 'itemid',
    name: 'My Product 1',
    img: '4.jpg',
    description: 'This is a sample item to demonstrate the component.',
    price: 14.15,
    amount: 2,
    color: 'Single Color',
    starrating: 3,
  }}
/>
```

### Product with multiple colors

> Exact color and amount must be selected to activate the _Buy_ button

```jsx noeditor
<ProductCard
  product={{
    id: 'itemid',
    name: 'My Product 2',
    img: '3.jpg',
    description: 'This is a sample item to demonstrate the component.',
    price: 9.98,
    amount: 7,
    color: ['Multiple Color 1', 'Multiple Color 2'],
    starrating: 5,
  }}
/>
```

### Product with multiple sizes and colors

> Exact color, size and amount must be selected to activate the _Buy_ button

```jsx noeditor
<ProductCard
  product={{
    id: 'itemid',
    name: 'My Product 3',
    img: '7.png',
    description: 'This is a sample item to demonstrate the component.',
    price: 35.65,
    amount: 5,
    sizes: ['Multiple Size 1', 'Multiple Size 2'],
    color: ['Multiple Color 1', 'Multiple Color 2'],
    starrating: 4,
  }}
/>
```
