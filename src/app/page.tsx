

export default function Board() {
  return (
    <>
    <div className="flex flex-row items-stretch justify-evenly w-36 h-12 border border-collapse border-gray-950">
      <button className="border border-black border-collapse flex-grow">X</button>
      <button className="border border-black border-collapse flex-grow">X</button>
      <button className="border border-black border-collapse flex-grow">X</button>
    </div>
    <div className="flex flex-row items-stretch  justify-evenly w-36 h-12 border border-collapse border-gray-950">
      <button className="border border-black border-collapse flex-grow">X</button>
      <button className="border border-black border-collapse flex-grow">X</button>
      <button className="border border-black border-collapse flex-grow">X</button>
    </div>
    <div className="flex flex-row items-stretch  justify-evenly w-36 h-12 border border-collapse border-gray-950">
      <button className="border border-black flex-grow">X</button>
      <button className="border border-black flex-grow">X</button>
      <button className="border border-black flex-grow">X</button>
    </div>
    </>
  )
}
