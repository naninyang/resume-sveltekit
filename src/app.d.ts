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
  interface profile {
    telephone?: string;
    address?: string;
    veteran?: string;
    disability?: string;
    username_show?: boolean;
    email_show?: boolean;
  }
  interface military_service {
    military_stats?: boolean;
    military_show?: boolean;
    conscription_exemption?: string;
    military_group?: string;
    start_date?: string;
    end_date?: string;
    rank?: string;
    branch?: string;
    discharge?: string;
  }
  interface education {
    school?: string;
    major?: string;
    category?: string;
    stats?: string;
    degree?: string;
    degree_num?: string;
    record?: string;
    start_date?: string;
    end_date?: string;
  }
  interface reference {
    github?: string;
    velog?: string;
    instagram?: string;
    twitter?: string;
    facebook?: string;
    leadme?: string;
    brunch?: string;
    tistory?: string;
    pinterest?: string;
    linkedin?: string;
    dribble?: string;
    postype?: string;
    blog?: string;
    homepage?: string;
  }
}
