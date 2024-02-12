"use strict";

import powerbi from "powerbi-visuals-api";
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;

export interface VData {
  items: VDataItem[];
  minValue: number;
  maxValue: number;
  target: number;
  formatString: string;
}

export interface VDataItem {
  category: string;
  value: number;
}

export function transformData(options: VisualUpdateOptions): VData {
  let data: VData;
  try {
    const dv = options.dataViews[0].categorical;
    console.log(options);
    console.log(dv.values[0].maxLocal);
    const minValue = Math.min(<number>dv.values[0].minLocal, <number>dv.values[1].minLocal);
    const maxValue = Math.max(<number>dv.values[0].maxLocal, <number>dv.values[1].maxLocal);
    const target = <number>dv.values[1].values[0];
    const items: VDataItem[] = [];
    dv.categories[0].values.forEach((value, index) => {
      items.push({
        category: <string>dv.categories[0].values[index],
        value: <number>dv.values[0].values[index],
      });
    });
    data = {
      items,
      minValue,
      maxValue,
      target,
      formatString: dv.values[0].source.format || "",
    };
  } catch (error) {
    data = {
      items: [],
      minValue: 0,
      maxValue: 0,
      target: 0,
      formatString: "",
    };
  }
  return data;
}
