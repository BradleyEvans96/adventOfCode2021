declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AOC_SESSION_COOKIE: string;
    }
  }
}

export {};
