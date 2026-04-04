/**
 * config.js — Single source of truth for all constants.
 * Never hardcode values in components — import from here.
 */

/* ── Storage Keys ─────────────────────────────────────────── */
export const STORAGE_KEYS = {
  TOKEN: 'kanban_token',
  USERNAME: 'kanban_username',
  USER_ID: 'kanban_user_id',
  BOARDS_CACHE: 'kb_boards_list',
};

/* ── Pagination ───────────────────────────────────────────── */
export const PAGE_SIZE = 12;

/* ── Polling Intervals (ms) ───────────────────────────────── */
export const POLL_INTERVALS = {
  DASHBOARD: 30_000,
  BOARD: 15_000,
};

/* ── Validation Rules ─────────────────────────────────────── */
export const VALIDATION = {
  EMAIL: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  },
  PASSWORD: {
    minLength: 6,
    maxLength: 72,
    messages: {
      required: 'Password is required',
      minLength: 'Password must be at least 6 characters',
      maxLength: 'Password cannot exceed 72 characters',
    },
  },
  BOARD_NAME: {
    minLength: 1,
    maxLength: 80,
    messages: {
      required: 'This field is mandatory',
      maxLength: 'Board name cannot exceed 80 characters',
    },
  },
  BOARD_DESC: {
    minLength: 1,
    maxLength: 500,
    messages: {
      required: 'This field is mandatory',
      maxLength: 'Description cannot exceed 500 characters',
    },
  },
  TASK_TITLE: {
    minLength: 1,
    maxLength: 120,
    messages: {
      required: 'This field is mandatory',
      maxLength: 'Title cannot exceed 120 characters',
    },
  },
  TASK_DESC: {
    minLength: 1,
    maxLength: 1000,
    messages: {
      required: 'This field is mandatory',
      maxLength: 'Description cannot exceed 1000 characters',
    },
  },
};

/* ── Helpers ──────────────────────────────────────────────── */
export function formatDate(iso) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return '—';
  }
}

export function parseUTCDate(iso) {
  if (!iso) return null;
  let dateStr = iso;
  // If the timestamp doesn't specify a timezone offset (Z or +/-HH:MM), append Z to force UTC evaluation
  if (!/(Z|[+-]\d{2}:\d{2})$/.test(dateStr)) {
    dateStr += 'Z';
  }
  return new Date(dateStr);
}

export function formatDateTime(iso) {
  if (!iso) return '—';
  try {
    const date = parseUTCDate(iso);
    if (!date || isNaN(date.getTime())) return '—';
    const d = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const t = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return `${d}, ${t}`;
  } catch {
    return '—';
  }
}


export function statusLabel(s) {
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' ');
}

export function validateField(rules, value) {
  const v = (value || '').trim();
  if (rules.minLength && rules.minLength >= 1 && v.length === 0) {
    return rules.messages.required || 'Required';
  }
  if (rules.minLength && v.length > 0 && v.length < rules.minLength) {
    return rules.messages.minLength;
  }
  if (rules.maxLength && v.length > rules.maxLength) {
    return rules.messages.maxLength;
  }
  return null;
}
