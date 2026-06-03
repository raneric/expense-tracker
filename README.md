# Expense Tracker

## 1. Overview

Expense Tracker is a React + TypeScript application designed to help users monitor personal expenses, forecast spending, track savings, and manage gas-related events. The app combines a responsive dashboard with charts, authentication, and Firestore-backed data storage to give a clear view of financial activity.

### Main technologies

- React.js + TypeScript
- Vite
- Material UI and MUI X Charts
- Firebase / Firestore
- React Router
- Day.js

## 2. Folder structure

```text
.github/workflows/ci-cd.yaml      # Github action which deploy manually or automatically if commit message contain "cd:auto" the app on firebase hosting.
src/
├── app/                          # application bootstrap and main entry points
├── config/                       # Firebase configuration
├── contexts/                     # global state providers and reducers
│   ├── auth/                     # authentication context and user state
│   ├── dialog/                   # dialog state management
│   ├── drawer/                   # drawer navigation state
│   ├── gasEvents/                # gas event state
│   ├── saving/                   # savings state
│   ├── snackbar/                 # snackbar notifications
│   └── withdrawalsRetrieval/     # withdrawal data state
├── hooks/                        # reusable data and action hooks
├── repositories/                 # persistence abstraction layer
│   ├── BaseRepository.ts         # Interface for the generic repository
│   ├── RepositoriesFactory.ts    # Repository factory which handle DI for data provider
│   ├── gasEvents/
│   ├── saving/
│   ├── UsersInfo/
│   └── Withdrawals/
├── services/                     # external integrations and provider abstractions
│   ├── Auth/                     # Firebase / mock auth providers
│   └── Data/                     # Firestore data access layer
├── type/                         # shared TypeScript types
├── ui/                           # feature UI and shared components
│   └── features/
│       ├── dashboard/
│       ├── gas/
│       ├── login/
│       ├── profile/
│       ├── shared/
│       └── withdraw/
└── utils/                        # formatters, validation, calculations, constants

public/                          # static assets
nginx/                           # deployment / reverse proxy config
```

## 3. Architectural choices and implementation

### Abstraction and repository pattern

The application separates data access from UI logic. Repositories implement a common `BaseRepository<T, U>` contract, which standardizes CRUD operations such as `getAll`, `createOne`, `getByUnique`, `deleteByUnique`, and `updateOne`. This keeps components and hooks independent from Firestore details so that client classes depend on abstraction not on concrete class.

### Factory pattern

Two factory classes encapsulate object creation:

- `RepositoriesFactory` creates the appropriate repository implementation (Firestore-backed or mock data) for withdrawals, users, gas events, and savings.
- `AuthProviderFactory` selects the authentication backend (`FirebaseAuthProvider` or `MockAuthProvider`) without changing the rest of the application.

### Context + hooks architecture

State is managed through React context providers and reducer-based logic under `src/contexts/`. Hooks under `src/hooks/` orchestrate business actions such as submitting withdrawals, deleting records, or preparing chart datasets. This keeps components focused on rendering while reusable logic remains isolated and testable.

### UI and data flow

The app uses React Router for page navigation, Material UI for visual structure, and MUI X Charts for the dashboard visuals. Data providers in `src/services/Data/` connect to Firebase, while mappers in `src/utils/` convert raw document data into typed application models.
