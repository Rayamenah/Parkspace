import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { v4 as uuid } from 'uuid'
import {
  LoginInput,
  LoginOutput,
  RegisterWithCredentialsInput,
  RegisterWithProviderInput,
} from './dtos/create-user.input'
import { FindManyUserArgs, FindUniqueUserArgs } from './dtos/find.args'
import { UpdateUserInput } from './dtos/update-user.input'
import { Response } from 'express'

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  registerWithProvider({ image, name, uid, type }: RegisterWithProviderInput) {
    return this.prisma.user.create({
      data: {
        uid,
        name,
        image,
        AuthProvider: {
          create: {
            type,
          },
        },
      },
    })
  }

  async registerWithCredentials({
    email,
    name,
    password,
    image,
  }: RegisterWithCredentialsInput) {
    const existingUser = await this.prisma.credentials.findUnique({
      where: { email },
    })

    if (existingUser) {
      throw new BadRequestException('User already exists with this email.')
    }

    // Hash the password
    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(password, salt)

    const uid = uuid()

    return this.prisma.user.create({
      data: {
        uid,
        name,
        image,
        Credentials: {
          create: {
            email,
            passwordHash,
          },
        },
        AuthProvider: {
          create: {
            type: 'CREDENTIALS',
          },
        },
      },
      include: {
        Credentials: true,
      },
    })
  }

  async login(
    res: Response,
    { email, password }: LoginInput,
  ): Promise<LoginOutput> {
    const user = await this.prisma.user.findFirst({
      where: {
        Credentials: { email },
      },
      include: {
        Credentials: true,
      },
    })

    if (!user) {
      throw new UnauthorizedException('Invalid email or password.')
    }

    const isPasswordValid = bcrypt.compareSync(
      password,
      user.Credentials.passwordHash,
    )

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password.')
    }

    const jwtToken = this.jwtService.sign(
      { uid: user.uid },
      {
        algorithm: 'HS256',
      },
    )
    res.cookie('token', jwtToken, {
      maxAge: 900000,
      httpOnly: true,
    })

    return { token: jwtToken, user }
  }

  findAll(args: FindManyUserArgs) {
    return this.prisma.user.findMany(args)
  }

  findOne(args: FindUniqueUserArgs) {
    return this.prisma.user.findUnique(args)
  }

  update(updateUserInput: UpdateUserInput) {
    const { uid, ...data } = updateUserInput
    return this.prisma.user.update({
      where: { uid },
      data: data,
    })
  }

  remove(args: FindUniqueUserArgs) {
    return this.prisma.user.delete(args)
  }
}
