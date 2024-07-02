import {
  AuthProviderType,
  GetAuthProviderDocument,
  LoginDocument,
  RegisterWithProviderDocument,
} from '@parkspace/network/src/gql/generated'
import { NextAuthOptions, getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { fetchGraphQL } from '../fetch/index'
import * as jwt from 'jsonwebtoken'
import { JWT } from 'next-auth/jwt'

const MAX_AGE = 1 * 24 * 60 * 60

export const authOptions: NextAuthOptions = {
  // Configure authentication providers
  providers: [
    // Google OAuth provider configuration
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid profile',
        },
      },
    }),
    // Credentials provider configuration for email/password authentication
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      // Authorize function to validate user credentials
      async authorize(credentials) {
        // Implement credential validation logic
        if (!credentials) {
          throw new Error('Email and password are required')
        }
        const { email, password } = credentials
        try {
          const { data, error } = await fetchGraphQL({
            document: LoginDocument,
            variables: { loginInput: { email, password } },
          })
          if (!data?.login.token || error) {
            throw new Error(
              'Authentication failed: Invalid credentials or user not found',
            )
          }
          const uid = data.login.user.uid
          const image = data.login.user.image
          const name = data.login.user.name

          return { id: uid, name, image, email }
        } catch (err) {
          return null
        }
      },
    }),
  ],

  //enable debug mode for development
  debug: true,

  //configure session settings
  session: {
    strategy: 'jwt',
    maxAge: MAX_AGE,
  },
  //configure jwt settings
  jwt: {
    maxAge: MAX_AGE,

    //custom jwt encoding function
    async encode({ token, secret }): Promise<string> {
      if (!token) {
        throw new Error('Token is undefined')
      }
      const { sub, ...tokenProps } = token
      //Get the current date in seconds since the epoch
      const nowInSeconds = Math.floor(Date.now() / 1000)
      //calculate the expiration Timestamp
      const expirationTimestamp = nowInSeconds * MAX_AGE
      return jwt.sign(
        { uid: sub, ...tokenProps, exp: expirationTimestamp },
        secret,
        {
          algorithm: 'HS256',
        },
      )
    },

    //custom JWT decoding function
    async decode({ token, secret }): Promise<JWT | null> {
      //implement custom JWT decoding logic
      if (!token) {
        throw new Error('token is undefined')
      }
      try {
        const decodedToken = jwt.verify(token, secret, {
          algorithms: ['HS256'],
        })
        return decodedToken as JWT
      } catch (err) {
        return null
      }
    },
  },

  //configure callback functions
  callbacks: {
    //sign-in callback
    async signIn({ user, account }) {
      //implement sign in logic eg create user in database
      if (account?.provider === 'google') {
        const { id, name, image } = user

        const existingUser = await fetchGraphQL({
          document: GetAuthProviderDocument,
          variables: {
            uid: id,
          },
        })
        if (!existingUser.data?.getAuthProvider?.uid) {
          const newUser = await fetchGraphQL({
            document: RegisterWithProviderDocument,
            variables: {
              registerWithProviderInput: {
                uid: id,
                type: AuthProviderType.Google,
                image,
                name: name || '',
              },
            },
          })
        }
      }

      return true
    },

    //session callbacks
    async session({ token, session }) {
      //customize session object based on token data
      if (token) {
        session.user = {
          image: token.picture,
          uid: (token.uid as string) || '',
          email: token.email,
          name: token.name,
        }
      }
      return session
    },
  },

  //configure custom pages
  pages: {
    signIn: '/signIn',
  },
}

export const getAuth = () => getServerSession(authOptions)
