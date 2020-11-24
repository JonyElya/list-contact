import React, {useCallback, useEffect, useState} from "react"
import {Layout, Table, InputNumber, Input, Form, Popconfirm, Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {editUser, getUsers, searchUser} from "../../../store/users/actions";
import "./style.css"

const { Content } = Layout
const { Search } = Input

const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          record,
                          index,
                          children,
                          ...restProps
                      }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const MainPage =()=> {
    const dispatch = useDispatch()
    const {users} =  useSelector((state)=> state.users)
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const [input, setInput] = useState('')

    const isEditing = (record) => record.id === editingKey;

    useEffect(()=>{
        dispatch(getUsers())
    }, [dispatch])

    const edit = useCallback((record) => {
        form.setFieldsValue({
            name: '',
            phone: '',
            website: '',
            email: '',
            ...record,
        });
        setEditingKey(record.id);
    },[form])

    const cancel = useCallback(() => {
        setEditingKey('');
    },[])

    const changeText = (e) => setInput(e.target.value);

    const find = useCallback(() =>{
        dispatch(searchUser(input.trim()))
    }, [dispatch, input])

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...users];
            const index = newData.findIndex((item) => key === item.id);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {...item, ...row});
                dispatch(editUser(newData))
                localStorage.setItem("users", JSON.stringify(newData))
                setEditingKey('');
            } else {
                newData.push(row);
                dispatch(editUser(newData))
                localStorage.setItem("users", JSON.stringify(newData))
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: "3%",
            fixed: 'left',
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: "10%",
            editable: true,
        },
        {
            title: "User name",
            dataIndex: "username",
            key: "username",
            width: 200,
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
            width: 150,
            editable: true,
        },
        {
            title: "Web Site",
            dataIndex: "website",
            key: "website",
            width: 150,
            editable: true,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: 150,
            editable: true,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            fixed: 'right',
            width: "5%",
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
            <Button
                onClick={() => save(record.id)}
                className="action-link"
            >
              Save
            </Button>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Button>Cancel</Button>
            </Popconfirm>
          </span>
                ) : (
                    <Button disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Button>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Content>
            <div className="site-layout-content contact-list">
                <Search
                    placeholder="Enter name"
                    size="large"
                    onChange={changeText}
                    value={input}
                    onSearch={find}
                    className="input-search"
                />
                <Form form={form} component={false}>
                    <Table
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        bordered
                        rowKey="id"
                        dataSource={users}
                        columns={mergedColumns}
                        rowClassName="editable-row"
                        pagination={{
                            onChange: cancel
                        }}
                        scroll={{ x: 1300 }}
                    />
                </Form>
            </div>
        </Content>
    )
}

export default MainPage