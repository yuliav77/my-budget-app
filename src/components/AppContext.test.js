import { AppReducer } from './context/AppContext';

describe('AppReducer', () => {
    const initialState = {
        budget: 2000,
        expenses: [
            { id: "Food", name: 'Food', cost: 300 },
            { id: "Accommodation", name: 'Accommodation', cost: 50 }
        ],
        currency: '£'
    };

    test('should handle ADD_EXPENSE action when within budget', () => {
        const action = {
            type: 'ADD_EXPENSE',
            payload: { name: 'Food', cost: 100 }
        };

        const newState = AppReducer(initialState, action);

        expect(newState.expenses[0].cost).toBe(400); // 300 + 100
    });

    test('should not add expense if it exceeds budget', () => {
        const state = {
            ...initialState,
            expenses: [{ id: "Food", name: 'Food', cost: 1900 }]
        };

        const action = {
            type: 'ADD_EXPENSE',
            payload: { name: 'Food', cost: 200 }
        };

        window.alert = jest.fn();
        const newState = AppReducer(state, action);

        expect(newState.expenses[0].cost).toBe(1900); // Should remain unchanged
        expect(window.alert).toHaveBeenCalledWith("Cannot increase the allocation! Out of funds");
    });

    test('should handle RED_EXPENSE action', () => {
        const action = {
            type: 'RED_EXPENSE',
            payload: { name: 'Food', cost: 100 }
        };

        const newState = AppReducer(initialState, action);

        expect(newState.expenses[0].cost).toBe(200); // 300 - 100
    });

    test('should handle DELETE_EXPENSE action', () => {
        const action = {
            type: 'DELETE_EXPENSE',
            payload: 'Food'
        };

        const newState = AppReducer(initialState, action);

        expect(newState.expenses[0].cost).toBe(0);
        expect(newState.budget).toBe(2300); // 2000 + 300 (freed from Food)
    });

    test('should handle SET_BUDGET action', () => {
        const action = {
            type: 'SET_BUDGET',
            payload: 3000
        };

        const newState = AppReducer(initialState, action);

        expect(newState.budget).toBe(3000);
    });

    test('should handle CHG_CURRENCY action', () => {
        const action = {
            type: 'CHG_CURRENCY',
            payload: '$'
        };

        const newState = AppReducer(initialState, action);

        expect(newState.currency).toBe('$');
    });

    test('should handle ADD_ALLOCATION action', () => {
        const action = {
            type: 'ADD_ALLOCATION',
            name: 'Entertainment',
            cost: 100
        };

        const newState = AppReducer(initialState, action);

        expect(newState.expenses).toHaveLength(3);
        expect(newState.expenses[2].name).toBe('Entertainment');
        expect(newState.expenses[2].cost).toBe(100);
    });

    test('should return state for unknown action', () => {
        const action = {
            type: 'UNKNOWN_ACTION'
        };

        const newState = AppReducer(initialState, action);

        expect(newState).toEqual(initialState);
    });
});