import IndexBar from "./IndexBar";

const ErrorMessage = ({
  customSubmit,
  message,
}: {
  message: string | null;
  customSubmit: ((url: string) => void) | undefined;
}) => {
  if (!message) return;

  return (
    <div className="flex-column p-12 border border-red-500/50 shadow-lg rounded-lg bg-white z-[100] text-start w-[800px] max-w-full">
      <p className="text-lg font-semibold mt-4">Error:</p>
      <p className="text-xl font-semibold mt-4">{message}</p>

      <p className="mt-12 mb-4 text-lg">Try re-typing the url below.</p>
      <IndexBar customSubmit={customSubmit} />
    </div>
  );
};

export default ErrorMessage;
