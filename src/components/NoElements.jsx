
const NoElements = ({core_item, todo, type, icon}) => {
  return (
    <div className="flex flex-col h-fit w-full items-center justify-center text-center mt-10">
    {icon}
          <p className="mt-4 text-gray-500 text-lg">No {core_item} is Found in {type}.</p>
          <p className="text-sm text-gray-400">Start by clicking the "Add  Section" button.</p>
  </div>
  )
}

export default NoElements
