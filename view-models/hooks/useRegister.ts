import { useState } from 'react';
import { Alert } from 'react-native';
import { supabase } from '../../supabase/SupabaseClient';


interface UseRegisterProps {
    onSuccess?: () => void;
}

export const useRegister = ({ onSuccess }: UseRegisterProps = {}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const validate = (): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
        const nameRegex = /^[a-zA-Z\s]{2,}$/;

        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill all fields.');
            return false;
        }

        if (!nameRegex.test(name)) {
            Alert.alert('Invalid Name', 'Name should contain only letters and spaces.');
            return false;
        }

        if (!emailRegex.test(email)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address.');
            return false;
        }

        if (!passwordRegex.test(password)) {
            Alert.alert(
                'Weak Password',
                'Password must be at least 6 characters and include a letter and a number.'
            );
            return false;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return false;
        }

        return true;
    };

    const handleRegister = async () => {
        if (!validate()) return;

        try {
            setLoading(true);

            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { full_name: name },
                },
            });

            if (error) {
                Alert.alert('Registration failed', error.message);
                return;
            }

            Alert.alert(
                'Success',
                'Account created! Please check your email to confirm your account.'
            );

            onSuccess?.();
        } catch {
            Alert.alert('Error', 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return {
        // state
        name,
        email,
        password,
        confirmPassword,
        loading,

        // setters
        setName,
        setEmail,
        setPassword,
        setConfirmPassword,

        // actions
        handleRegister,
    };
};
