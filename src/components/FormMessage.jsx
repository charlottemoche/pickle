function FormMessage({ message }) {
  return (
    <div className="text-center mt-6">
      <h3 className="text-lg font-semibold text-gray-800">{message.title}</h3>
      <p className="text-gray-500 mt-2">{message.body}</p>
    </div>
  );
}

export default FormMessage;
