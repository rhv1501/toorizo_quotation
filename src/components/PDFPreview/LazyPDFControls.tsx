import React from "react";
import { Download } from "lucide-react";
import { QuotationData } from "../../types";

const LazyPDFControls: React.FC<{ data: QuotationData; fileName: string }> = ({
  data,
  fileName,
}) => {
  const [prepared, setPrepared] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [PDFModules, setPDFModules] = React.useState<{
    PDFDownloadLink?: any;
    PDFDocument?: any;
  } | null>(null);

  const prepare = async () => {
    if (prepared || loading) return;
    setLoading(true);
    try {
      // Dynamically import both the react-pdf renderer and the PDF document component.
      const [pdfRenderer, docModule] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./PDFDocument"),
      ]);

      setPDFModules({
        PDFDownloadLink: pdfRenderer.PDFDownloadLink,
        PDFDocument: docModule.default,
      });
      setPrepared(true);
    } catch (err) {
      console.error("Failed to load PDF modules", err);
    } finally {
      setLoading(false);
    }
  };

  // If not prepared, show a small button that triggers loading of heavy libs.
  if (!prepared || !PDFModules) {
    return (
      <button
        onClick={prepare}
        disabled={loading}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? (
          "Preparing..."
        ) : (
          <span className="flex items-center">
            <Download size={16} className="mr-2" />
            Prepare PDF
          </span>
        )}
      </button>
    );
  }

  const { PDFDownloadLink, PDFDocument } = PDFModules;

  // Render the actual download link using the dynamically loaded PDFDownloadLink
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (
    <PDFDownloadLink
      document={<PDFDocument data={data} />}
      fileName={fileName}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {(props: any) => {
        const dlLoading = props?.loading;
        return dlLoading ? (
          "Generating PDF..."
        ) : (
          <span className="flex items-center">
            <Download size={16} className="mr-2" />
            Download Quotation PDF
          </span>
        );
      }}
    </PDFDownloadLink>
  );
};

export default LazyPDFControls;
