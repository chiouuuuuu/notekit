class localEvent {
  constructor(item) {
    this.item = item;
  }
  get() {
    let gotItem = localStorage.getItem(this.item);
    return gotItem ? JSON.parse(gotItem) : '';
  }
  set(obj) {
    localStorage.setItem(this.item, JSON.stringify(obj));
  }
  clear() {
    localStorage.removeItem(this.item);
  }
}

export function getDate() {
  const date = new Date();
  const y = date.getFullYear();
  const m = parseInt(date.getMonth()) + 1;
  const d = date.getDate();
  return `${y}-${m}-${d}`;
}

export const local_event = new localEvent('notepad');
export const local_theme = new localEvent('theme');
