import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExpenseItem from './ExpenseItem';
import { AppContext } from '../context/AppContext';

describe('ExpenseItem Component', () => {
    const mockDispatch = jest.fn();
    const contextValue = {
        dispatch: mockDispatch,
        currency: '£'
    };

    beforeEach(() => {
        mockDispatch.mockClear();
    });

    test('renders expense item with name and cost', () => {
        render(
            <AppContext.Provider value={contextValue}>
                <table>
                    <tbody>
                        <ExpenseItem id="Food" name="Food" cost={300} />
                    </tbody>
                </table>
            </AppContext.Provider>
        );

        expect(screen.getByText('Food')).toBeInTheDocument();
        expect(screen.getByText('£300')).toBeInTheDocument();
    });

    test('dispatches ADD_EXPENSE when increase button is clicked', () => {
        render(
            <AppContext.Provider value={contextValue}>
                <table>
                    <tbody>
                        <ExpenseItem id="Food" name="Food" cost={300} />
                    </tbody>
                </table>
            </AppContext.Provider>
        );

        const buttons = screen.getAllByRole('button');
        fireEvent.click(buttons[0]); // Click increase button

        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'ADD_EXPENSE',
            payload: { name: 'Food', cost: 10 }
        });
    });

    test('dispatches RED_EXPENSE when decrease button is clicked', () => {
        render(
            <AppContext.Provider value={contextValue}>
                <table>
                    <tbody>
                        <ExpenseItem id="Food" name="Food" cost={300} />
                    </tbody>
                </table>
            </AppContext.Provider>
        );

        const buttons = screen.getAllByRole('button');
        fireEvent.click(buttons[1]); // Click decrease button

        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'RED_EXPENSE',
            payload: { name: 'Food', cost: 10 }
        });
    });

    test('dispatches DELETE_EXPENSE when delete icon is clicked', () => {
        const { container } = render(
            <AppContext.Provider value={contextValue}>
                <table>
                    <tbody>
                        <ExpenseItem id="Food" name="Food" cost={300} />
                    </tbody>
                </table>
            </AppContext.Provider>
        );

        // Find the SVG element rendered by TiDelete icon
        const deleteIcon = container.querySelector('svg');
        fireEvent.click(deleteIcon);

        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'DELETE_EXPENSE',
            payload: 'Food'
        });
    });
});