import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleSendVerification = () => {
    fetch('http://localhost:3001/Login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email,password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          setShowOtpInput(true);
        } else {
          alert(data.message);
          if (data.message === 'Please register before login') {
            navigation.navigate('Signup');
          }
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleVerifyOtp = () => {
    fetch('http://YOUR_BACKEND_URL/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          navigation.navigate('Home');
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      {/* <Image source={require('./logo.png')} style={styles.logo} /> */}
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Phone/ Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      {showOtpInput ? (
        <>
          <TextInput
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSendVerification}>
          <Text style={styles.buttonText}>Login </Text>
        </TouchableOpacity>
      )}
      <Text style={styles.orText}>Or</Text>
      <TouchableOpacity style={styles.passwordButton}>
        <Text style={styles.passwordButtonText}>Login with Otp</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.registerText}>Don't have an Account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F7FA',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796B',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#00796B',
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: '#FFF',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#00796B',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 20,
  },
  passwordButton: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderColor: '#00796B',
    borderWidth: 1,
    marginBottom: 20,
  },
  passwordButtonText: {
    color: '#00796B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    color: '#00796B',
    fontSize: 16,
  },
});
