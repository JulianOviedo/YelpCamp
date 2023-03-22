import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
            clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log('qondera')
        }
        // async redirect({ url, baseUrl }) {
        //     return baseUrl
        // },
        // async session({ session, user, token }) {
        //     return session
        // },
        // async jwt({ token, user, account, profile, isNewUser }) {
        //     return token
        // }
    }
}

export default NextAuth(authOptions)
