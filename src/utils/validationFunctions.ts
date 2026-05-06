import type { ValidatorConfig } from '../type/AppType';

export function validateInput(value: string, config: ValidatorConfig) {
  const { regex, emptyMessage, invalidMessage, setError, setValid } = config;
  if (value === '') {
    setError(emptyMessage);
    setValid(false);
    return;
  }

  if (!regex.test(value)) {
    setError(invalidMessage);
    setValid(false);
    return;
  }

  setError('');
  setValid(true);
}
