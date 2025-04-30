import { Redirect } from 'expo-router';
 
export default function UserIndex() {
  // Default redirect to book-consultations tab for user
  return <Redirect href="/(user)/(book-consultations)/book-consultation" />;
} 