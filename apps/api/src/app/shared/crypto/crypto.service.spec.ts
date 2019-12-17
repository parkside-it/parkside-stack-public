import { Test } from '@nestjs/testing';
import { CryptoService } from '@psb-shared';

describe('CryptoService', () => {
  let cryptoService: CryptoService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module = await Test.createTestingModule({
      providers: [CryptoService],
    }).compile();

    cryptoService = module.get<CryptoService>(CryptoService);
  });

  describe('compareHashAsync', () => {
    it('should correctly compare hashes', async () => {
      const plainPassword = 'aSuperSecretPa$$w0rd';
      const hashedPassword = '$2b$12$Gfq5a2ZiaQDO8iyu4IUeGef/aVL7awPogfWvwAJzxuHmMHvl11WMa';

      expect(await cryptoService.compareHash(plainPassword, hashedPassword)).toBe(true);
    });

    it('should reject incorrect passwords', async () => {
      const plainPassword = 'wrong';
      const hashedPassword = '$2b$12$Gfq5a2ZiaQDO8iyu4IUeGef/aVL7awPogfWvwAJzxuHmMHvl11WMa';

      expect(await cryptoService.compareHash(plainPassword, hashedPassword)).toBe(false);
    });
  });
});
