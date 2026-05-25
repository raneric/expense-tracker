import type { GasEvent } from '../../type/AppType';
import { gasEventList } from '../../utils/Const';

export function gasLoader(): GasEvent[] {
  return gasEventList;
}
