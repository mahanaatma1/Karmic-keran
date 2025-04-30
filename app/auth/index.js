import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';

const DUMMY_ADMIN_EMAIL = 'admin@karmickiran.com';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleContinueWithEmail = () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter an email address");
      return;
    }

    // Check if admin email
    if (email === DUMMY_ADMIN_EMAIL) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    
    setEmailVerified(true);
  };

  const handleLogin = () => {
    if (isAdmin && !password) {
      Alert.alert("Error", "Please enter your password");
      return;
    }
    
    if (!isAdmin && !otp) {
      Alert.alert("Error", "Please enter the OTP");
      return;
    }
    
    // Use more specific paths that include a default screen
    if (isAdmin) {
      router.replace('/(admin)/dashboard');
    } else {
      router.replace('/(user)/ask-question');
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    router.replace('/(user)/ask-question');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/3377405/pexels-photo-3377405.jpeg' }}
          style={styles.logo}
        />
        <Text style={styles.logoText}>Karmic Kiran</Text>
      </View>

      {!emailVerified ? (
        <>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialLogin('Google')}
          >
            <Text style={styles.googleText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialLogin('Meta')}
          >
            <Text style={styles.metaText}>Continue with Meta</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <Text style={styles.dividerText}>Or continue with</Text>
          </View>

          <TextInput
            style={styles.emailInput}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinueWithEmail}
          >
            <Text style={styles.continueButtonText}>Continue with Email</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.verificationContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setEmailVerified(false)}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          
          <Text style={styles.verificationTitle}>
            {isAdmin ? 'Enter Password' : 'Enter OTP'}
          </Text>
          
          <Text style={styles.emailDisplay}>{email}</Text>
          
          <TextInput
            style={styles.verificationInput}
            placeholder={isAdmin ? "Enter your password" : "Enter OTP sent to your email"}
            value={isAdmin ? password : otp}
            onChangeText={isAdmin ? setPassword : setOtp}
            secureTextEntry={isAdmin}
            keyboardType={isAdmin ? 'default' : 'number-pad'}
          />
          
          <TouchableOpacity
            style={styles.signInButton}
            onPress={handleLogin}
          >
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  logoText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: '#8B0000',
    marginTop: 10,
  },
  socialButton: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  googleText: {
    fontFamily: 'Inter-Medium',
    color: '#333',
    fontSize: 16,
  },
  metaText: {
    fontFamily: 'Inter-Medium',
    color: '#333',
    fontSize: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerText: {
    fontFamily: 'Inter-Regular',
    color: '#666',
    textAlign: 'center',
    flex: 1,
  },
  emailInput: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: 'linear-gradient(to right, #E43C13, #F8A62C)',
    backgroundColor: '#E43C13',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    fontFamily: 'Inter-Medium',
    color: 'white',
    fontSize: 16,
  },
  verificationContainer: {
    width: '100%',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  backButtonText: {
    fontFamily: 'Inter-Medium',
    color: '#E43C13',
    fontSize: 16,
  },
  verificationTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: '#333',
    marginBottom: 8,
  },
  emailDisplay: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  verificationInput: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 24,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  signInButton: {
    backgroundColor: '#E43C13',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  signInButtonText: {
    fontFamily: 'Inter-Medium',
    color: 'white',
    fontSize: 16,
  },
}); 