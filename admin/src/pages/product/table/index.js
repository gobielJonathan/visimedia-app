import { Button, Image, Input, message, Popconfirm, Space, Table } from "antd";
import DOMPurify from "dompurify";
import { useCallback, useState } from "react";
import { useEffect, useMemo } from "react";
import useDebounce from "src/shared/hooks/useDebounce";
import { useProduct } from "../../../context/product-context";

export default function ProductTable({ onUpdate }) {
  const { getAll, products, remove, search } = useProduct();
  const [valueQuery, setValueQuery] = useState("");

  const debounceQuery = useDebounce(valueQuery, 100);
  useEffect(() => {
    if (debounceQuery) {
      search(debounceQuery);
    } else {
      getAll();
    }
  }, [debounceQuery, getAll, search]);

  const onDelete = useCallback(
    async (id) => {
      try {
        await remove(id);
        message.success("Success delete product");
      } catch (error) {
        message.error(error);
      }
    },
    [remove]
  );

  const columns = useMemo(
    () => [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        render: (val) => (
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(val) }} />
        ),
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        render: (val) => "Rp." + Number(val).toLocaleString("id-ID"),
      },
      {
        title: "Image",
        dataIndex: "public_image_url",
        key: "public_image_url",
        render: (value) => {
          return (
            value && (
              <Image
                width={200}
                src={process.env.REACT_APP_IMAGE_URL + value}
                loading="lazy"
              />
            )
          );
        },
      },

      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle" direction="vertical">
            <Button onClick={() => onUpdate(record.id)}>Update</Button>
            <Popconfirm
              title="Are you sure to delete this data?"
              onConfirm={() => onDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <a href="#">
                <Button danger>Delete</Button>
              </a>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [onDelete, onUpdate]
  );

  return (
    <>
      <Input
        placeholder="Cari Product"
        onChange={(e) => setValueQuery(e.target.value)}
      />
      <Table
        dataSource={products.map((data, idx) => ({ ...data, key: idx }))}
        columns={columns}
      />
    </>
  );
}
