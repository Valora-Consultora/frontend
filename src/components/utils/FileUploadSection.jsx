import { ChevronLeft, ChevronRight, DeleteRounded } from "@mui/icons-material";

const FileUploadSection = ({ title, name, multiple, accept, files, onRemove, swappable, formData, setFormData }) => {
  console.log("file", name, files);

  const moveLeft = (index) => {
    const newFotos = formData[name];

    const foto = newFotos[index]
    newFotos[index] = newFotos[index - 1]
    newFotos[index - 1] = foto;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newFotos,
    }))
  }

  const moveRight = (index) => {
    const newFotos = formData[name];

    const foto = newFotos[index]
    newFotos[index] = newFotos[index + 1]
    newFotos[index + 1] = foto;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newFotos,
    }))
  }

  const handleRemoveFile = (name, index) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: prevData[name].filter((_, i) => i !== index),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      //console.log('Checkbox modificado:', name, value, checked);
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...prevData[name], value]
          : prevData[name].filter((item) => item !== value),
      }));
    } else if (type === "file") {
      //console.log('File modificado:', name, files);
      setFormData((prevData) => ({
        ...prevData,
        [name]: [...prevData[name], ...files],
      }));
    } else {
      //console.log('Field modificado:', name, value);
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <div className="col-span-12 space-y-4 rounded">
      <h4 className="text-xl text-green-900">{title}</h4>
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-12">
          <div className="flex flex-row items-center">
            <input
              type="file"
              id={name}
              name={name}
              accept={accept}
              onChange={handleInputChange}
              multiple={multiple}
              className="hidden"
            />
            <label
              htmlFor={name}
              className="cursor-pointer bg-green-900 text-white px-4 py-2 rounded-md hover:bg-green-700 mr-4"
            >
              Subir {(name === "fotos" ? "Foto" : "Archivo") + (multiple ? "s" : "")}
            </label>
            {swappable && <><label
              htmlFor="columns"
              className="col-span-2 text-sm text-gray-700 font-bold mr-2"
            >
              Columnas:
            </label>
              <input
                type="number"
                min="1"
                max="6"
                id={name + "Columnas"}
                name={name + "Columnas"}
                value={formData[name + "Columnas"]}
                onChange={handleInputChange}
                className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
              /></>}
          </div>
          <div className={`mt-4 grid grid-cols-${formData[name + "Columnas"]} gap-4`}>
            {files.map((file, index) => (
              <div
                key={index}
                className="flex flex-col items-center min-h-48 justify-center bg-gray-100 rounded overflow-clip group"
              >
                <div className="relative">
                  <img src={URL.createObjectURL(file)} alt="Thumbnail" className={`object-fit group-hover:blur-sm`} />
                  {swappable && <><button
                    type="button"
                    onClick={() => moveLeft(index)}
                    className={`text-5xl absolute ${index !== 0 ? 'group-hover:block' : ''} hidden top-1/2 -translate-y-1/2`}
                  >
                    <ChevronLeft sx={{ stroke: "#000000" }} fontSize="inherit" className="text-white" />
                  </button>
                    <button
                      type="button"
                      onClick={() => moveRight(index)}
                      className={`text-5xl absolute hidden ${index !== files.length - 1 ? 'group-hover:block' : ''} top-1/2 right-0 -translate-y-1/2`}
                    >
                      <ChevronRight sx={{ stroke: "#000000" }} fontSize="inherit" className="text-white" />
                    </button></>}
                  {/* <button  */}

                  <button
                    type="button"
                    onClick={() => handleRemoveFile(name, index)}
                    className="text-red-400 text-4xl hover:text-red-800 font-bold absolute hidden group-hover:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <DeleteRounded sx={{ stroke: "#000000", strokeWidth: 0.8 }} fontSize="inherit" />
                  </button>
                </div>
                {/* <span className="truncate">{file.name}</span> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileUploadSection;