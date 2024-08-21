import { useState } from 'react';

function useNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");

  const showNotification = (msg) => {
    setMessage(msg);
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 1000);
  };

  const Notification = () => (
    isVisible ? (
      <div style={styles.notification}>
        {message}
      </div>
    ) : null
  );

  return [Notification, showNotification];
}

const styles = {
  notification: {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '20px 30px',
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: '8px',
    border: '1px solid #000',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
    maxWidth: '400px',
    textAlign: 'center',
    fontSize: '15px',
    
  }
};

export default useNotification;