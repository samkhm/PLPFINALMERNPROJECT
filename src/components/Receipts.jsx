import ReceiptCard from "./ReceiptCard";
export default function Receipts({loading, receipts=[]}){

         if (loading){
        return(
            <>
                
                <main className="max-w-5xl mx-auto p-4">
                    <div className="flex justify-centre items-centre items-centre h-64 w-full">
                        <div className="text-lg">Receipts loading...</div>
                    </div>

                </main>
            </>
        );
    }
    return(
        <div className="max-w-5xl mx-auto p-4">
           <section
               className="grid gap-6
               sm:grid-cols-2
               lg:grid-cols-3
               xl:grid-cols-4"
            >
                {receipts.map(r => (
                    <ReceiptCard
                        key={r._id}
                        receipt={r}                        
                        onDownload={onDownload}
                     />

                ))}

            </section>

            {receipts.length === 0 &&(
            <div className="text-centre py-12">
                <p className="text-gray-500 dark:text-gray-400">
                    No Receipts Found
                </p>
            </div>
          )}

        </div>
    )

}