import { useInView } from "react-intersection-observer";

const Image = ({ src, alt, className }) => {
    const { ref, inView } = useInView({
        threshold: 0,
    });

    return (
        <img
            ref={ref}
            src={inView ? src : ""}
            alt={alt}
            className={`${className} transition-opacity ${inView ? "opacity-100" : "opacity-0"}`}
        />
    );
};

export default Image;
