import { Redirect } from 'expo-router';
 
export default function UserIndex() {
  // Default redirect to Ask Question tab for user
  return <Redirect href="/(user)/book-consultation" />;
} 