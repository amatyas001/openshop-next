### Filters attached to a list of products

```jsx noeditor
import { useSelector } from 'react-redux';

const { filters } = useSelector((store) => store);

const products = [
  {
    id: '0',
    name: 'My Fancy Item',
    price: 200,
    color: 'Yellow',
    amount: 1,
    starrating: 3,
  },
  {
    id: '1',
    name: 'My Awesome Item',
    price: 100,
    color: 'Red',
    amount: 1,
    starrating: 3,
  },
  {
    id: '2',
    name: 'My Outstanding Item',
    price: 50,
    color: 'Gray',
    amount: 1,
    starrating: 3,
  },
  {
    id: '3',
    name: 'My Cool Item',
    price: 30,
    color: 'Gray',
    amount: 1,
    starrating: 3,
  },
  {
    id: '4',
    name: 'My Dark Item',
    price: 10,
    color: 'Black',
    amount: 1,
    starrating: 3,
  },
];

const filtered = products.filter((product) => {
  return (
    (filters.color === 'All' ? true : product.color === filters.color) &&
    product.price <= filters.price &&
    product.name.toLowerCase().includes(filters.name)
  );
});

<>
  <FilterPanel products={products} width='100%' />
  <ul style={{ marginTop: '150px' }}>
    {filtered.length ? (
      filtered.map((product) => (
        <li key={product.name}>
          <h4>{product.name}</h4>
        </li>
      ))
    ) : (
      <h3>Sorry, no results!</h3>
    )}
  </ul>
</>;
```

---
