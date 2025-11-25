import { useState } from "react";
import { FileSearch, PieChart, Radar, Target } from "lucide-react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
 } from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import { PieVariant } from "@/components/ui/pie-variant";

type Props = {
  data?: {
    name: string;
    value: number;
  }[];
};

export const SpendingPie = ({ data = [] }: Props) => {
  const [chartType, setChartType] = useState("pie");

  const onTypeChange = (type: string) => {
    // TODO: Add paywall

    setChartType(type);
  }
  return(
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <CardTitle className="text-xl line-clamp-1">
          Categories
        </CardTitle>
        <Select
          defaultValue={chartType}
          onValueChange={onTypeChange}
        >
          <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
            <SelectValue placeholder="圖表類型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pie">
              <div className="flex items-center">
                <PieChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">
                  圓餅圖
                </p>
              </div>
            </SelectItem>
            <SelectItem value="radar">
              <div className="flex items-center">
                <Radar className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">
                  雷達圖
                </p>
              </div>
            </SelectItem>
            <SelectItem value="radial">
              <div className="flex items-center">
                <Target className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">
                  放射圖
                </p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
            <FileSearch className="size-6 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              此期間沒有資料。
            </p>
          </div>
        ) : (
          <>
            {chartType === "pie" && <PieVariant data={data} />}
            {/* {chartType === "radar" && <BarVariant data={data} />}
            {chartType === "radial" && <LineVariant data={data} />} */}
          </>
        )}
      </CardContent>
    </Card>
  );
};
