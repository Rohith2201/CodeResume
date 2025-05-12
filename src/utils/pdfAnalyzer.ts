import * as pdfjsLib from 'pdfjs-dist';

// Load PDF.js worker from npm package instead of CDN
import { PDFWorker } from 'pdfjs-dist/legacy/build/pdf.worker.entry';

if (!pdfjsLib.GlobalWorkerOptions.workerPort) {
  pdfjsLib.GlobalWorkerOptions.workerPort = new PDFWorker();
}

export async function analyzePdfResume(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }

    return fullText;
  } catch (error) {
    console.error('Error analyzing PDF:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Failed to analyze PDF'
    );
  }
}