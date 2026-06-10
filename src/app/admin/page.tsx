'use client';

import styles from './page.module.scss';
import Typography from '@/components/general/Typography/Typography';
import PhotoUploadForm from '@/components/PhotoUploadForm/PhotoUploadForm';
import { useRouter } from 'next/navigation';
import GalleryList from '@/components/GalleryList/GalleryList';

export default function AdminPage() {
  const router = useRouter();

  async function logout() {
    await fetch('/api/logout', {
      method: 'POST',
    });

    router.push('/admin/login');
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <Typography variant="h3">Admin Panel</Typography>

        <Typography variant="body-medium" className={styles.textInfo}>
          *Upload new photo card to Gallery
        </Typography>

        <button onClick={logout} className={styles.button}>
          Logout
        </button>
        <PhotoUploadForm mode={'create'} />

        <GalleryList category={'all'} />
      </div>
    </div>
  );
}
