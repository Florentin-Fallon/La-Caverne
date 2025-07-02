import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  message,
  Button,
  Select,
  Input,
  Form,
  Steps,
  Card,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { sellerService } from "../api/sellerService";

const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;

function Vendre() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    city: "",
    postalCode: "",
  });

  // Nettoyage des URLs créées
  useEffect(() => {
    return () => {
      fileList.forEach((file) => {
        if (file.url) URL.revokeObjectURL(file.url);
      });
    };
  }, [fileList]);

  const handleUpload = async (options) => {
    const { onSuccess } = options;
    setTimeout(() => {
      onSuccess("OK");
    }, 500);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Seuls les fichiers JPG/PNG sont acceptés!");
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("L'image doit faire moins de 5MB!");
    }
    return isJpgOrPng && isLt5M;
  };

  const onFinish = async (values) => {
    console.log("Fonction onFinish appelée avec les valeurs:", values);

    // Récupérer les valeurs de la dernière étape et les combiner avec les données sauvegardées
    const lastStepValues = form.getFieldsValue();
    const allValues = { ...formData, ...lastStepValues };
    console.log("Toutes les valeurs du formulaire:", allValues);

    // Validation manuelle du formulaire
    try {
      await form.validateFields();
      console.log("Formulaire validé avec succès");
    } catch (validationError) {
      console.error("Erreurs de validation:", validationError);
      message.error("Veuillez corriger les erreurs dans le formulaire");
      return;
    }

    setLoading(true);
    try {
      // Vérifiez que l'utilisateur est connecté et a un profil vendeur
      const token = localStorage.getItem("token");
      console.log("Token présent:", !!token);
      console.log("Token:", token ? token.substring(0, 20) + "..." : "Aucun");

      if (!token) {
        message.error("Vous devez être connecté pour vendre un article");
        return;
      }

      // Vérifier que l'utilisateur a un profil vendeur
      try {
        console.log("Vérification du profil vendeur...");
        const sellerProfile = await sellerService.getMySellerProfile();
        console.log("ProfilVendeur vendeur trouvé:", sellerProfile.data);
      } catch (sellerError) {
        console.error("Erreur profil vendeur:", sellerError);
        console.error("Status:", sellerError.response?.status);
        console.error("Data:", sellerError.response?.data);

        if (sellerError.response?.status === 404) {
          message.error(
            "Vous devez créer un profil vendeur avant de pouvoir vendre des articles"
          );
          navigate("/profil"); // Rediriger vers la page de profil pour créer le profil vendeur
          return;
        } else if (sellerError.response?.status === 401) {
          console.log("Token invalide, redirection vers la connexion");
          message.error("Session expirée. Veuillez vous reconnecter.");
          localStorage.removeItem("token");
          navigate("/connexion");
          return;
        }
        console.error("Autre erreur lors de la vérification du profil vendeur");
        message.error("Erreur lors de la vérification du profil vendeur");
        return;
      }

      // Vérification des champs requis
      if (
        !allValues.title ||
        !allValues.description ||
        !allValues.price ||
        !allValues.category
      ) {
        message.error("Veuillez remplir tous les champs obligatoires");
        return;
      }

      // Récupérer l'ID de la catégorie
      const categoriesResponse = await sellerService.getCategories();
      const categories = categoriesResponse.data;
      const selectedCategory = categories.find(
        (cat) => cat.name.toLowerCase() === allValues.category.toLowerCase()
      );

      if (!selectedCategory) {
        message.error("Catégorie non trouvée");
        return;
      }

      // 1. Création de l'article
      const articleData = {
        title: allValues.title,
        description: allValues.description,
        price: parseFloat(allValues.price),
        tags: [
          allValues.category,
          allValues.title ? allValues.title.split(" ")[0] : allValues.category,
        ], // Ajoute la catégorie et le premier mot du titre (ou la catégorie si pas de titre)
        categoryId: selectedCategory.id,
      };

      console.log("Données de l'article à envoyer:", articleData);

      const articleResponse = await sellerService.createArticle(articleData);
      console.log("Réponse de création d'article:", articleResponse);

      const articleId = articleResponse.data.id;
      console.log("ID de l'article créé:", articleId);

      // 2. Upload des images
      console.log("Nombre d'images à uploader:", fileList.length);
      for (const file of fileList) {
        if (file.originFileObj) {
          console.log("Upload de l'image:", file.name);
          await sellerService.uploadArticleImage(articleId, file.originFileObj);
          console.log("Image uploadée avec succès:", file.name);
        }
      }

      message.success("Votre annonce a été publiée avec succès!");
      console.log("Redirection vers l'article:", articleId);
      navigate(`/produit/${articleId}`); // Redirige vers la page du produit
    } catch (error) {
      console.error("Erreur lors de la publication:", error);
      console.error("Détails de l'erreur:", {
        message: error.message,
        response: error.response,
        request: error.request,
        config: error.config,
      });

      if (error.response) {
        // Erreur venant du backend
        console.error("Erreur backend:", error.response.data);
        message.error(error.response.data.message || "Erreur serveur");
      } else if (error.request) {
        // La requête a été faite mais aucune réponse n'a été reçue
        console.error("Pas de réponse du serveur");
        message.error("Pas de réponse du serveur");
      } else {
        // Erreur lors de la configuration de la requête
        console.error("Erreur de configuration:", error.message);
        message.error("Erreur de configuration de la requête");
      }
    } finally {
      setLoading(false);
    }
  };

  const nextStep = async () => {
    try {
      // Valider les champs de l'étape actuelle
      const currentStepFields = getStepFields(currentStep);
      await form.validateFields(currentStepFields);

      // Sauvegarder les valeurs de l'étape actuelle
      const currentValues = form.getFieldsValue(currentStepFields);
      setFormData((prev) => ({ ...prev, ...currentValues }));

      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.error("Erreur de validation:", error);
    }
  };

  const prevStep = () => {
    const newStep = currentStep - 1;
    setCurrentStep(newStep);
    // Initialiser les champs de l'étape précédente avec les valeurs sauvegardées
    setTimeout(() => {
      const prevStepFields = getStepFields(newStep);
      const prevStepValues = {};
      prevStepFields.forEach((field) => {
        if (formData[field]) {
          prevStepValues[field] = formData[field];
        }
      });
      form.setFieldsValue(prevStepValues);
    }, 100);
  };

  const getStepFields = (step) => {
    switch (step) {
      case 0: // Photos - pas de champs à valider
        return [];
      case 1: // Détails
        return ["title", "description", "category", "price"];
      case 2: // Localisation
        return ["city", "postalCode"];
      default:
        return [];
    }
  };

  const steps = [
    {
      title: "Photos",
      content: (
        <div className="flex justify-center items-center min-h-[50vh] w-full">
          <div className="w-full max-w-md p-6 border-2 border-dashed border-[#346644] rounded-lg bg-[#f8faf7] hover:bg-[#e8f3e5] transition-colors">
            <h2 className="text-xl font-semibold mb-4 text-green-800 text-center">
              Ajoutez vos photos
            </h2>
            <p className="text-gray-400 mb-6 text-center">
              La première photo sera la photo principale. Vous pouvez ajouter
              jusqu'à 5 photos.
            </p>
            <Upload.Dragger
              customRequest={handleUpload}
              beforeUpload={beforeUpload}
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              multiple
              maxCount={5}
              className="border-2 border-dashed border-[#346644] rounded-lg bg-[#CFF3CF] hover:bg-[#A6CB9C] transition-colors"
            >
              <p className="ant-upload-drag-icon text-[#346644]">
                <InboxOutlined className="text-3xl" />
              <p className="ant-upload-drag-icon text-[#346644]">
                <InboxOutlined className="text-3xl" />
              </p>
              <p className="ant-upload-text font-medium">
              <p className="ant-upload-text font-medium">
                Cliquez ou glissez-déposez vos photos
              </p>
              <p className="ant-upload-hint text-gray-400">
                Formats supportés: JPG, PNG, JPEG (max 5MB par image)
              </p>
            </Upload.Dragger>
            {fileList.length > 0 && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  {fileList.length} photo{fileList.length > 1 ? "s" : ""}{" "}
                  sélectionnée{fileList.length > 1 ? "s" : ""}
                </p>
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      title: "Détails",
      content: (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6 text-green-800">
            Décrivez votre article
          </h2>

          <Form.Item
            name="title"
            label={
              <span className="font-medium text-green-900">
                Titre de l'annonce
              </span>
            }
            rules={[{ required: true, message: "Ce champ est obligatoire" }]}
          >
            <Input
              placeholder="Ex: Ordinateur portable HP en excellent état"
              className="py-2 rounded-lg border-green-800 hover:border-[#346644]"
            />
          </Form.Item>

          <Form.Item
            name="description"
            label={
              <span className="font-medium text-green-900">Descriptions</span>
            }
            rules={[{ required: true, message: "Ce champ est obligatoire" }]}
          >
            <TextArea
              rows={6}
              placeholder="Décrivez précisément votre article (état, spécificités, raison de la vente...)"
              className="rounded-lg border-green-800 hover:border-green-700 focus:border-[#346644]"
            />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              name="category"
              label={
                <span className="font-medium text-green-900">Catégorie</span>
              }
              rules={[{ required: true, message: "Ce champ est obligatoire" }]}
            >
              <Select
                placeholder="Sélectionnez une catégorie"
                className="rounded-lg border-green-800 hover:border-[#346644]"
              >
                <Option value="immobilier">Immobilier</Option>
                <Option value="electromenager">Électroménager</Option>
                <Option value="vehicules">Véhicules</Option>
                <Option value="informatique">Informatique</Option>
                <Option value="bricolage">Bricolage</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="price"
              label={
                <span className="font-medium text-green-900">Prix (€)</span>
              }
              rules={[{ required: true, message: "Ce champ est obligatoire" }]}
            >
              <Input
                type="number"
                placeholder="0"
                addonAfter="€"
                className="rounded-lg border-gray-300 hover:border-[#346644] focus:border-[#346644]"
              />
            </Form.Item>
          </div>
        </div>
      ),
    },
    {
      title: "Localisation",
      content: (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6 text-green-800">
            Où se trouve votre article ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              name="city"
              label={<span className="font-medium text-green-900">Ville</span>}
              rules={[{ required: true, message: "Ce champ est obligatoire" }]}
            >
              <Input
                placeholder="Ex: Paris"
                className="py-2 rounded-lg border-green-800 hover:border-[#346644]"
              />
            </Form.Item>

            <Form.Item
              name="postalCode"
              label={
                <span className="font-medium text-green-900">Code postal</span>
              }
              rules={[{ required: true, message: "Ce champ est obligatoire" }]}
            >
              <Input
                placeholder="Ex: 75000"
                className="py-2 rounded-lg border-green-800 hover:border-[#346644]"
              />
            </Form.Item>
          </div>

          <div className="mt-8 p-4 bg-[#CFF3CF] border border-[#346644] rounded-lg">
            <h3 className="font-medium text-green-900 mb-2">
              Conseil de sécurité
            </h3>
            <p className="text-gray-600 text-sm">
              Pour votre sécurité, ne communiquez pas d'informations
              personnelles sensibles.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#0F2E19] min-h-screen flex justify-center items-center pt-10 pb-12">
      <div className="bg-green-50 mx-8 rounded-2xl p-10 w-2/2 shadow-lg">
        {/* Titre avec bouton de retour */}
        <div className="flex justify-between items-center mb-6 border-b-2 pb-4 border-green-200">
          <h1 className="text-2xl font-bold text-gray-800">
            Vendre un article sur La Caverne
          </h1>

          <button
            onClick={() => navigate("/")}
            className="text-[#346644] hover:text-[#0B4612] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mb-10">
          <Steps
            current={currentStep}
            className="px-4"
            labelPlacement="vertical"
            style={{ color: "#346644" }}
          >
            {steps.map((item) => (
              <Step
                key={item.title}
                title={<span style={{ color: "#346644" }}>{item.title}</span>}
              />
            ))}
          </Steps>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="w-full flex flex-col items-center"
        >
          <div className="w-full max-w-2xl">
            <Card className="shadow-xl">{steps[currentStep].content}</Card>
          </div>
          <div className="w-full max-w-2xl flex justify-between mt-8 pt-6 relative">
            {currentStep > 0 && (
              <Button onClick={prevStep} size="large" color="#346644">
                Précédent
              </Button>
            )}

            {currentStep < steps.length - 1 ? (
              <Button onClick={nextStep} size="large" className="ml-auto">
              <Button onClick={nextStep} size="large" className="ml-auto">
                Suivant
              </Button>
            ) : (
              <Button
                htmlType="submit"
                size="large"
                loading={loading}
                className="ml-auto"
                onClick={() => {
                  console.log("Bouton Vendre l'article cliqué");
                  console.log(
                    "Étapes complétées:",
                    currentStep === steps.length - 1
                  );
                  console.log(
                    "Formulaire valide:",
                    form.getFieldsError().length === 0
                  );
                }}
              >
                Vendre l'article
              </Button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Vendre;
