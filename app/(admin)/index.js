import { Redirect } from 'expo-router';
 
export default function AdminIndex() {
  // Default redirect to Dashboard tab for admin
  return <Redirect href="/(admin)/dashboard" />;
} 