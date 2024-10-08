import { OptionPossibility } from "./option-possibility";

export interface OptionWithPossibilities{
    id: number,
    label : string,
    possibilities : OptionPossibility[]
}