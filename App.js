import React, { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExpenseTrackerScreen from './screens/ExpenseTrackerScreen';
import AddExpenseScreen from './screens/AddExpenseScreen';

export const ExpenseContext = createContext();

const App = () => {
  const Stack = createStackNavigator();

  const [expenses, setExpenses] = useState([
    { id: 1, name: 'Belanja Harian', amount: 50000 },
    { id: 2, name: 'Transportasi', amount: 15000 },
  ]);

  return (
    <ExpenseContext.Provider value={{ expenses, setExpenses }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#34d399' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen
            name="ExpenseTracker"
            component={ExpenseTrackerScreen}
            options={{ title: 'Pencatat Pengeluaran' }}
          />
          <Stack.Screen
            name="AddExpense"
            component={AddExpenseScreen}
            options={{ title: 'Tambah Pengeluaran' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpenseContext.Provider>
  );
};

export default App;
