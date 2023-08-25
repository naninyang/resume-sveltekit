// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  interface Locals {
    user?: {
      id: number;
      userid: string;
    };
  }
  interface userData {
    username: string;
    email: string;
  }
}
