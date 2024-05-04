import { Dispatch } from 'react';
import { SafeParseReturnType } from 'zod';

export const passwordValidState = {
  length: {
    error: false,
    message: 'Password must be at least 8 characters long',
  },
  lowercase: {
    error: false,
    message: 'Password must contain at least one lowercase letter',
  },
  uppercase: {
    error: false,
    message: 'Password must contain at least one uppercase letter',
  },
  number: {
    error: false,
    message: 'Password must contain at least one number',
  },
  symbol: {
    error: false,
    message: 'Password must contain at least one symbol',
  },
};

export type PasswordState = typeof passwordValidState & {
  [key: string]: {
    error: boolean;
    message: string;
  };
};

export const passwordValidReducer = (
  state: PasswordState,
  newState: Partial<typeof passwordValidState>
) => {
  return {
    ...state,
    ...newState,
  };
};

export const handlePasswordState = (
  result: SafeParseReturnType<string, string>,
  setPasswordState: Dispatch<Partial<typeof passwordValidState>>
) => {
  setPasswordState(passwordValidState);

  if (result.error?.issues) {
    result.error.issues.map((err) => {
      if (err.message.includes('long')) {
        setPasswordState({ length: { error: true, message: err.message } });
      } else if (err.message.includes('uppercase')) {
        setPasswordState({ uppercase: { error: true, message: err.message } });
      } else if (err.message.includes('lowercase')) {
        setPasswordState({ lowercase: { error: true, message: err.message } });
      } else if (err.message.includes('number')) {
        setPasswordState({ number: { error: true, message: err.message } });
      } else if (err.message.includes('symbol')) {
        setPasswordState({ symbol: { error: true, message: err.message } });
      } else {
        setPasswordState(passwordValidState);
      }
    });
  }
};
