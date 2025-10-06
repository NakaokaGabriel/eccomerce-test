// Simple toast implementation without external dependencies

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

class ToastManager {
  private toasts: Toast[] = [];
  private listeners: ((toasts: Toast[]) => void)[] = [];

  subscribe(listener: (toasts: Toast[]) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener([...this.toasts]));
  }

  add(toast: Omit<Toast, 'id'>) {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    
    this.toasts.push(newToast);
    this.notify();

    // Auto remove after duration
    const duration = toast.duration || 3000;
    setTimeout(() => {
      this.remove(id);
    }, duration);

    return id;
  }

  remove(id: string) {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
    this.notify();
  }

  success(message: string, duration?: number) {
    return this.add({ message, type: 'success', duration });
  }

  error(message: string, duration?: number) {
    return this.add({ message, type: 'error', duration });
  }

  info(message: string, duration?: number) {
    return this.add({ message, type: 'info', duration });
  }
}

export const toast = new ToastManager();
