import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, message, Button, Select, Input, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;

function Vendre() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (options) => {
    const { file } = options;
    // Simuler l'upload (à remplacer par l'appel API réel)
    setTimeout(() => {
      setFileList(prev => [...prev, {
        uid: file.uid,
        name: file.name,
        status: 'done',
        url: URL.createObjectURL(file),
      }]);
    }, 1000);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Vous ne pouvez uploader que des fichiers JPG/PNG!');
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('L\'image doit faire moins de 5MB!');
    }
    return isJpgOrPng && isLt5M;
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Ici, vous enverrez les données au backend C#
      console.log('Données du formulaire:', values);
      console.log('Images:', fileList);
      
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      message.success('Votre annonce a été publiée avec succès!');
      navigate('/');
    } catch (error) {
      message.error('Erreur lors de la publication de l\'annonce');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0F2E19] min-h-screen pt-5 pb-10">
      <div className="bg-white mx-5 rounded-2xl p-5">
        <h1 className="text-2xl font-bold mb-6">Vendre un article</h1>
        
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="max-w-3xl mx-auto"
        >
          {/* Section Photos */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Photos</h2>
            <p className="text-gray-500 mb-4">
              Ajoutez jusqu'à 10 photos. La première sera la photo principale.
            </p>
            <Upload
              customRequest={handleUpload}
              beforeUpload={beforeUpload}
              listType="picture-card"
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              multiple
              maxCount={10}
            >
              {fileList.length >= 10 ? null : (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Ajouter une photo</div>
                </div>
              )}
            </Upload>
          </div>

          {/* Section Titre et Description */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Titre et description</h2>
            <Form.Item
              name="title"
              label="Titre de l'annonce"
              rules={[{ required: true, message: 'Veuillez saisir un titre' }]}
            >
              <Input placeholder="Ex: Ordinateur portable HP en excellent état" />
            </Form.Item>
            
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Veuillez saisir une description' }]}
            >
              <TextArea
                rows={6}
                placeholder="Décrivez votre article en détail (état, spécificités, raison de la vente...)"
              />
            </Form.Item>
          </div>

          {/* Section Catégorie et Prix */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Détails</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="category"
                label="Catégorie"
                rules={[{ required: true, message: 'Veuillez sélectionner une catégorie' }]}
              >
                <Select placeholder="Sélectionnez une catégorie">
                  <Option value="immobilier">Immobilier</Option>
                  <Option value="electromenager">Électroménager</Option>
                  <Option value="vehicules">Véhicules</Option>
                  <Option value="informatique">Informatique</Option>
                  <Option value="bricolage">Bricolage</Option>
                </Select>
              </Form.Item>
              
              <Form.Item
                name="price"
                label="Prix (€)"
                rules={[{ required: true, message: 'Veuillez saisir un prix' }]}
              >
                <Input type="number" placeholder="0" addonAfter="€" />
              </Form.Item>
            </div>
          </div>

          {/* Section Localisation */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Localisation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="city"
                label="Ville"
                rules={[{ required: true, message: 'Veuillez saisir votre ville' }]}
              >
                <Input placeholder="Ex: Paris" />
              </Form.Item>
              
              <Form.Item
                name="postalCode"
                label="Code postal"
                rules={[{ required: true, message: 'Veuillez saisir votre code postal' }]}
              >
                <Input placeholder="Ex: 75000" />
              </Form.Item>
            </div>
          </div>

          {/* Bouton de soumission */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              className="w-full md:w-auto bg-[#346644] hover:bg-[#2a5538]"
            >
              Publier l'annonce
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Vendre;