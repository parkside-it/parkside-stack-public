import { User } from './user';

describe('User', () => {
  describe('Constructor', () => {
    it('should match user', async () => {
      const partialUser = new User({ id: 1, email: 'Name1', isEmailVerified: true });

      expect(partialUser).toEqual({ id: 1, email: 'Name1', isEmailVerified: true });
    });
  });
});
