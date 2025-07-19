'use client';

import {
  SelectContainer,
  SelectContent,
  SelectItem,
} from '@/component/CustomSelect';
import { Select } from './context/customSelectContext';

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h2>Select componet</h2>

      {/* <Select className="w-[30rem]">
        <Select.Option Optionkey="1">Option 1</Select.Option>
        <Select.Option Optionkey="2">Option 2</Select.Option>
        <Select.Option Optionkey="3">Option 3</Select.Option>
        <Select.Option Optionkey="4">Option 4</Select.Option>
      </Select> */}

      <div className="w-[30rem]">
        <Select>
          <SelectContainer>
            <SelectContent>
              <SelectItem value="1">hello</SelectItem>
              <SelectItem value="2">Option 2</SelectItem>
              <SelectItem value="3">Option 3</SelectItem>
              <SelectItem value="4">Option 4</SelectItem>
            </SelectContent>
          </SelectContainer>
        </Select>
      </div>
    </div>
  );
}
