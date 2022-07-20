import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateAuthDto } from './dto/create-auth.dto';
import { SignInAuthDto } from './dto/signIn-auth.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Register user using data',
    description: 'registration',
  })
  @ApiResponse({
    status: 201,
    schema: {
      example: {
        token: 'asd234vdce5te5b123vqfve5tb5tasdcawvwrvergewefvwefvwcefwv',
      },
    },
  })
  @ApiBody({ type: CreateAuthDto })
  @Post('register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @ApiOperation({
    summary: 'Sign in using email, password',
    description: 'Sign in',
  })
  @ApiResponse({
    status: 201,
    schema: {
      example: {
        token: 'asd234vdce5te5b123vqfve5tb5tc,2308mv0298mcv23v34v45cewcc3c',
      },
    },
  })
  @ApiBody({ type: SignInAuthDto })
  @Post('signIn')
  signIn(@Body() user: SignInAuthDto) {
    return this.authService.signIn(user);
  }
}
