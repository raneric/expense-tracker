# Expense Tracker - Comprehensive Code Review Report

**Date**: June 2026  
**Project**: React/TypeScript Expense Tracker with Firebase & Material UI  
**Overall Score**: 7.5/10  
**Assessment**: Solid architectural foundation with strong patterns, but surface-level issues need cleanup for production readiness.

---

## Executive Summary

Your expense tracker demonstrates **excellent architectural discipline** with clean separation of concerns, strong type safety, and proper use of React patterns. The project successfully uses Context API with reducers, custom hooks for business logic extraction, and a dependency injection pattern via factories.

However, there are **critical blockers** and **performance issues** that should be addressed before production deployment:

- **EditFormDialog is non-functional** (blocker for gas feature)
- **Inline arrow functions break React.memo optimizations** (performance issue)
- **Utility functions duplicated across files** (code maintenance)
- **Missing form state cleanup on errors** (UX/security)

---

## 📋 Table of Contents

1. [Critical Issues (Fix Immediately)](#critical-issues)
2. [High Severity Issues](#high-severity-issues)
3. [Medium Severity Issues](#medium-severity-issues)
4. [Lower Priority Issues](#lower-priority-issues)
5. [Architecture Evaluation](#architecture-evaluation)
6. [Best Practices Analysis](#best-practices-analysis)
7. [Component Reusability](#component-reusability)
8. [Business Logic Abstraction](#business-logic-abstraction)
9. [Positive Observations](#positive-observations)
10. [Detailed Recommendations](#detailed-recommendations)

---

## 🔴 Critical Issues

### 1. **Non-Functional EditFormDialog (BLOCKER)**

**Location**: [src/ui/features/gas/components/Dialog/EditFormDialog.tsx](src/ui/features/gas/components/Dialog/EditFormDialog.tsx)

**Issue**: The gas feature's edit dialog is completely non-functional. All 7 handlers are empty stubs:

```tsx
// Current (BROKEN)
<TextField
  label="Start date"
  type="date"
  value={formatDateForInput(new Date())}
  onChange={() => {}}  // ❌ Does nothing
  fullWidth
  margin="normal"
/>
<TextField
  label="Total days"
  type="number"
  slotProps={{
    input: {
      readOnly: true,
    },
  }}
  value={0}
  onChange={() => {}}  // ❌ Does nothing
  fullWidth
  margin="normal"
/>
<Button
  variant="contained"
  onClick={() => {}}  // ❌ Does nothing
  color="error"
  fullWidth
>
  Reset
</Button>
<Button
  variant="contained"
  onClick={() => {}}  // ❌ Does nothing
  fullWidth
>
  Submit
</Button>
```

**Impact**:

- Users cannot edit gas information
- Gas feature is non-operational
- Blocks unit testing of dialog

**Recommendation**:

1. **Option A** (Recommended): Implement the dialog properly following the [WithdrawalFormDialog](src/ui/features/withdraw/components/Dialog/WithdrawalFormDialog.tsx) pattern
2. **Option B**: Remove the dialog if gas editing is not yet implemented, and mark feature as "Coming Soon"

**Suggested Implementation**:

```tsx
import { useCallback, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Stack,
  TextField,
} from '@mui/material';
import type { GasEvent } from '../../../../../type/AppType';
import type { DialogProps } from '../../../../../type/PropsType';
import { formatDateForInput } from '../../../../../utils/validationUtilities';
import DialogHeader from '../../../shared/Dialog/DialogHeader';

interface EditFormDialogProps extends DialogProps {
  initialData?: GasEvent;
  onSubmit: (data: GasEvent) => Promise<boolean>;
}

export default function EditFormDialog({
  isOpen,
  onClose,
  initialData,
  onSubmit,
}: EditFormDialogProps) {
  const [formData, setFormData] = useState<GasEvent>(
    initialData ?? {
      ownerId: '',
      startDate: new Date(),
      endDate: null,
      totalDays: 0,
      type: 'current',
      price: 0,
    }
  );
  const [submitInProgress, setSubmitInProgress] = useState(false);

  const totalDays = useMemo(() => {
    if (!formData.endDate) return 0;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    return Math.floor(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
  }, [formData.startDate, formData.endDate]);

  const handleChange = useCallback(
    <K extends keyof GasEvent>(key: K, value: GasEvent[K]) => {
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitInProgress(true);
      const result = await onSubmit({
        ...formData,
        totalDays,
      });
      setSubmitInProgress(false);
      if (result) {
        onClose();
      }
    },
    [formData, totalDays, onSubmit, onClose]
  );

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <DialogHeader>
        <span>Gas Status</span>
      </DialogHeader>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
        >
          <TextField
            label="Start date"
            type="date"
            value={formatDateForInput(formData.startDate)}
            onChange={(e) =>
              handleChange('startDate', new Date(e.target.value))
            }
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="End date"
            type="date"
            value={formData.endDate ? formatDateForInput(formData.endDate) : ''}
            onChange={(e) =>
              handleChange(
                'endDate',
                e.target.value ? new Date(e.target.value) : null
              )
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            type="number"
            value={formData.price}
            onChange={(e) => handleChange('price', parseFloat(e.target.value))}
            fullWidth
            margin="normal"
            slotProps={{
              htmlInput: {
                min: 0,
                step: 0.01,
              },
            }}
            required
          />
          <TextField
            label="Total days"
            type="number"
            value={totalDays}
            fullWidth
            margin="normal"
            disabled
          />
          <Stack
            spacing={2}
            direction="row"
            sx={{ mt: 3 }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setFormData({
                  ownerId: '',
                  startDate: new Date(),
                  endDate: null,
                  totalDays: 0,
                  type: 'current',
                  price: 0,
                });
              }}
              fullWidth
            >
              Reset
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={submitInProgress}
              fullWidth
            >
              {submitInProgress ? 'Submitting...' : 'Submit'}
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
```

---

## 🟠 High Severity Issues

### 1. **Inline Arrow Functions Break Performance Optimizations**

**Locations**:

- [src/ui/features/gas/Gas.tsx#L21](src/ui/features/gas/Gas.tsx#L21)
- [src/ui/features/gas/components/Calendar/Calendar.tsx#L128](src/ui/features/gas/components/Calendar/Calendar.tsx#L128)
- [src/ui/features/withdraw/components/Table/WithdrawalTableRow.tsx#L40-L43](src/ui/features/withdraw/components/Table/WithdrawalTableRow.tsx#L40-L43)

**Problem**:

Gas.tsx:

```tsx
// ❌ Bad - creates new function on every render
<Calendar
  onDayCellClick={(date: string) => {
    console.log(date);
    setIsEditDialogOpen(true);
  }}
/>
```

WithdrawalTableRow.tsx:

```tsx
// ❌ Bad - inline functions prevent React.memo optimization
<IconButton onClick={() => onRowEditClick(withdrawal)}>
  <Edit />
</IconButton>
<IconButton onClick={() => onRowDeleteClick(withdrawal)}>
  <DeleteForever />
</IconButton>
```

**Impact**:

- If these components are memoized (React.memo), the props change every render, defeating the optimization
- Calendar re-renders on every parent render unnecessarily
- Performance degradation in lists with multiple items

**Solution**:

```tsx
// ✅ Good - use useCallback
import { useCallback } from 'react';

export default function Gas() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const handleDayCellClick = useCallback((date: string) => {
    // Remove console.log in production
    setIsEditDialogOpen(true);
  }, []);

  return <Calendar onDayCellClick={handleDayCellClick} />;
}

// WithdrawalTableRow.tsx
export default function WithdrawalTableRow({
  withdrawal,
  onRowEditClick,
  onRowDeleteClick,
}: WithdrawTableRowProps) {
  const handleEdit = useCallback(
    () => onRowEditClick(withdrawal),
    [withdrawal, onRowEditClick]
  );

  const handleDelete = useCallback(
    () => onRowDeleteClick(withdrawal),
    [withdrawal, onRowDeleteClick]
  );

  return (
    <TableRow
      hover
      key={withdrawal.id}
    >
      {/* ... cells ... */}
      <TableCell align="right">
        <IconButton onClick={handleEdit}>
          <Edit />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <DeleteForever />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
```

### 2. **Console.log Left in Production**

**Location**: [src/ui/features/gas/Gas.tsx#L20](src/ui/features/gas/Gas.tsx#L20)

```tsx
onDayCellClick={(date: string) => {
  console.log(date);  // ❌ Remove
  setIsEditDialogOpen(true);
}}
```

**Impact**:

- Clutters browser console
- Potential information leakage
- Unprofessional appearance

**Solution**: Remove or move to debug environment check:

```tsx
const handleDayCellClick = useCallback((date: string) => {
  if (import.meta.env.DEV) {
    console.log(date);
  }
  setIsEditDialogOpen(true);
}, []);
```

### 3. **Prop Drilling Through Multiple Levels**

**Location**: Withdrawal feature hierarchy

```
WithdrawalHistory
  ↓
WithdrawalTable
  ↓
WithdrawalTableBody
  ↓
WithdrawalTableRow
```

Passing `onRowEditClick`, `onRowDeleteClick` through 3 component layers.

**Example Code Chain**:

WithdrawalHistory → WithdrawalTable:

```tsx
<WithdrawalTable
  withdrawals={state.data}
  onRowEditClick={handleRowEditClick}
  onRowDeleteClick={handleRowDeleteClick}
/>
```

WithdrawalTable → WithdrawalTableBody:

```tsx
<WithdrawalTableBody
  withdrawals={withdrawals}
  onRowEditClick={onRowEditClick}
  onRowDeleteClick={onRowDeleteClick}
/>
```

WithdrawalTableBody → WithdrawalTableRow:

```tsx
{
  withdrawals.map((withdrawal) => (
    <WithdrawalTableRow
      key={withdrawal.id}
      withdrawal={withdrawal}
      onRowEditClick={onRowEditClick}
      onRowDeleteClick={onRowDeleteClick}
    />
  ));
}
```

**Impact**:

- Harder to refactor (changing one requires updating multiple files)
- Reduced component reusability (WithdrawalTable hard to use in other contexts)
- Unclear data flow

**Solution**: Create a withdrawal actions context or use composition pattern:

```tsx
// Option 1: Withdrawal Actions Context (Recommended)
import { createContext, useCallback, useContext } from 'react';

interface WithdrawalActionsContextValue {
  onEdit: (withdrawal: Withdrawal) => void;
  onDelete: (withdrawal: Withdrawal) => void;
}

const WithdrawalActionsContext =
  createContext<WithdrawalActionsContextValue | null>(null);

export const WithdrawalActionsProvider = ({
  children,
  onEdit,
  onDelete,
}: {
  children: React.ReactNode;
  onEdit: (withdrawal: Withdrawal) => void;
  onDelete: (withdrawal: Withdrawal) => void;
}) => (
  <WithdrawalActionsContext.Provider value={{ onEdit, onDelete }}>
    {children}
  </WithdrawalActionsContext.Provider>
);

export const useWithdrawalActions = () => {
  const context = useContext(WithdrawalActionsContext);
  if (!context) {
    throw new Error(
      'useWithdrawalActions must be used within WithdrawalActionsProvider'
    );
  }
  return context;
};

// Usage in WithdrawalHistory
<WithdrawalActionsProvider
  onEdit={handleRowEditClick}
  onDelete={handleRowDeleteClick}
>
  <WithdrawalTable withdrawals={state.data} />
</WithdrawalActionsProvider>;

// Usage in WithdrawalTableRow
export default function WithdrawalTableRow({
  withdrawal,
}: {
  withdrawal: Withdrawal;
}) {
  const { onEdit, onDelete } = useWithdrawalActions();

  const handleEdit = useCallback(
    () => onEdit(withdrawal),
    [withdrawal, onEdit]
  );
  const handleDelete = useCallback(
    () => onDelete(withdrawal),
    [withdrawal, onDelete]
  );

  return (
    <TableRow hover>
      {/* ... cells ... */}
      <IconButton onClick={handleEdit}>
        <Edit />
      </IconButton>
      <IconButton onClick={handleDelete}>
        <DeleteForever />
      </IconButton>
    </TableRow>
  );
}
```

---

## 🟡 Medium Severity Issues

### 1. **Duplicate Utility Functions**

**Problem**: Three identical utility functions defined in multiple locations.

**Function: `formatDateForInput()`**

Defined in:

1. [src/ui/features/gas/components/Dialog/EditFormDialog.tsx#L8](src/ui/features/gas/components/Dialog/EditFormDialog.tsx#L8)
2. [src/ui/features/withdraw/components/Dialog/WithdrawalFormDialog.tsx#L13](src/ui/features/withdraw/components/Dialog/WithdrawalFormDialog.tsx#L13)
3. [src/utils/validationUtilities.ts#L43](src/utils/validationUtilities.ts#L43) ✅ **Canonical source**

**Function: `isFutureDate()`**

Defined in:

1. [src/ui/features/gas/components/Dialog/EditFormDialog.tsx#L12](src/ui/features/gas/components/Dialog/EditFormDialog.tsx#L12)
2. [src/ui/features/withdraw/components/Dialog/WithdrawalFormDialog.tsx#L17](src/ui/features/withdraw/components/Dialog/WithdrawalFormDialog.tsx#L17)
3. [src/utils/validationUtilities.ts#L46](src/utils/validationUtilities.ts#L46) ✅ **Canonical source**

**Impact**:

- Maintenance nightmare: bug fixes needed in 3 places
- Code duplication increases bundle size
- Inconsistency risks (different implementations)

**Solution**: Remove duplicates from dialog files and import from utilities:

```tsx
// EditFormDialog.tsx - REMOVE these:
// ❌ function formatDateForInput(date: Date): string { ... }
// ❌ function isFutureDate(date: Date): boolean { ... }

// ✅ Instead, add imports:
import {
  formatDateForInput,
  isFutureDate,
} from '../../../../../utils/validationUtilities';
```

**Note**: The functions are **already** in `validationUtilities.ts` but also duplicated with consistent implementations, so this is a clean refactoring.

### 2. **Form State Not Cleaned on Error (UX + Security)**

**Location**: [src/ui/features/withdraw/components/Dialog/WithdrawalFormDialog.tsx#L85-L92](src/ui/features/withdraw/components/Dialog/WithdrawalFormDialog.tsx#L85-L92)

**Problem**:

```tsx
const handleSubmit = useCallback(
  async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (hasErrors) return;

    setSubmitInProgress(true);
    const result = await onSubmit(formData);
    setSubmitInProgress(false);

    if (result) {
      resetForm(); // ❌ Only resets on SUCCESS
    }
    // ❌ Form not cleared on error - user sees failed data again
  },
  [formData, hasErrors, onSubmit]
);
```

**Security/UX Issues**:

1. Form retains sensitive data on error (e.g., amount field after failed submission)
2. User confusion: "Did my submission go through?"
3. Password field in Login not cleared after failed attempts (see [src/ui/features/login/Login.tsx](src/ui/features/login/Login.tsx))

**Solution**:

```tsx
const handleSubmit = useCallback(
  async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (hasErrors) return;

    setSubmitInProgress(true);
    try {
      const result = await onSubmit(formData);
      if (result) {
        resetForm(); // Clear on success
        // onClose handled by parent
      } else {
        // ✅ Optionally clear sensitive fields on failure
        // setFormData(prev => ({ ...prev, comments: '' }));
      }
    } finally {
      setSubmitInProgress(false);
    }
  },
  [formData, hasErrors, onSubmit, resetForm]
);

// In Login.tsx
const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
  event.preventDefault();
  const userAuth: LoginCredentials = { email, password };
  const result = await login(userAuth);
  if (!result.success) {
    setPassword(''); // ✅ Clear password on failed login
  }
};
```

### 3. **Repeated `useMediaQuery` Pattern**

**Locations**: Multiple files (6+)

- [src/ui/features/gas/Gas.tsx#L14](src/ui/features/gas/Gas.tsx#L14)
- [src/ui/features/dashboard/Dashboard.tsx](src/ui/features/dashboard/Dashboard.tsx)
- [src/ui/features/withdraw/](src/ui/features/withdraw/)
- [src/ui/features/shared/AppBar/](src/ui/features/shared/AppBar/)
- CustomAppBar, etc.

**Pattern**:

```tsx
const theme = useTheme();
const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
```

**Impact**:

- DRY violation: same logic in 6+ files
- Hard to change breakpoint consistently
- Boilerplate code

**Solution**: Create custom hook:

```tsx
// src/hooks/useIsDesktop.ts
import { useTheme, useMediaQuery } from '@mui/material';

/**
 * Custom hook to determine if viewport is desktop-sized (md breakpoint and up)
 * @returns {boolean} True if viewport is >= md breakpoint
 */
export const useIsDesktop = (): boolean => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up('md'));
};

// Usage everywhere
import { useIsDesktop } from '../hooks/useIsDesktop';

export default function Gas() {
  const isDesktop = useIsDesktop();
  // ... rest of component
}
```

### 4. **Weak Type Safety in Dialog Components**

**Location**: [src/type/PropsType.ts](src/type/PropsType.ts) and dialog implementations

**Problem**: Dialog callbacks use generic types:

```tsx
export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  // ❌ These should be specific to each dialog
  onConfirm?: () => void;
  onCancel?: () => void;
}
```

Different dialogs need different callback signatures:

- `EditFormDialog` needs `onSubmit: (data: GasEvent) => Promise<boolean>`
- `ConfirmationDialog` needs `onConfirm: () => void`
- `WithdrawalFormDialog` needs `onSubmit: (data: Withdrawal) => Promise<boolean>`

**Solution**: Use discriminated unions or separate interfaces:

```tsx
// ✅ Option 1: Separate interfaces for each dialog
export interface EditFormDialogProps extends DialogProps {
  initialData?: GasEvent;
  onSubmit: (data: GasEvent) => Promise<boolean>;
}

export interface WithdrawalFormDialogProps extends DialogProps {
  initialData?: Withdrawal;
  reasonsList: string[];
  onSubmit: (data: Withdrawal) => Promise<boolean>;
}

// ✅ Option 2: Discriminated union (for polymorphic dialog system)
export type DialogPropsMap = {
  editForm: {
    type: 'editForm';
    isOpen: boolean;
    onClose: () => void;
    initialData?: GasEvent;
    onSubmit: (data: GasEvent) => Promise<boolean>;
  };
  withdrawal: {
    type: 'withdrawal';
    isOpen: boolean;
    onClose: () => void;
    initialData?: Withdrawal;
    reasonsList: string[];
    onSubmit: (data: Withdrawal) => Promise<boolean>;
  };
  confirmation: {
    type: 'confirmation';
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    onConfirm: () => void;
  };
};

export type DialogProps<T extends keyof DialogPropsMap> = DialogPropsMap[T];
```

### 5. **Missing Strong Form Validation**

**Locations**: [src/ui/features/login/Login.tsx](src/ui/features/login/Login.tsx), form dialogs

**Issues**:

1. **Email validation is hardcoded inline** (should be in utilities):

```tsx
// ❌ In component
const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
```

**Should be**:

```tsx
// ✅ In validationUtilities.ts
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// In Login
import { EMAIL_REGEX } from '../../../utils/validationUtilities';
```

2. **No password strength validation**:

```tsx
// ❌ Only checks if password exists
const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const password: string = e.target.value;
  setPassword(password);
};
```

**Should validate**:

- Minimum length (8+ characters)
- Mix of uppercase, lowercase, numbers (optional but recommended)
- Special characters (optional but recommended)

```tsx
export const validatePassword = (
  password: string
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain lowercase letter');
  }
  if (!/\d/.test(password)) {
    errors.push('Password must contain number');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
```

3. **No form-level validation preventing empty submissions**:

```tsx
// ✅ Better approach
const handleSubmit = useCallback(
  async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check for client-side errors before submission
    if (hasErrors) {
      show('Please fix validation errors', 'error');
      return;
    }

    // Disable submit button during submission
    setSubmitInProgress(true);
    try {
      const result = await onSubmit(formData);
      if (result) {
        resetForm();
      }
    } finally {
      setSubmitInProgress(false);
    }
  },
  [formData, hasErrors, onSubmit, resetForm, show]
);
```

---

## 🟢 Lower Priority Issues

### 1. **Code Duplication: INITIAL_FORM Definitions**

**Locations**:

- [src/ui/features/withdraw/components/Dialog/WithdrawalFormDialog.tsx#L13](src/ui/features/withdraw/components/Dialog/WithdrawalFormDialog.tsx#L13)
- [src/utils/Const.tsx](src/utils/Const.tsx)

Both define withdrawal initial state. Could consolidate to single source of truth.

**Solution**: Ensure only one definition in `Const.tsx` or create dedicated `initialFormData.ts`.

### 2. **Magic Breakpoint Hardcoding**

The breakpoint `'md'` is hardcoded in multiple files. While the custom hook solves this, also consider:

```tsx
// src/ui/Theming/Breakpoints.ts
export const LAYOUT_BREAKPOINT = 'md';

// Usage
import { LAYOUT_BREAKPOINT } from '../Theming/Breakpoints';
const isDesktop = useMediaQuery(theme.breakpoints.up(LAYOUT_BREAKPOINT));
```

### 3. **Dialog Key Strategy Could Be More Robust**

Currently dialogs are controlled by boolean flags. For complex multi-dialog scenarios, consider:

```tsx
// More robust approach
type DialogState =
  | { type: 'closed' }
  | { type: 'editForm'; data: GasEvent }
  | { type: 'withdrawal'; data?: Withdrawal };

const [dialog, setDialog] = useState<DialogState>({ type: 'closed' });

return (
  <>
    {dialog.type === 'editForm' && (
      <EditFormDialog
        key={`editForm-${dialog.data.id}`}
        initialData={dialog.data}
        isOpen={true}
        onClose={() => setDialog({ type: 'closed' })}
      />
    )}
  </>
);
```

### 4. **Accessibility (a11y) Gaps**

- Missing `aria-label` on icon buttons
- No proper heading hierarchy in some components
- Dialog headers could use semantic HTML

**Quick fixes**:

```tsx
<IconButton
  onClick={handleEdit}
  aria-label="Edit withdrawal"
>
  <Edit />
</IconButton>

<Dialog
  aria-labelledby="dialog-title"
>
  <DialogHeader id="dialog-title">
    Edit Withdrawal
  </DialogHeader>
</Dialog>
```

### 5. **Testing Blockers**

- EditFormDialog's empty handlers make unit testing impossible
- No mention of test files in the project
- Factory pattern is excellent for mocking, but mocks could be more comprehensive

---

## Architecture Evaluation

### Score: 9/10 ⭐

**Strengths**:

1. **Excellent Layering**

   ```
   Components → Hooks → Contexts → Repositories → Services → Firebase
   ```

   Each layer has clear responsibility. Components don't know about Firebase.

2. **Dependency Injection via Factories** ✅

   - [RepositoriesFactory.ts](src/repositories/RepositoriesFactory.ts)
   - [AuthProviderFactory.ts](src/services/Auth/AuthProviderFactory.ts)

   Enables:

   - Easy testing (swap real implementations for mocks)
   - Environment-specific logic (Firebase vs. Mock)
   - Clear coupling points

3. **Context + Reducer Pattern**
   Properly implemented across 7 contexts with clear action types:

   ```tsx
   useReducer(authReducer, initialState)
   dispatch({ type: 'AUTH_INITIALIZED', payload: {...} })
   ```

4. **Custom Hooks for Business Logic** ✅
   - `useWithdrawalSubmit` - encapsulates submission logic
   - `useWithdrawalHistory` - data fetching
   - `useSavingData` - state management
   - Proper extraction of side effects

**Areas for Improvement**:

1. **Prop Drilling** (covered in high-severity section)
   Consider withdrawal actions context or compound component pattern

2. **Context Granularity**
   Currently works well, but monitor for:

   - Contexts becoming too large
   - Need for context-specific selectors (to prevent unnecessary re-renders)

3. **Error Boundaries**
   No mention of error boundaries. Add them:
   ```tsx
   <ErrorBoundary>
     <GasEventsProvider>
       <Calendar />
     </GasEventsProvider>
   </ErrorBoundary>
   ```

---

## Best Practices Analysis

### React: Score 8/10

**✅ What's Done Well**:

- Proper use of hooks (useState, useCallback, useMemo, useReducer)
- Correct cleanup in useEffect (UserProvider.tsx line 88: `return () => unsubscribe()`)
- Memoization used appropriately (useMemo for derived values, useCallback for stable functions)

**⚠️ Issues**:

- Inline arrow functions (HIGH SEVERITY - covered above)
- Some missing useCallback/useMemo (calendar handler, dialog buttons)

### TypeScript: Score 10/10 ⭐

**Excellent Type Safety**:

- ✅ **No `any` types detected** in entire codebase
- ✅ Proper generic usage in repositories: `FirestoreDataProvider<T>`
- ✅ Strong typing of events: `React.ChangeEvent<HTMLInputElement>`
- ✅ Discriminated unions in types (DialogHookState)
- ✅ Proper interface hierarchy (extends)

**Type Organization**:

- Clean separation: AppType, PropsType, StateContextType, UIType
- Type composition without duplication

### Material UI: Score 8/10

**✅ Strengths**:

- Centralized theming ([src/ui/Theming/](src/ui/Theming/))
  - Colors.ts, Typography.ts, Dimensions.ts, AppTheme.tsx
- Responsive patterns with useMediaQuery
- Proper use of Stack, Grid for layouts
- Styled components for complex styling
- Icons properly imported from @mui/icons-material

**⚠️ Issues**:

1. **Inline sx overuse in some places**

   ```tsx
   // ⚠️ Can be extracted to theme
   sx={{
     width: '100%',
     maxWidth: 400,
     p: 4,
     borderRadius: 3,
   }}
   ```

2. **No apparent dark mode implementation**

   - Consider adding dark theme support
   - Material UI supports this well

3. **Could use more reusable themed components**

   ```tsx
   // ✅ Better approach
   export const PaperCard = styled(Paper)(({ theme }) => ({
     width: '100%',
     maxWidth: 400,
     padding: theme.spacing(4),
     borderRadius: theme.spacing(3),
   }));

   // Usage
   <PaperCard elevation={6}>...</PaperCard>;
   ```

---

## Component Reusability

### Score: 8/10

**✅ Well-Designed Reusable Components**:

1. **Shared Dialog Components**

   - DialogHeader (used across multiple dialogs)
   - ConfirmationDialog (generic confirmation)
   - Proper abstraction

2. **Shared UI Elements** in `/src/ui/features/shared/`:

   - Logo, AppBar, BottomNavigation, ChartCard
   - Container, Dialog, Drawer components
   - These follow composition patterns

3. **Contexts as Reusable Providers**
   ```tsx
   <WithdrawalActionsProvider>
     <GasEventsProvider>
       <SnackbarProvider>{children}</SnackbarProvider>
     </GasEventsProvider>
   </WithdrawalActionsProvider>
   ```

**Issues**:

1. **Some Components Violate Single Responsibility**

   - WithdrawalHistory might be doing too much:
     - Data fetching
     - Filtering
     - Pagination
     - Dialog management
     - Deletion/editing logic

   **Solution**: Break into smaller components:

   ```tsx
   <WithdrawalHistory>
     <WithdrawalFilter />
     <WithdrawalTable />
     <WithdrawalPagination />
   </WithdrawalHistory>
   ```

2. **Shared Components Have Hardcoded Business Logic**
   Example: If ChartCard has hardcoded colors for specific data types

   **Should be**: Accept colors/configuration as props

3. **Table Components Could Be More Generic**
   ```tsx
   // ✅ Generic reusable table
   <DataTable<Withdrawal>
     columns={withdrawalColumns}
     data={withdrawals}
     onRowClick={handleRowClick}
     pagination={paginationState}
   />
   ```

---

## Business Logic Abstraction

### Score: 7/10

**✅ Well-Abstracted Logic**:

1. **Custom Hooks Extract Business Logic**

   - `useWithdrawalSubmit`: Handles enrichment, validation, API calls
   - `useWithdrawalHistory`: Data fetching with error handling
   - `useSavingData`: Manages saving calculations

2. **Service Layer Properly Abstracts Firebase**

   - [FirestoreDataProvider.ts](src/services/Data/FirestoreDataProvider.ts)
   - Components never directly import Firebase
   - Clean CRUD interface

3. **Repository Pattern**
   - BaseRepository interface defines contract
   - Implementations (FirestoreDataProvider, Mock) are interchangeable
   - Easy to test by swapping implementations

**⚠️ Issues**:

1. **Some Business Logic Still in Components**

   **Gas.tsx - Calendar Logic**:

   ```tsx
   // ❌ Business logic in component
   onDayCellClick={(date: string) => {
     console.log(date);
     setIsEditDialogOpen(true);
   }}
   ```

   **Should be**: Extract to hook

   ```tsx
   // ✅ Business logic in hook
   const useGasDateSelection = () => {
     const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
     const [selectedDate, setSelectedDate] = useState<string | null>(null);

     const handleDateClick = useCallback((date: string) => {
       setSelectedDate(date);
       setIsEditDialogOpen(true);
     }, []);

     return {
       isEditDialogOpen,
       selectedDate,
       handleDateClick,
       setIsEditDialogOpen,
     };
   };

   // Usage
   const { isEditDialogOpen, handleDateClick, setIsEditDialogOpen } =
     useGasDateSelection();
   <Calendar onDayCellClick={handleDateClick} />;
   ```

2. **API Call Error Handling Could Be More Robust**

   Current pattern:

   ```tsx
   try {
     const result = await onSubmit(formData);
     if (result) {
       resetForm();
     }
   } catch (error) {
     show(getErrorMessage(error), 'error');
     return false;
   }
   ```

   **Better**: Distinguish between error types:

   ```tsx
   try {
     const result = await onSubmit(formData);
     if (result) {
       show('Withdrawal saved successfully', 'success');
       resetForm();
     }
   } catch (error) {
     if (error instanceof NetworkError) {
       show('Network error. Please check your connection.', 'error');
     } else if (error instanceof ValidationError) {
       show(error.message, 'error');
     } else {
       show('An unexpected error occurred', 'error');
     }
     return false;
   }
   ```

3. **Repeated Logic Across Hooks**

   `useWithdrawalSubmit` and `useGasEventSubmit` likely have similar patterns:

   - Enrich data with user ID
   - Call repository method
   - Handle success/error
   - Reload data
   - Close dialog

   **Solution**: Create generic `useDataSubmit` hook:

   ```tsx
   export function useDataSubmit<T extends { ownerId?: string }>(
     repository: BaseRepository<T, string>,
     onSuccess: () => void
   ) {
     const { state } = useUserContext();
     const { show } = useSnackbarContext();

     return useCallback(
       async (data: T): Promise<boolean> => {
         try {
           const enriched = {
             ...data,
             ownerId: state.user?.id,
           } as T;

           if (data.id) {
             await repository.updateOne(enriched);
           } else {
             await repository.createOne(enriched);
           }

           show('Saved successfully', 'success');
           onSuccess();
           return true;
         } catch (error) {
           show(getErrorMessage(error), 'error');
           return false;
         }
       },
       [state.user, repository, onSuccess, show]
     );
   }
   ```

4. **Missing Loading/Error States in Some Dialogs**

   EditFormDialog doesn't show loading during submission:

   ```tsx
   // ✅ Should show loading state
   <Button
     variant="contained"
     type="submit"
     disabled={submitInProgress}
   >
     {submitInProgress ? 'Saving...' : 'Save'}
   </Button>
   ```

---

## 🟢 Positive Observations

### 1. **Excellent Type Safety**

Your project has **zero `any` types** and uses proper generics throughout. This is rare and commendable. TypeScript setup is configured correctly for strict checking.

### 2. **Strong Architectural Discipline**

Clear separation of concerns:

- Services layer abstracts Firebase
- Repositories provide CRUD interface
- Hooks encapsulate business logic
- Components focus on rendering
- Utils handle pure functions

### 3. **Factory Pattern Implementation**

Great use of dependency injection:

```tsx
AuthProviderFactory.createAuthService();
RepositoriesFactory.createWithdrawRepository();
```

This enables easy testing and environment-specific logic without if/else scattered through code.

### 4. **Proper React Cleanup**

UserProvider correctly unsubscribes from Firebase listeners:

```tsx
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, ...);
  return () => unsubscribe();  // ✅ Prevents memory leaks
}, []);
```

### 5. **Consistent Error Handling Pattern**

Good use of:

- Custom `AuthError` class
- `getErrorMessage` utility
- Snackbar context for user feedback
- Try-catch in async operations

### 6. **Material UI Implementation**

Centralized theming in separate files (Colors, Typography, Dimensions) makes the design system maintainable and scales well.

### 7. **Context API Used Appropriately**

Contexts are not overused or misused:

- Global state (Auth, UI states like drawer/dialog/snackbar)
- Not used for props that could be lifted
- Proper separation of concerns (each context has one responsibility)

### 8. **Comprehensive Type Files**

Well-organized type definitions:

- AppType.ts - Domain types
- PropsType.ts - Component props
- StateContextType.ts - Context state shapes
- UIType.ts - UI-specific types

### 9. **Custom Hooks Extract Logic Well**

Business logic properly encapsulated:

- `useWithdrawalSubmit` - Form submission
- `useWithdrawalHistory` - Data fetching
- `useSavingData` - Calculations
- `useWithdrawalPagination` - Pagination logic

### 10. **Firebase Abstraction**

No direct Firebase calls in components. Everything goes through:

1. FirestoreDataProvider
2. Repositories
3. Hooks

This is the right pattern.

---

## Detailed Recommendations

### 🎯 High-Impact Quick Wins (Do First)

#### 1. **Fix or Remove EditFormDialog** (1-2 hours)

- Either implement using the suggested code above
- Or remove and add "Coming Soon" placeholder
- Blocks testing and gas feature functionality

#### 2. **Remove Duplicate Utility Functions** (30 min)

```bash
# In EditFormDialog.tsx
- Remove formatDateForInput() and isFutureDate()
- Add: import { formatDateForInput, isFutureDate } from validationUtilities

# In WithdrawalFormDialog.tsx
- Same as above

# Verify both still work
npm run test:unit
```

#### 3. **Replace Inline Arrow Functions with useCallback** (1 hour)

Priority locations:

1. [src/ui/features/gas/Gas.tsx#L21](src/ui/features/gas/Gas.tsx#L21) - `onDayCellClick`
2. [src/ui/features/withdraw/components/Table/WithdrawalTableRow.tsx#L40-L43](src/ui/features/withdraw/components/Table/WithdrawalTableRow.tsx#L40-L43) - Edit/Delete buttons

#### 4. **Remove console.log** (5 min)

```tsx
// Gas.tsx line 20
-console.log(date);
```

#### 5. **Create useIsDesktop Hook** (30 min)

```tsx
// src/hooks/useIsDesktop.ts
export const useIsDesktop = (): boolean => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up('md'));
};

// Then replace 6+ instances of:
// const theme = useTheme();
// const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
```

### 📋 Medium-Effort Improvements (Next Sprint)

1. **Create Withdrawal Actions Context** (2 hours)

   - Reduces prop drilling
   - Improves component reusability
   - See example in High Severity section

2. **Refactor Form Dialogs** (2-3 hours)

   - Consolidate form logic (reset, validation)
   - Consistent error handling
   - Loading states
   - Form cleanup on error

3. **Add Password Validation** (1 hour)

   - Create password validation utility
   - Update Login component
   - Add error messages

4. **Extract Business Logic Hooks** (2-3 hours)

   - `useGasDateSelection`
   - `useGenericDataSubmit` (reusable for multiple features)
   - `useFormState` (handle form state consistently)

5. **Add Error Boundaries** (1 hour)

   ```tsx
   // src/ui/ErrorBoundary.tsx
   import React from 'react';
   import { Container, Typography, Button } from '@mui/material';

   interface Props {
     children: React.ReactNode;
   }

   interface State {
     hasError: boolean;
     error: Error | null;
   }

   export class ErrorBoundary extends React.Component<Props, State> {
     constructor(props: Props) {
       super(props);
       this.state = { hasError: false, error: null };
     }

     static getDerivedStateFromError(error: Error): State {
       return { hasError: true, error };
     }

     render() {
       if (this.state.hasError) {
         return (
           <Container>
             <Typography
               variant="h6"
               color="error"
             >
               Something went wrong
             </Typography>
             <Typography variant="body2">
               {this.state.error?.message}
             </Typography>
             <Button onClick={() => window.location.reload()}>
               Refresh Page
             </Button>
           </Container>
         );
       }

       return this.props.children;
     }
   }
   ```

### 🚀 Long-Term Improvements (Future)

1. **Add Unit Tests**

   - Create `.test.ts(x)` files alongside components
   - Use Vitest or Jest with React Testing Library
   - Mock repositories and services

2. **Implement Dark Mode**

   - Create dark theme variant
   - Add theme toggle
   - Persist user preference

3. **Refactor Shared Components to Storybook**

   - Document component props
   - Visual testing
   - Component library

4. **Add Form Library**

   - Consider `react-hook-form` for complex forms
   - Better state management
   - Built-in validation
   - Reduced boilerplate

5. **API Data Caching**

   - Consider React Query or SWR
   - Automatic cache invalidation
   - Optimistic updates
   - Better loading states

6. **Accessibility (a11y) Audit**
   - Add ARIA labels
   - Test with screen readers
   - Keyboard navigation
   - Color contrast

---

## Performance Checklist

- [ ] Memoize expensive components (React.memo where appropriate)
- [ ] Use useMemo for expensive calculations
- [ ] Use useCallback for stable function references
- [ ] Lazy load routes with React.lazy
- [ ] Optimize images (next/image or similar)
- [ ] Profile with React DevTools Profiler
- [ ] Bundle analysis: `npm run build -- --analyze`
- [ ] Check for memory leaks in useEffect

---

## Testing Strategy

```typescript
// Example test structure
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WithdrawalFormDialog } from './WithdrawalFormDialog';

describe('WithdrawalFormDialog', () => {
  it('submits form with valid data', async () => {
    const mockOnSubmit = vi.fn().mockResolvedValue(true);
    const mockOnClose = vi.fn();

    render(
      <WithdrawalFormDialog
        isOpen={true}
        onSubmit={mockOnSubmit}
        onClose={mockOnClose}
      />
    );

    await userEvent.type(screen.getByLabelText(/amount/i), '100');
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('shows validation error for invalid amount', async () => {
    render(
      <WithdrawalFormDialog
        isOpen={true}
        onSubmit={vi.fn()}
        onClose={vi.fn()}
      />
    );

    await userEvent.type(screen.getByLabelText(/amount/i), '-100');
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText(/amount must be greater/i)).toBeInTheDocument();
  });
});
```

---

## Scoring Breakdown

| Aspect                | Score | Comments                                                                             |
| --------------------- | ----- | ------------------------------------------------------------------------------------ |
| **Architecture**      | 9/10  | Excellent layering, proper separation of concerns. Prop drilling needs addressing.   |
| **Type Safety**       | 10/10 | Zero `any` types, excellent use of generics and discriminated unions.                |
| **Error Handling**    | 8/10  | Good patterns in place, some edge cases (form reset on error).                       |
| **React Patterns**    | 8/10  | Excellent hook usage, some inline functions breaking optimizations.                  |
| **Code Duplication**  | 6/10  | Duplicate utilities, form logic patterns. Easy to fix.                               |
| **Component Design**  | 8/10  | Good reusability, some prop drilling. Business logic appropriately extracted.        |
| **Material UI Usage** | 8/10  | Good theming and responsive design. Could use more custom components.                |
| **Performance**       | 6/10  | Inline functions, some unnecessary re-renders possible. No obvious bottlenecks.      |
| **Accessibility**     | 5/10  | Minimal ARIA labels, could be improved. Not critical but recommended.                |
| **Testing Ready**     | 6/10  | Factory pattern great for testing. EditFormDialog blocks tests. No test files found. |

**Overall Score: 7.5/10** ⭐

Your project has a strong foundation with excellent architectural choices and type safety. The issues identified are mostly surface-level fixes (duplicate functions, inline arrow functions, missing implementations) rather than fundamental design problems. Address the critical issues first, then tackle the medium-severity items in the next sprint.

---

## Summary of Changes Needed

### Immediate (This Sprint)

- [ ] Implement EditFormDialog or remove
- [ ] Replace inline arrow functions with useCallback
- [ ] Remove console.log statements
- [ ] Consolidate duplicate utilities (formatDateForInput, isFutureDate)
- [ ] Create useIsDesktop hook

### Short-Term (Next 1-2 Sprints)

- [ ] Fix form state cleanup on errors
- [ ] Reduce prop drilling with context
- [ ] Add password validation
- [ ] Extract shared hooks (useGasDateSelection, useGenericDataSubmit)
- [ ] Add loading states to dialogs

### Long-Term (Future)

- [ ] Add unit tests
- [ ] Implement dark mode
- [ ] Add form validation library
- [ ] Accessibility audit
- [ ] Performance profiling

---

**End of Code Review**

_This review was conducted by analyzing your codebase for React, TypeScript, and Material UI best practices. All recommendations are based on industry standards and your project's specific architecture._
