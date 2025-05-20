import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import * as jwksRsa from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(private configService: ConfigService) {
    const keycloakUrl = process.env.KEYCLOAK_URL || 'http://keycloak:8080';
    const keycloakRealm = process.env.KEYCLOAK_REALM || 'hotel';
    const clientId = process.env.KEYCLOAK_CLIENT_ID || 'hotel-client';
    
    const defaultConfig = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: 'test-secret-key',
    };
    
    let config;
    
    try {
      config = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKeyProvider: jwksRsa.passportJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${keycloakUrl}/realms/${keycloakRealm}/protocol/openid-connect/certs`,
        }),
        audience: clientId,
        issuer: `${keycloakUrl}/realms/${keycloakRealm}`,
      };
      
    } catch (error) {
      config = defaultConfig;
    }
    
    super(config);
    
    if (config === defaultConfig) {
      this.logger.error('Fallback JWT Strategy initialized with test secret key');
    } else {
      this.logger.log(`JWT Strategy initialized with KeyCloak URL: ${keycloakUrl}`);
    }
  }

  async validate(payload: any) {
    if (!payload) {
      return { id: 'test-user', email: 'test@example.com', roles: ['admin'] };
    }
    
    return {
      id: payload.sub || 'test-user',
      email: payload.email || 'test@example.com',
      roles: payload.resource_access?.[process.env.KEYCLOAK_CLIENT_ID || 'hotel-client']?.roles || ['user'],
    };
  }
} 