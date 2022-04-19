import React, {useEffect, useRef} from 'react';
import {Form, Input, Button, Select, InputRef} from 'antd';
import {priorities} from "../../mock/priorities";
import {Callbacks} from "rc-field-form/lib/interface";
import {Todo} from "../../types/Todo";

export interface TodoSaveProps {
    onFinish?: Callbacks<{title: string, priority: number}>['onFinish'];
    onCancel?: () => void,
    selectedTodo?: Todo
}

const TodoSave: React.FC<TodoSaveProps> = ({onFinish, onCancel, selectedTodo}) => {
    const [form] = Form.useForm();
    const titleRef = useRef<InputRef>(null);

    useEffect(() => {
        if (!selectedTodo) {
            titleRef.current?.focus()
        }
    }, [titleRef, selectedTodo])

    return (
        <div>
            <Form initialValues={{title: "", priority: 0, ...selectedTodo}} form={form} onFinish={onFinish} layout="vertical">
                <Form.Item required={Boolean(!selectedTodo)} name="title" label="Title" rules={[{ required: true }]}>
                    <Input readOnly={Boolean(selectedTodo)} ref={titleRef} />
                </Form.Item>
                <Form.Item name="priority" label="Priority" rules={[{ required: true }]}>
                    <Select>
                        { priorities.map(priority => <Select.Option key={priority.level} value={priority.level}>{priority.title}</Select.Option>) }
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Save</Button>
                    <Button type="default" style={{marginLeft: 8}} onClick={onCancel} htmlType="button">Cancel</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default TodoSave;