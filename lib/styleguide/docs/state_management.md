## Global State

Global state is managed by [Redux](https://redux.js.org) which acts as the _single source of truth_ and persisted on the user's machine. Components communicate with each other through dispatched actions and business data is presented based on the current state of the application.

### State Elements

#### **Cart**

> Represents the current [Cart](#cartpanel) of the user, storing all information of selected products.

#### **Payment**

> Contains payment process status and details.

#### **Filters**

> Stores the current set of filters which controlling the displayed product list.

#### **Panels**

> Stores the state of opened/closed UI panels.
