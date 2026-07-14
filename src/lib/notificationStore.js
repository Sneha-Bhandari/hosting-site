import { create } from 'zustand';

const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,
  
  // Add a new notification
  addNotification: (notification) => {
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1
    }));
  },
  
  // Mark all as read
  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map(n => ({ ...n, read: true })),
      unreadCount: 0
    }));
  },
  
  // Mark single as read
  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: state.unreadCount - (state.notifications.find(n => n.id === id && !n.read) ? 1 : 0)
    }));
  },
  
  // Clear all notifications
  clearAll: () => {
    set({ notifications: [], unreadCount: 0 });
  },
  
  // Get user-specific notifications based on role and company
  getUserNotifications: (userId, userRole, companyId) => {
    const state = get();
    if (userRole === 'superadmin') {
      return state.notifications;
    }
    // For admin, only show notifications for their company
    return state.notifications.filter(n => n.companyId === companyId || n.userId === userId);
  }
}));

// Notification helper functions
export const createNotification = (type, data, userId, userRole, companyId = null) => {
  const getMessage = () => {
    switch(type) {
      case 'student_added':
        return `New student ${data.name} ${data.surname} was added`;
      case 'student_updated':
        return `Student ${data.name} ${data.surname} was updated`;
      case 'student_deleted':
        return `Student ${data.name} ${data.surname} was deleted`;
      case 'admin_added':
        return `New admin ${data.firstName} ${data.lastName} was added`;
      case 'admin_deleted':
        return `Admin ${data.firstName} ${data.lastName} was removed`;
      case 'company_added':
        return `New company ${data.name} was added`;
      case 'company_updated':
        return `Company ${data.name} was updated`;
      default:
        return 'New notification';
    }
  };

  return {
    id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type,
    message: getMessage(),
    data,
    userId,
    userRole,
    companyId,
    read: false,
    createdAt: new Date().toISOString()
  };
};

export default useNotificationStore;