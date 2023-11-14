interface props {
    children: React.ReactNode;
};

const ChatLayout: React.FC<props> = ({ children }) => {
    return (
        <div className="mx-auto max-w-4xl h-full w-full">
            {children}
        </div>
    );
};

export default ChatLayout;