import { ConvertDateToString } from './Converter';
import * as XLSX from 'xlsx';

export const exportData = (obj:object[], name: string) => {
    const json = obj.map((device: { [x: string]: any; }) => {
        return Object.keys(device).reduce((newData: any, key) => {
          const newKey = entozh[key] || key;
          const value = () =>
          {
            const arr = ["purchaseDate", "warrantyStartDate","warrantyEndDate","leaseStartDate","leaseEndDate","maintenanceStartDate","maintenanceEndDate","date"];
            return (arr.find(element => element == key)) ? ConvertDateToString(new Date(device[key])) : device[key];
          }
          newData[newKey] = value();
          return newData;
        }, {})
      });
    
      const sheet = XLSX.utils.json_to_sheet(json);
      openDownloadDialog(sheet2blob(sheet, name), `${name}.xlsx`);
}

const entozh: any = {
    "sn": "機號",
    "model": "型號",
    "version": "版本",
    "purchaseDate": "購買日期",
    "warrantyStartDate": "保固起始日",
    "warrantyEndDate": "保固到期日",
    "leaseStartDate": "租賃起始日",
    "leaseEndDate": "租賃到期日",
    "maintenanceStartDate": "保養起始日",
    "maintenanceEndDate": "保養到期日",
    "date": "日期",
    "maintenanceItem": "保養項目",
    "repairComment" : "維修項目",
    "revisionVersion" : "改版版本"
  }  

  const openDownloadDialog = (url: any, saveName: string) => {
    if (typeof url == 'object' && url instanceof Blob) {
      url = URL.createObjectURL(url); // 創建blob地址
    }
    var aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || ''; // HTML5新增的屬性，指定保存文件名，可以不要後綴，注意，file:///模式下不會生效
    var event;
    if (window.MouseEvent) {
      event = new MouseEvent('click');
    }
    else {
      event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
  }

  const sheet2blob = (sheet: any, sheetName: any) => {
    sheetName = sheetName || 'sheet1';
    const workbook: any = {
      SheetNames: [sheetName],
      Sheets: { sheet }
    };
    workbook.Sheets[sheetName] = sheet; // 生成excel的配置項
    const wopts: XLSX.WritingOptions = {
      bookType: 'xlsx', // 要生成的文件類型
      bookSST: false, // 是否生成Shared String Table，官方解釋是，如果開啟生成速度會下降，但在低版本IOS設備上有更好的兼容性
      type: 'binary'
    };
    var wbout = XLSX.write(workbook, wopts);
    var blob = new Blob([s2ab(wbout)], {
      type: "application/octet-stream"
    }); // 字符串轉ArrayBuffer
    function s2ab(s: any) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }
    return blob;
  }