import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableTitle,
  Header,
  TableRow,
} from "./ui/Table";

export default function UserTable({ users }) {
  return (
    <Table>
      <Header>
        <TableRow>
          <TableTitle>ID</TableTitle>
          <TableTitle>Name</TableTitle>
          <TableTitle>Email</TableTitle>
        </TableRow>
      </Header>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
