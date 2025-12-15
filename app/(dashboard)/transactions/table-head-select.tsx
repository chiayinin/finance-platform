import {cn} from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  columnIndex: number;
  selectedColumns: Record<string, string | null>;
  onChange: (columnIndex: number, value: string | null) => void;
};

const options = [
  "amount",
  "payee",
  "date",
];

const labelMap: Record<string, string> = {
  skip: "跳過",
  amount: "金額",
  payee: "收款人",
  date: "日期",
}

export const TableHeadSelect = ({
  columnIndex,
  selectedColumns,
  onChange,
}: Props) => {
  const currentSelection = selectedColumns[`column_${columnIndex}`];

  return(
    <Select
      value={currentSelection || ""}
      onValueChange={(value) => onChange(columnIndex, value)}
    >
      <SelectTrigger
        className={cn(
          "focus: ring-offset-0 focus:ring-transparent outline-none border-none bg-transparent capitalize",
          currentSelection && "text-indigo-500"
        )}
      >
        <SelectValue placeholder="跳過" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="skip">{labelMap["skip"]}</SelectItem>
        {options.map((option, index) => {
          const disabled = Object.values(selectedColumns).includes(option) && selectedColumns[`column_${columnIndex}`] !== option;

          return(
          <SelectItem
            key={index}
            value={option}
            disabled={disabled}
            className="capitalize"
          >
            {labelMap[option]}
          </SelectItem>
        )})}
      </SelectContent>
    </Select>
  )
}
