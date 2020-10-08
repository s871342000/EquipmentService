import React from "react";
import {
  Divider,
  Form,
  Input,
  Label,
  Segment,
  TextArea,
} from "semantic-ui-react";

export const DeviceDetail = () => {
  return (
    <Segment style={{ overflow: "scroll", maxHeight: "80%" }}>
      <Form>
        <Form.Field>
          <Label size="huge">客戶名稱</Label>
          <Input type="text" placeholder="請輸入客戶名稱" />
        </Form.Field>
        <Divider />

        <Form.Field inline>
          <Label>購買日期</Label>
          <Input type="date" />
          <Label>機型</Label>
          <Input type="text" placeholder="請輸入機型" />
          <Label>型號</Label>
          <Input type="text" placeholder="請輸入型號" />
        </Form.Field>
        <Divider />

        <Form.Field>
          <Label size="huge">維護模式</Label>
        </Form.Field>
        <Form.Field inline>
          <Label>保固</Label>
          <Input type="date" />
          <Input type="date" />
        </Form.Field>
        <Form.Field inline>
          <Label>租賃</Label>
          <Input type="date" />
          <Input type="date" />
        </Form.Field>
        <Form.Field inline>
          <Label>保養</Label>
          <Input type="date" />
          <Input type="date" />
        </Form.Field>
        <Divider />

        <Form.Field className="form field record">
          <Label>保養紀錄</Label>
          <Form.Field inline>
            <Input type="date" />
            <TextArea placeholder="請輸入保養紀錄" />
          </Form.Field>
          <Label>維修紀錄</Label>
          <Form.Field inline>
            <Input type="date" />
            <TextArea placeholder="請輸入維修紀錄" />
          </Form.Field>
          <Label>改版紀錄</Label>
          <Form.Field inline>
            <Input type="date" />
            <TextArea placeholder="請輸入改版紀錄" />
          </Form.Field>
        </Form.Field>
      </Form>
    </Segment>
  );
};
