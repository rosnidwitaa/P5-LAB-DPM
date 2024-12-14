import React, { useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Text, IconButton, Button } from 'react-native-paper';
import { ExpenseContext } from '../App';

const ExpenseTrackerScreen = ({ navigation }) => {
  const { expenses, setExpenses } = useContext(ExpenseContext);

  const calculateTotal = () => {
    return expenses.reduce((total, item) => total + item.amount, 0);
  };

  const formatToRupiah = (amount) => {
    return `Rp ${amount.toLocaleString('id-ID')}`;
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.summaryCard}>
        <Card.Content>
          <Text style={styles.totalText}>Total Pengeluaran</Text>
          <Text style={styles.amount}>{formatToRupiah(calculateTotal())}</Text>
        </Card.Content>
      </Card>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.amountItem}>{formatToRupiah(item.amount)}</Text>
              <IconButton
                icon="delete"
                color="red"
                size={20}
                onPress={() => deleteExpense(item.id)}
              />
            </Card.Content>
          </Card>
        )}
      />
      <Button
        mode="contained"
        onPress={() => navigation.navigate('AddExpense')}
        style={styles.button}
      >
        Tambah Pengeluaran
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0fdf4', 
  },
  summaryCard: {
    marginBottom: 16,
    backgroundColor: '#34d399', 
  },
  totalText: {
    fontSize: 20,
    color: '#fff', 
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937', 
  },
  card: {
    marginBottom: 10,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    flex: 1,
  },
  amountItem: {
    fontSize: 16,
    color: '#1f2937', 
  },
  button: {
    marginTop: 16,
    backgroundColor: '#3b82f6', 
  },
});

export default ExpenseTrackerScreen;
