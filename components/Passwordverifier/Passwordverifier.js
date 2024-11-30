import { useState } from 'react';

export default function PasswordVerifier({ targetPage, onSuccess, onError }) {
    const [passwordError, setPasswordError] = useState('');

    const verifyPassword = async (password) => {
        try {
            const response = await fetch('/api/admin-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();
            if (data.valid) {
                setPasswordError('');
                onSuccess(targetPage); // Callback for successful password verification
            } else {
                setPasswordError('Incorrect password. Please try again.');
                onError();
            }
        } catch (error) {
            console.error('Error verifying password:', error);
            setPasswordError('An error occurred. Please try again.');
            onError();
        }
    };

    return (
        passwordError && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded shadow-md text-center">
                    <p className="text-red-500 text-lg font-semibold">{passwordError}</p>
                    <button
                        onClick={() => setPasswordError('')}
                        className="mt-4 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
                    >
                        Close
                    </button>
                </div>
            </div>
        )
    );
}
