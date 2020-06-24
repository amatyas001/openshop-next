```jsx
import { useSelector } from 'react-redux';

const { filters = { name: '' } } = useSelector((store) => store);

const items = [
  {
    name: 'My Fancy Item',
    price: 200,
    desc: 'This is the best product in the world!',
    color: 'Yellow',
  },
  {
    name: 'My Awesome Item',
    price: 100,
    desc: 'This is the best product in the world!',
    color: 'Red',
  },
  {
    name: 'My Outstanding Item',
    price: 50,
    desc: 'This is the best product in the world!',
    color: 'Gray',
  },
  {
    name: 'My Cool Item',
    price: 30,
    desc: 'This is the best product in the world!',
    color: 'Gray',
  },
  {
    name: 'My Dark Item',
    price: 10,
    desc: 'This is the best product in the world!',
    color: 'Black',
  },
];

const filtered = items.filter((item) => {
  return item.name.toLowerCase().includes(filters.name);
});

<>
  <FilterName />
  <ul>
    {filtered.length ? (
      filtered.map((item) => (
        <li key={item.name}>
          <h4>{item.name}</h4>
        </li>
      ))
    ) : (
      <h3>Sorry, no results!</h3>
    )}
  </ul>
</>;
```
