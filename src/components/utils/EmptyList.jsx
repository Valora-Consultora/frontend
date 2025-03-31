const EmptyList = ({ message, Icon }) => {
  return <div className="flex flex-col items-center justify-center p-4">
    <Icon className="text-gray-400" sx={{ fontSize: 100 }} />
    <p className="m-0 text-gray-400">{message}</p>
  </div>
}

export default EmptyList;
