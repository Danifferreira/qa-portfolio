# Risk map

I score each area by impact (what happens to the customer or the business if it breaks) and probability (how likely it is to break, based on complexity, change rate and what I saw while exploring). The priority decides how much testing each area gets.

| Area | Impact | Probability | Priority | Why |
|---|---|---|---|---|
| [Admin and permissions](../areas/admin-and-permissions.md) | High | Medium | **High** | A customer reaching admin data or actions is a security and privacy incident |
| [Cart and checkout](../areas/cart-and-checkout.md) | High | Medium | **High** | It is where money is involved, and it has the most steps and the most state |
| [Authentication](../areas/authentication.md) | High | Low | **Medium** | Nobody can buy without it, but it changes rarely and the rules are clear |
| [Product catalog](../areas/product-catalog.md) | Medium | Medium | **Medium** | Wrong prices or broken search lose sales, and catalog data changes often |

## How the priority turns into work

| Priority | What it gets |
|---|---|
| High | BDD cases for every rule, automated API checks, at least one UI smoke, exploratory session every release |
| Medium | BDD cases for the main rules, automated smoke, exploratory session when the area changes |
| Low | Exploratory session when the area changes, regression row only |

I review this map when a bug escapes, when an area changes a lot, or at least once a quarter.
