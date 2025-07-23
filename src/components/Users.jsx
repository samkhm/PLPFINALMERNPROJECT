import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserAndRoomTable from "./UserAndRoomTable";

import { Button } from "@/components/ui/button";

export default function Users({ users, userAndRoom }) {
  const admins = users.filter((user) => user.role === "admin");
  const normalUsers = users.filter((user) => user.role === "user");


  const doPrinting = (elementId) => {
    const content = document.getElementById(elementId);
    const printWindow = window.open('', '_blank', 'width=800,height=600');

    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Report</title>
            <style>
              body { font-family: sans-serif; padding: 20px; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
              caption { font-size: 1.2em; margin-bottom: 10px; }
            </style>
          </head>
          <body>
            ${content?.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const renderTable = (title, data, id) => (
    <div className="bg-gray-200 w-full p-4 rounded-md shadow-md">
      <div id={id}>
        <Table className="mb-4">
          <TableCaption>{title}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No.</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Phone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((user, index) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-right">{user.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>Total: {data.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <Button onClick={() => doPrinting(id)}>Print</Button>
    </div>
  );





  return (
    <div className="p-4 flex flex-col gap-8 items-center">
      {renderTable("A list of system admins", admins, "print-admins")}
      {renderTable("A list of system users", normalUsers, "print-users")}

     <UserAndRoomTable userAndRoom={userAndRoom}/>
   
    </div>
  );
}
