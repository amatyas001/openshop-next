The filter elements are supposed to **_*dispatch user defined criterias to the store*_** by predefined actions. Each filter element should be wrapped in the [FilterPanel](#filterpanel) for proper display. Filter object is available from the store as `filters` rootkey and have subkeys accordingly to the filter components used.

Example:

[FilterName](#filtername) creates a subkey in the store's **`filter` object** named **`name`**. Then this key is globally available and can be processed in a presentational component. _See [FilterPanel](#filterpanel) for details._
