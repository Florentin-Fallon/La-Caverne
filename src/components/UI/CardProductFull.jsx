import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Delete from "../../assets/DeleteCard.svg";
import Edit from "../../assets/EditCard.svg";

function CardProductFull({ title, description, price, image, id }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isOnProfilVendeur = location.pathname.includes("/vendeur");

  const priceModified = price.replace("\u20ac", "").trim();
  const [formData, setFormData] = useState({
    title,
    description,
    price: priceModified,
    images: Array.isArray(image) ? image : [image],
  });
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleClick = () => {
    navigate(`/produit/${id || title.replace(/\s+/g, "-").toLowerCase()}`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");
    const confirmDelete = window.confirm("Es-tu s\u00fbr de vouloir supprimer cet article ?");
    if (confirmDelete) {
      try {
        const res = await fetch(`https://services.cacahuete.dev/api/lacaverne/articles/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          alert("Article supprim\u00e9 avec succ\u00e8s.");
          window.location.reload();
        } else alert("Erreur lors de la suppression.");
      } catch (err) {
        console.error(err);
        alert("Erreur serveur.");
      }
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setShowEditForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      // 1. Modifier les données texte
      const response = await fetch(`https://services.cacahuete.dev/api/lacaverne/articles/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          price: parseInt(formData.price),
        }),
      });

      if (!response.ok) {
        alert("Erreur lors de la mise à jour des données.");
        return;
      }
      if (selectedFile) {
        const formDataImage = new FormData();
        formDataImage.append("image", selectedFile);

        const imageUploadResponse = await fetch(
            `https://services.cacahuete.dev/api/lacaverne/articles/${id}/image`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formDataImage,
            }
        );

        if (!imageUploadResponse.ok) {
          alert("Erreur lors de l'upload de l'image.");
          return;
        }

        let imageData = null;
        try {
          imageData = await imageUploadResponse.json();
        } catch (e) {
        }

        if (imageData && imageData.imageUrl) {
          setFormData((prev) => ({ ...prev, images: [imageData.imageUrl] }));
        }
      }
      alert("Article mis à jour !");
      setShowEditForm(false);
      setSelectedFile(null);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Erreur serveur.");
    }
  };

  return (
      <>
        <div
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg duration-300 hover:scale-105 transform transition-transform"
            onClick={handleClick}
        >
          <div className="bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center">
            <img
                src={formData.images[0]}
                alt={title}
                className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-2 line-clamp-3 overflow-hidden">{description}</p>
          <div className="grid grid-cols-2">
            <div className="flex flex-col items-start justify-between">
              <p className="text-2xl font-bold text-[#346644]">{price}</p>
            </div>
            {isOnProfilVendeur && (
                <div className="flex items-center justify-end gap-2">
                  <button
                      className="bg-white p-2 rounded-md transition hover:bg-gray-100"
                      onClick={handleEdit}
                  >
                    <img
                        className="w-6 h-6 hover:scale-110 transition-transform"
                        src={Edit}
                        alt="edit"
                    />
                  </button>
                  <button
                      className="bg-white p-2 rounded-md transition hover:bg-gray-100"
                      onClick={handleDelete}
                  >
                    <img
                        className="w-6 h-6 hover:scale-110 transition-transform"
                        src={Delete}
                        alt="delete"
                    />
                  </button>
                </div>
            )}
          </div>
        </div>
        {showEditForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-75">
              <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
                <button
                    className="absolute top-2 right-3 text-xl font-bold"
                    onClick={() => {
                      setShowEditForm(false);
                      setSelectedFile(null);
                    }}
                >
                  &times;
                </button>
                <h2 className="text-xl font-bold mb-4">Modifier l'article</h2>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <label>
                    <span className="block mb-1 font-medium">Titre :</span>
                  </label>
                  <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleFormChange}
                      className="w-full border px-3 py-2 rounded"
                      placeholder="Titre"
                      required
                  />
                  <label>
                    <span className="block mb-1 font-medium">Description :</span>
                  </label>
                  <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleFormChange}
                      className="w-full border px-3 py-2 rounded"
                      placeholder="Description"
                      required
                  />
                  <label>
                    <span className="block mb-1 font-medium">Prix (en €) :</span>
                  </label>
                  <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleFormChange}
                      className="w-full border px-3 py-2 rounded"
                      placeholder="Prix"
                      required
                  />
                  <div className="w-full border px-3 py-2 rounded">
                    <label className="block mb-1 font-medium">Image :</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-600"
                    />
                  </div>
                  {preview && (
                      <div className="mt-4">
                        <p className="mb-1 font-semibold">Aperçu de la nouvelle image :</p>
                        <img
                            src={preview}
                            alt="preview"
                            className="w-full max-h-48 object-contain rounded border"
                        />
                      </div>
                  )}

                  <div className="flex items-center justify-end">
                    <button
                        type="submit"
                        className="flex items-end justify-end bg-[#346644] text-white px-4 py-2 mt-6 rounded hover:bg-[#2b5035]"
                    >
                      Sauvegarder
                    </button>
                  </div>
                </form>
              </div>
            </div>
        )}
      </>
  );
}

export default CardProductFull;
