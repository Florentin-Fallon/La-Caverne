import React, { useState } from "react";
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
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;

function Sell() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleUpload = async (options) => {
    const { file } = options;
    setTimeout(() => {
      setFileList((prev) => [
        ...prev,
        {
          uid: file.uid,
          name: file.name,
          status: "done",
          url: URL.createObjectURL(file),
        },
      ]);
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
      navigate("/");
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
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="w-full max-w-lg p-6 border-2 border-dashed border-[#346644] rounded-lg bg-[#f8faf7] hover:bg-[#e8f3e5] transition-colors">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
              Ajoutez vos photos
            </h2>
            <p className="text-gray-600 mb-6 text-center">
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
              className="border-2 border-dashed border-[#346644] rounded-lg bg-[#f8faf7] hover:bg-[#e8f3e5] transition-colors"
            >
              <p className="ant-upload-drag-icon text-[#346644]">
                <InboxOutlined className="text-3xl" />
              </p>
              <p className="ant-upload-text font-medium text-gray-700">
                Cliquez ou glissez-déposez vos photos
              </p>
              <p className="ant-upload-hint text-gray-500">
                Formats supportés: JPG, PNG (max 5MB par image)
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
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Décrivez votre article
          </h2>

          <Form.Item
            name="title"
            label={
              <span className="font-medium text-gray-700">
                Titre de l'annonce
              </span>
            }
            rules={[{ required: true, message: "Ce champ est obligatoire" }]}
          >
            <Input
              placeholder="Ex: Ordinateur portable HP en excellent état"
              className="py-2 rounded-lg border-gray-300 hover:border-[#346644] focus:border-[#346644]"
            />
          </Form.Item>

          <Form.Item
            name="description"
            label={
              <span className="font-medium text-gray-700">Descriptions s</span>
            }
            rules={[{ required: true, message: "Ce champ est obligatoire" }]}
          >
            <TextArea
              rows={6}
              placeholder="Décrivez précisément votre article (état, spécificités, raison de la vente...)"
              className="rounded-lg border-gray-300 hover:border-[#346644] focus:border-[#346644]"
            />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              name="category"
              label={
                <span className="font-medium text-gray-700">Catégorie</span>
              }
              rules={[{ required: true, message: "Ce champ est obligatoire" }]}
            >
              <Select
                placeholder="Sélectionnez une catégorie"
                className="rounded-lg border-gray-300 hover:border-[#346644]"
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
                <span className="font-medium text-gray-700">Prix (€)</span>
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
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Où se trouve votre article ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              name="city"
              label={<span className="font-medium text-gray-700">Ville</span>}
              rules={[{ required: true, message: "Ce champ est obligatoire" }]}
            >
              <Input
                placeholder="Ex: Paris"
                className="py-2 rounded-lg border-gray-300 hover:border-[#346644] focus:border-[#346644]"
              />
            </Form.Item>

            <Form.Item
              name="postalCode"
              label={
                <span className="font-medium text-gray-700">Code postal</span>
              }
              rules={[{ required: true, message: "Ce champ est obligatoire" }]}
            >
              <Input
                placeholder="Ex: 75000"
                className="py-2 rounded-lg border-gray-300 hover:border-[#346644] focus:border-[#346644]"
              />
            </Form.Item>
          </div>

          <div className="mt-8 p-4 bg-[#f8faf7] border border-[#e8f3e5] rounded-lg">
            <h3 className="font-medium text-gray-700 mb-2">
              Conseil de sécurité
            </h3>
            <p className="text-gray-600 text-sm">
              Pour votre sécurité, privilégiez les rencontres dans des lieux
              publics. Ne communiquez pas d'informations personnelles sensibles.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#0F2E19] min-h-screen pt-5 pb-10">
      <div className="bg-white mx-5 rounded-2xl p-5 shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4 border-gray-200">
          Vendre un article sur La Caverne
        </h1>

        <Steps current={currentStep} className="mb-8 px-4">
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="max-w-4xl mx-auto"
        >
          <Card className="border-0 shadow-none">
            {steps[currentStep].content}
          </Card>

          <div className="flex justify-between mt-8 border-t pt-6 border-gray-200">
            {currentStep > 0 && (
              <Button
                onClick={prevStep}
                size="large"
                className="border-[#346644] text-[#346644] hover:bg-[#f0f7f2]"
              >
                Précédent
              </Button>
            )}

            {currentStep < steps.length - 1 ? (
              <Button
                onClick={nextStep}
                size="large"
                className="bg-[#346644] text-white hover:bg-[#2a5538] ml-auto"
              >
                Suivant
              </Button>
            ) : (
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                className="bg-[#346644] text-white hover:bg-[#2a5538] ml-auto"
              >
                Publier l'annonce
              </Button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Sell;
