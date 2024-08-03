import { IoMdCloseCircleOutline } from "react-icons/io";
import Image from "next/image";
import { useEffect, useState } from "react";

interface EditBannerProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  onSave: (updatedData: any) => void;
}

const EditBanner: React.FC<EditBannerProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
}) => {
  const [formData, setFormData] = useState(data);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      setTimeout(() => setVisible(false), 300); // match the transition duration
    }
  }, [isOpen]);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    const updatedData = { ...formData };
    if (tempImage) {
      updatedData.image = tempImage;
    }
    onSave(updatedData);
  };

   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!visible) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-end justify-center transition-transform duration-300 ease-out transform ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        <div className="modal-box bg-white w-10/12 lg:w-full relative">
          <button
            onClick={onClose}
            className="text-white bg-blue-800 border border-white p-1 rounded-full text-2xl absolute top-2 right-2"
          >
            <IoMdCloseCircleOutline />
          </button>
          <h3 className="text-lg font-bold font-serif text-blue-800 text-center my-4">
            Edit Banner
          </h3>
          <div className="py-4">
            <p className="text-lg font-bold font-serif text-blue-600 py-3">
              Title
            </p>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input input-bordered w-full mb-6 bg-white border border-blue-800 text-blue-600 font-semibold font-serif shadow-xl shadow-blue-400"
              placeholder="Title"
            />
            <p className="text-lg font-bold font-serif text-blue-600 py-3">
              Description
            </p>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input input-bordered w-full mb-6 bg-white border border-blue-800 text-blue-600 font-semibold font-serif shadow-xl shadow-blue-400"
              placeholder="Description"
            />
            <p className="text-lg font-bold font-serif text-blue-600 py-3">
              Image
            </p>
            <div className="p-4 mb-6 bg-white border border-blue-800 text-blue-600 font-semibold font-serif shadow-xl shadow-blue-400 rounded-lg">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="input input-bordered w-full bg-white"
              />
              {(tempImage || formData.image) && (
                <Image
                  src={tempImage || formData.image}
                  alt="Selected"
                  width={100}
                  height={100}
                  className="mt-2 w-[100px] h-[100px] rounded-full"
                />
              )}
            </div>
            <div className="flex">
              <button
                onClick={handleSave}
                className="px-3 py-1 md:ml-32 lg:ml-0 lg:px-5 lg:py-2 rounded-xl bg-gradient-to-r from-indigo-800 via-blue-600 to-blue-400 text-white font-serif mt-5 text-xl"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={onClose}
        ></div>
      )}
    </>
  );
};

export default EditBanner;