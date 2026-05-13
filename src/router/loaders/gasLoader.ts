import type { GasEvent } from '../../type/PropsType';
import { gasEventList } from '../../utils/Const';

export function gasLoader(): GasEvent[] {
  return gasEventList;
}
