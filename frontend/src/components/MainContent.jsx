export default function MainContent({ activeSection }){
    let content;
    switch(activeSection){
        case 'home':
            content = <div>Welcome to dashboard</div>
            break;
        case 'rooms':
            content = <div>book your rooms</div>
            break;
        case 'receipts':
            content = <div>Your receipts</div>
            break;
        default:
            content = <div>Select a section from the side bar</div>
    }

    return(
        <div className="p-6 bg-gray-100 w-full">
            <h1 className="text-xl font-semibold mb-4 capitalize">{activeSection}</h1>
            <div>{content}</div>
        </div>
    );
};