import { Avatar, AvatarImage } from "../ui/avatar";

interface props {
    src: string;
}

const CelebAvatar: React.FC<props> = ({ src }) => {
    return (
        <Avatar className="h-12 w-12">
            <AvatarImage src={src} />
        </Avatar>
    );
};

export default CelebAvatar;