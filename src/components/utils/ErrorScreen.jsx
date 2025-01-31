const ErrorScreen = ({ error }) => {
  return (
    <div className="flex flex-col h-full items-center justify-center">
      <img src={error.icon} alt="Error" className="w-16 h-16" />
      <h1 className="text-4xl text-red-900">Error</h1>
      <p className="text-red-900">{error.message}</p>
    </div>
  );
}

export default ErrorScreen;