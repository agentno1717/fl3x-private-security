export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    return 'unsupported';
  }

  return Notification.requestPermission();
}

export function sendLocalNotification(title: string, options?: NotificationOptions) {
  if (!('Notification' in window)) {
    return false;
  }

  if (Notification.permission !== 'granted') {
    return false;
  }

  new Notification(title, options);
  return true;
}
