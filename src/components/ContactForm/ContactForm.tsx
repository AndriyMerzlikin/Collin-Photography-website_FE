import React from 'react';
import styles from './ContactForm.module.scss';

const ContactForm = () => {
  return (
    <form className={styles.formContainer}>
      <div className={styles.inputContainer}>
        <input type="text" placeholder="Name *" />
        <input type="email" placeholder="Email *" />
        <input type="phone" placeholder="Phone" />
        <textarea placeholder="Comment..." />
      </div>
      <button type="submit" className={styles.submitButton}>
        send message
      </button>
    </form>
  );
};

export default ContactForm;
