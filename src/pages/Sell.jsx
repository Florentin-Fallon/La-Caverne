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

const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;

function Sell() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Nettoyage des URLs créées
  useEffect(() => {
    return () => {
      fileList.forEach(file => {
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
    setLoading(true);
    try {
      console.log("Données du formulaire:", values);
      console.log("Images:", fileList);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      message.success("Votre annonce a été publiée avec succès!");
      
      // Redirection vers la page de profil avec les données du nouvel article
      navigate("/profil", { 
        state: { 
          newArticle: {
            ...values,
            images: fileList
          } 
        } 
      });
    } catch (error) {
      message.error("Erreur lors de la publication");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
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
                <InboxOutlined className="text-3xl text-green-800" />
              </p>
              <p className="ant-upload-text font-medium text-green-900">
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
              <Button onClick={nextStep} size="large" color="#346644" className="ml-auto">
                Suivant
              </Button>
            ) : (
              <Button
                htmlType="submit"
                size="large"
                color="#346644"
                loading={loading}
                className="ml-auto"
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

export default Sell;
