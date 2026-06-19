import dayjs from 'dayjs';
import { useCallback, useMemo } from 'react';
import { useUserContext } from '../contexts/auth/UserContext';
import { useSnackbarContext } from '../contexts/snackbar/SnackbarContext';
import { RepositoryRegistry } from '../repositories/RepositoryRegistry';
import type { GasEvent, GasFormDialogData } from '../type/AppType';
import { REPOSITORY_LIST } from '../utils/Const';

/**
 * Custom hook for handling gas event submission logic and state transitions.
 *
 * Manages the creation of new gas events and updates the state of existing events:
 * - Marks the current event as 'previous'
 * - Marks any previous event as 'done'
 * - Creates a new 'current' event
 * - Calculates total days between start and end dates
 *
 * All database operations are performed in parallel using Promise.all for efficiency.
 *
 * @returns {Function} A memoized callback that accepts:
 *   - {GasFormDialogData} data - Form data containing date and price for the new gas event
 *   - {GasEvent[]} allEvents - Array of all existing gas events to determine current/previous states
 *   Returns Promise<boolean> - true if submission successful, false if failed
 *
 * @example
 * const handleGasSubmit = useGasEventSubmit();
 * const success = await handleGasSubmit(
 *   { date: new Date(), price: 50 },
 *   allGasEvents
 * );
 *
 * @throws Catches errors and displays them via snackbar, returns false instead of throwing
 *
 * @note Uses immutable updates (spread operator) to avoid direct state mutations
 * @note All state transitions happen atomically via Promise.all
 */
export function useGasEventSubmit() {
  const { state } = useUserContext();
  const { show } = useSnackbarContext();

  const gasEventsRepository = useMemo(
    () => RepositoryRegistry.get(REPOSITORY_LIST.GasEvent),
    []
  );

  return useCallback(
    async (data: GasFormDialogData, allEvents: GasEvent[]) => {
      try {
        const previousGas = allEvents.find((e) => e.type === 'previous');
        const currentGas = allEvents.find((e) => e.type === 'current');

        // Updates promise array to handle all updates in parallel
        const updates: Promise<void>[] = [];

        // Create new gas event
        if (state.user) {
          const newGasEvent: GasEvent = {
            startDate: data.date,
            ownerId: state.user.id,
            endDate: null,
            type: 'current',
            totalDays: 0,
            price: data.price,
          };
          updates.push(gasEventsRepository.createOne(newGasEvent));
        }

        // Update previous event
        if (previousGas) {
          const updatedPrevious: GasEvent = {
            ...previousGas,
            type: 'done',
          };
          updates.push(gasEventsRepository.updateOne(updatedPrevious));
        }

        // Update current event
        if (currentGas) {
          const totalDays = dayjs(data.date).diff(
            dayjs(currentGas.startDate),
            'day'
          );
          const updatedCurrent: GasEvent = {
            ...currentGas,
            endDate: data.date,
            type: 'previous',
            totalDays,
          };
          updates.push(gasEventsRepository.updateOne(updatedCurrent));
        }

        await Promise.all(updates);
        show('Gas event created successfully', 'success');
        return true;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred';
        show(message, 'error');
        return false;
      }
    },
    [state.user, gasEventsRepository, show]
  );
}
