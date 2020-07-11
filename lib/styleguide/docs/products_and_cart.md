Products are listed as individual [Cards](#productcard) and each user has a [Cart](#cartpanel) available to manage their shopping data while using the application. Current [Cart](#cartpanel) state is persisted on the user's machine.

The listed product data is loaded from an external source on every request to the `/products` page. The received list can be filtered using the [Filter Panel](#filterpanel). If the source is not changing frequently, build time SSG can be also used for more performance. _(see `getServerSideProps` and `getStaticProps` feature in the [documentation](https://nextjs.com/docs) for more information)_. Product data is rendered as paginated list of [Cards](#productcard).

By default every product requires the following properties:

- `id`: Unique string representing an individual product

- `name`: A non empty string value shortly describing the item

- `price`: Numeric value of the product price converted to fixed two decimals.

- `amount`: Available amount of the product in the shop store.
