import Scrollable from "@/components/Scrollable";
import { Col, Row } from "antd";
import React from "react";

function mentions() {
  const users = [
    {
      id: "walter",
      display: "Walter White",
    },
    {
      id: "monton onnom",
      display: "Monton Onnom",
    },
    {
      id: "pipilu",
      display: "皮皮鲁",
    },
    {
      id: "luxixi",
      display: "鲁西西",
    },
    {
      id: "satoshi1",
      display: "中本聪",
    },
    {
      id: "satoshi2",
      display: "サトシ・ナカモト",
    },
    {
      id: "nobi",
      display: "野比のび太",
    },
    {
      id: "sung",
      display: "성덕선",
    },
    {
      id: "jesse",
      display: "Jesse Pinkman",
    },
    {
      id: "gus",
      display: 'Gustavo "Gus" Fring',
    },
    {
      id: "saul",
      display: "Saul Goodman",
    },
    {
      id: "hank",
      display: "Hank Schrader",
    },
    {
      id: "skyler",
      display: "Skyler White",
    },
    {
      id: "mike",
      display: "Mike Ehrmantraut",
    },
    {
      id: "lydia",
      display: "Lydìã Rôdarté-Qüayle",
    },
  ];

  return (
    <Row align={"middle"} justify={"center"}>
      <Col>
        <Scrollable data={users} />
      </Col>
    </Row>
  );
}

export default mentions;
