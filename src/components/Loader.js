function Loader() {
  return (
    <div>
      <div className="text-center my-4">
        <div className="animate-spin w-8 h-8 border-4 rounded-full inline-block  border-t-transparent border-indigo-400"></div>
      </div>
      <h2 className="text-center text-lg text-bold">
        Initializing service. This may take up to a minute. Thank you for your
        patience.
      </h2>
    </div>
  );
}
export default Loader;
