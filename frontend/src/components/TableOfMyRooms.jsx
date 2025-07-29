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

export default function Users({ myRooms }) {
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

    if(myRooms.length > 0){
       return (
 
  

    <div className="bg-gray-200 w-full p-4 rounded-md shadow-md">
      <h2 className="text-2xl p-3 font-bold">My Rooms</h2>
      <div id={tableId}>
        <Table>
          <TableCaption>A list of system users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No.</TableHead>
              
              <TableHead>Room Number</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myRooms.map((user, index) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
            
                <TableCell>{user.roomNumber}</TableCell>
                <TableCell className={`bg-red-500 text-white ${ user.payment ? "bg-green-700" : ""}`}>{user.payment ? "Done" : "Not Yet"}</TableCell>
                <TableCell className="text-right">{user.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={8}>Total Rooms: {myRooms.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <Button onClick={() => doPrinting(tableId)}>Print</Button>
    </div>


  );
      
    }
 
}
