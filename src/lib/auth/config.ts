export const AUTH_CONFIG = {
  // Session
  SESSION_EXPIRY_HOURS: 24,
  
  // Passwords
  MIN_PASSWORD_LENGTH: 6,
  SALT_ROUNDS: 10,
  
  // Security
  RATE_LIMIT_ATTEMPTS: 5,
  RATE_LIMIT_WINDOW_MS: 15 * 60 * 1000, // 15 minutos
};
