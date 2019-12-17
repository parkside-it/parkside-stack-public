import { Test } from '@nestjs/testing';
import { ConfigService } from '@psb-shared';
import { parse as envParse } from 'dotenv';
import { readFileSync } from 'fs';

describe('ConfigService', () => {
  let configService: ConfigService;

  beforeEach(async () => {
    const env = envParse(readFileSync(`.env.defaults`));
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: new ConfigService(env),
        },
      ],
    }).compile();

    configService = module.get<ConfigService>(ConfigService);
  });

  it('should match snapshot', () => {
    expect(configService).toMatchSnapshot();
  });
});
