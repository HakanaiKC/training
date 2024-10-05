import { Modal, Button, Typography, Input, Progress, Slider } from "antd";

export default function ModalComponent({isEdit, isModalOpen, setIsModalOpen, setProduct, handleEdit, handleSave, product}){
    return(
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
              value={isEdit ? product.title : ""}
              onChange={(e) => handleEdit(e)}
              placeholder="Enter product title"
            />
          </div>

          <div className="price">
            <Typography.Title level={5}>Price ($)</Typography.Title>
            <Input
              size="large"
              name="price"
              value={isEdit ? product.price : 0}
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
              value={isEdit ? product.discount : 0}
            />
          </div>

          <div className="rating">
            <Typography.Title level={5}>Rating (%)</Typography.Title>
            <Progress percent={isEdit ? product.rating : 0} />
            <Slider
              min={0}
              max={100}
              value={isEdit ? product.rating : 0}
              onChange={(e) => setProduct({ ...product, rating: e })}
            />
          </div>
        </div>
      </Modal>
    )
}