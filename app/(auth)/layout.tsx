interface props {
    children: React.ReactNode
}

const AuthLayout: React.FC<props> = ({ children }) => {
    return (
        <div className="flex justify-center items-center h-full">
            {children}
        </div>
    );
};

export default AuthLayout;