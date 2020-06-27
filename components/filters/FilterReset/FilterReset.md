```js
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterColor, filterName, filterPrice } from '@app/redux/actions';

const { filters = { color: 'All', name: '', price: 100000 } } = useSelector(
  (store) => store
);
const dispatch = useDispatch();

let items = [];

for (let key in filters) {
  items.push({ key, value: filters[key] });
}

useEffect(() => {
  dispatch(filterName('Filtered Name'));
  dispatch(filterColor('Filtered Color'));
  dispatch(filterPrice(98));
}, []);

<>
  <FilterReset />
  <h3>
    {items.map((item) => (
      <p key={item.key}>
        "{item.key}" filter is set to "{item.value || 'empty'}"
      </p>
    ))}
  </h3>
</>;
```
