This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
bun dev
```

# About the app

This is a test assignment.

Preview: [https://eidra-fullstack-test-app.vercel.app/](https://eidra-fullstack-test-app.vercel.app/).

Requirements document: [https://github.com/Punchkick/code-assessment/blob/main/assessment.md](https://github.com/Punchkick/code-assessment/blob/main/assessment.md).

Due to the time constraints I was only able to implement:

* in-memory cache to store data from the external API
* homepage with the list of restaurants
* the main layout
* filter by category (partially done)
* sidebar with additional filters (UI only)
* basic UI and styling

## Next steps

What is missing and what could be improved (after the initial 2h constaint):

* missing open status information
* adding the working sidebar filters
* UI update
* code organization and refactoring

### Open status information

**Restaurant Data with Open Status Using the `/open/{id}` Endpoint**

The external API does not include open status in the bulk restaurant list response, but it does offer an `/open/{id}` endpoint specifically for retrieving the current open status of a restaurant. The response from this endpoint looks like:

```json
{
  "restaurant_id": "string",
  "is_currently_open": boolean
}
```

**Ideal Solution:**
Ideally, the external API would already include the current open status for all restaurants in its list endpoint. This would eliminate the need for additional requests and would simplify (and speed up) bulk fetching.

**Possible solution with current approach:**

Given the current API limitations, the best approach is to update each restaurant object with its open status on the server-side before sending restaurant lists to the frontend:

1. **Fetch the Restaurant List (already implemented):**  
   Fetch the complete list of restaurants from the main endpoint.

2. **Fetch Open Statuses in Parallel:**  
   For each restaurant, trigger a parallel request to the `/open/{id}` endpoint to retrieve `"is_currently_open"`, and attach it as an `isOpen` boolean field in each restaurant object.

   > **Note:** Using `Promise.all` for these parallel fetches is important to keep latency reasonable.

3. **Frontend Usage:**  
   Now, in places like `@app/components/restaurant.tsx`, we will have access to the `isOpen` field directly and **do not need any additional requests per item on the frontend**.

### Sidebar filters

To implement functional sidebar filters, we can use the structure of category filtering in `@app/components/categories/categories.tsx`. This requires refactoring the data fetching logic to handle multiple filters at once. Currently it's only possible to do on the FE, which is not ideal, but we can achieve the expected result especially with the searchParams.

### UI update

Currently the UI is very minimal and it requires:

* color update
* font and typography update (now the default Next.js font is being used)
* better responsiveness
* code splitting by creating separate components for reusable elements


### Refactoring Guide

To improve maintainability and scalability of the application it needs refactoring and optimization which I couldn't achieve due to a time limit:

- **Type Management:** Better type definitions.

- **Code Splitting & Organization:** Refactor components into smaller, reusable pieces.

- **Error Handling:** Replace `console.log` and `console.error` usages with a more sophisticated logging solution or error tracking tool (e.g., Sentry). And overall we would have to add more user-friendly error messages on the frontend, add `error.tsx` page etc.

- **Testing:** Implement unit and integration tests across API utilities, UI components, and business logic using frameworks like Jest and React Testing Library.

I think the guide above will enhance code quality and developer experience.
