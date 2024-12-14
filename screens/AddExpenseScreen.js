import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { ExpenseContext } from '../App';

const AddExpenseScreen = ({ navigation }) => {
  const { expenses, setExpenses } = useContext(ExpenseContext);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);

  const handleSave = () => {
    if (!name || !amount) {
      setError('Nama dan jumlah pengeluaran harus diisi');
      setVisible(true);
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      setError('Jumlah pengeluaran harus berupa angka yang valid');
      setVisible(true);
      return;
    }

    
    const newExpense = {
      id: expenses.length + 1,
      name,
      amount: parseFloat(amount), 
    };

    setExpenses([...expenses, newExpense]);

    
    setName('');
    setAmount('');
    navigation.goBack();
  };

  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.container}>
      <TextInput
        label="Nama Pengeluaran"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        label="Jumlah Pengeluaran (Rupiah)"
        value={amount}
        onChangeText={(text) => setAmount(text.replace(/[^0-9]/g, ''))}  // Hanya angka yang diterima
        keyboardType="numeric"
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSave} style={styles.button}>
        Tambah Pengeluaran
      </Button>

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={Snackbar.DURATION_SHORT}
      >
        {error}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
  },
});

export default AddExpenseScreen;
