"use client";

import { useState } from "react";
import { format, subDays } from "date-fns";
import { zhTW } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { ChevronDown } from "lucide-react";

import qs from "query-string";
import {
  useRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";

import { cn, formatDateRange } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";

export const DataFilter = () => {
  const router = useRouter();
  const pathname = usePathname();

  const params = useSearchParams();
  const accountId = params.get("accountId");
  const from = params.get("from") || "";
  const to = params.get("to") || "";

  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  const paramState = {
    from: from ? new Date(from) : defaultFrom,
    to: to ? new Date(to) : defaultTo,
  };

  const [date, setDate] = useState<DateRange | undefined>(paramState);

  const pushToUrl = (dateRange: DateRange | undefined) => {
    console.log('dateRange',dateRange);

    const query = {
      from: format(dateRange?.from || defaultFrom, "yyyy-MM-dd"),
      to: format(dateRange?.to || defaultTo, "yyyy-MM-dd"),
      accountId,
    };
    const url = qs.stringifyUrl({
      url: pathname,
      query,
    }, { skipNull: true, skipEmptyString: true });

    console.log('url', url);


    router.push(url);
  };

  const onReset = () => {
    setDate(undefined);
    pushToUrl(undefined);
  };

  return(
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={false}
          size="sm"
          variant="outline"
          className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/20 hover:bg-white/30 hover:text-white  border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white! focus:bg-white/30 transition"
        >
          <span>{formatDateRange(paramState)}</span>
          <ChevronDown className="ml-2 size-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="lg:w-auto w-full p-0 overflow-hidden"
        align="start"
      >
        <Calendar
          disabled={false}
          autoFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
          showOutsideDays={false}
          locale={zhTW}
          components={{
            DayButton: (props) => (
              <CalendarDayButton
                {...props}
                className={cn(
                  "data-[range-start=true]:bg-indigo-500 data-[range-middle=true]:bg-indigo-100 data-[range-end=true]:bg-indigo-500",
                  props.className
                )}
              />
            )
          }}
        />
        <div className="p-4 w-full flex items-center gap-x-2">
          <PopoverClose asChild>
            <Button
              onClick={onReset}
              disabled={!date?.from || !date?.to}
              className="flex-1"
              variant="outline"
            >
              重置
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button
              onClick={() => pushToUrl(date)}
              disabled={!date?.from || !date?.to}
              className="flex-1"
            >
              套用
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};
