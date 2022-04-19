import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Input, Popconfirm, Row, Select, Table, TableColumnsType, Tag} from "antd";
import {todos} from "../../mock/todo";
import {Todo} from "../../types/Todo";
import {AppContext} from "../../providers/AppProvider";
import {priorities} from "../../mock/priorities";
import {DeleteFilled, EditFilled} from "@ant-design/icons";

export interface TodoTableProps {
    onEdit?: (todo : Todo) => void
}

const TodoTable: React.FC<TodoTableProps> = ({onEdit}) => {
    const {todos, setTodos, priorities} = useContext(AppContext)
    const [filter, setFilter] = useState<{title: string, priority: number}>({title: '', priority: -1});
    const [filteredTodos, setFilteredTodos] = useState<Todo[]>();

    useEffect(() => {
        setFilteredTodos(todos.filter(todo => todo.title.toLocaleLowerCase('tr').indexOf(filter.title.toLocaleLowerCase('tr')) > -1  && (filter.priority === -1 || todo.priority === filter.priority) ))
    }, [filter, todos])

    const onDelete = (index: number) => {
        todos.splice(index, 1)
        setTodos([...todos])
    }

    useEffect(() => {
        console.log('değişti', todos)
    }, [todos])

    const columns: TableColumnsType<Todo> = [
        {
            title: 'Title',
            dataIndex: 'title',
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.title.localeCompare(b.title, 'tr')
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            width: 100,
            render: (value, record, index) => {
                const priority = priorities.find(x => x.level === value)
                return (
                    <Tag color={priority?.color}>{priority?.title}</Tag>
                )
            },
            sorter: (a, b) => a.priority - b.priority,
            sortDirections: ['descend', 'ascend'],
            defaultSortOrder: "descend",
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            width: 100,
            render: (value, record, index) => (
                <div>
                    <Button type="ghost" size="small" style={{marginRight: 8}} onClick={() => onEdit?.(record)}>
                        <EditFilled />
                    </Button>
                    <Popconfirm title="Are u sure?" onConfirm={() => onDelete(index)}>
                        <Button type="ghost" size="small">
                            <DeleteFilled />
                        </Button>
                    </Popconfirm>
                </div>
            )
        },
    ];

    return (
        <div>
            <div style={{marginBottom: 16}}>
                <Row>
                    <Col flex="auto">
                        <Input placeholder="Search..." onChange={e => setFilter({priority: filter.priority, title: e.target.value})} style={{ width: '100%' }} defaultValue="" />
                    </Col>
                    <Col flex="100px">
                        <Select onChange={(val) => setFilter({priority: val, title: filter.title}) } style={{ width: '100%' }} defaultValue={-1}>
                            <Select.Option key={-1} value={-1}>All</Select.Option>
                            { priorities.map(priority => <Select.Option key={priority.level} value={priority.level}>{priority.title}</Select.Option>) }
                        </Select>
                    </Col>
                </Row>
            </div>
            <Table
                rowKey="id"
                pagination={false}
                style={{width: '100%'}}
                columns={columns}
                dataSource={filteredTodos}
            />
        </div>
    );
};

export default TodoTable;