# Expense Tracker

## Overview

Expense Tracker is a React and TypeScript application designed to help users manage their personal finances. The application provides visibility into spending habits, savings progress, and gas cylinder consumption like forecasting usage based on the duration of the user's most recent gas events, the application estimates when a new cylinder will likely be required.

### Technology Stack

- React
- TypeScript
- Vite
- Material UI
- MUI X Charts
- Firebase Authentication
- Cloud Firestore
- React Router
- Day.js

---

## Project Structure

```text
.github/workflows/ci-cd.yaml      # CI/CD pipeline for Firebase Hosting deployments

src/
├── router/                       # Application routing with react router dom
├── config/                       # Firebase configuration
├── contexts/                     # Global state management
│   ├── auth/
│   ├── dialog/
│   ├── drawer/
│   ├── gasEvents/
│   ├── saving/
│   ├── snackbar/
│   └── withdrawalsRetrieval/
├── hooks/                        # Business logic and reusable actions
├── repositories/                 # Repository layer (data access abstraction)
│   ├── BaseRepository.ts
│   ├── RepositoryRegistry.ts
│   ├── gasEvents/
│   ├── saving/
│   ├── UsersInfo/
│   └── Withdrawals/
├── services/                     # External providers and integrations
│   ├── Auth/
│   └── Data/
├── types/                        # Shared TypeScript type
├── ui/
│   └── features/
│       ├── dashboard/
│       ├── gas/
│       ├── login/
│       ├── profile/
│       ├── shared/
│       └── withdraw/
├── utils/                        # Helpers, calculations and formatters
│
└── test/                         # Unit test for UI and some hooks

public/                           # Static assets
```

---

## Architectural Principles

The application was designed around a few key principles:

### Separation of Concerns

UI components should only be responsible for rendering data and handling user interactions.

Business logic, data access, and external integrations are isolated into dedicated layers to prevent components from becoming tightly coupled to implementation details.

### Dependency Inversion

Higher-level modules should depend on abstractions rather than concrete implementations.

This allows the application to switch between different data providers (Firestore, mock implementations, future APIs) without impacting the rest of the codebase.

### Testability

By separating business logic from UI and external services, individual pieces can be tested independently.

Repositories, authentication providers, and hooks can be mocked or replaced during testing without modifying component code.

### Maintainability

The architecture favors clear boundaries between responsibilities, making it easier to introduce new features or replace technologies in the future.

---

## Architecture Overview

The application follows a layered architecture:

```text
UI Components
      │
      ▼
Custom Hooks
      │
      ▼
Repositories
      │
      ▼
Data Providers
      │
      ▼
Firestore
```

### Responsibilities by Layer

| Layer         | Responsibility                      |
| ------------- | ----------------------------------- |
| UI Components | Rendering and user interaction      |
| Hooks         | Business logic and orchestration    |
| Contexts      | Shared application state            |
| Repositories  | Data access abstraction             |
| Services      | External integrations and providers |
| Firestore     | Persistent storage                  |

---

## Repository Pattern

The repository layer abstracts all persistence operations from the rest of the application.

Repositories implement a common contract:

```typescript
/**
 * Generic base repository contract for CRUD operations.
 *
 * @template T Entity/data model type.
 * @template U Unique identifier type used to locate a single entity.
 * @template Q Query constraint/filter type used when retrieving collections.
 */
interface BaseRepository<T, U, Q>
```

which exposes CRUD operations such as:

- `getAll`
- `getByUnique`
- `createOne`
- `updateOne`
- `deleteByUnique`

### Why use repositories?

Without repositories, components and hooks would need direct knowledge of Firestore APIs, document structures, and query logic.

Using repositories provides several advantages:

- Centralized data access logic
- Easier testing through mocks
- Reduced coupling to Firestore
- Ability to replace Firestore with another backend in the future

As a result, the UI layer depends only on repository contracts and remains independent from the persistence technology.

---

## Repository Registry

The application uses factories to centralize object creation and dependency selection.

### RepositoriesFactory

The application uses a Repository Registry to manage repository instances and provide a single access point for all persistence operations.

RepositoryRegistry

The registry is responsible for:

- Creating repository instances
- Ensuring singleton-like reuse
- Providing a unified access API
- Decoupling consumers from implementation details

Repositories are accessed using a key

### Why use a registry?

The registry replaces the previous factory-based approach and improves consistency across the application.

Key benefits:

- Centralized repository management
- Lazy instantiation of dependencies
- Avoids duplicate factory methods
- Strongly typed access to repositories
- Easier mocking in tests
- Better alignment with dependency inversion principles

### Singleton lifecycle

Repositories are created once and reused throughout the application lifecycle.

```
Application
      │
      ▼
RepositoryRegistry
      │
      ├── WithdrawRepository
      ├── SavingRepository
      ├── GasEventsRepository
      └── UsersInfoRepository
```

### AuthProviderFactory

Responsible for selecting the authentication provider.

Current implementations include:

- FirebaseAuthProvider
- MockAuthProvider

### Why use factories?

Factories remove construction logic from application code and provide a single location where implementation choices are made.

This makes switching providers straightforward and prevents provider-specific logic from leaking into the rest of the application.

---

## Context and Hooks Architecture

### Contexts

Contexts manage global application state which reduces too deep prop drilling and state lifting.

Reducer-based state management and is used where state transitions become more complex.

### Hooks

Custom hooks contain business logic and orchestrate workflows.

Examples include:

- Creating withdrawals
- Updating savings
- Preparing chart datasets...

### Why separate hooks from components?

This separation keeps components focused on presentation while business logic remains reusable and easier to test.

A component should answer:

> "How should this be displayed?"

A hook should answer:

> "How does this feature work?"

---

## Data Flow Example

The following sequence illustrates how data moves through the application:

```text
User Action
     │
     ▼
React Component
     │
     ▼
Custom Hook
     │
     ▼
Repository
     │
     ▼
Data Provider
     │
     ▼
Firestore Provider
     │
     ▼
Cloud Firestore
```

For example, when a user creates a withdrawal:

1. The form component captures the input.
2. A custom hook validates and processes the request.
3. The hook calls the appropriate repository.
4. The repository communicates with Firestore.
5. Updated data is returned to the application state.
6. Context updates trigger UI re-rendering.

This flow ensures that responsibilities remain clearly separated.

---

## UI Layer

The UI layer is built using:

- Material UI for layout and component styling
- MUI X Charts for dashboard visualizations
- React Router for navigation

Feature modules are organized under `src/ui/features`, grouping related pages, components, and feature-specific logic together.

This structure improves discoverability and helps features evolve independently.

---

## Deployment

The project includes a GitHub Actions workflow that supports Firebase Hosting deployments.

Deployment can be triggered:

- Automatically when commit messages contain `cd:auto`
- Manually through GitHub Actions workflow execution

This approach allows controlled releases while still supporting automated deployments when required.
