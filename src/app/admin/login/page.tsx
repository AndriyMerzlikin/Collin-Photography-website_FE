'use client';

import { useState } from 'react';
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';
import Typography from '@/components/general/Typography/Typography';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function login() {
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push('/admin');
    } else {
      alert('Wrong credentials');
    }
  }

  return (
    <div className={styles.container}>
      <Typography variant="h3">Admin Login</Typography>

      <input
        className={styles.formInput}
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={styles.formInput}
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className={styles.button} onClick={login}>
        Login
      </button>
    </div>
  );
}
