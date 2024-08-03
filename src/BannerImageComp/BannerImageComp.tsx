"use client";

import { MdModeEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import Card from "./Card";
import EditBanner from "@/EditBanner/EditBanner";

interface Background {
  id: string;
  image?: string; 
  description?: string;
  title?: string;
  cta?: string; 
  tamplate?: string; // Corrected property name
}

const BannerImageComp: React.FC = () => {
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<Partial<Background>>({});
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    fetch("banners.json")
      .then((res) => res.json())
      .then((data) => setBackgrounds(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleEdit = (id: string) => {
    const data = backgrounds.find((banner: Background) => banner.id === id);
    if (!data) return; // Add a check to ensure data is found
    setEditId(id);
    setCurrentData(data);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSave = (updatedData: Partial<Background>) => {
    setBackgrounds((prevBackgrounds: Background[]) =>
      prevBackgrounds.map((banner) =>
        banner.id === editId ? { ...banner, ...updatedData } : banner
      )
    );
    handleCloseEdit();
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
    setShowModal(false);
  };

  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
          {backgrounds.map((background) => (
            <div key={background.id} className="relative">
              <Card background={{
                image: background.image || '', 
                description: background.description || '',
                title: background.title || '',
                cta: background.cta || '',
                tamplate: background.tamplate || '',
              }} />
              <span 
                className="absolute top-0 right-0 m-2 cursor-pointer text-white bg-blue-800 border border-white p-1 rounded-full text-2xl"
                onClick={() => handleEdit(background.id)}
              >
                <MdModeEdit />
              </span>
            </div>
          ))}
        </div>
        {isEditing && (
          
          <EditBanner
            isOpen={showModal}
            onClose={handleCloseEdit}
            data={currentData}
            onSave={handleSave}
          />
        )}
      </div>
    </>
  );
};

export default BannerImageComp;