"use client";
import React, { useRef, useState, useTransition } from "react";
import Papa from "papaparse";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider } from "react-hook-form";
import { addLivestockService } from "@/infrastructure/livestosks/services/add.livestocks.service";
import { toast } from "sonner";
import * as XLSX from "xlsx";

const acceptableFileTypes =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv, .xls, .xlsx";

type CsvFormData = {
  data: Record<string, string>[];
};

const expectedHeaders = [
  "tagNumber",
  "name",
  "type",
  "breed",
  "dateOfBirth",
  "gender",
  "weight",
  "color",
  "imageUrl",
  "status",
  "healthStatus",
  "purchasePrice",
  "purchaseDate",
  "notes",
];

const FileUpload = () => {
  const [isSubmitting, startTransition]= useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewData, setPreviewData] = useState<Record<string, string>[]>([]);
  const [missingFieldsMap, setMissingFieldsMap] = useState<{
    [rowIndex: number]: string[];
  }>({});
  const [unexpectedFieldsMap, setUnexpectedFieldsMap] = useState<{
    [rowIndex: number]: string[];
  }>({});
  const [error, setError] = useState({ isError: false, errorMsg: "" });
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<CsvFormData>({
    defaultValues: { data: [] },
  });

  const { handleSubmit, reset } = form;

  const convertExcelToCSV = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const csv = XLSX.utils.sheet_to_csv(worksheet);
          resolve(csv);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsArrayBuffer(file);
    });
  };

  const processFileData = (csvString: string, fileName: string) => {
    Papa.parse(csvString, {
      skipEmptyLines: true,
      header: true,
      complete: function (results) {
        const rows = results.data as Record<string, string>[];
        const headers = results.meta.fields || [];

        const missingHeaders = expectedHeaders.filter((h) => !headers.includes(h));
        const extraHeaders = headers.filter((h) => !expectedHeaders.includes(h));

        const missingMap: { [rowIndex: number]: string[] } = {};
        const unexpectedMap: { [rowIndex: number]: string[] } = {};

        rows.forEach((row, index) => {
          const missingFields = expectedHeaders.filter(
            (key) => !row[key] || row[key].trim() === ""
          );
          if (missingFields.length > 0) {
            missingMap[index] = missingFields;
          }

          const unexpectedFields = Object.keys(row).filter(
            (key) => !expectedHeaders.includes(key)
          );
          if (unexpectedFields.length > 0) {
            unexpectedMap[index] = unexpectedFields;
          }
        });

        const errorMsg = [
          missingHeaders.length > 0 && `Missing field(s): ${missingHeaders.join(", ")}`,
          extraHeaders.length > 0 && `Unexpected field(s): ${extraHeaders.join(", ")}`,
          Object.keys(missingMap).length > 0 &&
            `Rows with missing values: ${Object.keys(missingMap).length}`,
        ]
          .filter(Boolean)
          .join(" | ");

        const isError =
          missingHeaders.length > 0 ||
          extraHeaders.length > 0 ||
          Object.keys(missingMap).length > 0;

        setPreviewData(rows);
        setMissingFieldsMap(missingMap);
        setUnexpectedFieldsMap(unexpectedMap);
        setError({ isError, errorMsg });
        reset({ data: isError ? [] : rows });
      },
    });
  };

  const onFileChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setError({ isError: false, errorMsg: "" });

    try {
      if (file.name.endsWith('.csv')) {
        // Directly process CSV files
        const text = await file.text();
        processFileData(text, file.name);
      } else if (file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) {
        // Convert Excel to CSV then process
        const csvString = await convertExcelToCSV(file);
        processFileData(csvString, file.name);
      } else {
        throw new Error("Unsupported file type");
      }
    } catch (err:any) {
      setError({ isError: true, errorMsg: `Error processing file: ${err.message}` });
      console.error("File processing error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setPreviewData([]);
    setMissingFieldsMap({});
    setUnexpectedFieldsMap({});
    setError({ isError: false, errorMsg: "" });
    reset({ data: [] });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = (formData: CsvFormData) => {
    startTransition(async ()=>{
    try {
      await addLivestockService(formData);
      toast.success("Successfully Uploaded File.");
      handleClear();
    } catch (error: any) {
      toast.error("Failed to upload file", error.message);
    }
    })
  };

  return (
    <div className="bg-white px-2 py-6 sm:p-6 rounded-md w-full flex flex-col gap-3">
      <div>
        <Label htmlFor="csvFileSelector" className="mb-2 block">
          Choose File (*.csv, .xls, .xlsx)
        </Label>
        <input
          type="file"
          id="csvFileSelector"
          ref={fileInputRef}
          className="p-2 bg-amber-50 w-full rounded-md sm:w-auto"
          accept={acceptableFileTypes}
          onChange={onFileChangeHandler}
          disabled={isProcessing}
        />
        {isProcessing && <p className="mt-2 text-blue-600">Processing file...</p>}
      </div>

      {(previewData.length > 0 || error.isError) && (
        <div>
          <Button
            type="button"
            onClick={handleClear}
            className="mt-2 bg-red-600 text-white hover:bg-red-700"
            disabled={isProcessing}
          >
            Clear
          </Button>
        </div>
      )}

      {error.isError && (
        <div className="p-4 rounded-md bg-red-400 text-base font-bold text-white">
          {error.errorMsg}
          <ul className="list-disc list-inside mt-2 font-normal">
            {Object.entries(missingFieldsMap).map(([rowIdx, fields]) => (
              <li key={`missing-${rowIdx}`}>
                Row {+rowIdx + 1}: missing field(s) - {fields.join(", ")}
              </li>
            ))}
            {Object.entries(unexpectedFieldsMap).map(([rowIdx, fields]) => (
              <li key={`unexpected-${rowIdx}`}>
                Row {+rowIdx + 1}: unexpected field(s) - {fields.join(", ")}
              </li>
            ))}
          </ul>
        </div>
      )}

      {previewData.length > 0 && (
        <div className="bg-white p-4 rounded shadow-md max-h-96 overflow-auto">
          <h2 className="text-lg font-semibold mb-2">Preview Data:</h2>
          <table className="min-w-full table-auto border-collapse border border-gray-400 text-sm rounded-md">
            <thead>
              <tr className="bg-gray-200">
                {Object.keys(previewData[0]).map((key) => (
                  <th
                    key={key}
                    className="border border-gray-400 px-2 py-1 text-left"
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {previewData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.entries(row).map(([key, value], colIdx) => {
                    const isMissing = missingFieldsMap[rowIndex]?.includes(key);
                    const isUnexpected = unexpectedFieldsMap[rowIndex]?.includes(key);
                    return (
                      <td
                        key={colIdx}
                        className={`border px-2 py-1 ${
                          isMissing
                            ? "bg-red-200 text-red-800"
                            : isUnexpected
                            ? "bg-yellow-200 text-yellow-800"
                            : "border-gray-300"
                        }`}
                      >
                        {String(value || "")}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!error.isError && previewData.length > 0 && (
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white"
              disabled={isProcessing || isSubmitting}
            >
              {isProcessing || isSubmitting ? "Submitting..." : "Upload File"}
            </Button>
          </form>
        </FormProvider>
      )}
    </div>
  );
};

export default FileUpload;