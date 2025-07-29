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
import { Button } from "@/components/ui/button";

export default function Users({ userAndRoom }) {
  const tableId = "user-table";

  const doPrinting = (elementId) => {
    const content = document.getElementById(elementId);
    const printWindow = window.open('', '_blank', 'width=800,height=600');

    if (printWindow && content) {
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
            ${content.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="bg-gray-200 w-full p-4 rounded-md shadow-md">
      
      <div id={tableId}>
        <Table>
          <TableCaption>A list of system users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No.</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Room Number</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userAndRoom.map((user, index) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{user.owner?.firstName}</TableCell>
                <TableCell>{user.owner?.lastName}</TableCell>
                <TableCell>{user.owner?.email}</TableCell>
                <TableCell>{user.owner?.phone}</TableCell>
                <TableCell>{user.roomNumber}</TableCell>
                <TableCell className={`bg-red-500 text-white ${ user.payment ? "bg-green-500" : ""}`}>{user.payment ? "Done" : "Not Yet"}</TableCell>
                <TableCell className="text-right">{user.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={8}>Total Users: {userAndRoom.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <Button onClick={() => doPrinting(tableId)}>Print</Button>
    </div>
  );
}
