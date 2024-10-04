/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Flex,
  Input,
  Modal,
  Progress,
  Slider,
  Table,
  Tag,
  Typography,
} from "antd";
import productService from "../services/productService";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export default function Product() {
  const [dataProducts, setProducts] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState<any>({
    id: 0,
    title: "",
    price: 0,
    discount: "",
    rating: 0,
  });

  async function getListProduct() {
    const product = await productService.getProducts();
    setProducts(product.products);
  }

  function handleOpen(data: any) {
    setIsModalOpen(true);
    setProduct({
      id: data.id,
      title: data.title,
      price: data.price,
      discount: data.discountPercentage,
    });
  }

  function handleEdit(e) {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  }

  async function handleSave() {
    const result = await productService.updateProduct(product.id, product);
    setProducts({ ...dataProducts, result });
    setIsModalOpen(false);
  }

  async function handleDelete(data: any) {
    if (!data || !data.id) {
      console.error(
        "Invalid data passed to handleDelete. Expected data with an 'id' field."
      );
      return;
    }

    try {
      const result = await productService.deleteProducts(data.id);
      setProducts((prevProducts: any) =>
        prevProducts.filter((product: any) => product.id !== data.id)
      );
      console.log("Product deleted successfully:", result);
    } catch (error) {
      console.error("Error occurred during deletion:", error);
    }
  }

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags: any) => (
        <>
          {tags.map((tag: any) => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Discount Percentage",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
    },
    {
      title: "Action",
      render: (_, record: any) => (
        <Flex gap="small" wrap>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleOpen(record)}
          />
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              handleDelete(record);
            }}
          />
        </Flex>
      ),
    },
  ];

  useEffect(() => {
    getListProduct();
  }, []);

  return (
    <div id="product">
      {dataProducts && dataProducts.length > 0 ? (
        <Table dataSource={dataProducts} columns={columns} rowKey="id" />
      ) : (
        <p>No data here...</p>
      )}

      <Modal
        title="EDIT SINGLE PRODUCT"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Save
          </Button>,
        ]}
      >
        <div className="modal">
          <div className="title">
            <Typography.Title level={5}>Title</Typography.Title>
            <Input
              size="large"
              name="title"
              value={product.title}
              onChange={(e) => handleEdit(e)}
              placeholder="Enter product title"
            />
          </div>

          <div className="price">
            <Typography.Title level={5}>Price ($)</Typography.Title>
            <Input
              size="large"
              name="price"
              value={product.price}
              onChange={(e) => handleEdit(e)}
              placeholder="Enter product price"
            />
          </div>

          <div className="discount">
            <Typography.Title level={5}>Discount (%)</Typography.Title>
            <Input
              size="large"
              name="discount"
              onChange={(e) => handleEdit(e)}
              placeholder="Enter discount percentage"
              value={product.discount}
            />
          </div>

          <div className="rating">
            <Typography.Title level={5}>Rating (%)</Typography.Title>
            <Progress percent={product.rating} />
            <Slider
              min={0}
              max={100}
              value={product.rating}
              onChange={(e) => setProduct({ ...product, rating: e })}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
