import { Environment } from './ienvironment';

export const environment: Environment = {
  production: true,
  currentLocale: 'de',
  languages: ['en', 'de'],
};

export { DebugToolsDummyModule as DebugToolsModule } from '@psf/debug-tools/dummy/debug-tools-dummy.module';
