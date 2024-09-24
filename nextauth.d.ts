import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user:{
            id:string; 
            name:string;
            username:string;
            status:boolean;            
            role:string;
        } & DefaultSession['user']
    }
}