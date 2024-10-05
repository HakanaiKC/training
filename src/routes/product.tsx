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
import { useContext, useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { AppContext } from "../context/AppContext";

export default function Product() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState<any>({
    id: 0,
    title: "",
    price: 0,
    discount: 0,
    rating: 0,
  });
  const [isEdit, setIsEdit] = useState<boolean>()
  const { dataProducts, setDataProducts } = useContext(AppContext)

  // async function getListProduct() {
  //   const product = await productService.getProducts();
  //   setDataProducts(product.products);
  // }

  function handleOpen(data: any) {
    setIsModalOpen(true);
    setIsEdit(true);
    setProduct({
      id: data.id,
      title: data.title,
      price: data.price,
      rating: data.rating,
      discount: data.discountPercentage,
    });
  }

  function handleEdit(e: any) {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  }

  async function handleSave() {
    if (isEdit) {
      const result = await productService.updateProduct(product.id, product);
      if (result.status == 200) {
        // console.log({ ...dataProducts, result });
        // setDataProducts({ ...dataProducts, result });
        const updateItem = result.data
        const mappedProduct: any[] = dataProducts.map((product: any) =>
          product.id === updateItem.id ? { ...product, ...updateItem } : product
        );
        setDataProducts(mappedProduct);
        // console.log(mappedProduct);
      }
      setIsModalOpen(false);
    } else {
      const result = await productService.addProduct(product);
      console.log(result.data);
      const newItem = result.data
      const listProduct = dataProducts

      if (result.status == 201) {
        listProduct.push(newItem)
        setDataProducts(listProduct)
      }
      setIsModalOpen(false);
    }
  }

  async function handleAdd() {
    setIsModalOpen(true);
    setIsEdit(false);
    setProduct({
      id: 0,
      title: "",
      price: 0,
      discount: 0,
      rating: 0
    })
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
      setDataProducts((prevProducts: any) =>
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
          {tags && tags.map((tag: any) => (
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
      render: (_: any, record: any) => (
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

  return (
    <div id="product">
      <Button onClick={handleAdd}>Add New</Button>
      {dataProducts && dataProducts.length > 0 ? (
        <Table dataSource={dataProducts} columns={columns} rowKey="id" />
      ) : (
        <p>No data here...</p>
      )}

      <Modal
        title={isEdit ? "EDIT SINGLE PRODUCT" : "CREATE SINGLE PRODUCT"}
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
