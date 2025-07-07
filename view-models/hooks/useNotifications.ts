import { useState, useEffect } from 'react';
import { NotificationService } from '../../models/api/notificationApi.ts';
import {NotificationInfo} from '../../models/notificationInfo/Notificationinfo.ts';

const useNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const notificationService = new NotificationService();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await notificationService.fetchNotifications();
        setNotifications(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch notifications');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { notifications, loading, error };
};

export default useNotifications;
