import React, { useCallback, useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { analyzePdfResume } from '../../utils/pdf/analyzer';

interface PdfUploaderProps {
  onPdfAnalyzed: (text: string) => void;
  onError: (error: string) => void;
}

export function PdfUploader({ onPdfAnalyzed, onError }: PdfUploaderProps) {
  const [isLoading, setIsLoading] = useState(false);

  const analyzePdf = async (file: File) => {
    if (file?.type !== 'application/pdf') {
      onError('Please upload a PDF file');
      return;
    }

    setIsLoading(true);
    try {
      const text = await analyzePdfResume(file);
      onPdfAnalyzed(text);
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Failed to analyze PDF');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      await analyzePdf(file);
    },
    [onPdfAnalyzed, onError]
  );

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        await analyzePdf(file);
      }
    },
    [onPdfAnalyzed, onError]
  );

  return (
    <div className="mb-8">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`border-2 border-dashed border-blue-300 rounded-lg p-8 text-center 
          ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-500'} 
          transition-colors`}
      >
        {isLoading ? (
          <Loader2 className="mx-auto h-12 w-12 text-blue-500 mb-4 animate-spin" />
        ) : (
          <Upload className="mx-auto h-12 w-12 text-blue-500 mb-4" />
        )}
        <h3 className="text-lg font-semibold mb-2">
          {isLoading ? 'Analyzing PDF...' : 'Upload your resume'}
        </h3>
        <p className="text-gray-600 mb-4">
          {isLoading 
            ? 'Please wait while we process your resume'
            : 'Drag and drop your PDF resume here or click to browse'}
        </p>
        <label className={`inline-flex items-center px-4 py-2 rounded-md
          ${isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'} 
          text-white transition-colors`}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            disabled={isLoading}
          />
          Browse Files
        </label>
      </div>
    </div>
  );
}